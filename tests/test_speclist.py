"""The OCP template is filled and its dropdowns/conditional formatting survive."""
import re
import zipfile
from immersion_screen.speclist import fill, TEMPLATE


def test_fill_roundtrip(tmp_path):
    out = tmp_path / "x.xlsx"
    fill(dict(category="Hydrocarbons", density_kgm3={20: 832.2, 30: 825.7}, kv_cSt={20: 19.14},
              resistivity_GOhm_m=12400, flash_cc_C=None, remarks={"F66": "ESTIMATE: test"}), out)
    s = zipfile.ZipFile(out).read("xl/worksheets/sheet2.xml").decode()
    assert '<c r="E34" s="60"><v>832.2</v></c>' in s
    assert "Not measured" in s and "ESTIMATE: test" in s and "Hydrocarbons" in s
    t = zipfile.ZipFile(TEMPLATE).read("xl/worksheets/sheet2.xml").decode()
    for tag in ("<x14:dataValidation ", "<x14:conditionalFormatting", "<conditionalFormatting"):
        assert s.count(tag) == t.count(tag)
