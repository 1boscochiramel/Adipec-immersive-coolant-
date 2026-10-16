# Verifier trace: estimates_vol.md / estimates_ele.md (verif-est, 2026-10-16)

## Task 1: Yubase 2 open-cup flash
Repsol rev 3 (2017) Y2 "<170", Y3 "<180" confirmed by me in repsol_gii_giii.pdf (Flash row, ASTM D92).
Other sources found (all fetched and read by me):
| Source | Says |
|---|---|
| SK Lubricants YUBASE 2 SDS via NextSDS https://nextsds.com/sds/en/281331501271740/yubase-2 | Flash 160 C (Cleveland open cup), KV40 8.6 cSt, AIT >260 C, bp 230-500 C, rel. density 0.833, VP <0.01 kPa |
| SK Lubricants YUBASE 3 SDS via NextSDS https://nextsds.com/sds/en/281331501271244/yubase-3 | COC 200 C, AIT >290, KV40 12, bp 290-400 |
| SK MSDS YUB300 (2013) Yubase 3, https://oxychemicals.com.vn/wp-content/uploads/2020/05/SK-Lubricants_MSDS_YUBASE-3-English.pdf | COC 200 C, AIT >290, bp 290-440 |
| Hilditch YUBASE3.pdf https://www.hilditch.com.au/wp-content/uploads/2020/02/YUBASE3.pdf | Y3 flash >190, AIT 280-371 |
| SK Corp 2000 deck, slideshare yubase-apps (slide 10) | YUBASE-3 (KV40 12.3) COC 196 |
| Hilditch SDS HIL0042 "Yubase 3" v5.0 (lupinsys link) | flash 160, SG 0.833, bp 230-500: Y2-like data under a Y3 label (distributor SDS mix-up) |
| ADNOC ADbase 2cSt (Group II) spec 8222, https://www.adnoc.ae/-/media/adnoc-v2/files/our-products/adnoc-base-oil-spec-group-ii--group-iii.ashx | COC min 155 (KV100 2.1-2.3); analogue only, Group II |
No SK Enmove product page or TDS with a flash number was reachable (skenmove.com base_oil page has no data; eng.skenmove.com and yubase.com returned nothing).

Conclusion:
- Y3 "<180": most likely an error (3 independent SK-derived sources give 196-200, none below 190). Confidence medium-high.
- Y2 "<170": most likely GENUINE, not a typo for ">". SK's own SDS gives 160 COC, consistent with "<170". Confidence medium (one SDS via an aggregator, issue date not seen; an SDS value could be a nominal/min figure). A reading of ">170" is contradicted by the 160.
- Repsol Y2 KV40 "12 (t)" is a copy of Y3 (SK SDS 8.6).
- Consequence: estimates_vol.md D92 COC "~185 (170-200)" and PMCC "~175" look 15-25 C high for the Yubase-2 class. The CRC sample is slightly heavier than nominal Y2 (KV40 9.435 vs 8.6; KV100 2.547 vs 2.15-2.50), so COC ~165-180 is more defensible. Fire point 205 and the Le Chatelier route inherit this. The est-vol "conflict" note should be re-worded: Y3 entry erroneous, Y2 entry corroborated.

## Task 2: trace table (sources opened by me)
| # | Claim | Label | Location / note |
|---|---|---|---|
| 1 | Diala S4 ZX-I PM 191 typ, KV40 9.6, rho20 805; CoA 184, KV40 9.75 | HIT | TDS v3.2 properties table; CoA batch 12365522 (mtender URLs refetched) |
| 2 | Shell S5 X COC 200, fire 220, KV40 9.8, AIT 355 ("ASTM D659"), SDS AIT >320, VP <0.5 Pa est, LEL 1 % | HIT | TDS refetched; SDS section 9 read from worker's local copy (URL now Cloudflare-blocked for me). TDS also lists rel. permittivity 2.02 (IEC 60247), BDV 42 kV: unused by est-ele |
| 3 | PAO 2.5 COC 178, KV40 8.3, SG 0.807 | HIT | CPChem 2024 brochure, 2.5 cSt column |
| 3b | PAO 2: COC 159 / fire 178, 5.1/1.7 | HIT | PAO 2 TDS |
| 4 | US7846880B2 FT-A 10.00/2.806, Noack 34.32, TBP F 5/50/95 = 672/727/782; FT-D 1.768, Noack 82.13, 443/645/702 | HIT | Tables II and IV, Google Patents refetched. Note FT-D 0.5 % point is 148 F (long light tail) |
| 5 | n-hexadecane AIT 202 C | HIT | PubChem CID 11006 AIT: 396 F (202 C), NTP 1992 (also 401 F listed) |
| 6 | Mineral transformer oil PMCC 150, COC 160, fire 170, KV40 8.7 / KV100 2.6 | HIT | MIDEL selection guide, mineral column |
| 7 | Oommen log10 ppm = 7.42 - 1670/T; Table 2 53/82/122/179/255/358; Diala AX 102 ppm @35 C | HIT | Du 2001 Table 1, 2, 6 (page images viewed). PARTIAL on the ele summary row, see below |
| 8 | EC-110 Dk 2.08 at 20.5/39.9 GHz; Df 5.83/4.59 E-4 | HIT | Sundin Nov 2024, worker's local PDF (URL now 403). Same deck: Dk 2.30 at 60 Hz, "Debye-like relaxation 2.3 to 2.06", i.e. not flat in band |
| 9 | CRC KV40 9.435, KV100 2.547, rho 0.8192/0.8061, resistivity 1.24E15 | HIT | crc_avfl37.pdf pp15, 16, 24 |
| 10 | Badawi 78 kV /2.5 mm GTL; Sigma n20 squalane 1.452 / hexadecane 1.434; OCP limits | NOT CHECKED | ran out of budget; not counted as verified |
Hit rate: 9 HIT of 9 checked (0 UNREACHABLE by label; 2 sources read only via worker copies). 3 sampled items unchecked (Badawi, Sigma, OCP figures): coverage 9/12.

## Prose and consistency findings
- est-ele water-saturation summary row (55/83/122/178/255/357, "Oommen") matches neither Oommen (53/82/122/179/255/358) nor its own later table (123 at 40 C): mixed Griffin/Oommen, truncated. Within 5 %, but labelled wrongly.
- est-ele says a hydrocarbon has "no relaxation in this band"; its own analogue (EC-110) shows Dk falling 2.17 to 2.06 over 5-49 GHz. Unproven assumption.
- est-ele Dk 2.14 (20 C) ignores Shell S5 X relative permittivity 2.02 (50 Hz class value for a lighter GTL), which points lower.
- est-vol "light case" front end only -20 C; patent FT-D shows a 0.5 %/5 % spread of 295 F.
- est-vol statement "all fetched and read" for references: Redd et al. correctly disclosed as unread.

## Task 3: scripts
est_vol_calc.py and scripts_ele/est_ele.py rerun with venv python -X utf8 -I: diff against saved outputs is empty for both. Printed values match the tables (T50 376.6, flash 131-164 C, VP 1.76E-4..9.14E-2 Pa, Dk 2.144..2.083, Oommen 52.9..357.5). Not verified: physical correctness of correlations (not re-derived).

## Would not put in a spec sheet, even labelled ESTIMATE
1. AIT ~330 C (no Group III mineral datum; safety gate).
2. D92 COC 185 / D93 PMCC 175 / fire point 205 (above the Y2 SDS 160; use "measure").
3. Noack 55 wt % (range 40-65).
4. Vapour pressure values (2E-4 Pa @20 C etc.): factor-2 model plus unknown light tail; quote only "<< 0.8 kPa".
5. Df 5E-4 (borrowed from a different, unidentified fluid).
6. D1816 30 kV/mm (no paired-gap data).
7. Water saturation as point ppm values (upper bound only); carbon-number end points.
