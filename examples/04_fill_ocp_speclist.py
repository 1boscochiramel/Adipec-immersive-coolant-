"""Fill OCP's Fluids Speclist template for a measured oil (CRC 2 cSt Group III) at the template temperatures."""
import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from immersion_screen import measured
from immersion_screen.speclist import fill
row = {r["name"]: r for r in measured.load_crc()}["Group III B 2 cSt (Yubase)"]
T = [20, 30, 40, 50, 60, 70]
p = {t: measured.properties(row, t) for t in T}
props = dict(category="Hydrocarbons", basis="CRC AVFL-37 'Group III B, 2 cSt' (measured); computed with immersion_screen",
             density_kgm3={t: round(p[t]["rho"], 1) for t in T}, cp_JkgK={t: round(p[t]["cp"]) for t in T},
             k_WmK={t: round(p[t]["k"], 4) for t in T}, kv_cSt={t: round(p[t]["kv"], 2) for t in T},
             beta_1_K=round(measured.properties(row, 25)["beta"], 7), resistivity_GOhm_m=12400)
print("wrote", fill(props, "my_speclist.xlsx"))
