# immersion-screen — open screening of hydrocarbon immersion coolants against OCP requirements

**Can a refinery base-oil cut work as a single-phase immersion coolant for AI data centres?**
This repository gives you a laptop-runnable answer from public data — and the tools to test your own oil.

- ▶ **[Interactive simulator](https://1boscochiramel.github.io/Adipec-immersive-coolant-/)** · **[Crash course](https://1boscochiramel.github.io/Adipec-immersive-coolant-/course.html)** · **[Simulation results & spec sheets](https://1boscochiramel.github.io/Adipec-immersive-coolant-/results.html)**
- 🐍 **`immersion_screen`** — a dependency-free Python toolkit (Python ≥ 3.9, standard library only)
- 📊 **Open data** — measured base-oil properties, fire-safety analogues, OCP limits, filled OCP spec sheets
- 🔎 **Evidence** — claim-by-claim source checks behind every number

Companion to the ADIPEC 2026 talk *Meeting AI Data Center Cooling Demand with Domestic Group III Base Oil* (B. Chiramel).

## Main finding

| Cut (n-paraffin equivalent) | μ at 25 °C (limit 15 mPa·s) | FOM1 (Tier 1 ≥ 35) | Closed-cup flash (gate 150 °C) | Verdict |
|---|---|---|---|---|
| Wide 2 cSt Group III as sold | 13.0 (measured) | 37.2 (measured) | ≈ 150 (from 160 °C open cup) | flash marginal |
| 4 cSt Group III (≈ C25–C35) | 28.9 (measured) | 31.1 (measured) | 200–230 open cup | fails viscosity and Tier 1 |
| **Narrow cut C21–C25** | **13.6** (simulated) | **36.8** | **163–189** (simulated) | **meets all three, with margin** |
| Wide cut with only the light tail removed | 16.6 (simulated) | — | ≈ 168–190 | fails viscosity |

A narrow cut has to be trimmed at **both** ends: the light tail for flash point, the heavy end for viscosity.
These are simulations from public data — closed-cup flash (ASTM D93), autoignition (E659), Dk/Df and dielectric strength still need measurement.

## Quick start

```bash
git clone https://github.com/1boscochiramel/Adipec-immersive-coolant-.git
cd Adipec-immersive-coolant-
python -m immersion_screen measured          # OCP FOMs of measured Group III / GTL / PAO base oils
python -m immersion_screen narrow C21 C25    # simulate a narrow cut
python -m immersion_screen window            # scan the design window
python -m immersion_screen cut --tbp 5:360,50:385,95:410 --sg 0.836   # your own boiling curve
python -m pytest -q                          # 43 validation tests (pip install pytest)
```

Optional install: `pip install -e .` gives the `immersion-screen` command.

**Bring your own data:** put your simulated distillation (ASTM D2887) and SG15 into `examples/02_simulate_your_cut.py`;
fill OCP's spec-list template for your fluid with `examples/04_fill_ocp_speclist.py`.

## What is inside

| Path | Contents |
|---|---|
| `immersion_screen/correlations.py` | Riazi–Daubert, Lee–Kesler, Abbott, Refutas, ASTM D341, Le Chatelier flash — reproduce DWSIM 9.0.5 within 3×10⁻⁵ (tested) |
| `immersion_screen/ocp.py` | OCP FOM1/FOM2/FOM3 and the fluid gates, each with its document and page |
| `immersion_screen/cut.py` | boiling curve → pseudo-components → viscosity, density, FOM1, closed-cup flash |
| `immersion_screen/window.py` | design-window scan over narrow cuts |
| `immersion_screen/measured.py` | screen measured base oils at any temperature |
| `immersion_screen/speclist.py` | fill the OCP *Fluids Speclist Rev 2.1* template (keeps its dropdowns and formatting) |
| `data/` | CRC AVFL-37 measured properties, fire-safety analogues with sources, OCP limits, OCP template, two filled spec sheets |
| `simulation/` | the original DWSIM-driven model (Windows + DWSIM 9.0.5), report PDF, figure and results |
| `evidence/` | claim checks, verdicts with sources, estimates and independent source traces |
| `tests/` | validation: DWSIM grid, pure-compound flash points, measured FOMs, window, spec-sheet round trip |
| `index.html`, `results.html`, `course.html` | the website |

## How the model was validated

| Check | Model | Reference |
|---|---|---|
| Correlations vs DWSIM 9.0.5 (32-point grid) | ≤ 3×10⁻⁵ relative | DWSIM PropertyMethods |
| n-Hexadecane / squalane closed-cup flash | 128 / 218 °C | 127 / 210 °C |
| CRC 2 cSt Group III μ at 25 °C | 13.3 → 13.04 calibrated | 13.04 mPa·s measured |
| Narrow-cut GTL fluid (KV40 9.6) flash | 189 °C | 184–191 °C closed cup |
| Wide 2 cSt cut flash | 172 °C | ≈ 150 °C closed cup → sets the conservative −22 °C offset |

## Limits — read before using a number
- Flash point carries a ~20 °C band set by the unknown light tail; only ASTM D93 decides.
- Viscosity is calibrated to one measured Group III oil (±5–10 % model uncertainty).
- Carbon numbers are n-paraffin-equivalent by boiling point; isoparaffins and naphthenes shift properties.
- Autoignition, Dk/Df and dielectric strength are not simulated (literature estimates are in `evidence/`).
- Market figures on the slides are headline announced capacity, first fill only.

## Contributing
The most valuable contribution is **measured data on real narrow cuts** — see [CONTRIBUTING.md](CONTRIBUTING.md).
Issues and pull requests that add data, validation cases or better correlations are welcome.

## Licence and citation
Code: MIT. Data, figures and text: CC BY 4.0. Third-party material keeps its terms (see [LICENSE](LICENSE)).
Please cite using [CITATION.cff](CITATION.cff).
