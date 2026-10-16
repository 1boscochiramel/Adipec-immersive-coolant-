"""Scan narrow-cut boundaries (lower C_lo, upper C_hi) and report which meet both OCP gates with margin.

Each cut is a near-flat TBP between the n-paraffin boiling points of C_lo and C_hi.
Calibration from sim_cut.py validation:
  mu25:  x 13.04/13.3 (CRC 2 cSt Group III: model 13.3 vs measured 13.04)
  flash: raw model reproduces narrow GTL (189 vs PMCC 184-191); a -22 C offset reproduces the wide Yubase 2
         (172 vs ~150 CC). Report both: optimistic = raw, conservative = raw - 22.
FOM1 is scaled from the measured CRC 2 cSt point: 37.2 x (13.04/mu25)^0.2813 (other properties held).
"""
import json
from pathlib import Path
from sim_cut import simulate, NBP

MU_CAL, FP_OFF = 13.04 / 13.3, 22.0
rows = []
for lo in (19, 20, 21, 22):
    for hi in (24, 25, 26, 27, 28):
        if hi - lo < 3: continue
        tlo, thi = NBP[lo], NBP[hi]
        pts = [(0.5, tlo), (5, tlo + 0.05 * (thi - tlo) * 1.4), (50, (tlo + thi) / 2), (95, thi - 0.05 * (thi - tlo) * 1.4), (99.5, thi)]
        s = simulate(pts, 0.836)
        mu = s["mu25"] * MU_CAL
        fom1 = 37.2 * (13.04 / mu) ** 0.2813
        rows.append(dict(cut=f"C{lo}-C{hi}", mu25=mu, fom1=fom1, kv100=s["kv100"] * 2.547 / 2.752,
                         flash_lo=s["flash_cc"] - FP_OFF, flash_hi=s["flash_cc"],
                         ok=(mu <= 15.0 and fom1 >= 35 and s["flash_cc"] - FP_OFF >= 150),
                         margin=(mu <= 14.0 and s["flash_cc"] - FP_OFF >= 160)))
print("| cut | μ25 mPa·s (cal.) | FOM1 | KV100 cSt (cal.) | closed-cup flash °C (cons.–raw) | meets gates | with margin |")
print("|---|---|---|---|---|---|---|")
for r in rows:
    print(f"| {r['cut']} | {r['mu25']:.1f} | {r['fom1']:.1f} | {r['kv100']:.2f} | {r['flash_lo']:.0f}–{r['flash_hi']:.0f} | "
          f"{'yes' if r['ok'] else 'no'} | {'yes' if r['margin'] else 'no'} |")
Path(__file__).with_name("scan_window.json").write_text(json.dumps(rows, indent=1))
