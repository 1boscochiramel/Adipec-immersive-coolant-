"""Screen the measured CRC AVFL-37 base oils against OCP FOM1/FOM2/FOM3 at 25 and 50 C."""
import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from immersion_screen import measured
for t in (25, 50):
    print(f"\nAt {t} C")
    for row in measured.load_crc():
        x = measured.screen(row, t)
        tier = "Tier 2" if x["fom1"] >= 45 else "Tier 1" if x["fom1"] >= 35 else "below Tier 1"
        print(f"  {x['name']:30s} mu {x['mu_mPas']:5.1f} mPa.s  FOM1 {x['fom1']:5.1f} ({tier})  FOM2 {x['fom2']:5.1f}")
