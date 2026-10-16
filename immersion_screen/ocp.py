"""Open Compute Project (OCP) immersion-fluid figures of merit and gates.

Sources (public OCP documents):
  [BS]  OCP Base Specification for Immersion Fluids, Rev 1.0, 1 Dec 2022 — FOM1 p14 (n = 0.2813, Tier 1 35,
        Tier 2 45), FOM2 p17-18 (> 19), FOM3 p19-20 (<= 15 mPa.s at 25 C), flash p24, resistivity p27.
  [IR]  OCP Immersion Requirements, Rev 2.10, 18 Aug 2023 — SR 4.2-1 table p19 (dielectric, resistivity,
        flash, autoignition, sulphur), p20 "mineral oils should be avoided" for single phase.
"""

FOM1_EXPONENT = 0.2813

LIMITS = {
    "fom1_tier1":       dict(value=35.0, op=">=", src="BS p14"),
    "fom1_tier2":       dict(value=45.0, op=">=", src="BS p14"),
    "fom2":             dict(value=19.0, op=">", src="BS p18"),
    "mu25_mPas":        dict(value=15.0, op="<=", src="BS p19-20 (FOM3, 25 C)"),
    "dk":               dict(value=2.3, op="<=", src="IR p19 (20/40 GHz, 20/70 C)"),
    "df":               dict(value=0.05, op="<=", src="IR p19 (informative)"),
    "dielectric_kV_mm": dict(value=6.0, op=">=", src="IR p19 (1 mm, lifetime)"),
    "resistivity_GOhm_m_new": dict(value=2.0, op=">=", src="IR p19 (unused fluid)"),
    "flash_cc_C":       dict(value=150.0, op=">=", src="IR p19 / BS p24 (155 C up to 1,500 m)"),
    "autoignition_C":   dict(value=300.0, op=">=", src="IR p19"),
    "sulphur_ppm":      dict(value=10.0, op="<=", src="IR p19"),
}


def fom1(k, beta, cp, rho, mu):
    """Natural-convection figure of merit, SI inputs: k W/m.K, beta 1/K, cp J/kg.K, rho kg/m3, mu Pa.s."""
    return k * (beta * cp * rho ** 2 / (mu * k)) ** FOM1_EXPONENT


def fom2(k, cp, rho):
    """Forced-convection figure of merit, SI inputs."""
    return k * (rho * cp / k) ** (1 / 3)


def fom1_scaled(mu_mPas, ref_fom1=37.2, ref_mu_mPas=13.04):
    """FOM1 at another viscosity, holding the other properties of a reference fluid fixed (FOM1 ~ mu^-0.2813).
    Default reference: CRC AVFL-37 'Group III B, 2 cSt' at 25 C (FOM1 37.24, mu 13.04 mPa.s)."""
    return ref_fom1 * (ref_mu_mPas / mu_mPas) ** FOM1_EXPONENT


def check(name, value):
    """Return 'pass', 'fail' or 'unknown' for one gate."""
    if value is None:
        return "unknown"
    lim = LIMITS[name]
    v, t = value, lim["value"]
    ok = {">=": v >= t, ">": v > t, "<=": v <= t}[lim["op"]]
    return "pass" if ok else "fail"


def scorecard(props):
    """props: dict with any of the LIMITS keys (fom1 may be given as 'fom1'). Returns {gate: status}."""
    out = {}
    for name in LIMITS:
        key = "fom1" if name.startswith("fom1") else name
        out[name] = check(name, props.get(key))
    return out
