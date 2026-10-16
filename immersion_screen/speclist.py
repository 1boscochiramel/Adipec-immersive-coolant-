"""Fill the OCP 'Fluids Speclist Rev2.1' Excel template from a property dictionary.

The template (data/ocp_fluids_speclist_rev2.1_template.xlsx) is OCP's, licensed CC BY 4.0.
Cells are written directly in the sheet XML so the template's dropdowns and conditional formatting survive;
the workbook is flagged to recalculate when opened, so Excel computes FOM1/FOM2/FOM3 with OCP's own formulas.

props keys (all optional; temperature tables are dicts {20: v, 30: v, ..., 70: v}):
  category (str, e.g. "Hydrocarbons"), basis (str, free text shown next to the category),
  density_kgm3, cp_JkgK, k_WmK, kv_cSt, vapour_kPa, water_ppm      (tables)
  beta_1_K, pour_C, flash_cc_C, fire_C, autoignition_C, sulphur_ppm, acidity_mgKOH, resistivity_GOhm_m,
  dielectric_kV_mm, dk {"20GHz@20": v, "40GHz@20": v, "20GHz@70": v, "40GHz@70": v}, df (same keys)
  remarks {cell: text}  — free-text remarks, e.g. {"F66": "ESTIMATE: ..."}
Missing numeric values are written as "Not measured".
"""
import re
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

TEMPS = [20, 30, 40, 50, 60, 70]
TABLE_ROWS = {"water_ppm": 28, "density_kgm3": 34, "cp_JkgK": 40, "k_WmK": 46, "kv_cSt": 52, "vapour_kPa": 58}
SCALAR = {"dielectric_kV_mm": "E18", "resistivity_GOhm_m": "E19", "beta_1_K": "E64", "pour_C": "E65",
          "flash_cc_C": "E66", "fire_C": "E67", "autoignition_C": "E68", "sulphur_ppm": "E69", "acidity_mgKOH": "E70"}
DK_CELLS = {"20GHz@20": 20, "40GHz@20": 21, "20GHz@70": 22, "40GHz@70": 23}
NM = "Not measured"
TEMPLATE = Path(__file__).resolve().parent.parent / "data" / "ocp_fluids_speclist_rev2.1_template.xlsx"


def _cell(ref, style, val):
    if isinstance(val, (int, float)):
        return f'<c r="{ref}" s="{style}"><v>{val}</v></c>'
    return f'<c r="{ref}" s="{style}" t="inlineStr"><is><t xml:space="preserve">{escape(str(val))}</t></is></c>'


def cell_values(props):
    v = {}
    if "category" in props: v["C9"] = props["category"]
    if "basis" in props: v["D9"] = props["basis"]
    for key, row0 in TABLE_ROWS.items():
        tab = props.get(key) or {}
        for i, t in enumerate(TEMPS):
            v[f"E{row0 + i}"] = tab.get(t, NM)
    for key, ref in SCALAR.items():
        v[ref] = props.get(key, NM) if props.get(key) is not None else NM
    for name, base in (("dk", 0), ("df", 4)):
        d = props.get(name) or {}
        for k, r in DK_CELLS.items():
            v[f"E{r + base}"] = d.get(k, NM)
    v.update(props.get("remarks", {}))
    return v


def fill(props, out_path, template=TEMPLATE):
    values = cell_values(props)
    zin = zipfile.ZipFile(template)
    done = set()

    def repl(m):
        ref, style = m.group(1), m.group(2)
        if ref in values:
            done.add(ref)
            return _cell(ref, style, values[ref])
        return m.group(0)

    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "xl/calcChain.xml":
                continue
            if item.filename == "xl/worksheets/sheet2.xml":
                data = re.sub(r'<c r="([A-Z]+\d+)" s="(\d+)"(?: t="\w+")?(?:/>|>.*?</c>)', repl,
                              data.decode("utf-8"), flags=re.S).encode("utf-8")
            elif item.filename == "xl/workbook.xml":
                data = re.sub(rb"<calcPr ([^/]*)/>", rb'<calcPr \1 fullCalcOnLoad="1"/>', data)
            elif item.filename == "xl/_rels/workbook.xml.rels":
                data = re.sub(rb'<Relationship [^>]*calcChain\.xml"/>', b"", data)
            elif item.filename == "[Content_Types].xml":
                data = re.sub(rb'<Override PartName="/xl/calcChain\.xml"[^>]*/>', b"", data)
            zout.writestr(item, data)
    missing = set(values) - done
    if missing:
        raise ValueError(f"template cells not found: {sorted(missing)}")
    return out_path
