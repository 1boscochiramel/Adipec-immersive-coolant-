# Group III Base Oil as a Single-Phase Immersion Coolant — Interactive Simulator

### ▶ [Launch the simulator](https://1boscochiramel.github.io/Adipec-immersive-coolant-/)  ·  [Crash course](https://1boscochiramel.github.io/Adipec-immersive-coolant-/course.html)

Best on a phone: scan the QR on the slide.

Companion to the ADIPEC 2026 talk **"Meeting AI Data Center Cooling Demand with Domestic Group III Base Oil"**
by B. Chiramel. AI racks are moving past what air can cool; fluorinated immersion fluids face PFAS
restrictions. This tool shows how a refinery-made Group III base oil screens against the Open Compute
Project (OCP) immersion-fluid requirements, what is still to be tested, and how large the market could be.

## What you can do

1. **The story**: a 12-step guided walk through the talk, with quick check questions.
2. **Sandbox**:
   - rack power → which cooling architecture fits (air / direct-to-chip / immersion);
   - a live **requirement scorecard** against the OCP gates (FOM1, FOM2, viscosity, Dk, Df, dielectric strength, resistivity, flash point, autoignition). Load the Group III values from the slides or enter your own measurements;
   - the **viscosity lever**: how a lighter cut moves FOM1 toward Tier 2, and why flash point limits it;
   - **market sizing**: AI pipeline (GW) × coolant intensity (L/kW) → litres, tonnes and value.
3. **Where we came from**: cooling eras, the move away from fluorinated fluids, and the qualification road.
4. **Tough Q&A**: the hard questions, answered and tagged.
5. **Crash course** (`course.html`): 18 lessons from "every watt becomes heat" to defending the case.

## How the numbers work

Every value is tagged:

- **DECK**: printed on the ADIPEC 2026 slides (OCP limits, Group III read-outs, PFAS status, roadmap, market inputs);
- **CALC**: computed in the page from deck numbers (e.g. FOM1 ∝ μ<sup>−0.2813</sup> with other properties fixed; 3.9 GW × 10 L/kW × 0.82 kg/L);
- **STD**: textbook physics and standard definitions (API base-oil groups, flash-point methods).

Group III values are literature and reference-grade figures. **No laboratory measurement of a
production coolant is shown, and nothing here is a qualified product.** The page is static HTML/JS and
runs entirely in the browser.

## Files

| File | Purpose |
| --- | --- |
| `index.html`, `app.js`, `story.js`, `style.css` | simulator |
| `course.html`, `course.js` | crash course |

## Run locally

```bash
python -m http.server 8000
```

then open http://localhost:8000.
