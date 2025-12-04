const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     FIXING ALL MISMATCHED RATIONALES                           ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let fixCount = 0;

// Comprehensive rationale fixes based on the mismatch analysis
const rationalesFixes = {
  6: "LITHIUM THERAPEUTIC LEVEL for maintenance: 0.6-1.2 mEq/L (0.8 mEq/L is optimal). For acute mania: 0.8-1.2 mEq/L. Draw trough level 12 hours after last dose. Patient education: maintain consistent sodium and fluid intake, avoid NSAIDs and dehydration. Signs of toxicity (>1.5 mEq/L): tremor, ataxia, confusion, vomiting, diarrhea. Regular monitoring: every 3-6 months when stable.",

  15: "FLUOXETINE (Prozac) 60 mg/day is the ONLY FDA-approved medication for BULIMIA NERVOSA. Higher dose needed (60mg vs 20mg for depression) because bulimia requires more serotonin modulation. SSRIs reduce binge-purge frequency. Avoid bupropion in eating disorders (seizure risk due to electrolyte imbalances). CBT is first-line psychotherapy for bulimia.",

  18: "BUPROPION (Wellbutrin) is preferred for patients with SSRI-induced sexual dysfunction. Mechanism: norepinephrine-dopamine reuptake inhibitor (NDRI) - NO serotonergic effects that cause sexual dysfunction. Also weight-neutral. Alternatives: mirtazapine (may cause sedation/weight gain), adding buspirone, dose reduction. Bupropion contraindicated in eating disorders and seizure history.",

  26: "ZIPRASIDONE (Geodon) has the HIGHEST risk of QTc prolongation among atypical antipsychotics. AVOID in patients with existing QTc prolongation, history of arrhythmias, or concurrent QTc-prolonging drugs. Safest options for QTc concerns: aripiprazole, lurasidone. Get baseline ECG before starting high-risk antipsychotics. QTc >500ms or increase >60ms = discontinue drug.",

  27: "VALPROATE (Depakote) is excellent for bipolar I with multiple breakthrough manic episodes. Advantages: rapid loading possible (20-30 mg/kg), effective for mixed states, less weight gain than olanzapine. Therapeutic level: 50-125 mcg/mL. Monitor: LFTs, CBC with platelets, ammonia. Contraindicated in pregnancy (neural tube defects). Consider if lithium has failed.",

  28: "HLA-B*1502 screening is REQUIRED before starting CARBAMAZEPINE in patients of ASIAN ancestry. This allele increases risk of Stevens-Johnson Syndrome (SJS) and Toxic Epidermal Necrolysis (TEN) by 100-fold. If positive, do NOT use carbamazepine. Also screen HLA-A*3101 for Northern European ancestry. Alternative mood stabilizers: valproate, lamotrigine, lithium.",

  29: "VALPROATE LOADING DOSE: 20-30 mg/kg/day for acute mania. Achieves therapeutic levels in 1-2 days vs 5-7 days with standard titration. Divide into 2-3 doses to reduce GI side effects. Can use oral or IV route. Target level: 85-125 mcg/mL for acute mania. Divalproex sodium ER formulation allows once-daily dosing. Check levels 12 hours after last dose.",

  40: "NEUROLEPTIC MALIGNANT SYNDROME (NMS) with RHABDOMYOLYSIS: CK >10,000 indicates severe muscle breakdown. This patient on clozapine shows classic NMS: obtunded (altered mental status), elevated CK (muscle rigidity/breakdown). Other NMS signs: fever >104°F, lead-pipe rigidity, autonomic instability. Treatment: stop antipsychotic, IV fluids, dantrolene, bromocriptine. ICU admission for monitoring.",

  71: "DIALECTICAL BEHAVIOR THERAPY (DBT) is the GOLD STANDARD for Borderline Personality Disorder. Four core modules: (1) Mindfulness, (2) Distress Tolerance, (3) Emotion Regulation, (4) Interpersonal Effectiveness. Evidence shows DBT reduces self-harm, suicidal behavior, and hospitalizations. Weekly individual therapy + skills group. Addresses chronic emptiness through validation and behavior change.",

  203: "LITHIUM THERAPEUTIC LEVEL: 0.6-1.2 mEq/L for maintenance. Key points: Draw trough level 12 hours post-dose. Acute mania target: 0.8-1.2 mEq/L. Maintenance target: 0.6-1.0 mEq/L (lower for elderly). Toxicity begins >1.5 mEq/L. Monitor every 3-6 months when stable. Factors that increase levels: dehydration, NSAIDs, ACE inhibitors, thiazides.",

  208: "CARBAMAZEPINE THERAPEUTIC LEVEL: 6-12 mcg/mL. Important considerations: Auto-induction occurs (induces own metabolism) - levels may drop after 2-4 weeks. Check level 2-4 weeks after dose changes. Also monitor: CBC (agranulocytosis, aplastic anemia), LFTs (hepatotoxicity), sodium (SIADH). Drug interactions: potent CYP3A4 inducer reduces levels of many drugs including OCPs.",

  209: "CARBAMAZEPINE SIDE EFFECTS do NOT include severe hypertension. Common side effects: sedation, dizziness, ataxia, diplopia, nausea, rash (monitor for SJS). Can cause SIADH (hyponatremia), NOT hypertension. Rare serious effects: agranulocytosis, aplastic anemia, hepatotoxicity. If patient develops rash, evaluate for SJS/TEN and consider discontinuation.",

  214: "VALPROATE THERAPEUTIC LEVEL: 50-125 mcg/mL. Higher levels (85-125) for acute mania, lower (50-100) for maintenance. Draw trough level. Monitor: LFTs (hepatotoxicity - highest risk in children <2), CBC with platelets (thrombocytopenia), ammonia if confusion occurs. Black box warnings: hepatotoxicity, pancreatitis, teratogenicity. Common side effects: weight gain, tremor, hair loss.",

  217: "VALPROATE LOADING DOSE: 20 mg/kg for acute mania or status epilepticus. Allows rapid achievement of therapeutic levels within 24-48 hours. Can divide into 2-3 doses. Maximum daily dose generally 60 mg/kg/day. Alternative: 20-30 mg/kg/day divided. Check level after 2-3 days. GI side effects common with loading - consider IV route if severe.",

  218: "SLUMS (St. Louis University Mental Status) scoring: 27-30 = normal, 21-26 = Mild Cognitive Impairment (MCI), <21 = dementia (for high school educated). For less than high school: 25-30 = normal, 20-24 = MCI, <20 = dementia. SLUMS is MORE SENSITIVE than MMSE for MCI detection. Tests visuospatial, memory, calculation, and executive function.",

  229: "FUNCTIONAL ASSESSMENT in elderly with memory complaints: A score showing mild impairment on checkbook management is CLINICALLY SIGNIFICANT. Managing finances (IADL) is the MOST SENSITIVE indicator of cognitive decline - affected early in dementia. Other IADLs: medication management, shopping, transportation, meal preparation. Decline in IADLs often precedes ADL impairment.",

  259: "TARDIVE DYSKINESIA (TD) is the concern after dystonia and akathisia with antipsychotic use. TD develops after months-years of D2 blockade (unlike acute dystonia/akathisia which occur early). Presents as involuntary choreoathetoid movements of face, tongue, jaw, trunk, extremities. Risk factors: older age, female, longer duration, higher doses, first-gen antipsychotics. May be irreversible - monitor with AIMS scale.",

  260: "EXTRAPYRAMIDAL SYMPTOMS (EPS) do NOT include hypothermia and bradycardia. EPS include: (1) Acute dystonia (hours-days): muscle spasms, oculogyric crisis, (2) Akathisia (days-weeks): restlessness, (3) Parkinsonism (weeks): bradykinesia, rigidity, tremor, (4) Tardive dyskinesia (months-years): involuntary movements. Hypothermia/bradycardia suggest other conditions like NMS (which has HYPERthermia) or overdose.",

  312: "NEUROLEPTIC MALIGNANT SYNDROME (NMS): Classic tetrad - (1) Fever >104°F, (2) Severe muscle RIGIDITY (lead-pipe), (3) Altered mental status, (4) Autonomic instability. Labs: elevated CK (>1000, often >10,000), leukocytosis, metabolic acidosis. Caused by dopamine blockade. Treatment: STOP antipsychotic immediately, IV fluids, cooling, dantrolene, bromocriptine. Mortality 10-20% if untreated.",

  380: "MINOR CONFIDENTIALITY - Sexual orientation: Maintain confidentiality unless there is a safety concern. Sexual orientation is protected health information. The minor's right to privacy must be balanced against any duty to inform parents. Assess: Is the family environment safe? Is there abuse risk if disclosed? In most states, sexual orientation alone is NOT a reason to break confidentiality with a minor.",

  394: "ISOTRETINOIN (Accutane) is absolutely CONTRAINDICATED in pregnancy - Category X, highly teratogenic. Causes severe birth defects including craniofacial, cardiac, and CNS abnormalities. Requires iPLEDGE program with two forms of contraception. Sertraline is relatively safe in pregnancy (preferred SSRI). If patient becomes pregnant on isotretinoin, discontinue IMMEDIATELY and refer to high-risk OB.",

  395: "SEROTONIN SYNDROME distinguishing features: CLONUS and HYPERREFLEXIA (especially lower extremity). Triad: (1) Mental status changes, (2) Autonomic instability (hyperthermia, diaphoresis, tachycardia), (3) Neuromuscular hyperactivity (HYPERREFLEXIA, clonus, tremor, rigidity). Key differentiator from NMS: Serotonin syndrome has hyperreflexia/clonus; NMS has lead-pipe rigidity and HYPOreflexia.",

  416: "LORAZEPAM (Ativan) is preferred for alcohol withdrawal in patients with HEPATIC IMPAIRMENT. Reason: Lorazepam is metabolized by glucuronidation (Phase II) - NOT affected by liver disease. Other benzos (diazepam, chlordiazepoxide) use oxidative (Phase I) metabolism which is impaired in liver disease. Also prefer oxazepam. Avoid long-acting benzos in liver failure due to accumulation risk."
};

// Apply fixes
Object.entries(rationalesFixes).forEach(([id, rationale]) => {
  const q = data.find(item => item.id === parseInt(id));
  if (q) {
    const oldRationale = q.rationale ? q.rationale.substring(0, 50) + '...' : 'none';
    q.rationale = rationale;
    console.log(`✓ Q${id}: Fixed rationale`);
    console.log(`   Answer: ${q.options[q.correctAnswer]}`);
    fixCount++;
  } else {
    console.log(`⚠ Q${id}: NOT FOUND in data`);
  }
});

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\n${'═'.repeat(50)}`);
console.log(`Total rationales fixed: ${fixCount}`);
console.log('✓ All changes saved to questions.json');
