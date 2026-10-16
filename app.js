/* Group III immersion coolant — interactive simulator (static, browser-only).
   Every number is either printed on the ADIPEC 2026 slides [DECK], computed here from
   deck numbers [CALC], or a textbook definition [STD]. No laboratory data is shown. */

// ---------------- deck constants ----------------
const DECK = {
  air: [0, 25],                 // kW/rack, slide 2
  dlc: [80, 150],               // "80–150+"
  imm: [100, 250],              // "100–250+"
  fom1T1: 35, fom1T2: 45,       // slide 7
  fom2Min: 19,
  muMax: 15,                    // mPa·s
  n: 0.2813,                    // FOM1 exponent as printed on slide 7 (gap a5d1e003)
  dkMax: 2.3, dfMax: 0.05,      // slide 8
  strengthMin: 6,               // kV/mm
  resMin: 2.0,                  // GΩ·m, new fluid
  flashMin: 150,                // °C closed cup
  aitMin: 300,                  // °C
  gw: {me: 2.5, in: 1.4},       // slide 11
  lPerKW: 10,
  price: [2, 5],                // US$/L Group III target
  fluoro: [80, 200],            // US$/L fluorinated benchmark
  rho: 0.82,                    // kg/L, back-solved from 32,000 t / 39 ML (gap a5d1e002)
};

// fluid presets. fom1 is quoted at the preset's own viscosity mu0; null = not reported.
const PRESETS = {
  g3:   {name:"Group III base oil (deck values)", fom1:38, mu0:15.4, fom2:31, dk:2.3, df:null, str:8, res:null, flash:220, cc:false, ait:300,
         note:"Slide 9. Ranges are entered at their least favourable end: Dk 2.0–2.3 → 2.3, strength 8–24 → 8 kV/mm, autoignition 300–370 → 300 °C."},
  lit:  {name:"Hydrocarbon base oils, lighter end of literature", fom1:51, mu0:5.5, fom2:32, dk:null, df:null, str:null, res:null, flash:null, cc:false, ait:null,
         note:"Slide 7 literature ranges: FOM1 up to 51, FOM2 up to 32, μ down to 5.5 mPa·s. Electrical and fire values not given on the slide."},
  custom:{name:"Custom — enter your own measurements", fom1:40, mu0:12, fom2:25, dk:2.1, df:0.001, str:10, res:5, flash:180, cc:true, ait:320,
         note:"Placeholder values for you to overwrite. They are not data for any real fluid."},
};
const FIELDS = [   // key, label, unit, step
  ["fom1","FOM1 at the preset viscosity","",0.1],
  ["fom2","FOM2","",0.1],
  ["dk","Dielectric constant Dk (worst case)","",0.01],
  ["df","Loss tangent Df","",0.001],
  ["str","Dielectric strength","kV/mm",0.5],
  ["res","Volume resistivity (new)","GΩ·m",0.1],
  ["flash","Flash point","°C",1],
  ["ait","Autoignition temperature","°C",1],
];

const REFS = [
  ["ADIPEC 2026 slides, B. Chiramel", "every DECK value on this page: rack bands, OCP limits, Group III read-outs, PFAS status, roadmap, market sizing"],
  ["Open Compute Project (OCP), immersion fluid requirements", "FOM1/FOM2/FOM3 definitions and Tier 1/Tier 2 thresholds, electrical and fire limits (as quoted on slides 7–8)"],
  ["EU REACH PFAS restriction (ECHA RAC/SEAC)", "status as of October 2026, slide 6"],
  ["Minnesota and Maine PFAS product laws", "category bans and 2032 broad prohibitions, slide 6"],
  ["API 1509 base-oil categories", "Group I–V definitions (saturates, sulphur, viscosity index)"],
];

// ---------------- history ----------------
const HISTORY = [
 {eyebrow:"Era 1 → 3", title:"How servers have been cooled",
  intro:"Each step moves the cooling medium closer to the silicon (slide 2).",
  stages:[
   {tag:"≤ 25 kW / rack", h:"Air", d:"Fans and heat sinks; all heat exits to room air. Enough for conventional servers, not for AI training racks.", cls:"fail"},
   {tag:"80–150+ kW / rack", h:"Direct-to-chip", d:"Cold plates carry liquid to the hottest chips only. The rest of the board still needs air."},
   {tag:"100–250+ kW / rack", h:"Single-phase immersion", d:"The whole server is submerged in a dielectric liquid and server fans are removed.", cls:"win"}],
  take:"<b>Takeaway:</b> once racks pass ~100 kW, the coolant itself becomes a design choice — and a product."},
 {eyebrow:"Coolant chemistry", title:"From fluorinated default to hydrocarbons",
  intro:"Why the early choice is being revisited (slides 4–6).",
  stages:[
   {tag:"Early default", h:"Fluorinated liquids", d:"Non-flammable, chemically inert, low Dk, and capable of two-phase latent-heat cooling."},
   {tag:"2023 → 2032", h:"PFAS headwinds", d:"EU REACH restriction opinion adopted by RAC (Mar 2026), final decision pending. Minnesota and Maine broad prohibitions in 2032, with exemptions.", cls:"fail"},
   {tag:"Now", h:"Hydrocarbons, incl. Group III", d:"No PFAS, GWP ≈ 0, open-bath service, target US$2–5 per litre against US$80–200 for fluorinated.", cls:"win"}],
  take:"<b>Takeaway:</b> single-phase hydrocarbons trade non-flammability for cost, simplicity and regulatory headroom — so fire-safety gates matter."},
 {eyebrow:"From screening to product", title:"The qualification road",
  intro:"What has to happen before a refinery stream becomes a qualified coolant (slide 10).",
  stages:[
   {tag:"Stage 01", h:"Fluid characterisation", d:"Thermal, electrical, chemical and safety properties against the OCP fluid gates."},
   {tag:"Stage 02 · 80 °C × 336 h", h:"Accelerated ageing", d:"Fluid together with seals, plastics, cables and metals."},
   {tag:"Stage 03 · 80 °C × 14 days", h:"Component soak", d:"Representative server parts, followed by a functional retest.", cls:"win"}],
  take:"<b>Takeaway:</b> characterise → age → validate real components. Today's numbers are a screening result, not a qualification."},
];

// ---------------- tough Q&A ----------------
const QA = [
 {cat:"Thermal & hydraulics", icon:"🌡️", desc:"Figures of merit and the viscosity limit.",
  qs:[
   {q:"Your viscosity is 15.4 mPa·s. OCP says ≤ 15. Doesn't Group III fail?",
    tags:["deck","calc"],
    a:"On the reference grade, yes, by 0.4 mPa·s (about 3 %). That is why slide 9 says <b>NEAR LIMIT</b>, not pass. Base-oil viscosity is set by the distillation cut, so a slightly lighter grade clears 15 mPa·s and raises FOM1 at the same time. The price of a lighter cut is usually a lower flash point, so the real design window sits between FOM3 and the fire-safety gate.",
    sandbox:"Viscosity lever → drag from 15.4 to 14.5 and watch FOM3 turn green."},
   {q:"FOM1 ≈ 38 only clears Tier 1. Isn't Tier 2 where AI is heading?",
    tags:["deck","calc"],
    a:"Tier 1 (≥ 35) covers current server loads; Tier 2 (≥ 45) is for future loads. Using the slide-7 formula with other properties fixed, FOM1 reaches 45 at about <b>8.4 mPa·s</b>. The same scaling gives 50.8 at 5.5 mPa·s, which matches the top of the literature range (51). Tier 2 is within reach of a lighter hydrocarbon grade, at the flash-point cost noted above.",
    sandbox:"Viscosity lever → drag down to 8.4 mPa·s."},
   {q:"Why single-phase at all? Boiling removes far more heat.",
    tags:["deck","scope"],
    a:"Two-phase handles the highest heat fluxes, which is its real strength. It also needs a sealed tank, a condenser, pressure control and make-up for vapour loss, and today's two-phase fluids are fluorinated, with the PFAS exposure that brings. Single-phase hydrocarbons run in an open bath with a pump and CDU. We do not claim single-phase wins at every heat flux; we claim it covers the 100–250+ kW rack band at much lower fluid cost."}]},
 {cat:"Electrical & signal integrity", icon:"⚡", desc:"A fluid that touches every trace.",
  qs:[
   {q:"Dk 2.0–2.3 against a limit of < 2.3 — you're on the line.",
    tags:["deck","scope"],
    a:"The upper end touches the limit, so the slide reads <b>PROMISING / TEST HF</b>. Dk must be measured at the high frequencies modern server links use, and across operating temperature. Until then the scorecard keeps it amber."},
   {q:"Df and resistivity aren't on your slides.",
    tags:["deck","scope"],
    a:"Correct. The slides give the OCP limits (Df ≤ 0.05; resistivity ≥ 2.0 GΩ·m new) but no Group III value, so the scorecard marks both <b>to be measured</b>. Stage 1 of the roadmap measures them; stage 2 ageing tracks how they drift as the fluid oxidises or picks up moisture."},
   {q:"Dielectric strength 8–24 kV/mm is a wide spread.",
    tags:["deck","std"],
    a:"Breakdown strength of insulating oils depends strongly on dissolved water and particles, so reported ranges are wide. Even the low end, 8 kV/mm, clears the 6 kV/mm gate. In service, drying and filtration keep it there."}]},
 {cat:"Fire safety", icon:"🔥", desc:"Hydrocarbons burn; fluorinated fluids don't.",
  qs:[
   {q:"Your 220 °C flash point is open cup. OCP wants closed cup.",
    tags:["deck","std"],
    a:"Right. 220 °C is a Cleveland open-cup value on a reference grade. Closed-cup methods usually read lower, so the margin over 150 °C has to be demonstrated, not assumed. The scorecard shows <b>CLOSED-CUP TEST</b> until that measurement exists.",
    sandbox:"Tick 'Flash point measured closed-cup' to see the gate turn green when the value is real."},
   {q:"Why put a combustible oil in a data hall when fluorinated fluids don't burn?",
    tags:["deck","scope"],
    a:"Non-flammability is a genuine strength of fluorinated fluids (slide 6). For hydrocarbons, the gates are flash point ≥ 150 °C closed cup and autoignition ≥ 300 °C, both far above bath operating temperatures. Acceptance by the local fire code for each site is outside this study."}]},
 {cat:"Materials & qualification", icon:"🧪", desc:"What the fluid does to the server, and vice versa.",
  qs:[
   {q:"Will it swell seals or attack cable jackets?",
    tags:["deck","scope"],
    a:"That is exactly stage 2: fluid aged with seals, plastics, cables and metals at <b>80 °C × 336 h</b>, then stage 3 soaks representative server parts at <b>80 °C × 14 days</b> with a functional retest. No compatibility result is claimed yet."},
   {q:"Why Group III rather than PAO, which is already used?",
    tags:["std","deck"],
    a:"Both are hydrocarbons in the same family (slide 5). PAO is a synthetic made by oligomerising olefins. Group III comes from hydroprocessing refinery lube streams, which is the refinery opportunity this talk is about: a domestic product at a target of US$2–5 per litre."}]},
 {cat:"Market sizing", icon:"📈", desc:"How the 32,000 t is built.",
  qs:[
   {q:"Is all 3.9 GW really going to be immersion-cooled?",
    tags:["deck","calc"],
    a:"The slide applies 10 L/kW across the identified 3.9 GW AI pipeline, so read 32,000 t as the size <b>if</b> that pipeline were immersion-cooled. It is a first fill only, with no top-up. The share slider in the Sandbox scales it down linearly.",
    sandbox:"Market sizing → set the share to 25 %."},
   {q:"\"16× cheaper\" — compared with what?",
    tags:["deck","calc"],
    a:"Fluorinated fluids at US$80–200 per litre against a Group III target of US$2–5. The most conservative pairing is 80 ÷ 5 = <b>16×</b>; the other extreme is 200 ÷ 2 = 100×. US$2–5 is a target price, not a quotation."},
   {q:"How sensitive is the tonnage to 10 L/kW?",
    tags:["calc"],
    a:"Linear. Tank designs and loading vary, so the slider runs from 5 to 15 L/kW: that moves the 3.9 GW estimate from about 16,000 t to about 48,000 t at the same density."}]},
];

// ---------------- state ----------------
const S = {};
function resetState(){
  Object.assign(S, {rack:120, preset:"g3", mu:15.4, me:DECK.gw.me, in:DECK.gw.in, share:100, int:DECK.lPerKW, price:3.5});
  loadPreset("g3");
}
function loadPreset(k){
  const p = PRESETS[k]; S.preset = k;
  S.fluid = {...p}; S.mu = p.mu0;
}
const $ = id => document.getElementById(id);
const fmt = (v,d=1) => (v==null||isNaN(v)) ? "—" : (+v).toFixed(d);
const fom1At = mu => S.fluid.fom1==null ? null : S.fluid.fom1 * Math.pow(S.fluid.mu0/mu, DECK.n);

// ---------------- gate evaluation ----------------
// status: pass | near | test | fail
function gates(){
  const f = S.fluid, out = [];
  const add = (pillar, name, val, req, status, why) => out.push({pillar,name,val,req,status,why});
  const f1 = fom1At(S.mu);
  if(f1==null) add("Thermal","FOM1 natural convection","—","≥ 35 Tier 1 · ≥ 45 Tier 2","test","not reported");
  else add("Thermal","FOM1 natural convection", fmt(f1,1)+(f1>=DECK.fom1T2?" (Tier 2)":f1>=DECK.fom1T1?" (Tier 1)":""), "≥ 35 Tier 1 · ≥ 45 Tier 2",
           f1>=DECK.fom1T1?"pass":f1>=DECK.fom1T1*0.95?"near":"fail");
  if(f.fom2==null) add("Thermal","FOM2 forced convection","—","> 19","test","not reported");
  else add("Thermal","FOM2 forced convection",fmt(f.fom2,1),"> 19",f.fom2>DECK.fom2Min?"pass":"fail");
  add("Viscosity","FOM3 · μ at 25 °C",fmt(S.mu,1)+" mPa·s","≤ 15 mPa·s",
      S.mu<=DECK.muMax?"pass":S.mu<=DECK.muMax*1.05?"near":"fail");
  if(f.dk==null) add("Electrical","Dielectric constant Dk","—","< 2.3","test","not reported");
  else add("Electrical","Dielectric constant Dk",fmt(f.dk,2),"< 2.3",
      f.dk<DECK.dkMax?"pass":f.dk<=DECK.dkMax*1.02?"test":"fail", f.dk>=DECK.dkMax&&f.dk<=DECK.dkMax*1.02?"at the limit — test at high frequency":"");
  if(f.df==null) add("Electrical","Loss tangent Df","—","≤ 0.05","test","not yet measured");
  else add("Electrical","Loss tangent Df",fmt(f.df,3),"≤ 0.05",f.df<=DECK.dfMax?"pass":"fail");
  if(f.str==null) add("Electrical","Dielectric strength","—","≥ 6 kV/mm","test","not reported");
  else add("Electrical","Dielectric strength",fmt(f.str,1)+" kV/mm","≥ 6 kV/mm",f.str>=DECK.strengthMin?"pass":"fail");
  if(f.res==null) add("Electrical","Volume resistivity (new)","—","≥ 2.0 GΩ·m","test","not yet measured");
  else add("Electrical","Volume resistivity (new)",fmt(f.res,1)+" GΩ·m","≥ 2.0 GΩ·m",f.res>=DECK.resMin?"pass":"fail");
  if(f.flash==null) add("Safety","Flash point","—","≥ 150 °C closed cup","test","not reported");
  else{
    const ok = f.flash>=DECK.flashMin;
    add("Safety","Flash point",fmt(f.flash,0)+" °C "+(f.cc?"closed cup":"open cup"),"≥ 150 °C closed cup",
        !ok?"fail":f.cc?"pass":"test", ok&&!f.cc?"open-cup value — closed-cup test needed":"");
  }
  if(f.ait==null) add("Safety","Autoignition temperature","—","≥ 300 °C","test","not reported");
  else add("Safety","Autoignition temperature",fmt(f.ait,0)+" °C","≥ 300 °C",f.ait>=DECK.aitMin?"pass":"fail");
  return out;
}
const STLABEL = {pass:"PASS", near:"NEAR LIMIT", test:"TO TEST", fail:"FAIL"};

// ---------------- svg helpers ----------------
function svgEl(t,a){const e=document.createElementNS("http://www.w3.org/2000/svg",t);for(const k in a)e.setAttribute(k,a[k]);return e;}
function txt(svg,x,y,s,a={}){const t=svgEl("text",{x,y,...a});t.textContent=s;svg.appendChild(t);return t;}

function renderRack(){
  const svg=$("rackChart"); svg.innerHTML="";
  const X0=10,X1=310,max=300, sx=v=>X0+(X1-X0)*Math.min(v,max)/max;
  const bands=[["Air",DECK.air[0],DECK.air[1],"#c9d1dc",14,"≤ 25"],["Direct-to-chip",DECK.dlc[0],max,"#b6c9e4",40,"80–150+"],["Single-phase immersion",DECK.imm[0],max,"#b9dfbb",66,"100–250+"]];
  bands.forEach(([n,a,b,c,y,lab],i)=>{
    const solidEnd = i===0?b:(i===1?DECK.dlc[1]:DECK.imm[1]);
    svg.appendChild(svgEl("rect",{x:sx(a),y,width:sx(solidEnd)-sx(a),height:20,rx:4,fill:c}));
    if(b>solidEnd) svg.appendChild(svgEl("rect",{x:sx(solidEnd),y,width:sx(b)-sx(solidEnd),height:20,rx:4,fill:c,opacity:.45}));
    txt(svg,sx(a)+4,y+13.5,i===0?n:`${n} · ${lab} kW`,{style:"font:700 8.5px sans-serif;fill:#14213D"});
  });
  for(let v=0;v<=300;v+=50){svg.appendChild(svgEl("line",{x1:sx(v),x2:sx(v),y1:90,y2:94,class:"axis"}));txt(svg,sx(v),103,v,{class:"tick","text-anchor":"middle"});}
  txt(svg,160,115,"kW per rack",{class:"tick","text-anchor":"middle"});
  svg.appendChild(svgEl("line",{x1:sx(S.rack),x2:sx(S.rack),y1:6,y2:92,stroke:"#C84C3A","stroke-width":2.5}));
  txt(svg,Math.min(sx(S.rack)+3,270),9,`${S.rack} kW`,{style:"font:800 9px sans-serif;fill:#C84C3A"});
  const fits=[]; if(S.rack<=DECK.air[1])fits.push("air");
  if(S.rack>=DECK.dlc[0])fits.push("direct-to-chip"); if(S.rack>=DECK.imm[0])fits.push("single-phase immersion");
  $("rackNote").innerHTML = fits.length ? `At <b>${S.rack} kW</b>: typical fit is <b>${fits.join(" or ")}</b>.`
    : `At <b>${S.rack} kW</b>: beyond air (≤ 25 kW); liquid assistance needed — the slide's liquid bands start at 80 kW.`;
}

function renderScore(){
  const G=gates(), by={pass:0,near:0,test:0,fail:0}; G.forEach(g=>by[g.status]++);
  $("scorecard").innerHTML = `<table class="score"><thead><tr><th>Requirement</th><th>Fluid</th><th>OCP limit</th><th>Status</th></tr></thead><tbody>`+
    G.map(g=>`<tr><td><span class="pill">${g.pillar}</span> ${g.name}${g.why?`<div class="why">${g.why}</div>`:""}</td><td><b>${g.val}</b></td><td>${g.req}</td><td><span class="st ${g.status}">${STLABEL[g.status]}</span></td></tr>`).join("")+
    `</tbody></table><div class="assume">${S.fluid.note}</div>`;
  const v=$("verdict");
  let cls,big,sub;
  if(by.fail){cls="fail";big="NOT YET";sub=`${by.fail} requirement${by.fail>1?"s":""} failed`;}
  else if(by.near||by.test){cls="amber";big="PROMISING";sub="screening pass — tests outstanding";}
  else {cls="pass";big="MEETS GATES";sub="every listed OCP gate passed";}
  v.className="verdict "+cls; $("vbig").textContent=big; $("vsub").textContent=sub;
  $("vmargin").innerHTML=`${by.pass} pass · ${by.near} near limit · ${by.test} to test · ${by.fail} fail <span class="src ext">DECK limits</span>`;
}

function renderMu(){
  const svg=$("muChart"); svg.innerHTML="";
  const L=34,R=310,T=10,B=165, x0=4,x1=25,y0=20,y1=60;
  const sx=v=>L+(R-L)*(v-x0)/(x1-x0), sy=v=>B-(B-T)*(Math.max(y0,Math.min(y1,v))-y0)/(y1-y0);
  if(S.fluid.fom1==null){txt(svg,160,90,"FOM1 not reported for this preset",{class:"tick","text-anchor":"middle"});return;}
  // feasible window: mu <= 15 and FOM1 >= 35
  let muLo=x0; const muT1=S.fluid.mu0*Math.pow(S.fluid.fom1/DECK.fom1T1,1/DECK.n);
  const winHi=Math.min(DECK.muMax,muT1);
  if(winHi>x0) svg.appendChild(svgEl("rect",{x:sx(muLo),y:T,width:sx(winHi)-sx(muLo),height:B-T,fill:"#e9f6ea"}));
  for(let v=y0;v<=y1;v+=10){svg.appendChild(svgEl("line",{x1:L,x2:R,y1:sy(v),y2:sy(v),class:"grid"}));txt(svg,L-4,sy(v)+3,v,{class:"tick","text-anchor":"end"});}
  for(let v=5;v<=25;v+=5){txt(svg,sx(v),B+11,v,{class:"tick","text-anchor":"middle"});}
  txt(svg,(L+R)/2,B+22,"μ at 25 °C (mPa·s)",{class:"tick","text-anchor":"middle"});
  txt(svg,8,(T+B)/2,"FOM1",{class:"tick",transform:`rotate(-90 8 ${(T+B)/2})`,"text-anchor":"middle"});
  [[DECK.fom1T1,"Tier 1 ≥ 35","#4A6FA5"],[DECK.fom1T2,"Tier 2 ≥ 45","#2E7D32"]].forEach(([v,l,c])=>{
    svg.appendChild(svgEl("line",{x1:L,x2:R,y1:sy(v),y2:sy(v),stroke:c,"stroke-dasharray":"4 3","stroke-width":1.2}));
    txt(svg,R-2,sy(v)-3,l,{class:"curvelbl","text-anchor":"end",fill:c});});
  svg.appendChild(svgEl("line",{x1:sx(DECK.muMax),x2:sx(DECK.muMax),y1:T,y2:B,stroke:"#C84C3A","stroke-dasharray":"4 3","stroke-width":1.2}));
  txt(svg,sx(DECK.muMax)+3,T+9,"FOM3 ≤ 15",{class:"curvelbl",fill:"#C84C3A"});
  let d=""; for(let m=x0;m<=x1+1e-9;m+=0.25){d+=(d?"L":"M")+sx(m).toFixed(1)+","+sy(fom1At(m)).toFixed(1);}
  svg.appendChild(svgEl("path",{d,fill:"none",stroke:"#14213D","stroke-width":2.2}));
  const f=fom1At(S.mu);
  svg.appendChild(svgEl("circle",{cx:sx(S.mu),cy:sy(f),r:5,fill:"#C84C3A",stroke:"#fff","stroke-width":1.5}));
  txt(svg,sx(S.mu)+(S.mu>20?-6:7),sy(f)-7,`${fmt(S.mu,1)} mPa·s → FOM1 ${fmt(f,1)}`,{class:"curvelbl","text-anchor":S.mu>20?"end":"start",fill:"#C84C3A"});
}

function renderMarket(){
  const gw=(S.me+S.in)*S.share/100, L=gw*1e6*S.int, t=L*DECK.rho/1000;
  const M=v=>v>=1e9?"US$"+(v/1e9).toFixed(1)+" B":"US$"+Math.round(v/1e6)+" M";
  const row=(a,b)=>`<div class="row"><span>${a}</span><b>${b}</b></div>`;
  const isDeck = Math.abs(S.me-2.5)<1e-9&&Math.abs(S.in-1.4)<1e-9&&S.share===100&&S.int===10;
  $("market").innerHTML =
    row("AI load considered", fmt(gw,2)+" GW")+
    row("Coolant volume (first fill)", (L/1e6).toFixed(1)+" million L")+
    row(`Mass at ${DECK.rho} kg/L <span class="src calc">CALC</span>`, (Math.round(t/100)*100).toLocaleString("en-US")+" t")+
    row(`Value at US$${fmt(S.price,1)}/L`, M(L*S.price))+
    row("Value at deck target US$2–5/L", M(L*DECK.price[0])+" – "+M(L*DECK.price[1]))+
    row("Same litres in fluorinated fluid (US$80–200/L)", M(L*DECK.fluoro[0])+" – "+M(L*DECK.fluoro[1]))+
    row("Price ratio, closest ends", (DECK.fluoro[0]/DECK.price[1]).toFixed(0)+"× ")+
    (isDeck?`<div class="badge">✓ Reproduces slide 11: ≈ 39 ML · ≈ 32,000 t · ≈ US$80–200 M</div>`:"");
}

function renderPhases(){
  const rows=[["Heat-transfer mechanism","Sensible heat: fluid warms and is pumped to the CDU","Latent heat: fluid boils at the chip and condenses"],
    ["Fluid cost","Hydrocarbon target ~US$2–5/L","Fluorinated liquids: far higher"],
    ["Fluid loss / make-up","Low: coolant stays liquid in the bath","Vapour loss needs sealed containment and make-up"],
    ["Environment / regulation","No PFAS; GWP ≈ 0","PFAS exposure and regulatory headwinds"],
    ["Tank & maintenance","Open bath + pump/CDU; simpler service","Sealed tank + condenser + pressure control"]];
  $("phases").innerHTML=`<table class="score"><thead><tr><th></th><th>Single-phase</th><th>Two-phase</th></tr></thead><tbody>`+
    rows.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")+`</tbody></table>`;
}

function render(){
  $("rackVal").textContent=S.rack+" kW";
  $("muVal").textContent=fmt(S.mu,1)+" mPa·s";
  $("meVal").textContent=fmt(S.me,1)+" GW"; $("inVal").textContent=fmt(S.in,1)+" GW";
  $("shareVal").textContent=S.share+" %"; $("intVal").textContent=fmt(S.int,1)+" L/kW";
  $("priceVal").textContent="US$"+fmt(S.price,1)+" /L";
  renderRack(); renderScore(); renderMu(); renderMarket(); renderPhases();
}

// ---------------- controls ----------------
function buildFluidFields(){
  $("fluidFields").innerHTML = FIELDS.map(([k,l,u,st])=>
    `<label class="numrow">${l}${u?` <span class="hint">(${u})</span>`:""}
      <input type="number" step="${st}" id="f_${k}" value="${S.fluid[k]==null?"":S.fluid[k]}" placeholder="not reported"></label>`).join("");
  FIELDS.forEach(([k])=>$("f_"+k).addEventListener("input",e=>{
    const v=e.target.value.trim(); S.fluid[k]= v===""?null:+v;
    if(k==="fom1") S.fluid.mu0=S.mu;   // a typed FOM1 is taken at the current viscosity
    render();}));
  $("flashCC").checked=!!S.fluid.cc;
}
function syncControls(){
  $("rack").value=S.rack; $("mu").value=S.mu; $("me").value=S.me; $("in").value=S.in;
  $("share").value=S.share; $("int").value=S.int; $("price").value=S.price; $("preset").value=S.preset;
  buildFluidFields();
}
function wire(){
  Object.entries(PRESETS).forEach(([k,p])=>{const o=document.createElement("option");o.value=k;o.textContent=p.name;$("preset").appendChild(o);});
  $("preset").addEventListener("change",e=>{loadPreset(e.target.value);syncControls();render();});
  [["rack",1],["mu",1],["me",1],["in",1],["share",1],["int",1],["price",1]].forEach(([id])=>
    $(id).addEventListener("input",e=>{S[id]=+e.target.value;render();}));
  $("flashCC").addEventListener("change",e=>{S.fluid.cc=e.target.checked;render();});
  $("resetBtn").addEventListener("click",()=>{resetState();syncControls();render();});
  $("mStory").addEventListener("click",()=>setMode("story"));
  $("mSandbox").addEventListener("click",()=>setMode("sandbox"));
  $("mHistory").addEventListener("click",()=>setMode("history"));
  $("mQA").addEventListener("click",()=>setMode("qa"));
  $("toSandbox").addEventListener("click",()=>setMode("sandbox"));
  $("nextBtn").addEventListener("click",()=>showStep(step+1));
  $("prevBtn").addEventListener("click",()=>showStep(step-1));
  $("lessonCheck").addEventListener("click",e=>{
    const b=e.target.closest(".opt"); if(!b) return;
    const box=b.closest(".check");
    box.querySelectorAll(".opt").forEach(o=>{
      if(o.dataset.ok==="1") o.classList.add("correct"); else if(o===b) o.classList.add("wrong");
      o.disabled=true; o.style.cursor="default";});
    box.querySelector(".reveal").classList.add("show");
  });
  $("reflist").innerHTML = REFS.map(r=>`<div>• <b>${r[0]}</b> — ${r[1]}</div>`).join("");
  $("history").innerHTML = HISTORY.map(b=>`
    <div class="histblock"><div class="heyebrow">${b.eyebrow}</div><h2>${b.title}</h2><p class="hintro">${b.intro}</p>
      <div class="stages" style="--n:${b.stages.length}">
        ${b.stages.map(s=>`<div class="stage ${s.cls||""}"><div class="stag">${s.tag}</div><h4>${s.h}</h4><p>${s.d}</p></div>`).join("")}
      </div><div class="htake">${b.take}</div></div>`).join("");
  const TAGLABEL={deck:"DECK · on the slides",calc:"CALC · computed here",std:"STD · textbook",scope:"SCOPE · open / future work"};
  $("qa").innerHTML =
    `<div class="qaintro"><b>Tough questions, honest answers.</b> Every answer is tagged so you can see what rests on the slides, on arithmetic, on textbook knowledge, or is still open.
       <div class="qalegend">${Object.keys(TAGLABEL).map(k=>`<span class="qatag ${k}">${TAGLABEL[k]}</span>`).join("")}</div></div>` +
    QA.map(c=>`<div class="qacat"><h3>${c.icon} ${c.cat}</h3><p class="cdesc">${c.desc}</p>` +
      c.qs.map(q=>`<div class="qaitem"><div class="qaq"><span class="tw">▸</span><span>${q.q}</span></div>
        <div class="qaa">${q.tags.map(t=>`<span class="qatag ${t}">${t.toUpperCase()}</span>`).join("")}
        <div>${q.a}</div>${q.sandbox?`<div class="qatry">🎛️ Try in Sandbox: ${q.sandbox}</div>`:""}</div></div>`).join("") +
      `</div>`).join("");
  $("qa").addEventListener("click",e=>{const q=e.target.closest(".qaq"); if(q) q.parentElement.classList.toggle("open");});
}

// ---------------- story ----------------
let step=0;
function checkHTML(c){
  return `<div class="check"><div class="q">🤔 ${c.q}</div>` +
    c.opts.map(o=>`<button class="opt" data-ok="${o.ok?1:0}">${o.t}</button>`).join("") +
    `<div class="reveal">${c.reveal}</div></div>`;
}
function showStep(i){
  step=(i+STORY.length)%STORY.length;
  const L=STORY[step];
  resetState();
  if(L.set){ if(L.set.preset) loadPreset(L.set.preset); const {preset,...rest}=L.set; Object.assign(S,rest); }
  syncControls();
  $("chapBadge").textContent="Part "+L.ch;
  $("lessonCount").textContent="Step "+(step+1)+" / "+STORY.length;
  $("progFill").style.width=(100*(step+1)/STORY.length)+"%";
  $("storyTitle").textContent=L.title;
  $("storyBody").innerHTML=L.body;
  $("lessonCheck").innerHTML=L.check?checkHTML(L.check):"";
  $("prevBtn").disabled=step===0;
  $("nextBtn").textContent=step===STORY.length-1?"Restart ↺":"Next ›";
  render();
}
function setMode(m){
  $("mStory").classList.toggle("active",m==="story");
  $("mSandbox").classList.toggle("active",m==="sandbox");
  $("mHistory").classList.toggle("active",m==="history");
  $("mQA").classList.toggle("active",m==="qa");
  $("story").classList.toggle("hidden",m!=="story");
  $("controls").classList.toggle("hidden",m!=="sandbox");
  $("history").classList.toggle("hidden",m!=="history");
  $("qa").classList.toggle("hidden",m!=="qa");
  $("outputs").classList.toggle("hidden",!(m==="story"||m==="sandbox"));
  if(m==="story") showStep(step); else if(m==="sandbox"){syncControls();render();}
  window.scrollTo({top:0,behavior:"smooth"});
}

resetState(); wire(); syncControls(); showStep(0);
