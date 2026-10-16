# Lane T verdicts — technical claims (tech-A, 2026-10-16)

Sources are public only.  "Base Spec" = OCP Base Specification for Immersion Fluids Rev 1.0 (2022-12-01). "Rev 2.1" = OCP ACS Immersion Requirements (file Rev 2.1; page header reads "revision 2.0"). Page numbers are PDF page numbers, which match the printed page numbers.

| id | verdict | correct or better value | source | note |
|---|---|---|---|---|
| C05 | SUPPORTED | — | Base Spec p9; OCP Design Guidelines rev 1.01 p17; Inventec white paper p2 | Base Spec p9: single-phase coolant "stays in liquid form as it leaves the tank to a CDU". Two-phase coolant boils at about 50 °C, the vapour reaches the condenser coils and falls back as liquid. Inventec p2: single-phase needs a pump to circulate the fluid to a heat exchanger. |
| C07 | SUPPORTED | Single-phase vapour pressure < 0.8 kPa at 25 °C | Base Spec p25-26; Rev 2.1 p22 | Base Spec p26 on two-phase: "care must be taken to ensure low vapor losses". Rev 2.1 p22 lists "Loss of gasses to environment" through seal failure. The single-phase limit (< 0.8 kPa) is the basis for "low loss". |
| C09 | SUPPORTED (wording) | — | Base Spec p9; Rev 2.1 p23 | Rev 2.1 p23 requires a pressure and vacuum sensor, and a means to release out-of-bounds pressure, for 2-phase systems. Wording issue: OCP p9 still calls the two-phase tank an "open bath" with condenser coils. "Sealed" is better said as "lidded / vapour-contained". |
| C10 | PARTLY | Keep the four families (Base Spec p10). Add the Rev 2.1 caveat. | Base Spec p10; Rev 2.1 p20; Hilditch Yubase 4 SDS (2021) s.1 | The four families are confirmed. The split of "hydrocarbons" into Group I/II/III/PAO is the deck's own, not OCP's. Rev 2.1 p20 says "Mineral oils should be avoided. Only synthetic oils, synthetic esters or processed natural esters should be used." A public Group III SDS gives the recommended use as "Mineral base oil stock" (Yubase 4). So whether Group III counts as "synthetic" under Rev 2.1 is an open qualification risk. The deck should state this, not imply that Group III is clear. |
| C11 | SUPPORTED (qualify "inert") | Fluorochemical Dk 1.8-1.9 (OCP Fig 11) | 3M FC-40 MSDS (2010) s.5, s.10; Base Spec p29 Fig 11, p22; Inventec p1, p13 | FC-40 MSDS: flash point and AIT "Not Applicable"; "Material will not burn". It is stable, but above 200 °C it decomposes to HF and perfluoroisobutylene (PFIB), so "chemically inert" holds only in normal service. Fluorochemical bars in OCP Fig 11 (blue) are 1.8-1.9. Base Spec p22 gives two-phase cooling as a pool-boiling, CHF-limited figure of merit (FOM4). Inventec found its two-phase fluid IM6 the most efficient. Latent heat applies only to two-phase grades; FC-40 and Thermasolv CF2 are single-phase fluorinated fluids. |
| C16 | SUPPORTED | FOM1 = 35 (Tier 1), 45 (Tier 2) at 25 °C | Base Spec p14-16 (lead-confirmed) | Base Spec p16 evaluates properties at 25 °C and says the reference will move to 50 °C with a different spec value. The deck should state the 25 °C basis. |
| C17 | PARTLY | OCP Fig 5 non-fluoro bars: 27.3-52. Computed at 25 °C: Group III 4 cSt about 30-31; Group III 2 cSt 37; PAO 3 cSt 43; FUCHS synthetic HC 41-49. | Base Spec p16 Fig 5; CRC AVFL-37 Tables 5-8 (computed below); FUCHS RENOLIN FECC TDS (computed) | 38-51 is the upper part of the hydrocarbon spread. It drops 27.3, 29.2 and 36.4 from OCP's own chart. Mainstream 4 cSt Group III computes below Tier 1. The source is an OCP industry figure with anonymised fluids (green = "hydrocarbon based liquids along with other types"), not "academic literature". |
| C18 | SUPPORTED | FOM2 > 19 (25 °C) | Base Spec p17-18 (lead-confirmed) | OCP p18: "it is not intended to screen out any liquid based on FOM2 value". |
| C19 | PARTLY | OCP Fig 6 non-fluoro: 31.0-39.8 (most 31.9-33.2). Computed: 28.8-32.6. | Base Spec p18 Fig 6; computed below | The range is too narrow. "about 29-33" is a fairer range for hydrocarbon base oils. |
| C20 | PARTLY | Requirement: target 1.5e-2 N·s/m² (15 mPa·s) at 25 °C, met over fluid lifetime. OCP Fig 7 non-fluoro range: 5.5-55 mPa·s. | Base Spec p19-21, Fig 7; computed below | The requirement is right (OCP calls it a "target value"). The "hydrocarbon range 5.5-15" is CONTRADICTED by OCP Fig 7, where non-fluoro fluids reach 55 mPa·s (Fluid-5) and 45 mPa·s (Fluid-11). Computed 4 cSt Group III is about 29 mPa·s and 2 cSt Group III about 13 mPa·s. OCP also asks for 0 °C viscosity for pump sizing (p21). |
| C21 | SUPPORTED (add conditions) | Dk ≤ 2.3 and Df ≤ 0.05 from 20 MHz to 40 GHz, measured at 20-70 °C in 10 °C steps, over fluid lifetime | Base Spec p27-28; Rev 2.1 p17 | The Base Spec text says "less than 2.3"; its table says ≤ 2.3. Df is "informative", tied to PCIe 5/6 and 56G PAM4 I/O. Rev 2.1 p17 sets reporting only (20/40 GHz at 20/70 °C) and gives no limit. |
| C22 | SUPPORTED (add lifetime values) | Dielectric strength ≥ 6 kV/mm (lifetime, 1 mm, ASTM D1816). Volume resistivity ≥ 2.00 GΩ·m unused and ≥ 0.20 GΩ·m lifetime. | Rev 2.1 p19 (SR 4.2-1); Base Spec p27 | The two documents differ. Base Spec p27 sets resistivity > 1e11 Ω·cm (= 1 GΩ·m), dielectric strength > 6 kV/mm over lifetime. The 2.0 GΩ·m figure is Rev 2.1 only. Rev 2.1 sets no "unused" dielectric strength value (the cell is "-"). Public Group III resistivity (CRC Table 9) is about 1e14-1e15 Ω·cm at 25 °C, far above the gate. |
| C23 | SUPPORTED (method note) | Flash ≥ 150 °C closed cup (Rev 2.1). Base Spec: ≥ 155 °C (ASTM D93) for sites up to 1500 m, 150 °C at sea level. AIT ≥ 300 °C. | Rev 2.1 p18-19; Base Spec p24 | Rev 2.1 says "Cleveland Closed Cup" but cites ASTM D93 / ISO 2719, which is Pensky-Martens closed cup. Cleveland is the open-cup method (ASTM D92). The AIT limit comes from IEC 62368-1, 3rd ed. (Base Spec p24), and OCP has a liaison working on lowering it. |
| C24 | PARTLY | Mainstream Group III 4 cSt: FOM1 ≈ 30-31, FOM2 ≈ 30. Group III 2 cSt: FOM1 ≈ 37, FOM2 ≈ 29. | Computed from CRC AVFL-37; Base Spec Fig 5/6 Fluid-10 | Deck 38/31 can be reproduced only for a low-viscosity (~2-2.5 cSt at 100 °C, ν40 ≈ 10) Group III cut with cp ≈ 2.1-2.2 kJ/kg·K: sensitivity gives FOM1 37-39, FOM2 31-32. The numbers match OCP Fluid-10 (FOM1 38.0, FOM2 32.0, μ 1.5E-02), but OCP does not name that fluid. |
| C25 | PARTLY | Group III 2 cSt: 13.0 mPa·s; 3 cSt: 17.2; 4 cSt: 28.9 (25 °C, computed) | Computed from CRC AVFL-37 Tables 5-6 (ASTM D341 extrapolation) | 15.4 mPa·s is plausible for a ~2.5 cSt cut. Two problems: 15.4 is above the deck's own ≤ 15 mPa·s gate (C20), and it is far below the ~29 mPa·s of standard 4 cSt Group III. |
| C26 | PARTLY | Hydrocarbon Dk 2.0-2.3 (OCP Fig 11); PAO 2.09-2.13 (ASTM D150). Dielectric strength 8.4-23.6 kV/mm (OCP Fig 10 non-fluoro bars, converted from kV/2.54 mm); 14-24 kV/mm (FUCHS, 1 mm). | Base Spec p28-29 Figs 10-11; CPChem Synfluid flyer p2; FUCHS TDS | The deck's ranges match OCP's mixed non-fluoro bars almost exactly, not Group III data. No public Group III-specific Dk was found (UNVERIFIABLE for Group III as such). The OCP Fig 11 Dk sits on the 2.3 limit for 3 of 11 non-fluoro fluids, so 2.3 is marginal, not comfortable. |
| C27 | PARTLY | Flash (ASTM D92 COC): Yubase 4 200-230 °C; Yubase 3 < 180; Yubase 2 < 170 (Repsol TDS). Yubase 3 SDS 200 °C COC. AIT: Yubase 3 > 290 °C, Yubase 4 > 320 °C. Synthetic-HC immersion fluids: AIT > 239 to > 324 °C. | Repsol Base Oils GII-GIII TDS rev 3 (2017); Hilditch Yubase 4 SDS (2021) s.9; NextSDS Yubase 3; FUCHS TDS | Three issues. (1) ≥ 220 °C COC holds only for 4 cSt-class Group III, which fails μ ≤ 15. The low-viscosity cut behind C24/C25 is about 170-200 °C. (2) COC is open cup; the OCP gate is closed cup. Closed cup reads lower: FUCHS FECC 10 SYN is 202 °C COC vs 184 °C PMCC. (3) The 300-370 °C AIT range is not supported as stated. Public values are lower bounds (> 290, > 320), and one HC immersion fluid (FECC 7) is > 239 °C, below the 300 °C gate. "No PFAS" is true by chemistry (no fluorine). |

**Counts:**
- SUPPORTED 9: C05, C07, C09, C11, C16, C18, C21, C22, C23. Several carry wording or condition notes.
- PARTLY 8: C10, C17, C19, C20, C24, C25, C26, C27.
- CONTRADICTED 0 as whole claims. The C20 sub-range 5.5-15 mPa·s is contradicted by OCP Fig 7.
- UNVERIFIABLE 0 as whole claims. The Group III-specific Dk in C26 is unverifiable.
- OUTDATED 0.

## Computed FOMs

Definitions (Base Spec p14, p17), in SI at 25 °C: FOM1 = k·(β·cp·ρ²/(μ·k))^0.2813; FOM2 = k·(ρ·cp/k)^(1/3).

Script `techA/fom_crc.py`. Inputs are measured values from CRC Report AVFL-37 (SwRI, May 2022): Table 5 (ν40, ν100), Table 6 (ρ40, ρ60), Table 7 (k at 0/40/70 °C), Table 8 (cp at 40/70 °C).
- ρ(25) uses a linear fit through ρ40 and ρ60; β = -(dρ/dT)/ρ.
- k(25) is interpolated between 0 and 40 °C.
- cp(25) is extrapolated from the 40 and 70 °C values. The 0 °C DSC values are erratic: for 4 cSt Group III B, cp at 0 °C is higher than at 40 °C.
- ν(25) uses ASTM D341 Walther extrapolation from ν40 and ν100; μ = ν·ρ.

```
fluid                     rho25     beta    k25  cp25  nu25  mu25  FOM1  FOM2 | FOM1@cp40 FOM1@50C mu50
GrIII A 4cSt (UltraS)     828.3 7.67e-04 0.1376  1654  35.7  29.6  30.3  29.6 |  30.5   39.4  11.4
GrIII B 2cSt (Yubase)     829.0 7.90e-04 0.1282  1755  15.7  13.0  37.2  28.8 |  37.5   46.4   5.8
GrIII B 3cSt (Yubase)     826.8 7.80e-04 0.1296  1792  20.9  17.2  34.7  29.2 |  35.0   44.0   7.3
GrIII B 4cSt (Yubase)     827.8 7.67e-04 0.1373  1766  34.9  28.9  31.1  30.2 |  31.2   40.3  11.1
GrIII+ A 4cSt (GTL)       810.1 7.84e-04 0.1429  1839  31.9  25.9  33.1  31.2 |  33.3   42.3  10.3
GrIII+ B 4cSt (VHVI)      821.2 7.67e-04 0.1409  1840  34.0  27.9  32.2  31.1 |  32.4   41.5  11.0
GrIV PAO 3cSt             799.4 8.13e-04 0.1413  1840  13.0  10.4  42.6  30.9 |  42.9   51.8   4.9
GrIV PAO 5cSt             817.7 7.71e-04 0.1501  1874  45.1  36.8  31.3  32.6 |  31.4   40.4  14.0
```
Units: ρ kg/m³, β 1/K, k W/m·K, cp J/kg·K, ν cSt, μ mPa·s. The 50 °C column only illustrates OCP's planned reference change; OCP has not yet published a 50 °C spec value.

Script `techA/fom_tds.py`. Inputs from the FUCHS RENOLIN FECC public TDS: ρ, k and cp at 25 °C; ν40 and ν100. β is not on the TDS, so it is ASSUMED at 7.7e-4 1/K (the CRC median computed above).
```
RENOLIN FECC 10 SYN    nu25=16.63 cSt mu25=13.50 mPa.s FOM1= 40.7 FOM2= 32.4
RENOLIN FECC 7         nu25=12.30 cSt mu25=10.19 mPa.s FOM1= 40.8 FOM2= 29.7
RENOLIN FECC 5 SYNTH   nu25= 7.55 cSt mu25= 5.98 mPa.s FOM1= 49.3 FOM2= 31.3
sens k=0.13 cp=2100 rho=820 mu=15.4mPa.s beta=0.00077: FOM1=37.2 FOM2=30.8
sens k=0.135 cp=2200 rho=815 mu=15.4mPa.s beta=0.00077: FOM1=38.6 FOM2=32.0
sens k=0.128 cp=1755 rho=829 mu=15.4mPa.s beta=0.00077: FOM1=35.2 FOM2=28.8
```

**Reproducibility.** The deck's Group III point (FOM1 ≈ 38, FOM2 ≈ 31, μ25 ≈ 15.4) is reproducible only for a low-viscosity Group III cut (ν40 ≈ 10 cSt) with cp ≈ 2.1-2.2 kJ/kg·K. With the CRC-measured cp (≈ 1.75 kJ/kg·K), the result is FOM1 ≈ 35, FOM2 ≈ 29. Standard 4 cSt Group III does not reproduce the deck values: FOM1 ≈ 30-31 (below Tier 1), μ25 ≈ 29 mPa·s (fails the 15 mPa·s target).

Uncertainty: cp from DSC scatters by roughly ±10%, which moves FOM1 and FOM2 by roughly ±3% each. The D341 extrapolation from 40 °C down to 25 °C is standard.

## Reference list
1. Open Compute Project, Immersion Fluids work stream (2022). *Base Specification for Immersion Fluids*, Revision 1.0, Version 1.0, 1 Dec 2022. OCP Foundation. read from the published PDF OCP Base Specification for Immersion Fluids-20221201.pdf" (pp. 9-10, 13-29 used).
2. Open Compute Project, Advanced Cooling Solutions - Immersion (n.d.; file labelled Rev 2.1, header "revision 2.0"). *Open Compute Project Immersion Requirements*. OCP Foundation. read from the published PDF OCP ACS Immersion Requirements Rev 2.1.pdf" (pp. 17-23 used).
3. Open Compute Project (rev 1.01). *Design Guidelines for Immersion-Cooled IT Equipment*. OCP Foundation. read from the published PDF Design Guidelines for Immersion-Cooled IT Equipment revision 1.01.pdf" (p. 17 used).
4. Mariami, I., Lecomte, L., Dehon, C. (n.d.). *Evaluating immersion cooling fluids for data centers: a comparative study between hydrocarbon oils and fluorinated fluids*. Inventec Performance Chemicals white paper. read from the published PDF Inventec_White_Paper_Evaluating_immersion_cooling_fluids.pdf (pp. 1-3, 7, 13 used).
5. Coordinating Research Council / Southwest Research Institute (May 2022). *Thermal and Electrical Properties of Lubricants for HEV/EV Applications*, CRC Report No. AVFL-37, Final Report. https://crcao.org/wp-content/uploads/2022/05/CRC-Project-AVFL-37-Final-Report_May-2022.pdf (Tables 2, 5-9).
6. FUCHS Lubricants (accessed 2026-10-16). *Single Phase Immersion Cooling Fluids* (RENOLIN FECC 10 SYN / 7 / 5 SYNTH typical data). https://fuchs.com/us/en/single-phase-immersion-cooling-fluids
7. Chevron Phillips Chemical (2022). *Synfluid PAOs - Your Foundation for Innovation for Immersion Cooling Applications* (flyer). https://www.cpchem.com/sites/default/files/2023-01/Synfluid%20Flyer_0.pdf
8. Repsol / RLESA (Dec 2017, Review 3). *Base Oils GII-GIII* technical datasheet (YUBASE 2-8). https://www.repsol.com/content/dam/repsol-corporate/en_gb/productos-y-servicios/especialidades/base_oils_gii_giii_tcm14-19328.pdf
9. Hilditch Pty Ltd (2021-09-28, v4.0). *Safety Data Sheet - Yubase 4* (HIL0044). https://go.lupinsys.com/oilchem/harms/public/materials/3c60f4aea41698b195da1a927c977cc3-published/attachments_api/3585e3648f25dbd61a86ee3610198f75/search_api/Yubase_4-SDS.pdf
10. NextSDS (accessed 2026-10-16). *YUBASE 3 SDS* (SK Lubricants Co. Ltd.). https://nextsds.com/sds/en/281331501271244/yubase-3
11. 3M Company (2010-03-09). *Material Safety Data Sheet - FC-40 Fluorinert Brand Electronic Liquid*. Hosted at https://uwaterloo.ca/giga-to-nanoelectronics-centre/sites/default/files/uploads/files/fluorinertfc-41.pdf

Not used, could not fetch: Lubrizol CompuZol page (HTTP 403), Opteon 2P50 page (403), MDPI Lubricants 11(6):241 (403), SK Yubase slide deck. No values are taken from these.
