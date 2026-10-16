"""Base-oil cut model: TBP boiling curve + specific gravity -> viscosity, density, FOM1 estimate, closed-cup flash.

Method (validated in tests/test_cut.py):
  1. Split the TBP curve into N equal-volume pseudo-components; Watson K held constant from T50 and SG15.
  2. Each pseudo-component: MW, Tc, Pc (Riazi / Riazi-Daubert), acentric factor (Lee-Kesler), KV at
     37.8 and 98.9 C (Abbott) — the same correlations DWSIM uses (see correlations.py).
  3. Mixture viscosity by Refutas blending, temperature dependence by ASTM D341.
  4. Closed-cup flash: equilibrium Le Chatelier criterion with Jones-rule LFL (correlations.flash_point_cc).

Calibration (documented, applied only where stated):
  VISC_CAL = 13.04/13.3 and KV100_CAL = 2.547/2.752: scale mu25 and KV100 so the model reproduces the
  measured CRC AVFL-37 2 cSt Group III.
  FLASH_WIDE_OFFSET = -22 C: conservative end of the flash range; makes the model reproduce a wide commercial
  2 cSt cut (160 C open cup, ~150 C closed cup). The raw model already reproduces a narrow-cut GTL fluid
  (189 C vs 184-191 C PMCC), so the truth for a narrow cut is expected between the two.
"""
from . import correlations as cr
from .ocp import fom1_scaled

VISC_CAL = 13.04 / 13.3
KV100_CAL = 2.547 / 2.752     # model KV100 2.752 vs measured 2.547 cSt for the same CRC reference oil
FLASH_WIDE_OFFSET = -22.0
DRHO_DT = -0.00065            # g/mL per K, measured slope of CRC AVFL-37 Group III oils

# n-paraffin normal boiling points, C (NIST): express cut limits as carbon numbers
NBP_C = {16: 286.8, 18: 316.3, 19: 329.9, 20: 343.8, 21: 356.5, 22: 368.6, 23: 380.0, 24: 391.0,
         25: 401.9, 26: 412.2, 27: 422.0, 28: 431.6, 30: 449.7, 32: 467.0, 35: 490.0, 36: 497.0}


def _interp(points, pct):
    pts = sorted(points)
    for (p1, t1), (p2, t2) in zip(pts, pts[1:]):
        if p1 <= pct <= p2:
            return t1 + (t2 - t1) * (pct - p1) / (p2 - p1)
    (p1, t1), (p2, t2) = (pts[0], pts[1]) if pct < pts[0][0] else (pts[-2], pts[-1])
    return t1 + (t2 - t1) * (pct - p1) / (p2 - p1)


def narrow_cut_curve(c_lo, c_hi):
    """Near-flat TBP curve between the boiling points of n-C{c_lo} and n-C{c_hi} (vol %, C)."""
    lo, hi = NBP_C[c_lo], NBP_C[c_hi]
    d = 0.07 * (hi - lo)
    return [(0.5, lo), (5, lo + d), (50, (lo + hi) / 2), (95, hi - d), (99.5, hi)]


class Cut:
    """A base-oil cut defined by its TBP curve [(vol %, T C), ...] and SG at 15 C."""

    def __init__(self, tbp_points, sg15, n_slices=20, trim_below_C=None, trim_above_C=None):
        self.tbp, self.sg15 = list(tbp_points), sg15
        t50k = _interp(self.tbp, 50) + 273.15
        kw = cr.watson_k(t50k, sg15)
        self.components = []
        for i in range(n_slices):
            tb_c = _interp(self.tbp, (i + 0.5) * 100 / n_slices)
            if (trim_below_C is not None and tb_c < trim_below_C) or (trim_above_C is not None and tb_c > trim_above_C):
                continue
            tbk = tb_c + 273.15
            sg = (tbk * 1.8) ** (1 / 3) / kw
            tc, pc = cr.critical_temp(tbk, sg), cr.critical_press(tbk, sg)
            v37, v98 = cr.kv_abbott(tbk, sg)
            self.components.append(dict(Tb=tbk, sg=sg, mw=cr.molecular_weight(tbk, sg), Tc=tc, Pc=pc,
                                        w=cr.acentric_factor(tbk, tc, pc), v37=v37, v98=v98))
        if not self.components:
            raise ValueError("trimming removed every component")
        mass = [c["sg"] for c in self.components]                      # equal volume slices
        mtot = sum(mass)
        self._w = [m / mtot for m in mass]
        mol = [m / c["mw"] for m, c in zip(mass, self.components)]
        ntot = sum(mol)
        self._x = [n / ntot for n in mol]
        self.sg_mix = mtot / len(mass)
        self._v37 = cr.refutas_kv(sum(w * cr.refutas_vbn(c["v37"]) for w, c in zip(self._w, self.components)))
        self._v98 = cr.refutas_kv(sum(w * cr.refutas_vbn(c["v98"]) for w, c in zip(self._w, self.components)))

    # ---- properties ------------------------------------------------------------------------------
    def kv(self, t_c):
        """Kinematic viscosity, cSt (raw model)."""
        return cr.walther(37.78, self._v37, 98.89, self._v98, t_c)

    def density(self, t_c):
        """g/mL, from mixture SG15 with the measured Group III slope."""
        return self.sg_mix * 0.999 + DRHO_DT * (t_c - 15.0)

    def mu(self, t_c, calibrated=True):
        """Dynamic viscosity, mPa.s."""
        m = self.kv(t_c) * self.density(t_c)
        return m * VISC_CAL if calibrated else m

    def fom1_25(self):
        """FOM1 at 25 C, scaled from the measured CRC 2 cSt Group III reference by viscosity."""
        return fom1_scaled(self.mu(25))

    def flash_cc(self):
        """(conservative, raw) closed-cup flash estimate, C."""
        raw = cr.flash_point_cc(self.components, self._x)
        return raw + FLASH_WIDE_OFFSET, raw

    @property
    def boiling_range_C(self):
        return self.components[0]["Tb"] - 273.15, self.components[-1]["Tb"] - 273.15

    def summary(self):
        lo, raw = self.flash_cc()
        return dict(kv40=self.kv(40), kv100=self.kv(100) * KV100_CAL, mu25=self.mu(25), fom1=self.fom1_25(),
                    flash_cc_cons=lo, flash_cc_raw=raw, sg15=self.sg_mix, tb_range_C=self.boiling_range_C,
                    mw_mean=sum(x * c["mw"] for x, c in zip(self._x, self.components)))
