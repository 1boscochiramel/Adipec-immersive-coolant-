# Contributing

## Most wanted: measured data on narrow base-oil cuts
The model's weakest point is the light tail of real cuts. One measured data set improves it for everyone.
Add a row to `data/contributions/measured_cuts.csv` (copy the template below) and open a pull request.
Public or releasable data only; give a source (lab report, TDS, paper) for every value.

| column | unit | method |
|---|---|---|
| name, source | text | where the data comes from |
| simdis_0.5, simdis_5, simdis_10, simdis_30, simdis_50, simdis_70, simdis_90, simdis_95, simdis_99.5 | °C | ASTM D2887 / D7213 |
| sg15 | – | ASTM D4052 |
| kv40, kv100 | cSt | ASTM D445 |
| flash_cc | °C | ASTM D93 (Pensky-Martens) |
| flash_coc | °C | ASTM D92 |
| autoignition | °C | ASTM E659 |
| dk_20GHz_20C, df_20GHz_20C | – | any GHz method (state it) |
| breakdown_kV_mm | kV/mm | ASTM D1816 (gap stated) |

Each new row automatically becomes a validation case: we compare the model's flash and viscosity with yours.

## Code
- Keep `immersion_screen` dependency-free (standard library only).
- Every new correlation needs a citation in its docstring and a test.
- Run `python -m pytest -q` before opening a pull request.
