"""Independent cross-check of the flash model: surrogate mixtures of real n-alkanes with vapour pressure
from the `thermo` library (DIPPR/literature correlations) instead of DWSIM pseudo-components + Lee-Kesler.
Equal-volume surrogates for each cut; same Le Chatelier / Jones-LFL criterion as cutmodel.flash_point.
n-Alkanes match the cut by boiling point (the cut limits are defined by n-paraffin boiling points),
so this checks the vapour-pressure route, not the composition."""
from scipy.optimize import brentq
from chemicals import CAS_from_any, MW
from thermo import VaporPressure, VolumeLiquid
import cutmodel as cm

NAMES = {19: "nonadecane", 20: "eicosane", 21: "heneicosane", 22: "docosane", 23: "tricosane", 24: "tetracosane",
         25: "pentacosane", 26: "hexacosane", 27: "heptacosane", 28: "octacosane"}
CACHE = {}
def comp(n):
    if n not in CACHE:
        c = CAS_from_any(NAMES[n]); CACHE[n] = dict(cas=c, mw=MW(c), vp=VaporPressure(CASRN=c), vl=VolumeLiquid(CASRN=c))
    return CACHE[n]

def flash(lo, hi):
    cs = [comp(n) for n in range(lo, hi + 1)]
    mol = [1.0 / c["mw"] for c in cs]          # equal volume ~ equal mass (densities within a few %) -> moles
    tot = sum(mol); x = [m / tot for m in mol]
    g = lambda T: sum(xi * c["vp"](T) / cm.P_ATM / cm.lfl_jones(n) for xi, c, n in zip(x, cs, range(lo, hi + 1))) - 1
    return brentq(g, 330, 650) - 273.15

if __name__ == "__main__":
    print("| cut | flash, n-alkane surrogate + thermo vapour pressure (°C) |")
    print("|---|---|")
    for lo, hi in ((19, 25), (20, 26), (21, 25), (21, 26), (22, 26)):
        print(f"| C{lo}-C{hi} | {flash(lo, hi):.0f} |")
