const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  251: "Erectile dysfunction workup: assess for Cialis (tadalafil) appropriateness. PDE5 inhibitors: Cialis = slow acting (36 hrs), Viagra = faster (4-6 hrs). Contraindicated with nitrates. Assess cardiovascular status before prescribing.",

  252: "CN VII (Facial nerve): controls facial expressions—frowning, smiling, eye closure. Test by asking patient to smile, raise eyebrows, puff cheeks. Bell's palsy = CN VII paralysis. Mnemonic: 'Seven makes you look like heaven' (facial expressions).",

  253: "CN V (Trigeminal): motor function to muscles of mastication (temporal, masseter, pterygoids). Test by palpating temporal muscle during jaw clench. Also provides facial sensation. Board tip: V = chewing; VII = expressions.",

  254: "Accutane (isotretinoin) causes DEPRESSION—FDA Black Box Warning. Must use iPLEDGE program. Also teratogenic (pregnancy test required). Teach patient: Report mood changes, suicidal thoughts. Monitor mood throughout treatment.",

  255: "Moro reflex: present at birth through 4-6 months. Triggered by sudden movement or loud noise—infant extends arms then brings them together. Absence may indicate neurological problem. Persistence beyond 6 months = abnormal.",

  256: "1-month-old motor milestones: palmar grasp reflex present. Also: follows to midline, lifts head briefly when prone. Social smile emerges around 6-8 weeks. Teach parents: Tummy time promotes motor development.",

  257: "Fetal Alcohol Syndrome (FASD): refer for Early Intervention services. Addresses developmental delays, learning disabilities, behavioral issues. Services available birth to 3 years. Multidisciplinary approach essential.",

  258: "FAS facial features: microcephaly (small head), thin upper lip, smooth philtrum (flat groove between nose and lip), short palpebral fissures (small eyes). Cognitive impairment, growth deficiency. No safe amount of alcohol in pregnancy.",

  259: "EPS can progress to Tardive Dyskinesia (TD): involuntary movements of face/tongue/trunk after chronic antipsychotic use. Monitor with AIMS scale every 6 months. TD may be irreversible. Consider switching to atypical antipsychotic.",

  260: "EPS does NOT include hypothermia/bradycardia (those are NMS signs). EPS includes: akathisia (restlessness), akinesia (lack of movement), dystonia (muscle spasms), pseudoparkinsonism (tremor, rigidity, shuffling gait).",

  261: "HIV-associated dementia: first symptoms are cognitive—poor concentration, memory loss, slowed thinking. Subcortical dementia pattern. Screen when CD4 <200. Treat underlying HIV. Different from delirium.",

  262: "Off-label prescribing in children: MUST document informed consent from parent/guardian. Discuss risks, benefits, alternatives, lack of FDA pediatric approval. Document discussion and consent in medical record.",

  263: "Penicillin allergy: avoid cephalosporins due to 2-10% cross-reactivity, especially first-generation (cephalexin). Later generations have lower cross-reactivity. Safe alternatives: azithromycin, fluoroquinolones. Get allergy details.",

  264: "Dual relationships: maintain confidentiality for EACH patient separately. Cannot discuss one patient's information with another, even family members. Document boundaries. Refer out if conflict unavoidable.",

  265: "Sleep apnea: snoring occurs due to upper airway obstruction during sleep. Associated symptoms: witnessed apneas, gasping, daytime sleepiness, morning headaches. Confirm with polysomnography (sleep study).",

  266: "Phobic anxiety: discourage benzodiazepine use long-term. First-line: CBT with exposure therapy, SSRIs. Benzos provide quick relief but prevent habituation and cause dependence. Use short-term if needed for specific events.",

  267: "Anorexia refeeding: bloating is NORMAL—gastroparesis from malnutrition. Advise spacing meals, smaller frequent portions. Avoid laxatives. Gradual refeeding prevents refeeding syndrome (watch phosphorus, potassium, magnesium).",

  268: "PICOT framework: P=Population/Patient, I=Intervention, C=Comparison, O=Outcome, T=Time. Used to formulate clinical research questions. Example: In depressed adults (P), does CBT (I) vs medication (C) improve symptoms (O) at 8 weeks (T)?",

  269: "Carbamazepine is CYP450 INDUCER—increases clearance of other drugs, DECREASING their levels (subtherapeutic). Affects: oral contraceptives, warfarin, other anticonvulsants. Pregnancy: causes neural tube defects.",

  270: "CYP3A4 INHIBITORS increase carbamazepine levels: erythromycin, cimetidine, verapamil, diltiazem, grapefruit juice. Signs of toxicity: ataxia, diplopia, nausea, dizziness. Monitor levels when adding inhibitors.",

  271: "Carbamazepine does NOT cause hypertensive crisis (that's MAOIs). DOES cause: Stevens-Johnson syndrome, toxic epidermal necrolysis, agranulocytosis, aplastic anemia, hepatotoxicity. Screen HLA-B*1502 in Asians.",

  272: "Alcohol use in pregnancy: naltrexone is CONTRAINDICATED in pregnancy. Benzodiazepines used ONLY for acute withdrawal management, not maintenance. Behavioral interventions first-line. Monitor for fetal alcohol effects.",

  273: "Wellbutrin (bupropion) + Lexapro: lower Wellbutrin dose due to seizure risk. Bupropion lowers seizure threshold. Risk higher with doses >450mg/day or rapid dose increases. Digoxin interaction less concerning.",

  274: "Research informed consent: MUST be signed (written consent required). Includes: purpose, procedures, risks, benefits, alternatives, voluntary participation, right to withdraw. IRB approval required. Document thoroughly.",

  275: "Patient-Centered Medical Home (PCMH): provides comprehensive whole-person care in ambulatory setting. Integrates behavioral health, coordinates care, emphasizes prevention. Primary care model for chronic disease management."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 12 complete: Updated ${updateCount} questions (251-275)`);
