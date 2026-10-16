# simulation/ — original DWSIM-driven model

These scripts drive **DWSIM 9.0.5** (Windows) through pythonnet. They produced the first results (16 Oct 2026).
The pure-Python package `immersion_screen/` reproduces them exactly (same 19-cut window table) and runs anywhere —
use it unless you specifically want to call DWSIM.

- `dw.py` — pythonnet wrapper; set the DWSIM folder at the top (default `%LOCALAPPDATA%\DWSIM`)
- `cutmodel.py`, `sim_cut.py`, `scan_window.py` — cut model, validation + scenarios, window scan
- `crosscheck_flash.py` — flash via real n-alkane vapour pressures (needs `pip install thermo`)
- `GroupIII_Cut_Simulation_Report.pdf`, `fig_window_map.png`, `*.md`, `*.json` — results
