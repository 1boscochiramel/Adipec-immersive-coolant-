/* story.js — guided walk through the ADIPEC 2026 talk, one step per idea.
   Each step may set sandbox state (`set`) so the cards below the story update with it.
   Blocks: <div class="eqn">, <div class="example">, <div class="litnote">, <div class="defends">.
   Optional per-step check {q, opts:[{t,ok}], reveal}. */
const STORY = [
{ch:"1 · The problem", title:"AI racks are outgrowing air",
 set:{rack:20},
 body:`<p>A rack of conventional servers draws <b>up to about 25 kW</b>. Fans push room air across heat sinks and every watt leaves through that air.</p>
 <p>AI training racks are now drawing far more power, and air cannot carry it away fast enough. The cooling medium has to move <b>closer to the silicon</b>.</p>
 <div class="example"><b>Try it:</b> drag the rack-power slider in the Sandbox from 20 kW to 150 kW and watch which cooling options remain.</div>`,
 check:{q:"A 120 kW AI rack. Which options from slide 2 can handle it?",
   opts:[{t:"Air cooling only"},{t:"Direct-to-chip or single-phase immersion",ok:true},{t:"Only two-phase immersion"}],
   reveal:"Cold plates (80–150+ kW) and single-phase immersion (100–250+ kW) both span 120 kW. Air stops at about 25 kW."}},

{ch:"1 · The problem", title:"Cold plate or full immersion?",
 set:{rack:200},
 body:`<p><b>Direct-to-chip</b> (cold plate) pipes liquid only to the hottest chips, typically <b>80–150+ kW per rack</b>. The rest of the board still needs air.</p>
 <p><b>Single-phase immersion</b> submerges the whole server in a dielectric liquid, typically <b>100–250+ kW per rack</b>. Every component is cooled and <b>server fans are removed</b>.</p>
 <p>Immersion only works if the liquid is an excellent <b>electrical insulator</b> that also carries heat well. Choosing that liquid is the subject of this talk.</p>`},

{ch:"2 · Mechanism", title:"Single-phase vs two-phase",
 set:{rack:200},
 body:`<p>In <b>single-phase</b> immersion the fluid stays liquid. A pump moves it to a coolant distribution unit (CDU), and heat leaves as <b>sensible heat</b> (the fluid warms up).</p>
 <div class="eqn"><i>Q̇</i> = <i>ṁ</i> · <i>c</i><sub>p</sub> · Δ<i>T</i></div>
 <p>In <b>two-phase</b> immersion the fluid boils on the chip and condenses on a coil, so heat leaves as <b>latent heat</b>. That handles very high heat flux, but it needs a sealed tank, a condenser and pressure control, and the fluids are fluorinated.</p>
 <div class="litnote">The comparison table in the Sandbox (slide 4) sets the two side by side: cost, fluid loss, PFAS exposure and maintenance.</div>`},

{ch:"2 · Mechanism", title:"Four fluid families, and where Group III sits",
 body:`<p>Single-phase dielectric fluids fall into four families:</p>
 <p>① <b>Hydrocarbons</b>: mineral oil (Group I/II), <b>Group III ★</b>, and PAO (a synthetic hydrocarbon)<br>
    ② <b>Natural esters</b> (vegetable-oil based)<br>
    ③ <b>Synthetic esters</b> (engineered)<br>
    ④ <b>Fluorinated</b> liquids (fluorochemicals)</p>
 <p>Group III base oil is a severely hydroprocessed refinery product: very high saturates, almost no sulphur, high viscosity index. It is made today for premium lubricants, and refineries already produce it.</p>`,
 check:{q:"Which family has historically been the default for immersion, and why is it under pressure?",
   opts:[{t:"Natural esters, because they oxidise"},{t:"Fluorinated liquids, because of PFAS regulation",ok:true},{t:"Mineral oil, because of cost"}],
   reveal:"Fluorinated fluids led early because they are non-flammable, inert, low-Dk and support two-phase cooling. They contain PFAS, which faces growing restrictions."}},

{ch:"3 · Why now", title:"The PFAS wall",
 body:`<p>Fluorinated fluids earned their place: <b>non-flammable</b>, <b>chemically inert</b>, <b>low dielectric constant</b> and capable of <b>latent-heat cooling</b>.</p>
 <p>But they contain <b>PFAS "forever chemicals"</b>, which persist in the environment and can bioaccumulate. Status as of October 2026:</p>
 <p>• <b>EU REACH</b>: ECHA's risk committee (RAC) adopted its restriction opinion in March 2026; the SEAC draft supports targeted exemptions; the final EU decision is pending.<br>
 • <b>Minnesota</b>: product-category bans from 2025, broad prohibition in 2032.<br>
 • <b>Maine</b>: phased bans from 2023/2026, broad prohibition in 2032, with exemptions.</p>
 <div class="defends">A hydrocarbon coolant contains <b>no PFAS</b> and has a global-warming potential of about zero.</div>`},

{ch:"4 · Thermal test", title:"OCP figures of merit",
 set:{mu:13.0},
 body:`<p>The Open Compute Project (OCP) compares fluids with three <b>figures of merit</b> that do not depend on a particular heat sink:</p>
 <div class="eqn">FOM1 = <i>k</i> · ( <span class="frac"><span><i>β</i> <i>c</i><sub>p</sub> <i>ρ</i>²</span><span><i>μ</i> <i>k</i></span></span> )<sup>0.2813</sup></div>
 <div class="eqnnote">natural convection · Tier 1 ≥ 35 (current servers) · Tier 2 ≥ 45 (future servers)</div>
 <div class="eqn">FOM2 = <i>k</i> · ( <span class="frac"><span><i>ρ</i> <i>c</i><sub>p</sub></span><span><i>k</i></span></span> )<sup>1/3</sup></div>
 <div class="eqnnote">forced convection · requirement &gt; 19</div>
 <div class="eqn">FOM3 = <i>μ</i></div>
 <div class="eqnnote">pressure drop · requirement ≤ 15 mPa·s</div>
 <p>In OCP's own chart, hydrocarbon-family liquids span roughly <b>FOM1 27–52</b>. Computed from public measured data (CRC AVFL-37), a light <b>2 cSt Group III</b> gives <b>FOM1 37.2</b> and <b>FOM2 28.8</b>: Tier 1, comfortably above the forced-convection bar. Standard 4 cSt grades fall to about 30–31, below Tier 1.</p>`},

{ch:"4 · Thermal test", title:"The viscosity lever",
 set:{mu:13.0},
 body:`<p>The 2 cSt Group III's viscosity at 25 °C is about <b>13.0 mPa·s</b>, under the 15 mPa·s limit. A standard 4 cSt grade is about 29 mPa·s and fails. So the <b>grade</b> decides the thermal result.</p>
 <p>Viscosity sits in the denominator of FOM1, so a lighter cut helps twice: it clears FOM3 <i>and</i> raises FOM1.</p>
 <div class="eqn">FOM1(<i>μ</i>) ≈ 37.2 · ( <span class="frac"><span>13.0</span><span><i>μ</i></span></span> )<sup>0.2813</sup></div>
 <div class="example"><b>Check against measured data.</b> At the 3 cSt grade's 17.2 mPa·s this gives 37.2 × (13.0/17.2)<sup>0.2813</sup> ≈ <b>34.4</b>; computed from that grade's own measured properties it is <b>34.7</b>. The scaling holds.</div>
 <p>Drag the viscosity slider in the Sandbox. Tier 2 (FOM1 ≥ 45) needs roughly μ ≤ 6.6 mPa·s at 25 °C with other properties fixed; at a 50 °C reference, which OCP plans to adopt, this fluid is already about 46.</p>
 <div class="litnote"><b>The catch:</b> lighter cuts have a <b>lower flash point</b>. The wide 2 cSt grade sold today is 160 °C open cup. The next step shows how a narrow cut keeps the viscosity and recovers the flash point.</div>`,
 check:{q:"You switch to the heavier 3 cSt grade (17.2 mPa·s). What happens?",
   opts:[{t:"FOM1 rises because the oil is heavier"},{t:"FOM1 falls to about 34.4, just below Tier 1, and FOM3 fails",ok:true},{t:"Nothing; viscosity only affects FOM3"}],
   reveal:"37.2 × (13.0/17.2)^0.2813 ≈ 34.4, under Tier 1's 35, and 17.2 mPa·s breaks the 15 mPa·s limit. A heavier cut buys flash point at the cost of both thermal gates."}},

{ch:"4 · Thermal test", title:"The design window: a narrow C21–C25 cut",
 set:{preset:"g3"},
 body:`<p>Two limits pull in opposite directions. <b>Viscosity</b> (μ25 ≤ 15 mPa·s) needs a light oil: KV100 ≤ 2.8 cSt, which a light base oil reaches when it boils about 356–417 °C, roughly <b>C21 to C26</b>. <b>Flash point</b> (≥ 150 °C closed cup) is set by the lightest molecules in the cut.</p>
 <p>So the target is a <b>narrow cut, C21–C25</b>: the tail below C21 is removed for flash point, and the heavy end above C25 is removed to keep viscosity down. A cut simulation (DWSIM characterisation) gives μ25 ≈ 13.6 mPa·s, FOM1 ≈ 36.8 and 163–189 °C closed cup for C21–C25; the wider C21–C25 sits at 14.6 mPa·s, too close to the limit.</p>
 <p>• Wide 2 cSt cut (sold today): μ25 13.0 ✓, but 160 °C open cup, near the gate<br>
    • 4 cSt grade (≈ C25–C35): 200–230 °C open cup ✓, but μ25 ≈ 29 and FOM1 ≈ 31 ✗<br>
    • <b>Target narrow cut C21–C25</b>: μ25 ≈ 13 ✓, FOM1 ≈ 37 ✓, flash ≈ 163–189 °C closed cup (estimate)</p>
 <div class="example"><b>Public proof that both can be met:</b> narrow-cut isoparaffinic fluids with the same viscosity (KV40 9.6–9.8 cSt) are sold at <b>184–191 °C closed cup</b>. A crude-derived Group III boils slightly lower at equal viscosity, so the estimate for a refinery cut is set lower, at 163–189 °C.</div>`,
 check:{q:"You remove only the light tail (below C21) from a wide 2 cSt cut. What happens?",
   opts:[{t:"Flash point rises, but viscosity also rises past the limit",ok:true},{t:"Flash point rises and viscosity is unchanged"},{t:"Nothing changes"}],
   reveal:"Simulated: flash rises (about +18 °C) but μ25 goes from about 12.7 to 16.9 mPa·s, which fails. The light molecules were thinning the oil. Cutting the heavy end too (above C25–C26) brings viscosity back under 15."}},

{ch:"5 · Electrical & fire", title:"Signal integrity, insulation, fire safety",
 body:`<p>A coolant that touches every trace on the board must pass three more groups of OCP gates:</p>
 <p><b>Signal integrity</b>: dielectric constant <b>Dk &lt; 2.3</b> (how strongly the fluid loads high-speed traces) and loss tangent <b>Df ≤ 0.05</b> (how much signal energy it absorbs).</p>
 <p><b>Electrical insulation</b>: dielectric strength <b>≥ 6 kV/mm</b> and volume resistivity <b>≥ 2.0 GΩ·m</b> when new.</p>
 <p><b>Fire safety</b>: flash point <b>≥ 150 °C closed cup</b> and autoignition temperature <b>≥ 300 °C</b>.</p>
 <p>Group III (public data): volume resistivity about <b>12,400 GΩ·m</b> (passes easily). Flash point: the wide 2 cSt cut is 160 °C open cup; the <b>target narrow cut</b> is estimated at <b>163–189 °C closed cup</b>. Dk, Df, dielectric strength and autoignition are <b>not yet measured</b>.</p>`},

{ch:"6 · Verdict", title:"The scorecard: promising, with the fire-safety test first",
 set:{preset:"g3"},
 body:`<p>Putting the pillars together for the <b>target narrow cut C21–C25</b> (slide 9):</p>
 <p>• <b>Thermal</b>: FOM1 37.2 (≥ 35) and FOM2 28.8 (&gt; 19). <b>Pass.</b><br>
 • <b>Viscosity</b>: 13.0 vs ≤ 15 mPa·s. <b>Pass.</b><br>
 • <b>Electrical</b>: resistivity ≈ 12,400 GΩ·m (≥ 2). <b>Pass.</b> Dk/Df and dielectric strength <b>to test</b>.<br>
 • <b>Safety &amp; environment</b>: flash ≈ 163–189 °C closed cup (estimate) vs ≥ 150 °C; no PFAS. <b>Confirm by ASTM D93</b>; autoignition to test.</p>
 <p>This is a <b>screening</b> result from public measured data. The scorecard in the Sandbox marks every open item; nothing here is a qualified product.</p>`},

{ch:"7 · Proof plan", title:"Three-stage qualification",
 body:`<p>① <b>Fluid characterisation</b>: thermal, electrical, chemical and safety properties against the OCP fluid gates. This is where Df, resistivity and closed-cup flash get measured.</p>
 <p>② <b>Accelerated ageing</b>: fluid together with seals, plastics, cables and metals at <b>80 °C × 336 h</b>.</p>
 <p>③ <b>Component soak</b>: representative server parts at <b>80 °C × 14 days</b>, then a functional retest.</p>
 <div class="defends">Characterise → age → validate real components.</div>`},

{ch:"8 · Opportunity", title:"How big is the market?",
 set:{me:2.5,in:1.4,int:10,share:100,price:3.5},
 body:`<p>A bottom-up estimate. Identified AI data-centre pipeline to 2030: <b>≈ 3.9 GW</b>.</p>
 <p>• <b>Middle East 2.5 GW</b>: Stargate UAE 1 GW, NEOM / DataVolt 1.5 GW<br>
 • <b>India ≥ 1.4 GW</b>: Google Vizag ≥ 1 GW, Meta/Reliance 168 MW, CoreWeave/AdaniConneX 240 MW</p>
 <div class="eqn">3.9 GW × 10 L/kW ≈ 39 million L ≈ <b>32,000 t</b></div>
 <p>At a domestic Group III target of <b>US$2–5 per litre</b> that is a <b>US$80–200 million</b> first fill. Fluorinated fluids sell at <b>US$80–200 per litre</b>, about <b>16× more</b> even at the closest ends of the two ranges.</p>
 <div class="litnote">The 32,000 t applies 10 L/kW across the whole pipeline. Use the "share immersion-cooled" slider to see smaller scenarios.</div>`},

{ch:"9 · Bottom line", title:"An opportunity for refineries",
 body:`<p>AI data centres are pushing past what air cooling can do. Fluorinated coolants face a PFAS wall. <b>Group III base oil</b>, already made by refineries, screens as a promising single-phase immersion coolant: Tier 1 thermal performance, very high resistivity, no PFAS, at a fraction of the fluorinated price.</p>
 <p>A <b>narrow C21–C25 cut</b> can meet the thermal gates and the flash-point gate together. What stands between this target and a qualified product: a measured <b>closed-cup flash point</b>, <b>Dk at high frequency</b>, dielectric strength, autoignition and material compatibility. The three-stage plan addresses all of them.</p>
 <div class="defends">Open the <b>Sandbox</b> to test your own fluid, the <b>Tough Q&amp;A</b> for the hard questions, or the <b>Crash course</b> for the physics from first principles.</div>`},
];
