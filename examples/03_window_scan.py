"""Scan narrow cuts C19-C22 x C24-C28 and print the design window (markdown)."""
import sys, pathlib; sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))
from immersion_screen import window
print(window.table(window.scan()))
