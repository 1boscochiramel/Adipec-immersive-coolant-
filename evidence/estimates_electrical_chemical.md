# Electrical and chemical property ESTIMATES: CRC AVFL-37 "Group III B, 2 cSt"

Worker: est-ele, 2026-10-16. Every value below is an **ESTIMATE**, not a measurement, unless it is marked "measured".
The sample's trade name in CRC AVFL-37 Table 2 (p11) is **Yubase** (SK). Measured inputs (CRC AVFL-37): KV40 9.435 cSt, KV100 2.547 cSt,
density 0.8192 g/mL at 40 °C and 0.8061 g/mL at 60 °C, resistivity 1.24E15 ohm·cm at 25 °C. The 20, 30, 50 and 70 °C densities
come from the linear fit in `props_crc_g3_2cst.json`.

Board gap: GAP f1dfd864. Nobody has measured n_D, Dk, Df, BDV, water saturation, TAN, oxidation stability or biodegradability on this sample. Bosco owns the lab tests.

## Summary table

| # | Property | Estimate (value, range) | Basis | Source | Confidence |
|---|---|---|---|---|---|
| 1 | Dk, 20 and 40 GHz, 20 °C | **2.14** (range 2.08 to 2.17). Expected to be the same at 20 and 40 GHz to within ±0.01 | For a nonpolar saturated hydrocarbon, Dk is about n². I applied Lorentz-Lorenz with the specific refraction of squalane (central) and n-hexadecane (upper), plus a lower case for naphthene content, to the measured density. The range also allows about 0.03 for the n_D vs n_∞ dispersion | [S1][S2][S3]; cross-checks [S4][S5][S6] | **Medium** |
| 1 | Dk, 20 and 40 GHz, 70 °C | **2.08** (range 2.02 to 2.11) | Same Lorentz-Lorenz model. Dk falls with density at about -0.0012 per K (-0.06 from 20 to 70 °C) | as above | **Medium** |
| 1 | Margin to OCP limit (≤2.3) | 0.13 to 0.2 below the limit at every temperature | OCP Fig 11 hydrocarbon-like bars read 2.0 to 2.3. EC-110 measured 2.08 at 20.5 and 39.9 GHz | [S4][S5] | Medium-high that it passes |
| 2 | Df (tan δ), 20 to 40 GHz, 20 to 70 °C | **about 5E-4** (range 1E-4 to 1E-3) | Vendor microwave data for a synthetic non-halogenated immersion coolant (EC-110, 25 °C): 5.8E-4 at 20.5 GHz and 4.6E-4 at 39.9 GHz. 50 Hz DDF of fresh GTL oil is 1.7E-3 | [S5][S6] | **Low-medium**, but very high that it is ≤0.05 |
| 3 | Dielectric strength, ASTM D1816, 1 mm, new fluid dried and filtered (<about 20 ppm water) | **about 30 kV per 1 mm = about 30 kV/mm** (range 25 to 40) | Fresh GTL and mineral transformer oils give 78 kV / 2.5 mm under IEC 60156, which is 31 kV/mm. The per-mm strength is usually equal or higher at the smaller D1816 gap, and the electrode shapes differ | [S6][S7] | **Low-medium** |
| 3 | Dielectric strength, as received (drum, 30 to 50 ppm water, undried) | **10 to 25 kV/mm** | OCP Fig 10 immersion fluids, as-used/delivered (unknown state): 21.3 to 60 kV / 2.54 mm = 8.4 to 23.6 kV/mm. Shell patent mineral oil at 38 ppm water: 66 kV / 2.5 mm = 26 kV/mm | [S4][S7] | Low |
| 3 | Margin to OCP lifetime limit (>6 kV/mm) | Large when dry. BDV depends on relative saturation (RS), not on ppm | Every published hydrocarbon bar in OCP Fig 10 is above 6 kV/mm | [S4][S8] | Medium |
| 4 | Water saturation, ASTM D1533 basis, 20 to 70 °C | **55 / 83 / 122 / 178 / 255 / 357 ppm** at 20/30/40/50/60/70 °C (mineral-oil upper bound). The true value for a fully saturated paraffinic fluid is probably **equal to or lower than this** | log10 Ws[ppm] = A - B/T[K]. Oommen A=7.42, B=1670. Griffin 7.09/1567 and Shell 7.3/1630 agree within 7 % | [S8][S9] | **Medium as an upper bound**, low as a point value |
| 5 | Acidity (TAN), new fluid, IEC 62021 / ASTM D974 | **≤0.02 mg KOH/g** (typically <0.01 to 0.02) | Fresh GTL Diala S4 ZX-I 0.018 and fresh mineral Diala S2 0.027 mg KOH/g (IEC 62021). Fresh Shell oil <0.01 (D974). New-oil limit ≤0.03 | [S6][S8][S7] | **Medium** |
| 6 | Oxidation stability, IEC 61125 C (uninhibited, 164 h, 120 °C, Cu) | **No public number found for an uninhibited Group III or light isoparaffinic oil.** The limits it would have to meet are TAN ≤1.2 mg KOH/g, sludge ≤0.8 wt %, DDF90 ≤0.500 | Only qualitative. In the Shell patent, uninhibited naphthenic/paraffinic blends passed IEC 61125 C and the unblended naphthenic oils failed. A sulphur- and aromatic-free uninhibited fluid lacks natural inhibitors, so its result cannot be inferred | [S7][S10] | **Low / unquantified (GAP)** |
| 6 | Ready biodegradability, OECD 301 | **Qualitative only: "inherently biodegradable" (20 to 60 % in 28 d) is plausible. "Readily" (≥60 %) is not established.** The SK Yubase 3 SDS and the Hilditch Yubase 4 SDS give no 301 result | Industry review says only a limited number of hydrocarbon base stocks are readily biodegradable, and that PAO and less-branched Group III do directionally better | [S11][S12][S13] | **Low (GAP)** |
| 7 | GHS classification | **Asp. Tox. 1, H304 "May be fatal if swallowed and enters airways", Danger, GHS08.** P301+P310, P331 | KV40 = 9.435 mm²/s ≤ 20.5 mm²/s, so Category 1 by the hydrocarbon criterion. Also KV40 ≤ 14, but Cat 1 takes precedence. The same-family Yubase 3 SDS uses the same classification | [S12][S13][S14] | **High** |
| 7 | Odour | "Characteristic, mineral oil", faint. Water-white liquid | Yubase 3 SDS (SK Lubricants) and Yubase 4 SDS (Hilditch) | [S12][S13] | Medium-high |

## Task 1: dielectric constant per temperature (20 and 40 GHz)

Method: Clausius-Mossotti / Lorentz-Lorenz with constant specific refraction r. (Dk-1)/(Dk+2) = r·ρ(T).
Analogue r values use Sigma-Aldrich literature constants. n-hexadecane n20/D 1.434 with 0.773 g/mL at 25 °C gives r = 0.3355 cm³/g.
Squalane (C30 isoparaffin) n20/D 1.452 with 0.81 g/mL at 25 °C gives r = 0.3317 cm³/g. Both densities were moved to 20 °C with the
candidate's measured slope of 6.55E-4 g/mL/K. The low case (r = 0.330) is a judgement allowance for the cycloparaffin
content suggested by the candidate's density (0.832 g/mL at 20 °C, above squalane's 0.813). It is not a measured value.

Microwave Dk is lower than n_D² by about the optical dispersion, roughly 0.02 to 0.03. That is folded into the stated ranges, not subtracted from the central value.

| T (°C) | ρ (g/mL) | Dk low (r=0.330) | **Dk central (squalane r)** | Dk high (hexadecane r) | implied n_D (central) | OCP limit |
|---|---|---|---|---|---|---|
| 20 | 0.8322 | 2.136 | **2.144** | 2.162 | 1.464 | ≤2.3 |
| 30 | 0.8257 | 2.124 | **2.132** | 2.149 | 1.460 | ≤2.3 |
| 40 | 0.8192 (measured) | 2.111 | **2.119** | 2.137 | 1.456 | ≤2.3 |
| 50 | 0.8127 | 2.099 | **2.107** | 2.125 | 1.452 | ≤2.3 |
| 60 | 0.8061 (measured) | 2.087 | **2.095** | 2.112 | 1.447 | ≤2.3 |
| 70 | 0.7996 | 2.075 | **2.083** | 2.100 | 1.443 | ≤2.3 |

The same values apply at 20 GHz and 40 GHz. A nonpolar saturated hydrocarbon has no relaxation in this band. EC-110 measured 2.08 at both 20.5 and 39.9 GHz [S5], and OCP reports "no big change from 20GHz to 40GHz" [S4, p28].

Cross-checks:
- **OCP Fig 11 [S4 p29].** The non-fluorinated (green) fluid bars read 2.0 to 2.3. Fig 12 shows one fluid at 23 °C reading 1.90 to 2.07 across 0 to 40 GHz. That scatter of about ±0.08 is the noise of the N1501A probe method.
- **EC-110 [S5], 25 °C.** Dk was 2.08 from 20.5 to 39.9 GHz and 2.30 at 60 Hz. The 60 Hz value implies a small polar component, so this vendor fluid is not a pure hydrocarbon analogue.
- **Badawi 2024 [S6], 50 Hz.** Fresh GTL Diala S4 ZX-I gave εr 1.899 and mineral Diala S2 gave 2.02. The GTL value is below n² for any C15+ alkane (≥2.05), which points to cell calibration. It was not used for the estimate.
- **Temperature sign.** For hydrocarbons, Dk falls with temperature because density falls. OCP's remark that FC-40 rises by 0.1 to 0.2 from 25 to 50 °C [S4 p28] is about a perfluorinated fluid and should not be carried over.
- **Not found.** The Chevron Phillips PAO "Dk 2.09 to 2.13, ASTM D150" flyer could not be retrieved. The cpchem.com TDS URL returned a JavaScript wall, and the 2024 Synfluid brochure [S15] is qualitative only. **That figure is NOT used and NOT verified.**

## Task 4: water saturation per temperature

Equation from Du et al. 2001 eq (1): log10 Ws[ppm] = A − B/T[K]. Table 1 gives Oommen A=7.42, B=1670; Griffin 7.09, 1567; Shell 7.3, 1630 [S8]. The Griffin constants also appear in US 10962520 B2 [S9].

| T (°C) | Oommen | Griffin | Shell | **Estimate for this fluid** |
|---|---|---|---|---|
| 20 | 52.9 | 55.5 | 54.9 | **≤55 ppm** |
| 30 | 81.5 | 83.4 | 83.8 | **≤83** |
| 40 | 122.2 | 121.9 | 124.4 | **≤123** |
| 50 | 178.7 | 174.1 | 180.3 | **≤178** |
| 60 | 255.4 | 243.5 | 255.5 | **≤255** |
| 70 | 357.5 | 333.8 | 354.7 | **≤357** |

My computed values reproduce Du Table 2 (Oommen row: 53, 82, 122, 179, 255, 358).

Du measured fresh Shell Diala AX at 35 °C at **102 ppm** [S8]. The equation gives 100 to 102 ppm at 35 °C, so the equation holds for new naphthenic mineral oil.

Why these are upper bounds: Du et al. cite Golovan et al. (1984) that hydrocarbon composition and polar impurities raise hygroscopicity, and aromatics are the more water-soluble class. A sulphur- and aromatic-free isoparaffinic fluid should therefore sit at or below these curves. No public measurement for Group III or GTL was found, so the reduction is **unquantified** (gap; owner Bosco: run D1533 KF on oil equilibrated at 100 % RH, or use Du's RH-slope method).

What this means for BDV: BDV follows relative saturation, RS = W/Ws(T). For example, 20 ppm is 38 % RS at 20 °C but only 6 % at 70 °C. A cold tank wall is therefore the worst case for free water and BDV.

## Task 3: dielectric strength unit conversions and gap effect

| Data point | kV | gap | kV/mm (average field) |
|---|---|---|---|
| GTL Diala S4 ZX-I fresh, IEC 60156, 50 % probability, 16.5 ppm water [S6] | 78.0 | 2.5 mm | 31.2 |
| Same, 10 % probability [S6] | 59.6 | 2.5 mm | 23.8 |
| Mineral Diala S2 fresh, 50 %, 26.4 ppm water [S6] | 78.5 | 2.5 mm | 31.4 |
| Shell US 7682499 Product A, as delivered (38 mg/kg water) [S7] | 66 | 2.5 mm | 26.4 |
| Shell US 7682499 Product A, after treatment [S7] | >90 | 2.5 mm | >36 |
| OCP Fig 10 lowest (Fluid-11) [S4] | 21.3 | 2.54 mm | 8.4 |
| OCP Fig 10 highest (Fluid-12) [S4] | 60.0 | 2.54 mm | 23.6 |
| OCP lifetime limit [S4] | 15.2 | 2.54 mm | 6.0 |

- **Gap non-linearity.** Breakdown voltage is not proportional to gap; average breakdown field rises as the gap shrinks. A 1 mm D1816 value in kV/mm is therefore usually **≥** the 2.5 mm IEC 60156 value in kV/mm. Dividing a 2.5 mm result by 2.5 gives a conservative per-mm figure. Multiplying a 1 mm D1816 result by 2.5 to predict an IEC 60156 result overstates it. The electrode geometry also differs (D1816 VDE spherical-cap electrodes; IEC 60156 mushroom/sphere). I found no public paired D1816/IEC 60156 dataset, so I have not applied a numeric correction (low confidence).
- **Estimate.** New, dried and filtered fluid: D1816 1 mm about 30 kV (25 to 40 kV/mm). Undried drum fluid: 10 to 25 kV/mm.
- **Moisture and particles dominate**, through RS (see Task 4), and dominate over the base-oil chemistry. Badawi reports almost the same BDV for fresh GTL and mineral oil (78 vs 78.5 kV) [S6].

## Tasks 2, 5, 6, 7: notes

- **Df.** The Badawi 2024 50 Hz table gives fresh GTL Cp 6.35E-11 F, Rp 2.9E10 ohm, DDF 0.001727. Mineral oil gives DDF 0.0010355 [S6].
  The candidate's measured 25 °C resistivity of 1.24E15 ohm·cm implies a conduction-loss term at 20 GHz of
  σ/(ωε0ε′) ≈ (8.1E-14 S/m)/(2π·2E10·8.854E-12·2.14) ≈ 3E-14, which is negligible. Any GHz loss would come from trace polar species, not ionic conduction. 5E-4 is a conservative central value. OCP Fig 12 suggests the N1501A probe cannot resolve Df at this level, so a resonant-cavity method is needed to measure it.
- **TAN.** No public TDS for Yubase 2 TAN was retrieved. The estimate rests on unadditised, hydroprocessed electrical-oil analogues.
- **Oxidation, IEC 61125.** The limits come from US 7682499 B2 (Shell, uninhibited mineral insulating oil) [S7]. Since IEC 61125:2018, test duration and limits are set by the product standard, IEC 60296 [S10]. **No measured value exists for this class of fluid in the public sources I found; I have not estimated a number.**
- **Biodegradability.** Lubes'n'Greases (2017) [S11] gives the thresholds: inherent is 20 to 60 % CO2 in 28 d, ready is ≥60 %, and "only a limited number of hydrocarbon base stocks" are ready. Both SDSs have empty or "No information available" ecology sections [S12][S13]. **Qualitative only.**
- **GHS.** The CLP Annex I 3.10.2 Category 1 criterion reads "hydrocarbon and has a kinematic viscosity of 20,5 mm2/s or less, measured at 40 °C" [S14]. The candidate's KV40 is 9.435.

## Script and output

Script: `scripts_ele/est_ele.py`
Run: `python` -X utf8 -I scripts_ele/est_ele.py props_crc_g3_2cst.json` (from `adipec_est/`)
Output: `scripts_ele/est_ele_output.txt`

```
n-hexadecane                 n20=1.434 rho20=0.7763 n^2=2.0564 r=0.3355 cm3/g
squalane (C30 isoparaffin)   n20=1.452 rho20=0.8133 n^2=2.1083 r=0.3317 cm3/g

T_C  rho     low (naphthe  central (squ  high (hexade   n_D(central)
 20  0.8322         2.136         2.144         2.162   1.4642
 30  0.8257         2.124         2.132         2.149   1.4600
 40  0.8192         2.111         2.119         2.137   1.4558
 50  0.8127         2.099         2.107         2.125   1.4516
 60  0.8061         2.087         2.095         2.112   1.4474
 70  0.7996         2.075         2.083         2.100   1.4432
dDk 20->70 C (central) = -0.061  (-0.00122 per K)

T_C    Oommen   Griffin     Shell
 20      52.9      55.5      54.9
 25      65.9      68.3      68.1
 30      81.5      83.4      83.8
 35     100.1     101.1     102.4
 40     122.2     121.9     124.4
 50     178.7     174.1     180.3
 60     255.4     243.5     255.5
 70     357.5     333.8     354.7

BDV conversions (average field, kV/mm):
  GTL Diala S4 ZX-I fresh, IEC60156 2.5mm, 50%    78.0 kV / 2.5 mm =  31.2 kV/mm
  GTL same, 10% prob                              59.6 kV / 2.5 mm =  23.8 kV/mm
  Mineral Diala S2 fresh 50%                      78.5 kV / 2.5 mm =  31.4 kV/mm
  OCP Fig10 min (Fluid-11)                        21.3 kV / 2.54 mm =   8.4 kV/mm
  OCP Fig10 median-ish 40                         40.0 kV / 2.54 mm =  15.7 kV/mm
  OCP Fig10 max (Fluid-12)                        60.0 kV / 2.54 mm =  23.6 kV/mm
  OCP limit 6 kV/mm on 2.54 mm                    15.2 kV / 2.54 mm =   6.0 kV/mm
  Shell US7682499 Product A as delivered          66.0 kV / 2.5 mm =  26.4 kV/mm
  Shell US7682499 after treatment                 90.0 kV / 2.5 mm =  36.0 kV/mm
```

## Open gaps (for CONTEXT_GAPS register)

1. Measured n_D20 (ASTM D1218) of the actual cut. One refractometer reading would pin the Dk table to about ±0.01.
2. GHz Dk/Df (cavity or N1501A) at 20 to 70 °C.
3. Measured water saturation of the actual fluid. The paraffinic reduction against mineral-oil curves is unquantified.
4. IEC 61125 C, uninhibited, on the actual fluid. There is no public analogue number.
5. OECD 301B/F on the actual fluid. Only qualitative information is available.
6. A paired D1816 (1 mm) vs IEC 60156 (2.5 mm) dataset for the gap correction.
7. The Chevron Phillips "PAO Dk 2.09 to 2.13 by D150" figure from the brief was not retrieved, so it remains unverified.

## References (all were fetched or read this session; the quotes are short)

- [S1] Sigma-Aldrich, Squalane product page 85630 (also 234311, Y0000185): n20/D 1.452 (lit.), density 0.81 g/mL at 25 °C (lit.). https://www.sigmaaldrich.com/product/aldrich/85630. *Values from the search-result extract.*
- [S2] Sigma-Aldrich, Hexadecane product pages 296317 / H6703 / 52209: n20/D 1.434 (lit.), 0.773 g/mL at 25 °C (lit.). https://www.sigmaaldrich.com/US/en/product/sial/h6703. *Values from the search-result extract.*
- [S3] CRC Report AVFL-37 (local `crc_avfl37.pdf`): Table 2 p11 (Group III B 2 cSt = Yubase), Table 5 p15 (KV), Table 6 p16 (density), p24 (resistivity 1.24E15 at 25 °C).
- [S4] OCP, *Base Specification for Immersion Fluids* Rev 1.0, 2022-12-01 (local PDF): p27 §5.12 limits; p28 Fig 10 BDV; p29 Fig 11 Dk and Fig 12 Dk vs frequency.
- [S5] D. W. Sundin, Engineered Fluids, "ElectroCool Dielectric Coolants: High Frequency Electrical Characteristics", Nov 2024 (vendor). https://www.engineeredfluids.com/wp-content/uploads/2026/06/ElectroCool-EC-110-High-Frequency-Electrical-Characteristics.pdf
- [S6] M. Badawi et al., "On Highlighting the Merits of Gas-to-Liquid Transformer Oil Under Accelerated Thermal Aging and Faults", *IEEE Access* 12:93372, 2024, DOI 10.1109/ACCESS.2024.3420230 (CC BY). Fig 6 / §III BDV, Tables 2 and 3, §III-C moisture and acidity. https://acris.aalto.fi/ws/portalfiles/portal/153300408/
- [S7] S. A. Holmes, R. W. Dever (Shell Oil Co.), US 7682499 B2, "Mineral insulating oil...", granted 2010-03-23. https://patents.google.com/patent/US7682499B2/en
- [S8] Y. Du, A. V. Mamishev, B. C. Lesieutre, M. Zahn, S. H. Kang, "Moisture Solubility for Differently Conditioned Transformer Oils", *IEEE TDEI* 8(5):805-811, 2001, DOI 10.1109/94.959706. Table 1, Table 2, Table 4, Table 6. https://minds.wisc.edu/items/8f4cda0f-97d1-4e68-ba56-d7def6ef7bae
- [S9] US 10962520 B2, "Method and device for determining and/or monitoring the breakdown voltage of a transformer oil", Formula 4: log S0 = −1567/K + 7.0895. https://patents.google.com/patent/US10962520B2/en
- [S10] IEC 61125:2018 catalogue abstract: the duration is defined in product standards (IEC 60296 etc.). https://standards.globalspec.com/std/10266631/iec-61125. *Abstract only.*
- [S11] Lubes'n'Greases, "BASE OIL REPORT: Biodegradation in Base Oils", 2017-02-16. https://lubesngreases.com/?p=75589
- [S12] SK Lubricants, YUBASE 3 SDS as listed by NextSDS: Asp. Tox. 1 H304, odour "Characteristic, mineral oil", CAS 64742-55-8. https://nextsds.com/sds/en/281331501271244/yubase-3
- [S13] Hilditch Pty Ltd, Yubase 4 SDS HIL0044 v4.0, issued 2021-09-28: H304; odour "Characteristic"; persistence "No information available". https://go.lupinsys.com/oilchem/harms/public/materials/3c60f4aea41698b195da1a927c977cc3-published/attachments_api/3585e3648f25dbd61a86ee3610198f75/search_api/Yubase_4-SDS.pdf
- [S14] EU CLP Regulation (EC) 1272/2008, Annex I 3.10.2 (implements UN GHS ch. 3.10), via reachonline. https://reachonline.eu/clp/en/annex-i-3-3.10-3.10.2.html
- [S15] Chevron Phillips Chemical, Synfluid PAO brochure "Extreme Performance" 2024 (qualitative, no electrical numbers). https://www.cpchem.com/sites/default/files/2024-04/Synfluid%20Bro_ExtremePerformance.pdf 
