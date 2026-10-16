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
 set:{mu:15.4},
 body:`<p>The Open Compute Project (OCP) compares fluids with three <b>figures of merit</b> that do not depend on a particular heat sink:</p>
 <div class="eqn">FOM1 = <i>k</i> · ( <span class="frac"><span><i>β</i> <i>c</i><sub>p</sub> <i>ρ</i>²</span><span><i>μ</i> <i>k</i></span></span> )<sup>0.2813</sup></div>
 <div class="eqnnote">natural convection · Tier 1 ≥ 35 (current servers) · Tier 2 ≥ 45 (future servers)</div>
 <div class="eqn">FOM2 = <i>k</i> · ( <span class="frac"><span><i>ρ</i> <i>c</i><sub>p</sub></span><span><i>k</i></span></span> )<sup>1/3</sup></div>
 <div class="eqnnote">forced convection · requirement &gt; 19</div>
 <div class="eqn">FOM3 = <i>μ</i></div>
 <div class="eqnnote">pressure drop · requirement ≤ 15 mPa·s</div>
 <p>Hydrocarbon base oils in the academic literature score <b>FOM1 38–51</b>, <b>FOM2 31–32</b>, <b>μ 5.5–15 mPa·s</b>. Group III sits at <b>FOM1 ≈ 38</b> and <b>FOM2 ≈ 31</b>: Tier 1, comfortably above the forced-convection bar.</p>`},

{ch:"4 · Thermal test", title:"The viscosity lever",
 set:{mu:15.4},
 body:`<p>Group III's viscosity at 25 °C is about <b>15.4 mPa·s</b>, just over the 15 mPa·s limit. That is why slide 9 reads <b>NEAR LIMIT</b>, not pass.</p>
 <p>Viscosity sits in the denominator of FOM1, so a slightly lighter cut helps twice: it clears FOM3 <i>and</i> raises FOM1.</p>
 <div class="eqn">FOM1(<i>μ</i>) ≈ 38 · ( <span class="frac"><span>15.4</span><span><i>μ</i></span></span> )<sup>0.2813</sup></div>
 <div class="example"><b>Check against the literature.</b> At μ = 5.5 mPa·s this gives 38 × (15.4/5.5)<sup>0.2813</sup> ≈ <b>50.8</b>, which matches the top of the literature range (51). The scaling is consistent with the slide.</div>
 <p>Drag the viscosity slider in the Sandbox. Tier 2 (FOM1 ≥ 45) needs roughly μ ≤ 8.4 mPa·s with other properties fixed.</p>
 <div class="litnote"><b>The catch:</b> lighter cuts usually have a <b>lower flash point</b>. The real design window lies between the viscosity limit and the fire-safety limit.</div>`,
 check:{q:"You cut viscosity from 15.4 to 12 mPa·s, holding everything else. What happens to FOM1?",
   opts:[{t:"Falls below Tier 1"},{t:"Rises to about 40.8",ok:true},{t:"Unchanged; viscosity only affects FOM3"}],
   reveal:"38 × (15.4/12)^0.2813 ≈ 40.8. Lower viscosity strengthens natural convection, so FOM1 rises. It is still Tier 1; Tier 2 needs about 8.4 mPa·s."}},

{ch:"5 · Electrical & fire", title:"Signal integrity, insulation, fire safety",
 body:`<p>A coolant that touches every trace on the board must pass three more groups of OCP gates:</p>
 <p><b>Signal integrity</b>: dielectric constant <b>Dk &lt; 2.3</b> (how strongly the fluid loads high-speed traces) and loss tangent <b>Df ≤ 0.05</b> (how much signal energy it absorbs).</p>
 <p><b>Electrical insulation</b>: dielectric strength <b>≥ 6 kV/mm</b> and volume resistivity <b>≥ 2.0 GΩ·m</b> when new.</p>
 <p><b>Fire safety</b>: flash point <b>≥ 150 °C closed cup</b> and autoignition temperature <b>≥ 300 °C</b>.</p>
 <p>Group III: Dk <b>2.0–2.3</b>, strength <b>8–24 kV/mm</b>, flash <b>220 °C</b> (open cup, reference grade), autoignition <b>300–370 °C</b>.</p>`},

{ch:"6 · Verdict", title:"The scorecard: promising, with three tests to run",
 set:{preset:"g3"},
 body:`<p>Putting the four pillars together (slide 9):</p>
 <p>• <b>Thermal</b>: FOM1 ≈ 38 (≥ 35) and FOM2 ≈ 31 (&gt; 19). <b>Promising.</b><br>
 • <b>Viscosity</b>: 15.4 vs ≤ 15 mPa·s. <b>Near limit.</b><br>
 • <b>Electrical &amp; signal</b>: Dk 2.0–2.3 and 8–24 kV/mm. <b>Promising; test at high frequency.</b><br>
 • <b>Safety &amp; environment</b>: flash 220 °C (open cup), autoignition 300–370 °C, no PFAS. <b>Closed-cup test needed.</b></p>
 <p>This is a <b>screening</b> result built on literature and reference-grade data. The scorecard in the Sandbox marks every open item; nothing here is a qualified product.</p>`},

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
 body:`<p>AI data centres are pushing past what air cooling can do. Fluorinated coolants face a PFAS wall. <b>Group III base oil</b>, already made by refineries, screens as a promising single-phase immersion coolant: Tier 1 thermal performance, good dielectric behaviour, no PFAS, at a fraction of the fluorinated price.</p>
 <p>Three items stand between screening and a qualified product: <b>viscosity just over the limit</b>, <b>Dk at high frequency</b> and a <b>closed-cup flash point</b>. The three-stage plan addresses all three.</p>
 <div class="defends">Open the <b>Sandbox</b> to test your own fluid, the <b>Tough Q&amp;A</b> for the hard questions, or the <b>Crash course</b> for the physics from first principles.</div>`},
];
