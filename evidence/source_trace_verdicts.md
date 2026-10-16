# Source-trace report (verif-1), 2026-10-16

| # | file | claim | cited source | my check | label | note |
|---|---|---|---|---|---|---|
| 1 | T C24 | OCP Fluid-10: FOM1 38.0, FOM2 32.0, mu 1.5E-02 | Base Spec Fig 5/6/7 p16/18/20 | Rendered pages: Fluid-10 = 38.0 / 32.0 / 1.5E-02 | HIT | OCP does not say Fluid-10 is Group III. Deck FOM2 31 matches Fluid-11 (31.0), not Fluid-10 (32.0) |
| 2 | T C17 | Green FOM1 range 27.3-52 (not 38-51) | Base Spec p16 | Bars read: 27.3, 29.2, 36.4 ... 52 | HIT | green = "hydrocarbon based liquids along with other types" (p16 text) |
| 3 | T C20 | Fig 7 non-fluoro up to 55 mPa.s (Fluid-5), 45 (Fluid-11); target 1.5e-2 | Base Spec p20 | Fig 7: 5.5E-02, 4.5E-02; text "target value of 1.5 x 10-2 N-s/m2" | HIT | lowest non-fluoro label (Fluid-9) is overprinted, reads 3.5E-03 or 5.5E-03; the worker's "5.5" low end is not resolvable by me |
| 4 | T C22 | Resistivity >=2.00 GOhm.m unused / >=0.20 lifetime (Rev 2.1); Base Spec >1e11 ohm.cm; dielectric strength >=6 kV/mm | Rev 2.1 p19 SR 4.2-1; Base Spec p27 | Both pages read; table matches. 1e11 ohm.cm = 1e9 ohm.m = 1 GOhm.m | HIT | unused dielectric cell is "-" as stated |
| 5 | T C23 | Flash >=150 C "Cleveland Closed Cup" citing ASTM D93/ISO 2719; Base Spec 155/150; AIT 300 | Rev 2.1 p18-19; Base Spec p24 | Rev 2.1 literally "Flash point (Cleveland Closed Cup) ASTM D 93 / ISO 2719"; Base p24 "155 ... ASTM D93 Closed cup ... lowered to 150"; AIT 300 per IEC 62368-1 | HIT | worker's method note is right (D93 = Pensky-Martens; Cleveland is D92 open cup, which Rev 2.1 itself lists for fire point) |
| 6 | T C27 | Repsol TDS: Yubase 4 flash 200-230, Yubase 3 <180, Yubase 2 <170 (D92) | Repsol GII-GIII TDS rev 3 | Table read directly | HIT | Yubase 2: 12 cSt at 40 C, 2.15-2.50 at 100 C |
| 7 | R C30 | OCP v1.5 p16: 80+-2 C, 14 days, ~0.8 L, recommended | v1.5 June 2026 p16 | Read p16: "recommended ... Heat soak temperature 80C +/-2C; duration 14 days; ~0.8 L" | HIT | two-phase differs (Soxhlet) |
| 8 | R C14 | Minnesota 2032 ban + 11 categories + electronic/internal exemption | revisor.mn.gov 116.943 subd 5 | Fetched myself. (a) 11 categories from 1 Jan 2025 correct; (d) from 1 Jan 2032 any product unless CUU rule, correct | PARTIAL | The electronic/internal-components exemption is subd 5(b) and by its text applies to paragraph (a), the 2025 list only. Paragraph (d) (2032) has no such exemption. The worker's sentence "PFAS only in electronic or internal components is exempt", placed after the 2032 sentence, overstates scope |
| 9 | R C13 | ECHA RAC final 2 Mar 2026, SEAC draft 10 Mar 2026 | echa.europa.eu NR/26/17 | HTTP 403 to curl and WebFetch (WAF); hot-topics page also 403 | UNREACHABLE | not independently checked; worker says it read it in a browser pane |
| 10 | R C08 | FC-40/PFTBA GWP100 ~7,100 | Univ. Toronto release 9 Dec 2013 | Fetched: "a single molecule of PFTBA has the equivalent climate impact as 7,100 molecules of CO2" over 100 years | PARTIAL | source covers perfluorotributylamine (PFTBA) only and never mentions FC-40. FC-40 = PFTBA is an inference needing a 3M composition cite. 2013 value, not an IPCC assessment value |
| 11 | R C08 | 3M completed exit from PFAS manufacturing end-2025 | 3M operations-innovation page | Page timed out (WebFetch twice, curl no file). Found only the 3M news item 2022-12-20 "3M to Exit PFAS Manufacturing by the End of 2025" | UNREACHABLE | the forward-looking pledge is confirmed; "completed" is not verified by me |
| 12 | M C36 | Meta 168 MW Jamnagar, Reliance builds, Meta leases, 9 Jun 2026 | about.fb.com 2026/06 | Fetched: "first phase will deliver 168 MW of capacity, with an option to scale"; Reliance builds, Meta leases; 9 Jun 2026 | HIT | 168 MW is the first phase |
| 13 | M C37 | CoreWeave 240 MW Taloja, 3x80 MW, +240 option, 6 Oct 2026, first phase mid-2028 | coreweave.com | Fetched: all matched | HIT | IT vs facility load unspecified (agree) |
| 14 | M C33 | Stargate UAE 1 GW within 5 GW campus, first 200 MW in 2026 | Intelligent CIO ME 23 May 2025 | Fetched: matched | HIT | secondary trade press |
| 15 | M C31 | Submer EVO800 1,187 L / 100-140 kW = 8.5-11.9 L/kW | Submer datasheet Rev.01 | Local PDF: "Max SmartCoolant capacity 1187 L"; "Up to 100 kWa or 50 kWa; Up to 140 kWb or 70 kWb fully redundant" | PARTIAL | the 8.5-11.9 range uses the non-redundant rating; the fully redundant rating (50/70 kW) gives 17-24 L/kW. The verdict omits this, so the 8-12 L/kW basis is the optimistic end |
| 16 | M venue_FIPI | FIPI Journal articles ~1,750-3,900 words | fj.pdf (Vol 25 Iss 2) | PyMuPDF page word counts: ESP article pp6-12 = 3,765; seismic pp13-18 = 2,473; pipeline pp20-27 = 2,738 (includes headers and captions) | HIT | within the claimed range; I did not count all seven; "no author guidelines" is an absence claim I cannot prove |

Sampled 16 (T 6, R 5, M 5). HIT 11, PARTIAL 3 (#8, #10, #15), UNREACHABLE 2 (#9, #11), MISS 0.
Hit rate = HIT/(sampled - UNREACHABLE) = 11/14 = 79%. HIT+PARTIAL = 14/14.

## FOM recomputation, GrIII B 2 cSt (Yubase), own script (verif1/fom.py)
Inputs: CRC AVFL-37 Table 5 nu40 9.435, nu100 2.547; Table 6 rho40 0.8192, rho60 0.8061 (linear to 25 C); Table 7 k 0 C 0.1312 ("run 2"), 40 C 0.1264 (linear to 25 C); Table 8 cp 40 C 1.802, 70 C 1.896 (linear extrapolation to 25 C). D341 Walther extrapolation.
rho25 829.0 kg/m3, beta 7.90e-4 /K, k25 0.1282, cp25 1755 J/kg.K, nu25 15.73 cSt, mu25 13.04 mPa.s.
FOM1 = 37.2 (37.5 if cp = cp40), FOM2 = 28.8 (29.1). Identical to the worker's 37.2 / 28.8 / 13.0.
Consequence: the deck's 38 / 31 / 15.4 is not reproduced by any CRC Group III row. FOM1 is within ~1; FOM2 31 is ~2 above; mu 15.4 is 18% above 13.0. It matches OCP anonymous Fluid-10 (38.0 / 32.0 / 15 mPa.s) only approximately.

## Claims I would NOT let into a publication as written
1. That the "electronic/internal components" exemption covers the Minnesota 2032 ban (subd 5(b) is scoped to the 2025 paragraph (a) list). (#8)
2. "FC-40 GWP ~7,100" attributed to the Toronto 2013 paper: it covers PFTBA only. (#10)
3. "3M completed its exit end-2025": unverified by me. Use "announced exit by end of 2025 (3M, 20 Dec 2022)" unless the 3M page is opened. (#11)
4. Submer 8-12 L/kW without stating the non-redundant rating; fully redundant gives 17-24 L/kW. (#15)
5. Deck Group III "38 / 31 / 15.4" presented as a measured or literature Group III value; it fits only OCP anonymous Fluid-10 or a hypothetical 2-2.5 cSt cut. (#1, FOM recomputation)
6. ECHA dates (#9): not reproduced by me (403); treat as worker-reported until checked in a browser.

Not checked by me: C01-C04, C10, C11, C15, C16, C19, C21, C25, C26, C28, C29, C32, C34, C35, C38-C41, C06, C39, C40, the venue recommendation (IEW 2027 dates).
