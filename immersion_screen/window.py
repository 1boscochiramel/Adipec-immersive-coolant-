"""Design-window scan: which narrow cuts C_lo..C_hi meet the OCP viscosity, FOM1 and flash gates."""
from .cut import Cut, narrow_cut_curve
from .ocp import LIMITS


def evaluate(c_lo, c_hi, sg15=0.836):
    s = Cut(narrow_cut_curve(c_lo, c_hi), sg15).summary()
    s["cut"] = f"C{c_lo}-C{c_hi}"
    s["meets"] = (s["mu25"] <= LIMITS["mu25_mPas"]["value"] and s["fom1"] >= LIMITS["fom1_tier1"]["value"]
                  and s["flash_cc_cons"] >= LIMITS["flash_cc_C"]["value"])
    s["margin"] = s["mu25"] <= 14.0 and s["flash_cc_cons"] >= 160.0
    return s


def scan(lows=(19, 20, 21, 22), highs=(24, 25, 26, 27, 28), min_width=3, sg15=0.836):
    return [evaluate(lo, hi, sg15) for lo in lows for hi in highs if hi - lo >= min_width]


def table(rows):
    lines = ["| cut | μ25 mPa·s | FOM1 | KV100 cSt | flash CC °C (cons.–raw) | meets | margin |", "|---|---|---|---|---|---|---|"]
    for r in rows:
        lines.append(f"| {r['cut']} | {r['mu25']:.1f} | {r['fom1']:.1f} | {r['kv100']:.2f} | "
                     f"{r['flash_cc_cons']:.0f}–{r['flash_cc_raw']:.0f} | {'yes' if r['meets'] else 'no'} | {'yes' if r['margin'] else 'no'} |")
    return "\n".join(lines)
