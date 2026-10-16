"""Screen measured base oils (e.g. CRC AVFL-37 rows) against the OCP figures of merit at any temperature."""
import csv
from pathlib import Path
from . import correlations as cr
from .ocp import fom1, fom2

DATA = Path(__file__).resolve().parent.parent / "data"


def load_crc():
    with open(DATA / "base_oils_crc_avfl37.csv", encoding="utf-8") as fh:
        rows = [r for r in csv.DictReader(line for line in fh if not line.startswith("#"))]
    for r in rows:
        for k, v in list(r.items()):
            if k != "name":
                r[k] = float(v) if v else None
    return rows


def properties(row, t_c):
    """Density (kg/m3), beta (1/K), k (W/m.K), cp (J/kg.K), mu (Pa.s) at t_c from a measured row.
    Density linear in T from the 40/60 C points; k piecewise linear 0-40-70 C; cp linear from 40/70 C
    (CRC's 0 C DSC values are erratic); viscosity by ASTM D341 from KV40/KV100."""
    s = (row["rho60_g_mL"] - row["rho40_g_mL"]) / 20.0
    rho = (row["rho40_g_mL"] + s * (t_c - 40)) * 1000
    beta = -s * 1000 / rho
    if t_c <= 40:
        k = row["k0_W_mK"] + (row["k40_W_mK"] - row["k0_W_mK"]) * t_c / 40
    else:
        k = row["k40_W_mK"] + (row["k70_W_mK"] - row["k40_W_mK"]) * (t_c - 40) / 30
    cp = (row["cp40_J_gK"] + (row["cp70_J_gK"] - row["cp40_J_gK"]) * (t_c - 40) / 30) * 1000
    nu = cr.walther(40, row["kv40_cSt"], 100, row["kv100_cSt"], t_c)
    return dict(rho=rho, beta=beta, k=k, cp=cp, mu=nu * 1e-6 * rho, kv=nu)


def screen(row, t_c=25.0):
    p = properties(row, t_c)
    return dict(name=row["name"], T_C=t_c, mu_mPas=p["mu"] * 1e3, fom1=fom1(p["k"], p["beta"], p["cp"], p["rho"], p["mu"]),
                fom2=fom2(p["k"], p["cp"], p["rho"]), rho=p["rho"], k=p["k"], cp=p["cp"], beta=p["beta"])
