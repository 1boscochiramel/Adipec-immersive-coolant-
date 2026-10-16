# Claim inventory — ADIPEC 2026 deck "Meeting AI Data Center Cooling Demand with Domestic Group III Base Oil"
Source: ADIPEC 2026 deck (final of 15 Oct 2026) (12 slides, 2026-10-15).
Slide 2 card 3 now reads "Immersion cooling"; slide 9 Read-out column removed (claims kept for checking).

Lane T = tech-A, lane R = reg-B, lane M = mkt-C.

| id | slide | lane | claim as printed |
|---|---|---|---|
| C01 | 2 | R | Air cooling ≤ 25 kW per rack; fans and heat sinks, all heat to room air |
| C02 | 2 | R | Direct-to-chip / cold plate 80–150+ kW per rack; liquid removes heat from hottest chips only |
| C03 | 2 | R | Single-phase immersion 100–250+ kW per rack; full server immersed, server fans removed |
| C04 | 2 | R | AI racks are moving beyond what air can remove |
| C05 | 3 | T | Single-phase: pump moves liquid, heat leaves as sensible heat. Two-phase: fluid boils and condenses, latent heat |
| C06 | 4 | M | Single-phase hydrocarbon fluid cost target ~US$2–5/L; fluorinated liquids far higher |
| C07 | 4 | T | Single-phase fluid loss low; two-phase vapour loss needs sealed containment and make-up |
| C08 | 4 | R | Single-phase hydrocarbons: no PFAS, GWP ≈ 0; two-phase (fluorinated): PFAS exposure and regulatory headwinds |
| C09 | 4 | T | Single-phase: open bath + pump/CDU, simpler service; two-phase: sealed tank + condenser + pressure control |
| C10 | 5 | T | Four families of single-phase dielectric fluids: hydrocarbons (mineral oil Group I/II, Group III, PAO), natural esters, synthetic esters, fluorinated. (Already confirmed: OCP Base Spec 2022 p10.) Check mineral-oil caveat in OCP Rev 2.1 p20 |
| C11 | 6 | T | Fluorinated fluids: non-flammable (no flash point in normal service), chemically inert, low Dk, latent-heat (two-phase) very high heat flux |
| C12 | 6 | R | PFAS "forever chemicals" persist, can bioaccumulate, face growing regulatory pressure |
| C13 | 6 | R | EU REACH: ECHA RAC adopted restriction opinion (Mar 2026); SEAC draft supports targeted exemptions; final EU decision pending (as of Oct 2026) |
| C14 | 6 | R | Minnesota: 2025 product-category bans; broad prohibition in 2032 |
| C15 | 6 | R | Maine: phased bans from 2023/2026; broad prohibition in 2032, with exemptions |
| C16 | 7 | T | OCP FOM1 = k(β cp ρ²/(μ k))^0.2813 natural convection; Tier 1 ≥ 35 current loads, Tier 2 ≥ 45 future. (Already confirmed: OCP Base Spec p14) |
| C17 | 7 | T | Hydrocarbon base oils FOM1 38–51 "results based on academic literature" |
| C18 | 7 | T | FOM2 = k(ρ cp/k)^(1/3) forced convection; requirement > 19. (Already confirmed: Base Spec p17-18) |
| C19 | 7 | T | Hydrocarbon base oils FOM2 31–32 (academic literature) |
| C20 | 7 | T | FOM3 = dynamic viscosity; requirement ≤ 15 mPa·s; hydrocarbon range 5.5–15 mPa·s (academic literature) |
| C21 | 8 | T | Dk < 2.3; loss tangent Df ≤ 0.05 |
| C22 | 8 | T | Dielectric strength ≥ 6 kV/mm; volume resistivity ≥ 2.0 GΩ·m new |
| C23 | 8 | T | Flash point ≥ 150 °C closed cup; autoignition ≥ 300 °C |
| C24 | 9 | T | Group III FOM1 ≈ 38, FOM2 ≈ 31 |
| C25 | 9 | T | Group III μ25 ≈ 15.4 mPa·s |
| C26 | 9 | T | Group III Dk 2.0–2.3; dielectric strength 8–24 kV/mm |
| C27 | 9 | T | Group III flash ≥ 220 °C (COC, reference grade); autoignition 300–370 °C; no PFAS |
| C28 | 10 | R | Qualification stage 1: fluid characterisation against OCP fluid gates |
| C29 | 10 | R | Stage 2 accelerated ageing: fluid + seals, plastics, cables, metals at 80 °C × 336 h |
| C30 | 10 | R | Stage 3 component soak: representative server parts + functional retest at 80 °C × 14 days |
| C31 | 11 | M | Coolant intensity ≈ 10 L/kW |
| C32 | 11 | M | Identified AI pipeline to 2030 ≈ 3.9 GW |
| C33 | 11 | M | Stargate UAE 1 GW |
| C34 | 11 | M | NEOM / DataVolt 1.5 GW |
| C35 | 11 | M | Google Vizag (Visakhapatnam) ≥ 1 GW |
| C36 | 11 | M | Meta/Reliance 168 MW |
| C37 | 11 | M | CoreWeave/AdaniConneX 240 MW |
| C38 | 11 | M | Market volume ≈ 32,000 t (arithmetic: 3.9 GW × 10 L/kW × ~0.82 kg/L) |
| C39 | 11 | M | Domestic Group III target price US$2–5/L |
| C40 | 11 | M | Fluorinated benchmark US$80–200/L; ≈16× lower per litre |
| C41 | 11 | M | Market value US$80–200 million |
| C42 | 12 | R | Next-generation AI data centres push beyond practical limits of conventional air cooling |

Verdict scale: SUPPORTED · PARTLY (right direction, number or wording off) · CONTRADICTED · UNVERIFIABLE (no public source found) · OUTDATED.
