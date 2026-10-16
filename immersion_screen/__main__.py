"""Command line:  python -m immersion_screen <command> ...

  measured [--T 25]                     OCP FOMs of the CRC AVFL-37 hydrocarbon base oils
  cut --tbp 5:360,50:385,95:410 --sg 0.836 [--trim-below C21]   simulate one cut from its TBP curve
  narrow C21 C25 [--sg 0.836]           simulate a narrow cut between two n-paraffin boiling points
  window                                scan narrow cuts C19-C22 x C24-C28 (markdown table)
  speclist props.json out.xlsx          fill the OCP Fluids Speclist template from a JSON property file
"""
import argparse
import json
import sys

from . import measured, window
from .cut import Cut, narrow_cut_curve, NBP_C


def _c(s):
    return int(s.upper().lstrip("C"))


def main(argv=None):
    ap = argparse.ArgumentParser(prog="immersion_screen", description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    m = sub.add_parser("measured"); m.add_argument("--T", type=float, default=25.0)
    c = sub.add_parser("cut"); c.add_argument("--tbp", required=True, help="vol%%:T_C pairs, e.g. 5:360,50:385,95:410")
    c.add_argument("--sg", type=float, required=True); c.add_argument("--trim-below"); c.add_argument("--trim-above")
    n = sub.add_parser("narrow"); n.add_argument("lo"); n.add_argument("hi"); n.add_argument("--sg", type=float, default=0.836)
    sub.add_parser("window")
    s = sub.add_parser("speclist"); s.add_argument("props"); s.add_argument("out")
    a = ap.parse_args(argv)

    if a.cmd == "measured":
        print(f"| base oil | μ at {a.T:g} °C mPa·s | FOM1 | FOM2 |\n|---|---|---|---|")
        for r in measured.load_crc():
            x = measured.screen(r, a.T)
            print(f"| {x['name']} | {x['mu_mPas']:.1f} | {x['fom1']:.1f} | {x['fom2']:.1f} |")
    elif a.cmd in ("cut", "narrow"):
        if a.cmd == "cut":
            pts = [tuple(float(v) for v in p.split(":")) for p in a.tbp.split(",")]
            kw = {}
            if a.trim_below: kw["trim_below_C"] = NBP_C[_c(a.trim_below)]
            if a.trim_above: kw["trim_above_C"] = NBP_C[_c(a.trim_above)]
            cut = Cut(pts, a.sg, **kw)
        else:
            cut = Cut(narrow_cut_curve(_c(a.lo), _c(a.hi)), a.sg)
        print(json.dumps({k: (round(v, 3) if isinstance(v, float) else v) for k, v in cut.summary().items()}, indent=1))
    elif a.cmd == "window":
        print(window.table(window.scan()))
    elif a.cmd == "speclist":
        from .speclist import fill
        props = json.load(open(a.props, encoding="utf-8"))
        props = {k: ({int(t): v for t, v in val.items()} if isinstance(val, dict) and all(t.isdigit() for t in val) else val)
                 for k, val in props.items()}
        print("wrote", fill(props, a.out))
    return 0


if __name__ == "__main__":
    sys.exit(main())
