const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  401: "Cultural competency: teach staff about healing traditions. Native American healing stick has spiritual significance. Restraints were inappropriate cultural conflict, not medical necessity. Advocate for culturally sensitive care.",

  402: "Somatization in Hispanic culture: 'nervios' (nerves) manifests as GI symptoms. Grief + depression presents somatically. Validate experience, recognize cultural expression of distress. Don't over-medicalize. Culturally specific care essential.",

  403: "ADHD impulsivity: PREFRONTAL CORTEX (dorsolateral and orbitofrontal) dysfunction. Executive function deficits. Underdeveloped in ADHD. Stimulants increase dopamine/norepinephrine in PFC. PFC fully develops around age 25.",

  404: "Eating disorder hospitalization: any weight with MEDICAL INSTABILITY (not just BMI). Criteria: HR <50, BP <80/50, temp <97°F, electrolyte abnormalities, arrhythmias, acute weight refusal, syncope. Medical stability determines level of care.",

  405: "Autism and mirror neurons: theory suggests mirror neuron dysfunction affects social learning, imitation, understanding others' actions/intentions. Brain areas involved: amygdala (emotion), frontal/parietal (mirror system).",

  406: "Osteoporosis prevention: WEIGHT-BEARING EXERCISE + lifestyle changes (stop smoking, limit alcohol/caffeine). Also: calcium 1200mg + vitamin D 800-1000 IU daily. Relevant for patients on SSRIs, steroids, antipsychotics.",

  407: "Clock drawing test: tests executive function, visuospatial ability. Involves RIGHT HEMISPHERE (visuospatial) and DORSOLATERAL PREFRONTAL cortex (planning, sequencing). Abnormal in dementia, stroke, frontal lesions.",

  408: "Research dissemination: PEER-REVIEWED JOURNALS provide highest credibility. Ensures quality control, expert review. Conferences, newspapers for broader reach but less rigorous. EBP relies on peer-reviewed evidence.",

  409: "Evidence hierarchy: META-ANALYSES and SYSTEMATIC REVIEWS of RCTs are highest level. Synthesize multiple studies, reduce bias. Then: RCTs > cohort > case-control > case series > expert opinion (lowest).",

  410: "Accutane (isotretinoin): HIGHLY TERATOGENIC (Category X). Causes severe birth defects: craniofacial, cardiac, CNS abnormalities. iPLEDGE program mandates contraception + pregnancy tests. Absolute contraindication in pregnancy.",

  411: "Stimulant-induced tics: switch to GUANFACINE or clonidine (alpha-2 agonists). Non-stimulant options don't worsen tics. Guanfacine preferred (once daily, longer acting). Atomoxetine also an option.",

  412: "Depression with marital conflicts (3-6 months): INTERPERSONAL THERAPY (IPT) ideal—focuses on relationship issues, role transitions. Time-limited (12-16 sessions). Psychodynamic for deeper exploration. Exposure for PTSD, not depression.",

  413: "ADHD with tics—switch to GUANFACINE: alpha-2 agonist that DOESN'T worsen tics (may help them). Stimulants can exacerbate tics. Guanfacine also treats ADHD. Once-daily dosing. Fewer cardiovascular effects than clonidine.",

  414: "Weight-neutral mood stabilizer: LAMICTAL (lamotrigine). May cause slight weight LOSS. Lithium, Depakote, Zyprexa cause significant weight gain. For weight-concerned patients, lamotrigine is good choice. Monitor for SJS rash.",

  415: "PTSD evidence-based therapies: EMDR (Eye Movement Desensitization Reprocessing), PE (Prolonged Exposure), CPT (Cognitive Processing Therapy). Image rehearsal for nightmares. All trauma-focused CBT variants. First-line per VA/DoD guidelines.",

  416: "Alcohol withdrawal signs: tremors, sweating, tachycardia, anxiety, seizures (can occur 24-48 hrs), DTs (48-96 hrs with hallucinations). With hepatic problems, use LORAZEPAM (Ativan)—shorter-acting, metabolized by glucuronidation not CYP450.",

  417: "CIWA-Ar scoring: 8-15 = mild (PRN benzos), ≥16 = moderate-severe (scheduled benzos with q2hr assessments). Score <8 may not need medication. Goal: prevent seizures, DTs. Symptom-triggered dosing more effective than fixed schedule.",

  418: "20-year-old with social difficulties: Still in IDENTITY VS ROLE CONFUSION stage (12-20 years per Erikson). Forming identity. Next stage (20-40) is Intimacy vs Isolation. Difficulty relates to identity formation challenges.",

  419: "8-year-old sexualized play: age-inappropriate sexual knowledge WARRANTS INVESTIGATION. Report to CPS. Sexual behavior in young children may indicate abuse exposure. Not normal developmental play. Mandatory reporting.",

  420: "Lamictal weight-neutral: TRUE. One of few mood stabilizers without weight gain. May cause slight weight loss. Good for bipolar depression. Main concern: rash (Stevens-Johnson syndrome)—start low, go slow titration.",

  421: "Tegretol + erythromycin: erythromycin INHIBITS CYP3A4 → INCREASES Tegretol levels → toxicity. DECREASE Tegretol dose or use alternative antibiotic. Monitor for toxicity: ataxia, diplopia, nystagmus.",

  422: "ACE inhibitors indication: HEART FAILURE (HFrEF) primary indication. Also: hypertension, post-MI, diabetic nephropathy, chronic kidney disease. Reduce mortality in HF. PMHNP needs to know for medication reconciliation.",

  423: "DDAVP (desmopressin) teaching: mother should understand it DECREASES urine production. Used for enuresis (bedwetting). Synthetic ADH. Give before bed. Monitor for water retention, hyponatremia. Restrict fluids at night.",

  424: "Appreciative inquiry: TRUE—focuses on STRENGTHS, HOPE, what's working. Doesn't blame. Positive organizational change method. 4-D cycle: Discover, Dream, Design, Destiny. Solution-focused approach.",

  425: "Recovery model: TRUE—gives HOPE, promotes patient empowerment, self-determination, meaningful life beyond illness. Not cure-focused. Person-centered. Beyond symptom reduction. SAMHSA guiding principle."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 18 complete: Updated ${updateCount} questions (401-425)`);
