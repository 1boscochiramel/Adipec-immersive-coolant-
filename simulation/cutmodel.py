"""Cut model: boiling curve -> pseudo-components -> KV40/KV100, mu25, closed-cup flash point.

Characterisation uses DWSIM 9.0.5's own petroleum methods through pythonnet (dw.py):
  Riazi-Daubert MW/Tc/Pc, Lee-Kesler acentric factor, Abbott KV at 37.8/98.9 C.
Mixing and flash use published methods implemented here:
  Refutas viscosity blending (ASTM D7152 basis), Walther/ASTM D341 temperature extrapolation,
  Lee-Kesler vapour pressure, Jones-rule LFL (0.55 x stoichiometric), Le Chatelier mixture LFL.
Closed-cup flash = lowest T where sum_i y_i/LFL_i = 1 above the liquid (equilibrium, P = 1 atm).
"""
import math
from scipy.optimize import brentq

P_ATM = 101325.0

# ---------------------------------------------------------------- property helpers
def psat_lk(T, Tc, Pc, w):
    Tr = T / Tc
    f0 = 5.92714 - 6.09648 / Tr - 1.28862 * math.log(Tr) + 0.169347 * Tr ** 6
    f1 = 15.2518 - 15.6875 / Tr - 13.4721 * math.log(Tr) + 0.43577 * Tr ** 6
    return Pc * math.exp(f0 + w * f1)

def lfl_jones(n_carbon):
    """Lower flammability limit (mole fraction) of an alkane CnH2n+2 by Jones' rule."""
    c_st = 1.0 / (1.0 + 4.773 * (1.5 * n_carbon + 0.5))
    return 0.55 * c_st

def n_from_mw(mw):                       # alkane-equivalent carbon number
    return (mw - 2.016) / 14.027

def vbn(v):  return 14.534 * math.log(math.log(v + 0.8)) + 10.975
def v_from_vbn(x): return math.exp(math.exp((x - 10.975) / 14.534)) - 0.8

def walther(T1, v1, T2, v2, T):
    y1, y2 = (math.log10(math.log10(v + 0.7)) for v in (v1, v2))
    x1, x2 = math.log10(T1 + 273.15), math.log10(T2 + 273.15)
    B = (y1 - y2) / (x2 - x1); A = y1 + B * x1
    return 10 ** (10 ** (A - B * math.log10(T + 273.15))) - 0.7

# ---------------------------------------------------------------- flash point
def flash_point(comps, x_mole):
    """comps: list of dicts with Tc, Pc, w, mw. Returns closed-cup flash (C), equilibrium basis."""
    def g(Tk):
        return sum(x * psat_lk(Tk, c["Tc"], c["Pc"], c["w"]) / P_ATM / lfl_jones(n_from_mw(c["mw"]))
                   for c, x in zip(comps, x_mole)) - 1.0
    return brentq(g, 300.0, 700.0) - 273.15
