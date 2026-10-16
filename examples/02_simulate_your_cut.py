"""Simulate YOUR cut: replace the TBP curve (vol %, deg C) and SG15 with your lab's simulated distillation.
ASTM D2887 results can be used directly as an approximation of TBP for narrow lube cuts."""
import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from immersion_screen.cut import Cut
from immersion_screen.ocp import scorecard

MY_TBP = [(0.5, 355), (5, 360), (10, 364), (50, 380), (90, 396), (95, 400), (99.5, 404)]   # <- your data
MY_SG15 = 0.836                                                                             # <- your data

s = Cut(MY_TBP, MY_SG15).summary()
print({k: round(v, 2) if isinstance(v, float) else v for k, v in s.items()})
print(scorecard(dict(fom1=s["fom1"], mu25_mPas=s["mu25"], flash_cc_C=s["flash_cc_cons"])))
