/* course.js — "Cooling the AI era" crash course, fundamentals → expert.
   Blocks: <div class="eqn">, <div class="example">, <div class="litnote">, <div class="defends">.
   Tags in text: DECK = on the ADIPEC slides, CALC = worked here, STD = textbook or published reference data. */
const T = {deck:'<span class="src ext">DECK</span>', calc:'<span class="src calc">CALC</span>', std:'<span class="src std">STD</span>'};
const LESSONS = [
{ch:"A · Heat", title:"Why this matters",
 body:`<p>AI rack power is rising. Electricity becomes heat, and removing that heat constrains server density and performance. ${T.std}</p><p>The coolant must carry heat while protecting the electronics it touches. This course explains how to screen that choice.</p>`},
{ch:"A · Heat", title:"Three cooling architectures",
 body:`<p><b>Air</b>: fans and heat sinks, ≈ <b>20–30 kW/rack</b>.<br><b>Direct-to-chip / cold plate</b>: liquid at the hottest chips, ≈ <b>50–130+ kW/rack</b>; other components still need cooling.<br><b>Immersion</b>: the server sits in dielectric liquid, <b>100+ kW/rack</b>. ${T.deck}</p><p>These are indicative slide bands, not universal hardware limits.</p>`},
{ch:"A · Heat", title:"Single-phase vs two-phase",
 body:`<p><b>Single-phase</b> carries sensible heat as liquid warms: a bath, a pump and a heat exchanger. <b>Two-phase</b> carries latent heat as fluid boils at the chip and condenses on a coil. ${T.std}</p><p>Low-boiling two-phase fluids may boil at roughly <b>30–60 °C</b>, depending on fluid and pressure. Vapour containment and replacement of lost fluid are recurring costs. ${T.std}</p>`,
 check:{q:"Which mechanism uses latent heat?",opts:[{t:"Liquid warming in a single-phase bath"},{t:"Boiling and condensation",ok:true}],reveal:"A phase change carries latent heat; warming without boiling carries sensible heat."}},
{ch:"A · Heat", title:"Fluid families",
 body:`<p><b>Hydrocarbons</b>: Group I–III mineral/base oils and PAO (<b>polyalphaolefin</b>, a synthetic hydrocarbon). Branching lowers pour point by disrupting crystallisation; long paraffinic chains help keep viscosity index (VI) high. ${T.std}</p><p><b>Natural esters</b> and <b>synthetic esters</b> are polar fluids. <b>Fluorinated liquids</b> include grades for single-phase and two-phase service. Fluid families have different electrical, fire, compatibility and environmental trade-offs. ${T.std}</p>`},
// ===================== PART A — HEAT AND DATA CENTRES =====================
{ch:"A · Heat", title:"Every watt becomes heat",
 body:`<p>A server does no mechanical work on its surroundings. Practically every watt of electricity it draws ends up as <b>heat</b> that must be carried away. ${T.std}</p>
 <p>So a 120 kW AI rack is a 120 kW heater: <b>120 kJ every second</b>, all day. The cooling system's job is to move that energy out of the chips and into something that can reject it outside. ${T.std}</p>
 <div class="defends">You can now answer: <i>"Why does cooling scale one-for-one with IT power?"</i></div>`},

{ch:"A · Heat", title:"Sensible heat: the single-phase equation",
 body:`<p>When a fluid absorbs heat without changing phase, its temperature rises. The heat flow it carries is ${T.std}</p>
 <div class="eqn"><i>Q̇</i> = <i>ṁ</i> · <i>c</i><sub>p</sub> · Δ<i>T</i></div>
 <div class="eqnnote">mass flow × specific heat × temperature rise</div>
 <div class="example"><b>Worked example</b> ${T.calc}. A 100 kW tank, oil warming by 10 K, with c<sub>p</sub> ≈ 2 kJ/kg·K (order of magnitude for hydrocarbon oils):<br>
 <i>ṁ</i> = 100 / (2 × 10) = <b>5 kg/s</b>, about <b>6 L/s</b> at 0.82 kg/L.</div>`,
 check:{q:"Double the allowed temperature rise to 20 K. What flow do you need?",
   opts:[{t:"Twice as much"},{t:"Half as much: 2.5 kg/s",ok:true},{t:"The same"}],
   reveal:"ṁ = Q̇ / (c_p ΔT). Doubling ΔT halves the flow, which also cuts pumping power. The limit is how hot the chips may run."}},

{ch:"A · Heat", title:"Why air runs out",
 body:`<p>What matters for carrying heat in a duct or tank is heat capacity <b>per unit volume</b>, ρ·c<sub>p</sub>. ${T.std}</p>
 <p>• Air: 1.2 kg/m³ × 1.005 kJ/kg·K ≈ <b>1.2 kJ/m³·K</b><br>
 • Hydrocarbon oil: 820 kg/m³ × 2.0 kJ/kg·K = <b>1,640 kJ/m³·K</b> ${T.std}</p>
 <p>A litre of oil holds roughly <b>1,370×</b> more heat per degree than a litre of air. ${T.calc} To remove 100 kW at a 10 K rise you need about 8 m³/s of air, but only about 6 L/s of oil.</p>
 <p>That is why the slide's bands look the way they do: air ≈ 20–30 kW per rack, cold plates ≈ 50–130+ kW, immersion 100+ kW. ${T.deck}</p>`},

{ch:"A · Heat", title:"Convection: getting heat off a surface",
 body:`<p>Heat leaves a hot chip surface into the fluid by <b>convection</b>: ${T.std}</p>
 <div class="eqn"><i>q</i> = <i>h</i> · <i>A</i> · (<i>T</i><sub>surface</sub> − <i>T</i><sub>fluid</sub>)</div>
 <p>The heat-transfer coefficient <i>h</i> depends on the fluid's properties and how it moves.</p>
 <p>• <b>Natural convection</b>: warm fluid rises by buoyancy, with no pump at the surface. Common in immersion baths around passive heat sinks.<br>
 • <b>Forced convection</b>: a pump drives the fluid across the surface.</p>
 <p>A coolant figure of merit is simply a way of ranking fluids by the <i>h</i> they would give on the same hardware.</p>`},

// ===================== PART B — FIGURES OF MERIT =====================
{ch:"B · Figures of merit", title:"Where FOM1 comes from",
 body:`<p>Natural convection is described by the <b>Rayleigh number</b>, the ratio of buoyancy to viscous and thermal damping: ${T.std}</p>
 <div class="eqn"><i>Ra</i> = <span class="frac"><span><i>g β</i> Δ<i>T</i> <i>L</i>³ <i>ρ</i>² <i>c</i><sub>p</sub></span><span><i>μ k</i></span></span></div>
 <p>Correlations take the form <i>Nu</i> = <i>C</i>·<i>Ra</i><sup>n</sup>, and <i>h</i> = <i>Nu</i>·<i>k</i>/<i>L</i>. Strip out the geometry and ΔT, which are the same for every fluid, and what remains is a property group:</p>
 <div class="eqn">FOM1 = <i>k</i> · ( <span class="frac"><span><i>β c</i><sub>p</sub> <i>ρ</i>²</span><span><i>μ k</i></span></span> )<sup>0.2813</sup></div>
 <p>This is OCP’s natural-convection property group. ${T.std} The exponent 0.2813 sits between the laminar value (1/4) and the turbulent value (1/3).</p>
 <div class="litnote">Higher conductivity <i>k</i>, expansion coefficient <i>β</i>, density <i>ρ</i> and heat capacity <i>c</i><sub>p</sub> all help. Higher viscosity <i>μ</i> hurts.</div>`,
 check:{q:"Which single property change lowers FOM1?",
   opts:[{t:"Higher density"},{t:"Higher viscosity",ok:true},{t:"Higher thermal expansion β"}],
   reveal:"μ is in the denominator: thicker fluid circulates more slowly under the same buoyancy."}},

{ch:"B · Figures of merit", title:"FOM2 and FOM3",
 body:`<p><b>FOM2</b> ranks fluids for forced convection: ${T.std}</p>
 <div class="eqn">FOM2 = <i>k</i> · ( <span class="frac"><span><i>ρ c</i><sub>p</sub></span><span><i>k</i></span></span> )<sup>1/3</sup> = <i>k</i><sup>2/3</sup> (<i>ρ c</i><sub>p</sub>)<sup>1/3</sup></div>
 <p>It rewards conductivity and volumetric heat capacity. OCP requires <b>FOM2 &gt; 19</b>. ${T.deck}</p>
 <p><b>FOM3</b> is simply the dynamic viscosity <i>μ</i> at 25 °C, with a limit of <b>≤ 15 mPa·s</b>. ${T.deck} In laminar channels the pressure drop scales with <i>μ</i>, so viscosity sets pump power. ${T.std}</p>
 <div class="litnote">Viscosity falls steeply as oil warms, so the 25 °C value is close to a worst case for a running bath and matters most at start-up.</div>`},

{ch:"B · Figures of merit", title:"Reading the thermal scorecard",
 body:`<p>Thermal screening against the slide thresholds:</p>
 <p>• OCP: FOM1 <b>Tier 1 ≥ 35</b> (current servers), <b>Tier 2 ≥ 45</b> (future servers); FOM2 &gt; 19; μ ≤ 15 mPa·s ${T.deck}<br>
 • Group III, 2 cSt (computed from CRC AVFL-37 measured data): <b>FOM1 37.2</b>, <b>FOM2 28.8</b>, <b>μ<sub>25</sub> 13.0 mPa·s</b> ${T.deck}<br>
 • Group III, 4 cSt: FOM1 ≈ 30–31, μ<sub>25</sub> ≈ 29 mPa·s ${T.calc}</p>
 <p>The light 2 cSt grade is <b>Tier 1</b> and passes the viscosity limit; standard 4 cSt grades fail both. Tier 1 is broadly enough for today’s air-class processors; Tier 2 is a higher bar for higher-performance and future server generations. ${T.std} The grade decides the screening result.</p>`},

{ch:"B · Figures of merit", title:"The viscosity lever",
 body:`<p>Hold every other property fixed and FOM1 scales as μ<sup>−0.2813</sup>: ${T.calc}</p>
 <div class="eqn">FOM1(<i>μ</i>) ≈ 37.2 · (13.0 / <i>μ</i>)<sup>0.2813</sup></div>
 <p>• μ = 17.2 (3 cSt grade) → FOM1 ≈ 34.4, just below Tier 1 (34.7 from its own measured data)<br>
 • μ = 29 (4 cSt grade) → FOM1 ≈ 29.7 (30–31 from measured data)<br>
 • μ = 6.6 → FOM1 ≈ 45 (Tier 2) ${T.calc}</p>
 <div class="litnote">Real lighter grades also change <i>k</i>, <i>ρ</i>, <i>c</i><sub>p</sub> and <i>β</i>, so this is a first-order guide, not a prediction for a specific fluid.</div>`,
 check:{q:"Roughly what viscosity reaches Tier 2 (FOM1 = 45)?",
   opts:[{t:"About 12 mPa·s"},{t:"About 6.6 mPa·s",ok:true},{t:"About 2 mPa·s"}],
   reveal:"CALC · 13.0 × (37.2/45)^(1/0.2813) ≈ 6.6 mPa·s."}},

// ===================== PART C — ELECTRICAL =====================
{ch:"C · Electrical", title:"Dk and Df: the fluid touches every trace",
 body:`<p>In air, a high-speed signal trace sees a dielectric constant near 1 above it. Immerse the board and the fluid replaces that air. ${T.std}</p>
 <p>• <b>Dielectric constant Dk</b>: raises the effective permittivity around the trace, which slows signals (speed ∝ 1/√Dk<sub>eff</sub>) and shifts impedance. OCP limit <b>Dk &lt; 2.3</b>. ${T.deck}<br>
 • <b>Loss tangent Df</b>: the fraction of signal energy the fluid absorbs as heat. OCP limit <b>Df ≤ 0.05</b>. ${T.deck}</p>
 <p>The cited public data do not report this Group III sample at <b>20 and 40 GHz, each at 20 and 70 °C</b>. ${T.deck} Dk and Df must be measured at those conditions. Esters are polar and typically have Dk around <b>3</b>, above the 2.3 gate; non-polar hydrocarbons are therefore attractive. ${T.std}</p>`},

{ch:"C · Electrical", title:"Insulation: strength and resistivity",
 body:`<p>• <b>Dielectric strength</b>: the field at which the fluid breaks down and arcs. OCP: <b>≥ 6 kV/mm</b>. ${T.deck} Not reported for this sample in the cited data.<br>
 • <b>Volume resistivity</b>: resistance to leakage current through the fluid. OCP: <b>≥ 2.0 GΩ·m</b> when new, <b>≥ 0.20 GΩ·m</b> over life. ${T.deck}</p>
 <p>Both are very sensitive to <b>dissolved water and particles</b>, which is why reported breakdown values spread so widely and why in-service drying and filtration matter. ${T.std}</p>
 <div class="defends">You can now answer: <i>"Why is the strength range so wide?"</i> Moisture and particulates, not the base molecule.</div>`},

{ch:"C · Electrical", title:"The coolant checklist",
 body:`<p>OCP gates used in the slides: ${T.deck}</p><p><b>Thermal</b>: FOM1 Tier 1 ≥ 35, Tier 2 ≥ 45; FOM2 &gt; 19; FOM3 (μ at 25 °C) ≤ 15 mPa·s. ${T.deck}</p><p><b>Signal integrity</b>: Dk &lt; 2.3; Df ≤ 0.05 at 20 and 40 GHz, each at 20 and 70 °C. ${T.deck}</p><p><b>Insulation</b>: dielectric strength ≥ 6 kV/mm; volume resistivity ≥ 2.0 GΩ·m new, ≥ 0.20 GΩ·m over life. ${T.deck}</p><p><b>Fire</b>: flash ≥ 150 °C closed cup (ASTM D93); autoignition ≥ 300 °C (ASTM E659). ${T.deck}</p><p>Chemical stability, material compatibility and functional validation also need assessment; this summary is not the entire OCP specification.</p>`},
// ===================== PART D — FIRE AND ENVIRONMENT =====================
{ch:"D · Fire & environment", title:"Flash point, open cup vs closed cup",
 body:`<p>• <b>Flash point</b>: the lowest temperature at which vapour above the liquid ignites briefly from an external flame. OCP: <b>≥ 150 °C, closed cup</b> (ASTM D93). ${T.deck}<br>
 • <b>Autoignition temperature</b>: ignition with no flame at all. OCP: <b>≥ 300 °C</b> (ASTM E659). ${T.deck}</p>
 <p>Open-cup methods (Cleveland, COC) let vapour escape, so they usually read <b>higher</b> than closed-cup methods (e.g. Pensky-Martens). ${T.std}</p>
 <p>${T.std} A commercial wide 2 cSt Group III is <b>160 °C</b> open cup on its producer's safety data sheet. Closed cup reads lower, against the 150 °C closed-cup gate. A <b>narrow C21–C25 cut</b> is estimated at 163–189 °C closed cup ${T.deck} (model estimate, not a measurement). Public narrow-cut isoparaffinic analogues of similar viscosity reach 184–191 °C closed cup. ${T.std}</p><p>A commercial 2 cSt Group III public SDS lists autoignition only as <b>&gt; 260 °C</b>. ${T.std} This lower bound does not establish the 300 °C gate: autoignition must be measured.</p>`,
 check:{q:"A fluid reads 165 °C open cup. Is the OCP flash gate met?",
   opts:[{t:"Yes, 165 > 150"},{t:"Not proven: closed cup will likely read lower",ok:true}],
   reveal:"STD · The gate is defined closed-cup. A 15 °C open-cup margin can disappear on a closed-cup test (one immersion fluid reads 202 °C open cup vs 184 °C closed cup)."}},

{ch:"D · Fire & environment", title:"The PFAS wall",
 body:`<p>Fluorinated fluids were used in early immersion because many grades are <b>non-flammable</b>, stable in normal service and <b>low-Dk</b>; low-boiling grades support two-phase cooling. ${T.std}</p>
 <p>They contain PFAS, "forever chemicals" that persist and can bioaccumulate. Slide policy summary: ${T.deck}</p>
 <p>• <b>EU REACH</b>: broad PFAS restriction under review; final decision pending.<br>
 • <b>Minnesota</b>: product-category bans 2025, broad prohibition 2032.<br>
 • <b>Maine</b>: phased restrictions; timing and exemptions for cooling equipment differ. ${T.deck}</p>
 <p>A pure hydrocarbon contains <b>no PFAS</b> ${T.std}, but it is combustible. That trade is why the fire-safety gates carry so much weight.</p>`},

// ===================== PART E — GROUP III =====================
{ch:"E · Group III", title:"What Group III base oil is",
 body:`<p>The API classifies lubricant base oils into five groups: ${T.std}</p>
 <p>• <b>Group I</b>: solvent-refined; saturates &lt; 90 % and/or sulphur &gt; 0.03 %; VI 80–120<br>
 • <b>Group II</b>: saturates ≥ 90 %, sulphur ≤ 0.03 %, VI 80–120<br>
 • <b>Group III</b>: saturates ≥ 90 %, sulphur ≤ 0.03 %, <b>VI ≥ 120</b><br>
 • <b>Group IV</b>: PAO (synthetic hydrocarbons)<br>
 • <b>Group V</b>: everything else, including esters ${T.std}</p>
 <p>Group III is made by severe hydroprocessing (hydrocracking, catalytic dewaxing, hydrofinishing). Its properties depend on the cut and processing. OCP judges measured fluid properties; API base-oil categories are not themselves an immersion criterion.</p>`},

{ch:"E · Group III", title:"The viscosity–flash trade",
 body:`<p>Viscosity and flash point are both set largely by <b>molecular size and boiling range</b>. ${T.std}</p>
 <p>• A lighter cut → lower viscosity → better FOM1 and FOM3<br>
 • A lighter cut → more volatile molecules → <b>lower flash point</b>, higher evaporation loss ${T.std}</p>
 <p>So the engineering target is a <b>window</b>, and public data put it at a <b>narrow cut of about C21–C25</b> ${T.calc}:</p>
 <p>• Viscosity: μ25 ≤ 15 mPa·s needs KV100 ≤ 2.8 cSt; a light base oil of that viscosity boils about 356–417 °C (5–95 %), i.e. roughly C21–C25.<br>
 • Flash point: remove the tail below C21, <b>and</b> the heavy end above C25, because the light molecules were thinning the oil (simulated μ25 rises from 12.7 to 16.9 mPa·s if only the light tail is cut). Narrow-cut isoparaffinic fluids at the same viscosity reach 184–191 °C closed cup; a refinery Group III is estimated at 163–189 °C.<br>
 • A heavier C25–C35 cut (4 cSt) has higher public reference flash points but fails viscosity (≈ 29 mPa·s) and Tier 1 (≈ 31). ${T.std}</p>
 <div class="defends">Try it in the simulator: the viscosity lever shows the thermal side of this window.</div>`},

{ch:"E · Group III", title:"The full scorecard",
 body:`<p>Screening summary (public reference properties are not measurements of the target cut):</p>
 <p>• <b>Thermal</b>: FOM1 37.2, FOM2 28.8 vs ≥ 35, &gt; 19 → <b>PASS</b> ${T.deck}<br>
 • <b>Viscosity</b>: μ<sub>25</sub> 13.0 vs ≤ 15 mPa·s → <b>PASS</b> ${T.deck}<br>
 • <b>Electrical</b>: resistivity ≈ 12,400 GΩ·m ${T.calc} (CRC AVFL-37: 1.24 × 10<sup>15</sup> Ω·cm ÷ 10<sup>11</sup>) vs ≥ 2 ${T.deck} → <b>SCREENING PASS</b>; Dk/Df and dielectric strength → <b>TO TEST</b><br>
 • <b>Safety &amp; environment</b>: target narrow cut ≈ 163–189 °C closed cup (estimate) vs ≥ 150 °C ${T.deck} → <b>CONFIRM BY TEST</b>; autoignition → <b>TO TEST</b>; no PFAS</p>
 <p>Values come from public measured data for one commercial 2 cSt Group III base oil: a <b>screening</b> result, not a qualified product. ${T.std}</p>`},

// ===================== PART F — PROOF AND BUSINESS =====================
{ch:"F · Proof & business", title:"Three-stage qualification",
 body:`<p>${T.deck}</p>
 <p>① <b>Fluid characterisation</b> against the OCP gates: thermal, electrical, chemical, safety.<br>
 ② <b>Material compatibility</b>: seals, plastics, cables and metals soaked at <b>80 ± 2 °C × 14 days</b>, with an untouched control.<br>
 ③ <b>Functional validation</b>: retest the soaked parts, then run a <b>pilot tank with real servers under load</b>. ${T.deck}</p>
 <p>Ageing hot speeds up oxidation and material interaction so that problems show in weeks rather than years. A common rule of thumb is that oxidation rates roughly double for every 10 °C rise. ${T.std}</p>`},

{ch:"F · Proof & business", title:"Sizing the market",
 body:`<p>${T.deck} Announced AI campuses ≈ <b>3.9 GW</b>: Middle East 2.5 GW, India ≈ 1.4 GW. Coolant intensity ≈ <b>10 L/kW</b>.</p>
 <div class="eqn">3.9 × 10<sup>6</sup> kW × 10 L/kW = 39 × 10<sup>6</sup> L</div>
 <p>${T.calc} At about 0.82 kg/L that is ≈ <b>32,000 t</b>. At US$2–5/L it is ≈ <b>US$78–195 million</b>. Fluorinated two-phase fluid ≈ <b>US$30/L</b> ${T.deck}: about <b>6× or more</b> (30 ÷ 5) per litre. ${T.calc}</p>
 <p>${T.calc} Adoption scenarios: <b>10%</b> → 3.9 million L, ≈ 3,200 t, ≈ US$8–20 million; <b>25%</b> → 9.75 million L, ≈ 8,000 t, ≈ US$20–49 million.</p>
 <div class="litnote">This is a first-fill ceiling assuming full immersion. Not every announced campus will use immersion. Every input is linear, so the simulator's sliders show any other scenario instantly.</div>`,
 check:{q:"Only a quarter of that pipeline adopts immersion. Tonnage?",
   opts:[{t:"About 8,000 t",ok:true},{t:"About 16,000 t"},{t:"Still 32,000 t"}],
   reveal:"CALC · Linear: 32,000 × 0.25 ≈ 8,000 t."}},

{ch:"F · Proof & business", title:"Policy and standards",
 body:`<p><b>OCP</b> publishes immersion requirements and compatibility guidance. <b>ASTM</b> and <b>IEC</b> publish property and safety test methods. Meeting a property gate does not by itself qualify an installation. ${T.std}</p><p>Local fire codes, authorities and insurers influence tank design, detection, suppression and acceptance. For an illustrative <b>10–15-year</b> asset, chemical restrictions also affect procurement, servicing and end-of-life choices. ${T.std}</p><p>PFAS policy therefore matters alongside thermal performance. EU REACH: broad restriction under review, final decision pending. Minnesota: selected bans from 2025, broader prohibition 2032. Maine: phased restrictions; timing and cooling-equipment exemptions differ. ${T.deck}</p>`},
{ch:"F · Proof & business", title:"Defending the case",
 body:`<p>The honest summary for a sceptical audience:</p>
 <p>• <b>Strong</b>: Tier 1 thermal performance and viscosity pass for a 2 cSt cut, very high resistivity, no PFAS, refinery-made at a fraction of the fluorinated price.<br>
 • <b>Open</b>: Tier 2 miss (37.2 &lt; 45); closed-cup flash point (critical for the light grade); Dk/Df at high frequency; dielectric strength; autoignition; material compatibility.<br>
 • <b>Plan</b>: characterise → soak with control → retest parts and pilot with real servers under load. ${T.calc}</p>
 <div class="defends">The claim is "promising candidate with a clear test plan", not "qualified coolant". Hold that line and every hard question has an answer.</div>`},
];

// ---------------- runner ----------------
const $ = id => document.getElementById(id);
let step = 0; const seen = new Set();
function checkHTML(c){
  return `<div class="check"><div class="q">🤔 ${c.q}</div>` +
    c.opts.map(o=>`<button class="opt" data-ok="${o.ok?1:0}">${o.t}</button>`).join("") +
    `<div class="reveal">${c.reveal}</div></div>`;
}
function show(i){
  step = (i + LESSONS.length) % LESSONS.length; seen.add(step);
  const L = LESSONS[step];
  $("chapBadge").textContent = "Part " + L.ch;
  $("lessonCount").textContent = "Lesson " + (step+1) + " / " + LESSONS.length;
  $("progFill").style.width = (100*(step+1)/LESSONS.length) + "%";
  $("storyTitle").textContent = L.title;
  $("storyBody").innerHTML = L.body;
  $("lessonCheck").innerHTML = L.check ? checkHTML(L.check) : "";
  $("prevBtn").disabled = step === 0;
  $("nextBtn").textContent = step === LESSONS.length-1 ? "Restart ↺" : "Next ›";
  $("toc").innerHTML = LESSONS.map((l,k)=>`<button data-k="${k}" class="${k===step?"on":seen.has(k)?"done":""}">${k+1}</button>`).join("");
  try{ localStorage.setItem("adipecCourseStep", step); }catch(e){}
  window.scrollTo({top:0, behavior:"smooth"});
}
$("nextBtn").addEventListener("click",()=>show(step+1));
$("prevBtn").addEventListener("click",()=>show(step-1));
$("toc").addEventListener("click",e=>{const b=e.target.closest("button"); if(b) show(+b.dataset.k);});
$("lessonCheck").addEventListener("click",e=>{
  const b=e.target.closest(".opt"); if(!b) return;
  const box=b.closest(".check");
  box.querySelectorAll(".opt").forEach(o=>{
    if(o.dataset.ok==="1") o.classList.add("correct"); else if(o===b) o.classList.add("wrong");
    o.disabled=true; o.style.cursor="default";});
  box.querySelector(".reveal").classList.add("show");
});
let start = 0; try{ start = +(localStorage.getItem("adipecCourseStep")||0) || 0; }catch(e){}
show(start);
