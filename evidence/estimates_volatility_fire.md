# Volatility and fire-safety ESTIMATES: CRC AVFL-37 "Group III B, 2 cSt" (Yubase)

Agent est-vol, 2026-10-16. **Everything below is an ESTIMATE built from public analogue data and correlations. None of it is a measurement of this fluid.**
Measured anchors for the candidate (CRC AVFL-37 Table 5/6): KV40 9.435 cSt, KV100 2.547 cSt, density 0.8192 g/mL at 40 °C. Producer TDS (Repsol GII-GIII rev 3, 2017, "Yubase 2"): D92 flash "< 170", pour "< -42", S "< 1 ppm", VI "> 90", KV100 2.15–2.50. CRC AVFL-37 itself has no distillation, flash, AIT or volatility data (all 31 pages checked).

## Context gaps (on the board as GAP c0b377ba)
- No SimDis (D2887/D6352/D7213), D93, E659, D2879 or D5800 data for the actual cut. Every row below depends on analogues. OWNER: Bosco (lab).
- **Producer-TDS conflict (author-gated, not reconciled):** Repsol lists Yubase 2 COC flash as "< 170" and Yubase 3 as "< 180". An SK Corporation paper (2000) gives YUBASE-3 COC **196 °C**, which a literal "< 180" would exclude, so the "<" may be a typo for ">" or may stand for something else. Repsol also lists Yubase 2 KV40 as "12 (t)", the same as Yubase 3, while CRC measured 9.435. Treat the Repsol flash entry as unresolved and ask SK/Repsol.
- Nothing fetched gives a measured AIT for a light *mineral* Group III oil. The AIT row rests on GTL and PAO analogues.

## Summary table

| Property | Estimate (best; range) | Basis | Source(s) | Confidence |
|---|---|---|---|---|
| Carbon-number range (n-paraffin-equivalent, SimDis) | **C20–C26** for 5–95 % (T50 ≈ C22–C23); allow **C18–C28** because a mineral cut is broader | Log-KV100 interpolation between two hydroisomerised FT light base oils with D6352 SimDis (FT-D KV100 1.768; FT-A KV100 2.806). Our KV100 is 2.547 (w = 0.79). The FT-A curve shape is shifted to the interpolated T50, and SimDis temperatures are mapped to n-paraffin Tb (NIST). | [12], [16] | medium (range), low (exact ends) |
| Boiling range (SimDis basis) | IBP(0.5 %) ≈ 337, T5 ≈ 346, **T10 ≈ 351 (330–355)**, **T50 ≈ 377 (360–385)**, T90 ≈ 402 (395–410), T95 ≈ 407, FBP ≈ 415 °C | Same interpolation (script §1). A naphthene-bearing Group III (ρ15 ≈ 0.83 vs 0.805 for GTL) probably boils 5–15 °C lower at equal viscosity, so the ranges are skewed low. | [12], [2], [7] | medium-low |
| Closed-cup flash, D93 PMCC | **≈ 175 °C (155–190)** | (a) Analogues: Shell Diala S4 ZX-I (GTL, KV40 9.6) PM 191 typical, 184 in a 2024 CoA; mineral transformer oil (KV40 8.7) PMCC 150. (b) Riazi-Daubert / Alqaheem-Riazi / Satyanarayana-Rao with T10 330–360 °C give 131–164 °C. These were fitted on fuel fractions and read low next to the analogues, so treat them as a floor. The VP + LFL (Le Chatelier) method gives 178–211 °C. (c) COC − PMCC offset of about 10 °C applied to the COC estimate (185). | [8], [9], [13], script §2b | medium-low |
| Open-cup flash, D92 COC (context) | ≈ 185 °C (170–200) | PAO 2.5 (KV40 8.3) 178; S5 X GTL (KV40 9.8) 200; YUBASE-3 (KV40 12.3) 196; ADbase 3 cSt spec min 170; mineral transformer oil (8.7) 160 | [4], [7], [10], [11], [9] | medium |
| COC − PMCC offset | **+10 °C (5–20)** | Paired values on one sheet: mineral transformer oil 160 vs 150. GTL family: S5 X COC 200 vs Diala S4 ZX-I PM 184–191 (different products, so indicative only). | [9], [7], [8] | medium |
| Fire point, D92 | **≈ 205 °C (190–220)**, i.e. COC + ~20 °C | Paired fire − flash (COC): PAO 2 +19 (159/178) and +22 (155/177); S5 X +20 (200/220); XOM 3152 +31 (157/188); mineral transformer oil +10 (160/170); PAO 4 +33; PAO 6 +34 | [3], [5], [7], [6], [9] | medium |
| Autoignition temperature, E659 | **≈ 330 °C (270–360)**. Clearing the OCP ≥ 300 °C gate is *probable but not demonstrated*. | GTL isoparaffin S5 X (KV40 9.8): 355 °C on the TDS (method printed "ASTM D659", presumably E659), "> 320 °C" on the SDS. PAO 5 cSt SDS: 351 °C. n-alkanes plateau near 200 °C (n-hexadecane 202 °C HSDB; n-C10 and n-C12 200 °C). Highly branched isooctane is 410 °C. A dewaxed Group III is mostly lightly branched (mono-/di-methyl) isoparaffins plus naphthenes, so its AIT should sit well above the n-alkane floor. No fetched AIT exists for a light mineral Group III. | [7], [14], [15], [17] | **low**. Safety-critical: measure E659 before claiming the gate. |
| Vapour pressure, 20–70 °C | **≈ 2×10⁻⁴ Pa at 20 °C to 0.09 Pa at 70 °C** (best); light-tail case up to 0.4 Pa at 70 °C; see table below | Raoult sum over 20 SimDis slices. Pure-component Clausius-Clapeyron with ΔHvap(T) linear between the 298 K values (NIST/Chickos, fitted vs Tb) and Kistiakowsky at Tb. Validated against HSDB liquid data within a factor of 0.6–1.6. | [15], [16], script §5 | medium for order of magnitude, low for exact value |
| VP at 50 °C vs OCP 0.8 kPa | ≈ 0.01 Pa (best) to 0.05 Pa (light case), about 10⁴–10⁵ times below 0.8 kPa | as above | script §5 | high that it is far below 0.8 kPa |
| Noack, D5800 (250 °C, 1 h) | **≈ 55 wt% (40–65)** | FT light oils interpolated to KV100 2.547 give 44 wt%. Mineral oils run more volatile than FT oils at equal KV100: YUBASE-3 (KV100 3.1) is 40.0 % vs FT-C (KV100 3.081) 27.2 %, ×1.47, which suggests about 65 %. | [12], [10] | low-medium |
| Evaporation at service temperature | negligible (VP ≤ 0.1 Pa at ≤ 70 °C) | Noack is a 250 °C test, so it says little about losses at a 50–70 °C bath. Long-term top-up will be driven by drag-out and leaks, not evaporation. | script §5 | medium |

## Vapour pressure per temperature (ESTIMATE, Pa)

| T (°C) | Best (T50 377 °C, FT-A shape) | Light case (T50 −10 °C, front end −20 °C) | Heavy case (T50 +5 °C) | Comment |
|---|---|---|---|---|
| 20 | 1.8×10⁻⁴ | 1.6×10⁻³ | 1.1×10⁻⁴ | Shell S5 X SDS: "< 0,5 Pa (20 °C)", estimated |
| 30 | 7.5×10⁻⁴ | 5.6×10⁻³ | 4.6×10⁻⁴ | |
| 40 | 2.9×10⁻³ | 1.8×10⁻² | 1.8×10⁻³ | |
| 50 | 9.9×10⁻³ | 5.4×10⁻² | 6.5×10⁻³ | OCP note 0.8 kPa = 800 Pa |
| 60 | 3.1×10⁻² | 0.15 | 2.1×10⁻² | |
| 70 | 9.1×10⁻² | 0.39 | 6.3×10⁻² | |

(Equivalent: 0.01 Pa = 1×10⁻⁵ kPa.) Model uncertainty is roughly a factor of 2 on the pure components (validation below), plus the unknown light tail of the real cut. An isoteniscope (D2879) result would probably come back as "below the method's range", but that range was not checked here.

## Method notes
- **Why the correlations read low:** Riazi-Daubert and Alqaheem-Riazi take an ASTM D86 10 % point. I fed SimDis T10, and no SD→D86 conversion was applied (no source fetched for it). The correlations were fitted largely on fuels. Diala S4 ZX-I (GTL, KV40 9.6, similar distillation class) measures 184–191 °C PM, which is 30–45 °C above the correlation output. So the correlation output (131–164 °C) is a conservative floor, not the best estimate.
- **Riazi-Daubert form used:** 1/T_F = −0.014568 + 2.84947/T10 + 1.903×10⁻³ ln T10 (°R). Rannaveski & Listak (2018) Table 1 prints the Rankine form with a factor 0.556. In the script, rewriting in Kelvin gives constant −0.024209 and ln coefficient 3.4254×10⁻³, which is the form usually quoted. The 1.903×10⁻³ ln coefficient equals their printed 1.057×10⁻³/0.556. I read their printed minus sign on the ln term as a typesetting issue, but did not verify that against the 1987 original.
- **VP-LFL flash:** closed-cup flash ≈ the temperature where Σ xᵢpᵢ/p_LFL = 1. LFL was taken as 0.5–1.0 vol% (S5 X SDS gives "typical 1 %(V)" LEL). This method also depends on the assumed SimDis front end.

## Scripts and output

Script: `est_vol_calc.py` (run with `python` -X utf8 -I est_vol_calc.py`). Output saved verbatim in `est_vol_calc_output.txt`:

```
[1] interpolation weight w=0.790; T50(FT-D)=340.6 C, T50(FT-A)=386.1 C
[1] estimated T50 (SimDis, our KV100 2.547) = 376.6 C
[1] shifted-FT-A SimDis (C): T0.5=337, T5=346, T10=351, T30=364, T50=377, T70=388, T90=402, T95=407
[1] n-paraffin-equivalent carbon no.: T5->C20.2, T10->C20.6, T50->C22.7, T90->C25.0, T95->C25.6

[2b] flash correlations (input = 10 % boiling point; ASTM D86 basis in the originals)
   T10=330 C: Riazi-Daubert  135.8 C | Alqaheem-Riazi  143.0 C | Satyanarayana-Rao  131.0 C
   T10=340 C: Riazi-Daubert  139.3 C | Alqaheem-Riazi  149.9 C | Satyanarayana-Rao  134.6 C
   T10=351 C: Riazi-Daubert  142.9 C | Alqaheem-Riazi  157.5 C | Satyanarayana-Rao  138.4 C
   T10=360 C: Riazi-Daubert  145.7 C | Alqaheem-Riazi  163.7 C | Satyanarayana-Rao  141.5 C
   unit check: Kelvin-rewrite const = -0.024209, ln-coef = 3.425400e-03; TF=142.9 C (same as above)

[5] dHvap298 = 0.4658*Tb + -183.5 kJ/mol (fit C18-C24)
[5] validation of pure-component model vs HSDB/PubChem (liquid data):
   octadecane   25.0 C: model 0.0267 Pa vs obs 0.0455 Pa
   hexacosane  125.1 C: model 0.715 Pa vs obs 1 Pa
   hexacosane  158.8 C: model 10.3 Pa vs obs 10 Pa
   hexacosane  200.1 C: model 135 Pa vs obs 100 Pa
   hexacosane  252.1 C: model 1.56e+03 Pa vs obs 1e+03 Pa

[5] mixture vapour pressure (Raoult, 20 slices):
   best (T50 377 C, FT-A shape)            0.000176  0.000747   0.00285   0.00986    0.0313    0.0914  Pa @ 20..70 C
   light (T50-10 C, front end -20 C)        0.00156   0.00555    0.0181    0.0541      0.15      0.39  Pa @ 20..70 C
   heavy (T50+5 C)                         0.000105  0.000462   0.00182   0.00645    0.0209    0.0626  Pa @ 20..70 C

[2b'] closed-cup flash from VP: T where sum(x_i p_i / p_LFL) = 1, LFL 0.5-1.0 vol%
   best (T50 377 C, FT-A shape)           LFL 0.50%: 191 C | LFL 0.75%: 200 C | LFL 1.00%: 207 C
   light (T50-10 C, front end -20 C)      LFL 0.50%: 178 C | LFL 0.75%: 187 C | LFL 1.00%: 193 C
   heavy (T50+5 C)                         LFL 0.50%: 195 C | LFL 0.75%: 204 C | LFL 1.00%: 211 C

[6] Noack (log-KV interpolation FT-D 82.13% @1.768 -> FT-A 34.32% @2.806): 44.3 wt%
```

## Key analogue data (as read)

| Fluid | KV40 / KV100 (cSt) | Flash | Fire | AIT | Other | Ref |
|---|---|---|---|---|---|---|
| CPChem Synfluid PAO 2 cSt (TDS 2011) | 5.1 / 1.7 | COC 159 | COC 178 | — | SG 0.7981 | [3] |
| CPChem PAO 2 (immersion flyer 2022) | 5.03 / 1.71 | D92 155 | D92 177 | — | | [5] |
| CPChem PAO 2.5 (C12-based, brochure 2024) | 8.3 / 2.4 | COC 178 | — | — | SG 0.807 | [4] |
| CPChem PAO 4 (brochure) | 16.8 / 3.85 | COC 217 | (flyer 252) | — | Noack 13.3 % | [4], [5] |
| CPChem PAO 5 cSt (SDS 2025) | — | COC 246–271 | — | **351** | bp > 260 | [14] |
| XOM Data Center Immersion Fluid 3152 (PAO, 2026) | 5.0 / 1.7 | D92 157 | D92 188 | — | | [6] |
| Shell Immersion Cooling Fluid S5 X (GTL) | **9.8** / — | ISO 2592 (COC) 200 | D92 220 | **355** (TDS); > 320 (SDS) | VP < 0.5 Pa @20 °C (est.); LEL 1 %, UEL 10 %; CAS 1262661-88-0 "C18-50 branched and linear" | [7] |
| Shell Diala S4 ZX-I (GTL transformer oil) | **9.6** (TDS), 9.75 (CoA) | PM (ISO 2719) 191 typ., 184 CoA | — | — | ρ20 805 | [8] |
| Conventional mineral transformer oil (Shell MIDEL guide) | 8.7 / 2.6 | PMCC 150, COC 160 | 170 | — | | [9] |
| YUBASE-3 (SK Corp., 2000) | 12.3 / 3.1 | COC 196 | — | — | Noack 40.0 % | [10] |
| ADbase 3 cSt (Group II) spec | — / 2.9–3.1 | COC min 170 | — | — | | [11] |
| FT-A light FT base oil (US7846880B2) | 10.00 / 2.806 | — | — | — | Noack 34.32 %; D6352 TBP °F 5/50/95 = 672/727/782 | [12] |
| FT-D light FT base oil (US7846880B2) | — / 1.768 | — | — | — | Noack 82.13 %; TBP °F 5/50/95 = 443/645/702 | [12] |

## References (all fetched and read this session unless marked)
1. CRC Report AVFL-37, base-oil property study (SwRI), local file `crc_avfl37.pdf`, Tables 2, 5, 6.
2. Repsol, "GII-GIII base oils" TDS rev 3 (2017), local file `repsol_gii_giii.pdf`, Yubase 2/3 columns.
3. Chevron Phillips, Synfluid PAO 2 cSt Typical Properties (Apr 2011). https://www.cpchem.com/sites/default/files/2020-04/Synfluid%2520PAO%25202%2520cSt_0_0.pdf
4. Chevron Phillips, "Synfluid PAOs: Designed for Extreme Performance" brochure (2024-04). https://www.cpchem.com/sites/default/files/2024-04/Synfluid%20Bro_ExtremePerformance.pdf
5. Chevron Phillips, "Synfluid PAOs for Immersion Cooling Applications" flyer (©2022). https://www.cpchem.com/sites/default/files/2023-01/Synfluid%20Flyer_0.pdf
6. ExxonMobil, Data Center Immersion Fluid 3152 product datasheet (rev 02/12/2026). https://www.exxonmobilchemical.com/en/chemicals/webapi/dps/v1/datasheets/150000104833/0/en
7. Shell, Immersion Cooling Fluid S5 X TDS v1.5 (2021) and SDS v1.4 (rev 10.06.2021). https://industrialfluidsmfg.twinoils.com/Asset/Shell%20Immersion%20Cooling%20Fluid%20S5%20X.pdf ; https://industrialfluidsmfg.twinoils.com/Asset/Shell%20Immersion%20Cooling%20Fluid%20S5%20X%20SDS.PDF
8. Shell, Diala S4 ZX-I TDS v3.2 (22.08.2014), https://storage.mtender.gov.md/get/bca888bd-c00b-40c1-8efd-107c3b86af6f-1716792504986 ; Certificate of Analysis batch 12365522 (Aug 2024), https://storage.mtender.gov.md/get/ed756629-bdbd-4deb-b352-c94b9275d2b3-1749907902494
9. Shell, MIDEL Selection Guide (US, July 2025), "conventional mineral oil" column. https://www.shell.us/business/fuels-and-lubricants/lubricants-for-business/products/midel/_jcr_content/root/main/section/call_to_action_copy/links/item1.stream/1756978073275/bb4ee4b3dfab496bfc8485dfaf98ad5f1be14630/midel-selection-guide-us.pdf
10. W.-S. Moon, Y.-R. Cho, J.-S. Chun (SK Corporation), "Application of High Quality (Group II, III) Base Oils to Specialty Lubricants", 6th Fuels & Lubes Asia Conf., Singapore, 28 Jan 2000, slide 10. https://www.slideshare.net/slideshow/yubase-apps/33826604
11. ADNOC, ADbase 3cSt (Group II) Product Specification no. 8230. https://adnoc.ae/-/media/Files/AD-Base-docs/ADbase-3cSt.ashx
12. Chevron USA, US 7,846,880 B2 "Light base oil fraction and lubricant having low wt% Noack volatility", Tables II and IV. https://patents.google.com/patent/US7846880B2/en
13. R. Rannaveski, M. Listak, "Flash points of gasoline from Kukersite oil shale: prediction from vapor pressure", Agronomy Research 16(S1), 1218–1227 (2018), Table 1 (correlation forms). https://agronomy.emu.ee/wp-content/uploads/2018/03/Vol16S1_31.pdf
14. Chevron Phillips, Synfluid PAO 5 cSt SDS v1.14 (2025-10-22). https://www.cpchem.com/sites/default/files/2025-11/02303746.pdf
15. PubChem (HSDB records): n-hexadecane AIT 202 °C and VP; octadecane, eicosane, docosane, tetracosane VP; hexacosane VP curve. Retrieved via https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/<CID>/JSON?heading=Autoignition+Temperature (and ...Vapor+Pressure), CIDs 11006, 11635, 8222, 12405, 12592, 12407.
16. NIST Chemistry WebBook phase-change pages (Tb, ΔvapH° Chickos CGC, Antoine): octadecane C593453, eicosane C112958, docosane C629970, tetracosane C646311, hexacosane C630013, squalane C111013. https://webbook.nist.gov/cgi/cbook.cgi?ID=C112958&Units=SI&Mask=4 (etc.)
17. The Engineering ToolBox (2017), "Hydrocarbons – Autoignition Temperatures and Flash Points" (secondary compilation, no primary source named). https://www.engineeringtoolbox.com/flash-point-autoignition-temperature-kindling-hydrocarbons-alkane-alkene-d_1941.html
- Seen in search snippet only, NOT read (HTTP 403): Redd et al., "A study of unexpected autoignition temperature trends for pure n-alkanes", Fuel (2021), https://www.sciencedirect.com/science/article/abs/pii/S001623612101591X. It was not used for any number.
