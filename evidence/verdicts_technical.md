# Technical basis and open questions

DECK values and conditions are inventoried in deck_claims.md.

Public reference: CRC AVFL-37 (May 2022), Tables 5–9:
https://crcao.org/wp-content/uploads/2022/05/CRC-Project-AVFL-37-Final-Report_May-2022.pdf

CALC: immersion_screen.measured extrapolates viscosity with ASTM D341, fits density linearly, interpolates conductivity and extrapolates specific heat to 25 °C. It computes OCP FOM1/FOM2 from those properties. These are computed screening values, not direct convection measurements.

The reference 2 cSt Group III gives the DECK screening values FOM1 37.2, FOM2 28.8 and μ25 13.0 mPa·s. It clears Tier 1 but misses Tier 2. Standard heavier grades are evaluated separately in the toolkit.

CALC: reference resistivity 1.24 × 10^15 Ω·cm = 12,400 GΩ·m. This does not prove target-cut resistivity, dielectric strength or GHz performance.

STD: FOM1 = k × (β cp ρ²/(μ k))^0.2813; FOM2 = k × (ρ cp/k)^(1/3). Properties use SI units. Holding all else constant, FOM1 scales as μ^-0.2813. Changing temperature changes multiple properties; no future OCP qualification is inferred.

Public standards context: OCP Base Specification for Immersion Fluids (December 2022), pp. 14–29; OCP Immersion Requirements Rev 2.1, pp. 17–20. API categories describe base-oil composition and viscosity index, not immersion qualification. OCP guidance also discusses acceptable fluid families; the category label alone does not establish compliance.

Open: Tier 2 miss; target-cut closed-cup flash (ASTM D93); autoignition (ASTM E659); Dk/Df at both stated frequencies and temperatures; dielectric strength; chemical stability and materials compatibility; pilot operation under load.

The untraced literature-range preset and course line were removed. Target flash 163–189 °C is a DECK model estimate, not a measurement. Public analogue bounds remain supporting context in public_sources.md and data/fire_safety_analogues.csv.
