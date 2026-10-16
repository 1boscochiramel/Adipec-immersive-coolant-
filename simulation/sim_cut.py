"""Simulate base-oil cuts from a TBP boiling curve with DWSIM characterisation + published mixing rules.

1. VALIDATE against public anchors (pure alkanes, CRC 2 cSt Group III, light FT base oil, Yubase 2 flash).
2. SIMULATE the target narrow cut C21-C26, the wide 2 cSt cut, light-tail trims, and a 4 cSt (C25-C35) cut.
Outputs a results table (markdown + json) next to this file.
Run: .venv/Scripts/python.exe -X utf8 adipec_sim/dwsim_sim/sim_cut.py
"""
import json, math
from pathlib import Path
import dw
import cutmodel as cm

HERE = Path(__file__).parent
N_SLICE = 20
# n-paraffin normal boiling points (C) used to express cut limits as carbon numbers (NIST / chemicals Tb)
NBP = {18: 316.0, 19: 330.0, 20: 343.8, 21: 356.5, 22: 368.6, 23: 380.0, 24: 391.0, 25: 401.9,
       26: 412.2, 27: 422.0, 28: 431.6, 30: 449.7, 32: 467.0, 35: 490.0, 36: 497.0}

def curve(points):
    """points: [(vol %, T C)] -> callable T(%) by linear interpolation, ends extrapolated."""
    pts = sorted(points)
    def T(p):
        for (p1, t1), (p2, t2) in zip(pts, pts[1:]):
            if p1 <= p <= p2:
                return t1 + (t2 - t1) * (p - p1) / (p2 - p1)
        (p1, t1), (p2, t2) = (pts[0], pts[1]) if p < pts[0][0] else (pts[-2], pts[-1])
        return t1 + (t2 - t1) * (p - p1) / (p2 - p1)
    return T

def simulate(points, sg15, trim_below_C=None, trim_above_C=None):
    T = curve(points)
    T50 = T(50) + 273.15
    kw = (T50 * 1.8) ** (1 / 3) / sg15                      # Watson K, held constant across the cut
    comps, vol = [], []
    for i in range(N_SLICE):
        p_mid = (i + 0.5) * 100 / N_SLICE
        tb = T(p_mid)
        if trim_below_C is not None and tb < trim_below_C: continue
        if trim_above_C is not None and tb > trim_above_C: continue
        tbk = tb + 273.15
        sg = (tbk * 1.8) ** (1 / 3) / kw
        p = dw.pseudo(tbk, sg)
        comps.append(dict(Tb=tbk, sg=sg, mw=p["mw"], Tc=p["tc"], Pc=p["pc"], w=p["w"],
                          v37=p["v37"] * 1e6, v98=p["v98"] * 1e6))
        vol.append(1.0)
    mass = [v * c["sg"] for v, c in zip(vol, comps)]
    mtot = sum(mass); wfrac = [m / mtot for m in mass]
    moles = [m / c["mw"] for m, c in zip(mass, comps)]; ntot = sum(moles); x = [n / ntot for n in moles]
    v37 = cm.v_from_vbn(sum(w * cm.vbn(c["v37"]) for w, c in zip(wfrac, comps)))
    v98 = cm.v_from_vbn(sum(w * cm.vbn(c["v98"]) for w, c in zip(wfrac, comps)))
    kv40 = cm.walther(37.78, v37, 98.89, v98, 40); kv100 = cm.walther(37.78, v37, 98.89, v98, 100)
    kv25 = cm.walther(37.78, v37, 98.89, v98, 25)
    sg_mix = mtot / sum(vol)
    rho25 = sg_mix * 0.999 - 0.00065 * 10                    # g/mL; CRC Group III slope -0.00065 g/mL/K
    fp = cm.flash_point(comps, x)
    return dict(kv40=kv40, kv100=kv100, mu25=kv25 * rho25, flash_cc=fp, sg=sg_mix,
                tb_lo=comps[0]["Tb"] - 273.15, tb_hi=comps[-1]["Tb"] - 273.15, n_comp=len(comps),
                mw=sum(xi * c["mw"] for xi, c in zip(x, comps)))

def carbon(tb):
    keys = sorted(NBP)
    for a, b in zip(keys, keys[1:]):
        if NBP[a] <= tb <= NBP[b]:
            return a + (tb - NBP[a]) / (NBP[b] - NBP[a]) * (b - a)
    return float("nan")

# ---------------------------------------------------------------- cuts (TBP vol % -> C)
CRC2_CURVE = [(0.5, 337), (5, 346), (10, 351), (50, 377), (90, 402), (95, 407), (99.5, 415)]   # est-vol interpolation
FTA_CURVE = [(5, 356), (50, 386), (95, 417)]                                                    # US7846880B2 (TBP)
WIDE2_CURVE = [(0.5, 300), (5, 325), (10, 338), (50, 377), (90, 410), (95, 418), (99.5, 430)]   # wide 2 cSt-like cut
TARGET_CURVE = [(0.5, NBP[21]), (5, 360), (50, 385), (95, 410), (99.5, NBP[26])]                # narrow C21-C26
G4_CURVE = [(0.5, NBP[25]), (5, 410), (50, 445), (95, 480), (99.5, NBP[35])]                   # C25-C35

def run():
    out = {}
    out["validation"] = {
        "CRC 2 cSt Group III (SG15 0.836)": dict(sim=simulate(CRC2_CURVE, 0.836),
            measured=dict(kv40=9.435, kv100=2.547, mu25=13.04, flash_note="Yubase 2 COC 160 C (SK SDS) -> CC ~145-155")),
        "Light FT base oil FT-A (SG15 0.805 assumed)": dict(sim=simulate(FTA_CURVE, 0.805),
            measured=dict(kv40=10.00, kv100=2.806)),
    }
    out["scenarios"] = {
        "Wide 2 cSt-like cut (light tail to ~C18)": simulate(WIDE2_CURVE, 0.836),
        "Wide cut, tail below C20 removed": simulate(WIDE2_CURVE, 0.836, trim_below_C=NBP[20]),
        "Wide cut, tail below C21 removed": simulate(WIDE2_CURVE, 0.836, trim_below_C=NBP[21]),
        "Wide cut, tail below C22 removed": simulate(WIDE2_CURVE, 0.836, trim_below_C=NBP[22]),
        "TARGET narrow cut C21-C26": simulate(TARGET_CURVE, 0.836),
        "4 cSt-like cut C25-C35": simulate(G4_CURVE, 0.840),
    }
    (HERE / "sim_results.json").write_text(json.dumps(out, indent=1))
    hdr = "| case | Tb range °C (≈ carbon) | KV40 cSt | KV100 cSt | μ25 mPa·s | flash CC °C (model) |"
    lines = ["## Validation", hdr, "|---|---|---|---|---|---|"]
    for k, v in out["validation"].items():
        s, m = v["sim"], v["measured"]
        lines.append(f"| {k} (sim) | {s['tb_lo']:.0f}–{s['tb_hi']:.0f} (C{carbon(s['tb_lo']):.0f}–C{carbon(s['tb_hi']):.0f}) | "
                     f"{s['kv40']:.2f} | {s['kv100']:.3f} | {s['mu25']:.1f} | {s['flash_cc']:.0f} |")
        lines.append(f"| {k} (measured) | — | {m.get('kv40','—')} | {m.get('kv100','—')} | {m.get('mu25','—')} | {m.get('flash_note','—')} |")
    lines += ["", "## Scenarios", hdr, "|---|---|---|---|---|---|"]
    for k, s in out["scenarios"].items():
        lines.append(f"| {k} | {s['tb_lo']:.0f}–{s['tb_hi']:.0f} (C{carbon(s['tb_lo']):.0f}–C{carbon(s['tb_hi']):.0f}) | "
                     f"{s['kv40']:.2f} | {s['kv100']:.3f} | {s['mu25']:.1f} | {s['flash_cc']:.0f} |")
    txt = "\n".join(lines); (HERE / "sim_results.md").write_text(txt, encoding="utf-8"); print(txt)

if __name__ == "__main__":
    run()
