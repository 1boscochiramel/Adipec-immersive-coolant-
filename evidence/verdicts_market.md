# Lane M verdicts — market and price claims (C06, C31–C41)

Worker: mkt-C. Date checked: 2026-10-16. Public sources only; 
"Fetched" = page retrieved and read this session. "Index only" = text seen only in a search-engine
snippet because the page itself was blocked (403 / bot-check); treated as weaker evidence.

| id | verdict | correct or better value | source (URL + date) | note |
|---|---|---|---|---|
| C06 | PARTLY | Hydrocarbon single-phase fluid: published range ≈ 20–100 RMB/L (≈ US$2.8–14/L) for GRC ElectroSafe; fluorinated (Novec) 200–1500 RMB/L (≈ US$28–210/L). "Far higher" for fluorinated is supported; "US$2–5/L" is the bottom of the published hydrocarbon range, not the typical price. | [R9] STET Review 79:41 (2024), table "Immersion coolant prices" (index only); [R10] Argus 2026-04-06 | No public bulk distributor list price for any immersion hydrocarbon fluid was found. US$2–5/L is defensible as a cost *target* for a domestic Group III product (commodity base oil ≈ US$1.3–1.5/L in Apr 2026), not as a market price. RMB→USD at an assumed 7.1 (not sourced). |
| C31 | PARTLY | 8–25 L/kW (datasheet range); ≈ 8–12 L/kW for high-density tanks rated on chilled or cool water; 16–25 L/kW for warm-water ratings and small tanks. | [R6] Submer SmartPod EVO800 OCP datasheet Rev.01 (opencompute.org, 2026-07); [R7] Vertiv CoolCenter Immersion brochure; [R8] BAC ICT engineering data 2025-04-08 | Submer: 1,187 L max / 100–140 kW = 8.5–11.9 (≈ 7.8–10.9 after IT displacement of 2.5 L/U × 39 OU). Vertiv: 24U 550 L / 50 kW (chilled) = 11, /25 kW (35 °C water) = 22; 42U 950 L and 52U 1,180 L at 60–120 kW per tank = 7.9–19.7. BAC: 750 L / 30 kW = 25. 10 L/kW sits at the low, high-density end. GRC datasheet PDFs return 404; the Intel 12U brief gives only the CDU fill (19.6–48 L), not the tank volume. |
| C32 | PARTLY | Sum of announced headline capacities = 3.908 GW (ME 2.5, India 1.408). Correct as arithmetic. Not established as "to 2030", and not established as IT load. | Sum of C33–C37 sources | None of the five announcements says whether MW is IT or facility (utility) load; read them as headline campus/data-centre capacity. Phasing: Stargate UAE first 200 MW in 2026; NEOM phase 1 by 2028 (1.5 GW is the full campus, with no full-build date); CoreWeave first phase mid-2028; Google 2026–2030. So the full 3.9 GW by 2030 is not supported. The volume also assumes 100 % single-phase immersion; the announcements do not say which cooling method any site will use. |
| C33 | SUPPORTED | 1 GW Stargate UAE cluster inside the 5 GW UAE–US AI Campus, Abu Dhabi; first 200 MW expected 2026. G42 builds; OpenAI + Oracle operate; NVIDIA GB300; Cisco, SoftBank partners. | [R1] Intelligent CIO ME, 2025-05-23 (fetched) | The OpenAI primary page returned 403. Use "1 GW (of a 5 GW campus)". |
| C34 | SUPPORTED | Up to 1.5 GW net-zero AI campus at Oxagon, NEOM; phase 1 backed by an initial US$5 bn, operational target 2028. Announced at LEAP 2025. | [R2] Middle East AI News, 2025-02-10 (fetched) | 1.5 GW is the full campus. The phase-1 MW is not disclosed. An Aug-2026 AGBI report (index only; 403) says groundbreaking was still 2–3 months away. Data Centre Review (index only) questions whether the US$5 bn is new money. Status: planned, not under construction. |
| C35 | SUPPORTED | Google AI hub in Visakhapatnam: US$15 bn over 2026–2030; "gigawatt-scale" (1 GW data-centre campus in most coverage); AdaniConneX is the ecosystem/DC partner; Airtel (Nxtra) handles fibre, a cable landing station and a DC. MoU signed 2025-10-14. | [R3] Infrastructure Today, 2025-10-14 (fetched); [R4] The South First, 2025-10-14 (fetched) | The official Google blog URL I tried returned 404. Write "≈1 GW" rather than "≥1 GW": no source says more than 1 GW. Groundbreaking 2026-04-28 (index only). |
| C36 | SUPPORTED (relabel) | Reliance builds a 168 MW AI-ready data centre at Jamnagar, Gujarat, and **Meta leases it** (option to scale). Announced 2026-06-09. Renewable power; cooled with desalinated seawater. | [R5] Meta Newsroom, about.fb.com, 2026-06-09 (fetched) | Misattribution risk: this is a lease/built-to-suit deal, **not** the Aug-2025 Reliance–Meta AI JV (Reliance Enterprise Intelligence Ltd, ₹855 cr, enterprise AI software, with no MW). The deck should say "Meta lease of Reliance Jamnagar DC, 168 MW". |
| C37 | SUPPORTED | CoreWeave: 240 MW at AdaniConneX's Taloja campus, Navi Mumbai (3 × 80 MW buildings, sole tenant), with an option for +240 MW (480 MW total). First phase mid-2028. Announced 2026-10-06/07. | [R11] CoreWeave press release, coreweave.com, 2026-10-06 (fetched) | Correct partner. Very recent (10 days old). The release does not say whether 240 MW is IT or facility load. |
| C38 | SUPPORTED (arithmetic) / PARTLY (inputs) | 3.908 GW × 10 L/kW = 39.1 ML; × 0.82 kg/L = 32,046 t (≈ 32,000 t ✓). Across the datasheet range 8–25 L/kW: 31–98 ML, ≈ 26,000–80,000 t. | Python, below | This is a one-time first fill, not an annual market. It assumes all 3.9 GW is single-phase immersion and is all built by 2030; neither is supported (see C32). |
| C39 | UNVERIFIABLE (target) | No public price exists for a "domestic Group III immersion fluid". Context: Asia Group III fob 4/6 cSt US$1,750/t and 8 cSt US$1,600/t (week ending 2026-04-03, a record high) ≈ US$1.31–1.45/L. Undated pre-2026 L&G range US$1,020–1,080/t ≈ US$0.85–0.90/L. | [R10] Argus, 2026-04-06 (fetched); [R12] Lubes'n'Greases Asia report (index only, undated) | A US$2–5/L target implies a ≈ 1.4–3.8× markup over 2026 commodity base oil (≈ 2.2–5.9× over pre-2026). That is plausible for an additised, dried and filtered product, but it is a business assumption, not a fact. Platts launched Group III FOB Asia assessments on 2 Sep (subscriber note; levels paywalled). |
| C40 | PARTLY | Published fluorinated range: Novec 200–1500 RMB/L ≈ US$28–210/L (STET, index only); small-pack lab list prices are far higher (FC-40 1 kg US$613 ≈ US$1,130/L; Sigma 100 mL US$216 ≈ US$2,160/L, index only). The ratio to US$2–5/L is 16× (80/5) to 100× (200/2); midpoint ratio 40×. | [R9]; [R13] ChemicalBook FC-40 price page (fetched, undated); [R14] Sigma-Aldrich F9755 (index only) | US$80–200/L is a reasonable bulk benchmark but is not directly published as such. "≈16× lower" is the most conservative pairing only; state "16–100× (≈40× at midpoints)". No public bulk price for Opteon immersion fluids was found. |
| C41 | SUPPORTED (arithmetic) / PARTLY (inputs) | 39.1 ML × US$2–5/L = US$78–195 M (≈ US$80–200 M ✓). Range across 8–25 L/kW: US$63–488 M. The same volume at fluorinated US$80–200/L = US$3.1–7.8 bn. | Python, below | Same caveats as C38: a one-time fill, a 100 % immersion share, and full build-out by 2030 are all assumed. |

Verdict counts: SUPPORTED 5 (C33, C34, C35, C36 relabel, C37); SUPPORTED-arithmetic/PARTLY-inputs 2 (C38, C41); PARTLY 4 (C06, C31, C32, C40); UNVERIFIABLE 1 (C39); CONTRADICTED 0; OUTDATED 0.

## Arithmetic

Script (repo venv python, run 2026-10-16):

```
gw = {Stargate UAE 1.0, NEOM DataVolt 1.5, Google Vizag 1.0, Meta-Reliance 0.168, CoreWeave-AdaniConneX 0.240}
ME 2.5  India 1.408  Total 3.908 GW
10 L/kW, rho 0.82: 39.1 ML, 32,046 t   | rho 0.83: 32,436 t
 8 L/kW: 31.3 ML, 25,636 t ; 12 L/kW: 46.9 ML, 38,455 t ; 25 L/kW: 97.7 ML, 80,114 t   (rho 0.82)
Value @ US$2–5/L: 8 L/kW 63–156 M; 10 L/kW 78–195 M; 12 L/kW 94–234 M; 25 L/kW 195–488 M
Value @ US$80–200/L (10 L/kW): 3.13–7.82 bn
Ratios fluorinated/hydrocarbon: 80/5 = 16 ; 80/2 = 40 ; 200/5 = 40 ; 200/2 = 100 ; midpoint 140/3.5 = 40
Group III US$/t -> US$/L (rho 0.82 / 0.83): 1030 -> 0.85/0.86 ; 1080 -> 0.89/0.90 ; 1600 -> 1.31/1.33 ; 1750 -> 1.44/1.45
FC-40: US$613/kg x 1.85 kg/L = US$1,134/L ; Sigma US$216/100 mL = US$2,160/L
RMB -> USD (assumed 7.1 RMB/USD, NOT sourced): 20–100 RMB/L = 2.8–14.1 ; 200–1500 RMB/L = 28–211
Submer EVO800: 1187/140 = 8.5 ; 1187/100 = 11.9 ; minus 39 OU x 2.5 L displacement: 7.8–10.9
Vertiv: 24U 550/50 = 11.0, 550/25 = 22.0 ; 42U 950/120 = 7.9, 950/60 = 15.8 ; 52U 1180/120 = 9.8, 1180/60 = 19.7 ; BAC 750/30 = 25.0
```

Densities: 0.82 kg/L is the deck's figure; 0.83 kg/L is an assumed typical value for a 4 cSt Group III oil at 15 °C, not sourced here (lane T has the TDS values). FC-40 density 1.85 g/mL comes from the ChemicalBook page.

## Reference list

- [R1] Intelligent CIO Middle East, "G42, OpenAI, Oracle, NVIDIA, SoftBank, Cisco launch Stargate UAE from UAE–US AI Campus in Abu Dhabi", 23 May 2025. https://www.intelligentcio.com/me/2025/05/23/g42-openai-oracle-nvidia-softbank-cisco-launch-stargate-uae-from-uae-us-ai-campus-in-abu-dhabi/ (fetched 2026-10-16)
- [R2] Middle East AI News, "NEOM & DataVolt to build $5 billion net-zero AI factory campus", 10 Feb 2025. https://www.middleeastainews.com/p/neom-datavolt-usd-5-billion-data-centre (fetched)
- [R3] Infrastructure Today, "Airtel, Google, and AdaniConneX to Build India's First $15 Billion AI and Data Hub in Visakhapatnam", 14 Oct 2025. https://infrastructuretoday.co.in/airtel-google-and-adaniconnex-to-build-indias-first-15-billion-ai-and-data-hub-in-visakhapatnam/ (fetched)
- [R4] The South First, "Google's largest AI hub outside US coming up in Visakhapatnam…", 14 Oct 2025. https://thesouthfirst.com/andhrapradesh/googles-largest-ai-hub-outside-us-coming-up-in-visakhapatnam-firm-to-invest-%e2%82%b915-billion-in-india/ (fetched)
- [R5] Meta Newsroom, "Meta Partners With Reliance on AI-Enabled Data Center in India", 9 Jun 2026 (updated 12 Jun 2026). https://about.fb.com/news/2026/06/meta-partners-with-reliance-on-ai-enabled-data-center-in-india/ (fetched)
- [R6] Submer Technologies, "SmartPod EVO Series – SmartPod EVO800 OCP (ORv3 IT-ready) Dual CDU" datasheet Rev.01, hosted by the Open Compute Project, July 2026. https://www.opencompute.org/wp-content/uploads/2026/07/6ed62fe254cf2297a3e0f5716faa4dd1ad5dae20.pdf (downloaded, pp. 1–2)
- [R7] Vertiv, "Vertiv CoolCenter Immersion – Product brochure" (EMEA), Physical/Performance/Fluid circuit data table. https://www.vertiv.com/490360/globalassets/shared/vertiv-coolcenter-immersion-br-en-emea-mka4l0ukics-web2.pdf (downloaded, p. 4)
- [R8] Baltimore Aircoil Company, "ICT Engineering Data & Construction Details", 8 Apr 2025. https://baltimoreaircoil.com/download_api_endpoint/6357/ICT_EngineeringData_ConstructionDetails_20250408_0.pdf (downloaded)
- [R9] "Immersion cooling technology development status of data center", Science and Technology for Energy Transition 79, 41 (2024), doi:10.2516/stet/2024022; Table "Immersion coolant prices". https://www.stet-review.org/articles/stet/full_html/2024/01/stet20240005/T1.html (index only: the page is behind a bot-check, which was not bypassed; verify the table by hand before quoting)
- [R10] Argus Media, "Asian Group III base oil prices hit record highs", 6 Apr 2026. https://www.argusmedia.com/pt/news-and-insights/latest-market-news/2810258-asian-group-iii-base-oil-prices-hit-record-highs (fetched)
- [R11] CoreWeave, "CoreWeave Enters India, Expanding AI Cloud Platform With AdaniConneX", 6 Oct 2026 (page dated 7 Oct). https://coreweave.com/news/coreweave-enters-india-expanding-ai-cloud-platform-with-adaniconnex (fetched)
- [R12] Lubes'n'Greases, "Asia Base Oil Price Report" (undated in excerpt). https://www.lubesngreases.com/lubereport-asia/1_23/asia-base-oil-price-report-215/ (index only)
- [R13] ChemicalBook, "FLUORINERT FC-40 price" listing (supplier prices, undated). https://m.chemicalbook.com/Price/FLUORINERT-FC-40.htm (fetched)
- [R14] Sigma-Aldrich, Fluorinert FC-40, product F9755. https://www.sigmaaldrich.com/product/sigma/f9755 (index only; fetch timed out)
- Not used (fetch failed): openai.com/index/introducing-stargate-uae (403); GRC ICEraQ datasheets (404); AGBI Aug-2026 NEOM article (403); Silmid FC-40/FC-3283 pages (404).
