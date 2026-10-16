"""Petroleum-fraction and mixture correlations (pure Python, no dependencies).

Every function cites its source. The pseudo-component correlations reproduce DWSIM 9.0.5's
`PetroleumCharacterization.Methods.PropertyMethods` (see tests/test_correlations.py, which checks
them against values recorded from DWSIM on a 32-point Tb/SG grid):

    molecular_weight  Riazi (1987) form; two constants re-fitted to DWSIM 9.0.5 (max dev. 7e-6)
    critical_temp     Riazi-Daubert (1987), API Technical Data Book form, Tb in Rankine (max dev. 1.4e-5)
    critical_press    Riazi-Daubert (1987), API Technical Data Book form (max dev. 3.0e-5)
    acentric_factor   Lee-Kesler (exact match)
    kv_abbott         Abbott et al. (1971) KV at 100 F and 210 F (exact match)

Units: temperatures in K unless named *_C; pressure in Pa; kinematic viscosity in cSt.
"""
import math

P_ATM = 101325.0
PSI = 6894.757


def _rankine(tb_k):
    return tb_k * 1.8


def api_gravity(sg):
    return 141.5 / sg - 131.5


def watson_k(tb_k, sg):
    """Watson characterisation factor from normal boiling point (K) and specific gravity."""
    return _rankine(tb_k) ** (1 / 3) / sg


def molecular_weight(tb_k, sg):
    """Riazi (1987) MW(Tb, SG); constant and SG exponent re-fitted to reproduce DWSIM 9.0.5."""
    return (43.26695 * math.exp(2.097e-4 * tb_k - 7.78712 * sg + 2.08476e-3 * tb_k * sg)
            * tb_k ** 1.26007 * sg ** 4.988906)


def critical_temp(tb_k, sg):
    """Riazi-Daubert (1987) Tc, API TDB form. Returns K."""
    tb = _rankine(tb_k)
    return 10.6443 * math.exp(-5.1747e-4 * tb - 0.5444 * sg + 3.5995e-4 * tb * sg) * tb ** 0.81067 * sg ** 0.53691 / 1.8


def critical_press(tb_k, sg):
    """Riazi-Daubert (1987) Pc, API TDB form. Returns Pa."""
    tb = _rankine(tb_k)
    return 6.162e6 * math.exp(-4.725e-3 * tb - 4.8014 * sg + 3.1939e-3 * tb * sg) * tb ** -0.4844 * sg ** 4.0846 * PSI


def acentric_factor(tb_k, tc_k, pc_pa):
    """Lee-Kesler (1975) acentric factor from Tb, Tc, Pc."""
    th = tb_k / tc_k
    pr = pc_pa / P_ATM
    return ((-math.log(pr) - 5.92714 + 6.09648 / th + 1.28862 * math.log(th) - 0.169347 * th ** 6)
            / (15.2518 - 15.6875 / th - 13.4721 * math.log(th) + 0.43577 * th ** 6))


def kv_abbott(tb_k, sg):
    """Abbott, Kaufmann and Domash (1971) kinematic viscosity (cSt) at 100 F (37.78 C) and 210 F (98.89 C)."""
    k, a = watson_k(tb_k, sg), api_gravity(sg)
    l100 = (4.39371 - 1.94733 * k + 0.12769 * k ** 2 + 3.2629e-4 * a ** 2 - 1.18246e-2 * k * a
            + (0.171617 * k ** 2 + 10.9943 * a + 9.50663e-2 * a ** 2 - 0.860218 * k * a) / (a + 50.3642 - 4.78231 * k))
    l210 = (-0.463634 - 0.166532 * a + 5.13447e-4 * a ** 2 - 8.48995e-3 * k * a
            + (8.0325e-2 * k + 1.24899 * a + 0.197680 * a ** 2) / (a + 26.786 - 2.6296 * k))
    return 10 ** l100, 10 ** l210


def walther(t1_c, v1, t2_c, v2, t_c):
    """ASTM D341 (Walther) viscosity-temperature interpolation/extrapolation, cSt."""
    y1, y2 = (math.log10(math.log10(v + 0.7)) for v in (v1, v2))
    x1, x2 = math.log10(t1_c + 273.15), math.log10(t2_c + 273.15)
    b = (y1 - y2) / (x2 - x1)
    a = y1 + b * x1
    return 10 ** (10 ** (a - b * math.log10(t_c + 273.15))) - 0.7


def refutas_vbn(v):
    """Refutas viscosity blending number (ASTM D7152 basis)."""
    return 14.534 * math.log(math.log(v + 0.8)) + 10.975


def refutas_kv(vbn):
    return math.exp(math.exp((vbn - 10.975) / 14.534)) - 0.8


def psat_lee_kesler(t_k, tc_k, pc_pa, w):
    """Lee-Kesler vapour pressure, Pa."""
    tr = t_k / tc_k
    f0 = 5.92714 - 6.09648 / tr - 1.28862 * math.log(tr) + 0.169347 * tr ** 6
    f1 = 15.2518 - 15.6875 / tr - 13.4721 * math.log(tr) + 0.43577 * tr ** 6
    return pc_pa * math.exp(f0 + w * f1)


def carbon_number(mw):
    """Alkane-equivalent carbon number of CnH2n+2 with the given molecular weight."""
    return (mw - 2.016) / 14.027


def lfl_jones(n_carbon):
    """Lower flammability limit (mole fraction) of an alkane by Jones' rule: 0.55 x stoichiometric."""
    return 0.55 / (1.0 + 4.773 * (1.5 * n_carbon + 0.5))


def bisect(f, lo, hi, tol=1e-6, it=200):
    flo = f(lo)
    for _ in range(it):
        mid = 0.5 * (lo + hi)
        fm = f(mid)
        if (fm > 0) == (flo > 0):
            lo, flo = mid, fm
        else:
            hi = mid
        if hi - lo < tol:
            break
    return 0.5 * (lo + hi)


def flash_point_cc(components, mole_fractions, t_lo=280.0, t_hi=750.0):
    """Equilibrium closed-cup flash point (C) of a liquid mixture: lowest T where sum_i y_i/LFL_i = 1
    (Le Chatelier), with y_i = x_i Psat_i / P_atm. `components`: dicts with Tc (K), Pc (Pa), w, mw."""
    def g(t):
        return sum(x * psat_lee_kesler(t, c["Tc"], c["Pc"], c["w"]) / P_ATM / lfl_jones(carbon_number(c["mw"]))
                   for c, x in zip(components, mole_fractions)) - 1.0
    return bisect(g, t_lo, t_hi) - 273.15
