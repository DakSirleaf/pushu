const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     COMPLETE ANCC PMHNP QUALITY OVERHAUL                       ║');
console.log('║     Based on Official ANCC Exam Standards                      ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let totalFixes = 0;
const issues = {
  trivia: [],
  wrongAnswers: [],
  poorRationales: [],
  clinicallyInvalid: [],
  fixed: []
};

// ============================================================================
// PART 1: IDENTIFY ALL PROBLEM QUESTIONS
// ============================================================================

console.log('=== PHASE 1: IDENTIFYING PROBLEM QUESTIONS ===\n');

data.forEach(q => {
  const qLower = q.question.toLowerCase();
  const rationale = (q.rationale || '').toLowerCase();
  const answer = q.options[q.correctAnswer].toLowerCase();

  // 1. TRIVIA QUESTIONS (memorization, not clinical decision-making)
  if (
    qLower.includes('question 9') ||
    qLower.includes('question 1 ') ||
    qLower.includes('item number') ||
    (qLower.includes('what does') && qLower.includes('assess') && !qLower.includes('patient')) ||
    (qLower.includes('which question') && qLower.includes('scale'))
  ) {
    issues.trivia.push(q.id);
  }

  // 2. Questions with very short/poor rationales
  if (!q.rationale || q.rationale.length < 100) {
    issues.poorRationales.push(q.id);
  }

  // 3. Rationales that don't explain the answer
  const answerWords = answer.replace(/[^a-z\s]/g, '').split(' ').filter(w => w.length > 4);
  const hasAnswerInRationale = answerWords.some(w => rationale.includes(w));
  if (!hasAnswerInRationale && answerWords.length > 0 && q.rationale && q.rationale.length > 20) {
    // Potential mismatch - rationale doesn't mention the answer
    if (!issues.poorRationales.includes(q.id)) {
      issues.poorRationales.push(q.id);
    }
  }

  // 4. Clinically invalid questions
  // SSRIs don't need bone marrow monitoring
  if ((qLower.includes('ssri') || qLower.includes('sertraline') || qLower.includes('fluoxetine')) &&
      (answer.includes('reticulocyte') || answer.includes('bone marrow') || answer.includes('cbc'))) {
    issues.clinicallyInvalid.push(q.id);
  }
});

console.log(`Trivia questions: ${issues.trivia.length}`);
console.log(`Poor rationales: ${issues.poorRationales.length}`);
console.log(`Clinically invalid: ${issues.clinicallyInvalid.length}`);

// ============================================================================
// PART 2: COMPREHENSIVE EDUCATIONAL RATIONALES
// Based on ANCC exam content domains
// ============================================================================

console.log('\n=== PHASE 2: APPLYING EDUCATIONAL RATIONALES ===\n');

// This is the master list of high-quality rationales covering all domains
const masterRationales = {
  // DOMAIN 1: ADVANCED PRACTICE SKILLS (27% of exam)
  // Mental health screening, MSE, risk assessment, clinical interviewing

  // PHQ-9 and Depression Screening
  42: "PHQ-9 INTERPRETATION: Score ≥10 indicates MODERATE depression requiring treatment consideration. Scoring: 0-4 (minimal), 5-9 (mild), 10-14 (moderate), 15-19 (moderately severe), 20-27 (severe). The PHQ-9 maps directly to DSM-5 MDD criteria. Clinical action: Score ≥10 warrants further assessment and likely treatment initiation. Always assess Question 9 (suicidal ideation) separately regardless of total score. Board pearl: PHQ-9 is both screening AND monitoring tool - repeat to track treatment response.",

  44: "PHQ-9 CLINICAL APPLICATION: Developed from the PRIME-MD, the PHQ-9 is a self-administered tool assessing DSM-5 depression criteria over the past 2 weeks. Each item scored 0-3 (not at all to nearly every day). Score interpretation guides treatment: 5-9 (watchful waiting, supportive counseling), 10-14 (antidepressant or psychotherapy), 15+ (combination treatment recommended). Sensitivity 88%, specificity 88% for major depression at cutoff of 10. Board pearl: More sensitive than asking 'Are you depressed?'",

  51: "SUICIDE RISK ASSESSMENT is MANDATORY when patient endorses suicidal ideation on any screening tool. The PMHNP must immediately conduct a comprehensive suicide risk assessment including: (1) Suicidal ideation - frequency, intensity, duration; (2) Plan - specific method, availability of means; (3) Intent - desire to act on thoughts; (4) Protective factors - reasons for living, social support; (5) Risk factors - previous attempts, substance use, hopelessness. Do NOT just document and continue. Do NOT defer to psychiatry without same-day assessment. Board pearl: Any positive suicide screen = immediate action, same standard of care.",

  // GAD-7
  43: "GAD-7 INTERPRETATION: Screens for generalized anxiety disorder. Score ranges: 0-4 (minimal), 5-9 (mild), 10-14 (moderate), 15-21 (severe). Score ≥10 suggests clinically significant anxiety warranting treatment. The 7 items assess: nervousness, uncontrollable worry, excessive worry, trouble relaxing, restlessness, irritability, fear of something awful happening. Also screens for panic, social anxiety, and PTSD with reasonable sensitivity. Board pearl: GAD-7 ≥10 plus PHQ-9 ≥10 = high likelihood of comorbid anxiety and depression - common clinical scenario.",

  // MMSE and Cognitive Screening
  43: "MMSE (Mini-Mental State Examination) INTERPRETATION: Total score 0-30. Cutoffs: ≥24 normal, 20-23 mild impairment, 10-19 moderate impairment, <10 severe impairment. Adjust for education level - less educated patients may score lower without impairment. Tests: orientation (10 pts), registration (3 pts), attention/calculation (5 pts), recall (3 pts), language (8 pts), visuospatial (1 pt). Limitations: Insensitive for mild cognitive impairment (MCI), ceiling effects in educated patients. Board pearl: MoCA is more sensitive for MCI - use MoCA if MMSE is normal but clinical suspicion remains.",

  // MoCA
  218: "SLUMS AND MoCA FOR COGNITIVE SCREENING: Both more sensitive than MMSE for detecting Mild Cognitive Impairment (MCI). MoCA scoring: 0-30, ≥26 normal (add 1 point if ≤12 years education), <26 indicates impairment. SLUMS scoring: 27-30 normal, 21-26 MCI, <21 dementia (adjust for education). MoCA tests: visuospatial/executive (5 pts), naming (3 pts), attention (6 pts), language (3 pts), abstraction (2 pts), delayed recall (5 pts), orientation (6 pts). Board pearl: SLUMS tests executive function better; both superior to MMSE for early detection.",

  // CIWA and Alcohol Withdrawal
  45: "CIWA-Ar (Clinical Institute Withdrawal Assessment for Alcohol, Revised) guides alcohol withdrawal treatment. Scoring: 0-9 (minimal/no withdrawal - may not need pharmacotherapy), 10-15 (moderate - consider PRN benzodiazepines), 16-20 (severe - scheduled benzodiazepines required), >20 (very severe - high risk of seizures, DTs, consider ICU). Assesses 10 items: nausea/vomiting, tremor, sweating, anxiety, agitation, tactile/auditory/visual disturbances, headache, orientation. Monitor q1-2h initially. Board pearl: Symptom-triggered therapy (dosing based on CIWA) is safer than fixed-schedule dosing.",

  // COWS and Opioid Withdrawal
  46: "COWS (Clinical Opiate Withdrawal Scale) guides opioid withdrawal management and buprenorphine induction. Scoring: 5-12 (mild), 13-24 (moderate), 25-36 (moderately severe), >36 (severe). Assesses 11 items: pulse, sweating, restlessness, pupil size, bone/joint aches, runny nose, GI upset, tremor, yawning, anxiety, gooseflesh. CRITICAL: For buprenorphine induction, patient must score ≥8-12 (moderate withdrawal). Starting buprenorphine too early causes PRECIPITATED WITHDRAWAL because buprenorphine (partial agonist) displaces full agonist. Board pearl: Wait for objective withdrawal signs before buprenorphine initiation.",

  // Columbia Suicide Severity Rating Scale
  47: "C-SSRS (Columbia Suicide Severity Rating Scale) is the gold standard for suicide risk assessment. Assesses 5 types of suicidal ideation: (1) Wish to be dead, (2) Non-specific active suicidal thoughts, (3) Active ideation with any methods (not plan), (4) Active ideation with some intent to act, (5) Active ideation with specific plan and intent. Also assesses suicidal behavior: actual attempts, interrupted attempts, aborted attempts, preparatory acts. Any positive response requires clinical judgment regarding hospitalization vs. outpatient safety planning. Board pearl: C-SSRS distinguishes ideation severity - critical for disposition decisions.",

  // DOMAIN 2: SCIENTIFIC FOUNDATION (22% of exam)
  // Psychopharmacology, neurobiology, pharmacokinetics

  // CYP450 Drug Interactions
  1: "CARBAMAZEPINE + MACROLIDE ANTIBIOTICS (erythromycin, clarithromycin) = DANGEROUS INTERACTION. Mechanism: Macrolides are potent CYP3A4 INHIBITORS. Carbamazepine is metabolized by CYP3A4. Inhibition → carbamazepine accumulates → TOXICITY (diplopia, ataxia, nystagmus, sedation, confusion). Acetaminophen, ibuprofen, and aspirin do NOT significantly inhibit CYP3A4. Board pearl: Other CYP3A4 inhibitors to watch: azole antifungals (ketoconazole, fluconazole), grapefruit juice, cimetidine. Carbamazepine is also a CYP3A4 INDUCER affecting other drugs.",

  14: "CLOZAPINE AND SMOKING CESSATION: When patient QUITS smoking, REDUCE clozapine dose by 25-50%. Mechanism: Cigarette smoke contains polycyclic aromatic hydrocarbons (PAHs) that INDUCE CYP1A2. Clozapine is metabolized primarily by CYP1A2. Smoking cessation → CYP1A2 activity drops → clozapine levels RISE → risk of sedation, seizures, hypotension. The opposite is also true: if patient STARTS smoking, clozapine levels drop (may need dose increase). Board pearl: It's the smoke (PAHs), not nicotine - nicotine patches don't affect CYP1A2.",

  207: "ACE INHIBITORS + LITHIUM = DANGEROUS COMBINATION. ACE inhibitors (lisinopril, enalapril) decrease renal lithium clearance → lithium levels can DOUBLE → TOXICITY. Mechanism: ACE inhibitors cause sodium depletion and decreased GFR; lithium is reabsorbed with sodium in proximal tubule. Also dangerous: NSAIDs (reduce renal blood flow), thiazide diuretics (sodium depletion), dehydration. When ACE inhibitor is started in patient on lithium: reduce lithium dose by 25-50%, check level in 5-7 days, monitor for toxicity (tremor, ataxia, confusion, GI symptoms). Board pearl: Loop diuretics are safer with lithium than thiazides.",

  270: "CARBAMAZEPINE IS A POTENT CYP3A4 INDUCER - it INCREASES metabolism of many drugs, causing DECREASED drug levels and potential treatment failure. Affected drugs: oral contraceptives (CONTRACEPTIVE FAILURE - use alternative birth control), warfarin (decreased anticoagulation), lamotrigine, valproate, atypical antipsychotics (quetiapine, lurasidone, aripiprazole), benzodiazepines. Carbamazepine also auto-induces its own metabolism - levels may drop after 2-4 weeks. Conversely, CYP3A4 INHIBITORS increase carbamazepine levels causing toxicity. Board pearl: Inducers take 1-2 weeks for full effect; inhibitors act within days.",

  // Lithium Pharmacology
  6: "LITHIUM THERAPEUTIC LEVEL: 0.8 mEq/L is OPTIMAL for maintenance therapy. Therapeutic range: 0.6-1.2 mEq/L. For acute mania, target 0.8-1.2 mEq/L. For maintenance, 0.6-1.0 mEq/L often sufficient. Elderly patients: target 0.4-0.8 mEq/L (increased sensitivity). ALWAYS draw trough level (12 hours post-dose). Subtherapeutic (<0.6): inadequate mood stabilization. Toxic (>1.5): tremor, ataxia, confusion, vomiting, seizures. Factors increasing levels: dehydration, NSAIDs, ACE inhibitors, thiazides, low-salt diet. Board pearl: Narrow therapeutic index - small changes in level have big clinical effects.",

  8: "LITHIUM-INDUCED HYPOTHYROIDISM: Elevated TSH indicates hypothyroidism - occurs in 20-30% of patients on long-term lithium. Mechanism: Lithium accumulates in thyroid gland and inhibits thyroid hormone synthesis and release. Management: Add levothyroxine (don't stop lithium if it's working). Women at higher risk. Monitor TSH at baseline, 3 months, then every 6-12 months. Lithium can also cause goiter. Other endocrine effect: Nephrogenic diabetes insipidus (polyuria, polydipsia) - lithium inhibits ADH action at collecting duct. Board pearl: Hypothyroidism is treatable; don't discontinue effective lithium therapy.",

  10: "DEHYDRATION IS THE MOST COMMON CAUSE OF LITHIUM TOXICITY. Mechanism: Lithium is handled like sodium by the kidney. Dehydration → kidney retains sodium AND lithium → levels rise. Other causes: NSAIDs (decrease renal blood flow), ACE inhibitors/ARBs (decrease GFR), thiazide diuretics (sodium depletion → compensatory lithium retention), vomiting/diarrhea, low-salt diet, hot weather/sweating. Patient education: maintain consistent fluid intake, avoid NSAIDs, maintain salt intake, hold lithium if GI illness with vomiting/diarrhea. Board pearl: Teach patients early toxicity signs - coarse tremor, diarrhea, vomiting, confusion.",

  203: "LITHIUM MAINTENANCE LEVEL: 0.6-1.2 mEq/L. Draw TROUGH level 12 hours after last dose. Acute mania target: 0.8-1.2 mEq/L (higher end). Maintenance target: 0.6-1.0 mEq/L. Elderly: 0.4-0.8 mEq/L. Toxicity begins >1.5 mEq/L: fine tremor becomes coarse, GI upset, ataxia, confusion. Severe toxicity (>2.0): seizures, coma, death. Monitoring schedule: weekly until stable, then every 1-3 months. Also monitor: renal function (creatinine, BUN), thyroid (TSH), calcium (hyperparathyroidism). Board pearl: Lithium has the narrowest therapeutic index of any psych med.",

  // Valproate
  214: "VALPROATE THERAPEUTIC LEVEL: 50-125 mcg/mL. For acute mania, target higher end (85-125 mcg/mL). For maintenance, 50-100 mcg/mL often adequate. Draw trough level. Monitoring required: LFTs (hepatotoxicity - highest risk in children <2 with polypharmacy), CBC with platelets (thrombocytopenia), ammonia if confusion (hyperammonemic encephalopathy). Black box warnings: hepatotoxicity, pancreatitis, teratogenicity (neural tube defects - CONTRAINDICATED in pregnancy). Common side effects: weight gain, tremor, alopecia, GI upset. Board pearl: Women of childbearing potential need reliable contraception or alternative mood stabilizer.",

  217: "VALPROATE LOADING DOSE: 20 mg/kg for acute mania. Achieves therapeutic level (50-125 mcg/mL) within 24-48 hours versus 5-7 days with gradual titration. Useful when rapid mood stabilization needed. Can give oral or IV. May divide into 2-3 doses to reduce GI side effects. After loading, transition to maintenance dosing (typically 250-500mg BID-TID). Check level 2-3 days after loading. Loading dose also used for status epilepticus. Board pearl: Divalproex ER allows once-daily dosing and has fewer GI side effects than immediate-release.",

  29: "VALPROATE LOADING: 20-30 mg/kg/day divided into doses achieves therapeutic levels rapidly for acute mania. Why this range? Lower doses (10 mg/kg) won't reach therapeutic level quickly. Higher doses (40-50 mg/kg) increase toxicity risk without benefit. Standard maintenance is 15-20 mg/kg/day. GI side effects are common with loading - can use IV route if severe. Check level after 2-3 days. Combine with antipsychotic for severe mania. Board pearl: Valproate is preferred over lithium for mixed episodes and rapid cycling.",

  // Carbamazepine
  208: "CARBAMAZEPINE THERAPEUTIC LEVEL: 6-12 mcg/mL. Below 6 = likely subtherapeutic. Above 12 = toxicity risk (diplopia, ataxia, nystagmus, drowsiness). Important: AUTO-INDUCTION occurs - carbamazepine induces CYP3A4 which metabolizes itself. Levels may DROP 20-30% after 2-4 weeks at same dose. Recheck levels at 2-4 weeks and adjust dose accordingly. Monitoring: CBC (agranulocytosis, aplastic anemia - rare but serious), LFTs, sodium (SIADH → hyponatremia). Board pearl: HLA-B*1502 screening required in Asian patients before starting (Stevens-Johnson syndrome risk).",

  28: "HLA-B*1502 SCREENING is REQUIRED before starting CARBAMAZEPINE in patients of ASIAN ancestry. This allele increases risk of Stevens-Johnson Syndrome (SJS) and Toxic Epidermal Necrolysis (TEN) by approximately 100-fold. If positive, do NOT use carbamazepine (or oxcarbazepine). Populations at risk: Han Chinese, Thai, Malaysian, Filipino, Indonesian. Also consider HLA-A*3101 screening for Northern European ancestry (less dramatic risk increase). Alternatives if HLA-B*1502 positive: valproate, lamotrigine (slow titration), lithium. Board pearl: This is a pharmacogenomic testing question - know which meds require genetic testing.",

  // Lamotrigine
  153: "LAMOTRIGINE TITRATION: SLOW titration is CRITICAL to prevent Stevens-Johnson Syndrome (SJS) and Toxic Epidermal Necrolysis (TEN). Standard titration: 25 mg daily x 2 weeks → 50 mg daily x 2 weeks → 100 mg daily x 1 week → target 200 mg/day. If on valproate (inhibits lamotrigine metabolism): start 25 mg every OTHER day x 2 weeks, then slower increases. Any rash during titration = STOP immediately and evaluate. Rash risk highest in first 8 weeks. Board pearl: Lamotrigine is the ONLY mood stabilizer that primarily treats bipolar DEPRESSION (not mania).",

  // Antipsychotics
  38: "HALOPERIDOL (Haldol) has the HIGHEST EPS (extrapyramidal symptoms) risk among antipsychotics. Mechanism: High D2 receptor blockade in nigrostriatal pathway. EPS types by onset: Acute dystonia (hours-days) - muscle spasms, treat with benztropine or diphenhydramine; Akathisia (days-weeks) - restlessness, treat with propranolol or benzodiazepine; Parkinsonism (weeks) - bradykinesia, rigidity, tremor, reduce dose or add anticholinergic; Tardive dyskinesia (months-years) - involuntary movements, potentially irreversible. Risk ranking: High-potency typicals (haloperidol, fluphenazine) > Low-potency typicals (chlorpromazine) > SGAs. Board pearl: EPS risk is the main reason SGAs replaced typicals as first-line.",

  26: "ZIPRASIDONE (Geodon) should be AVOIDED in patients with QTc prolongation - it has the HIGHEST QTc prolongation risk among atypical antipsychotics. Other high-risk agents: thioridazine, IV haloperidol, droperidol. QTc >500ms or increase >60ms from baseline = discontinue medication and do not rechallenge. Risk factors for Torsades de Pointes: female sex, hypokalemia, hypomagnesemia, bradycardia, congenital long QT, concurrent QTc-prolonging drugs. Safest options for patients with QTc concerns: aripiprazole, lurasidone. Board pearl: Always get baseline ECG in patients with cardiac history before antipsychotic.",

  27: "VALPROATE (Depakote) is effective for breakthrough manic episodes despite lithium therapy. Advantages: rapid loading possible, effective for mixed states and rapid cycling (where lithium may be less effective), different mechanism of action (GABA enhancement, sodium channel blockade). Can combine with lithium safely. Why not lamotrigine? Lamotrigine is primarily for bipolar DEPRESSION, has limited antimanic efficacy, and requires slow titration. Why not carbamazepine? Complex drug interactions, induces lithium metabolism. Board pearl: Valproate + lithium combination is evidence-based for lithium partial responders.",

  // Clozapine
  28: "CLOZAPINE is the ONLY antipsychotic proven effective for TREATMENT-RESISTANT SCHIZOPHRENIA (defined as failure of 2+ adequate antipsychotic trials). Requires REMS program due to agranulocytosis risk (~1%). ANC monitoring: weekly x 6 months, biweekly x 6 months, then monthly. Hold if ANC <1500 (general population) or <1000 (benign ethnic neutropenia). Other serious risks: myocarditis (first month - monitor for tachycardia, fever, chest pain), seizures (dose-related, especially >600mg), severe constipation (can be fatal), metabolic syndrome. Despite risks, clozapine REDUCES mortality in schizophrenia. Board pearl: Clozapine is underutilized - only 5% of eligible patients receive it.",

  // NMS vs Serotonin Syndrome
  36: "NEUROLEPTIC MALIGNANT SYNDROME (NMS): Life-threatening reaction to dopamine antagonists. Classic tetrad: (1) Hyperthermia (often >40°C/104°F), (2) LEAD-PIPE RIGIDITY (not cogwheel), (3) Altered mental status, (4) Autonomic instability (tachycardia, labile BP, diaphoresis). Labs: Elevated CK (often >1000, can exceed 100,000), leukocytosis, metabolic acidosis, myoglobinuria. Onset: Days after starting/increasing antipsychotic. KEY DIFFERENTIATOR FROM SEROTONIN SYNDROME: NMS has HYPOREFLEXIA and lead-pipe rigidity; SS has HYPERREFLEXIA and clonus. Treatment: Stop antipsychotic, supportive care, dantrolene, bromocriptine. Mortality 10-20% if untreated.",

  37: "SEROTONIN SYNDROME vs NMS - CRITICAL BOARD DISTINCTION: Both have fever, altered mental status, autonomic instability. KEY DIFFERENCES: Serotonin syndrome has HYPERREFLEXIA, CLONUS, and MYOCLONUS (especially lower extremities); NMS has HYPOREFLEXIA and LEAD-PIPE RIGIDITY. SS onset: Rapid (within 24 hours of drug change). NMS onset: Gradual (days). SS causes: Serotonergic drugs (SSRIs + MAOIs, SSRIs + tramadol, SSRIs + triptans). NMS causes: Dopamine antagonists. SS treatment: Discontinue serotonergic agent, supportive care, cyproheptadine for severe cases. Board pearl: Clonus = serotonin syndrome; Rigidity = NMS.",

  40: "NMS WITH RHABDOMYOLYSIS: CK >10,000 (often >100,000) indicates severe muscle breakdown from rigidity. Rhabdomyolysis → myoglobin release → acute kidney injury. This patient on clozapine (or any antipsychotic) with obtunded mental status, elevated CK, and autonomic instability has NMS until proven otherwise. Treatment: (1) STOP antipsychotic immediately, (2) Aggressive IV fluid resuscitation to prevent renal failure, (3) Cooling measures, (4) Dantrolene (muscle relaxant) for rigidity, (5) Bromocriptine (dopamine agonist), (6) ICU admission. Board pearl: Any patient on antipsychotics with unexplained fever requires NMS workup.",

  // Antidepressants
  4: "BUPROPION (Wellbutrin) is CONTRAINDICATED in EATING DISORDERS (anorexia nervosa, bulimia nervosa). Mechanism: Bupropion lowers the seizure threshold. Patients with eating disorders have electrolyte abnormalities (hypokalemia, hyponatremia, hypomagnesemia) that ALREADY increase seizure risk. Bupropion + electrolyte abnormalities = significantly elevated seizure risk. Other bupropion contraindications: seizure disorder, abrupt alcohol/benzodiazepine withdrawal, concurrent MAOIs. What TO use for bulimia: Fluoxetine 60mg is FDA-approved. Board pearl: Bupropion seizure risk is dose-dependent (~0.4% at 450mg/day).",

  15: "FLUOXETINE (Prozac) 60 mg is the ONLY FDA-APPROVED medication for BULIMIA NERVOSA. Why higher dose than depression (60mg vs 20mg)? Bulimia requires more serotonergic activity to reduce binge-purge cycles. Evidence shows fluoxetine reduces binge eating and purging frequency. Why not other SSRIs? Only fluoxetine has FDA approval and robust evidence for this indication. CBT is first-line psychotherapy for bulimia - medication is adjunct. Why not bupropion? CONTRAINDICATED due to seizure risk with electrolyte abnormalities. Board pearl: For anorexia nervosa, no medication is FDA-approved; weight restoration is primary treatment.",

  17: "MIRTAZAPINE (Remeron) or TRAZODONE for depression WITH prominent insomnia. Mirtazapine: Blocks H1 receptors (sedation), 5-HT2A/2C receptors (improves sleep architecture, anxiolytic), and alpha-2 adrenergic autoreceptors (increases NE/5-HT release). Also increases appetite - good for depression with weight loss. Dose-dependent sedation (more sedating at 15mg than 30mg due to antihistamine saturation). Trazodone: SARI - blocks 5-HT2A (sleep), weak SERT inhibition. Often used as sleep aid at low doses (25-100mg). Board pearl: Avoid activating antidepressants (bupropion, SSRIs initially) if insomnia is primary complaint.",

  18: "BUPROPION (Wellbutrin) is preferred for depression when SEXUAL DYSFUNCTION is a concern. Mechanism: Norepinephrine-dopamine reuptake inhibitor (NDRI) with NO significant serotonergic effects. SSRIs cause sexual dysfunction (decreased libido, anorgasmia, erectile dysfunction) via 5-HT2 receptor activation. Bupropion is weight-neutral and activating (good for fatigue/low energy). Also used for smoking cessation (Zyban) and as SSRI augmentation. Contraindications: seizure disorder, eating disorders, concurrent MAOIs. Board pearl: For patients who develop SSRI-induced sexual dysfunction, options are: reduce dose, switch to bupropion, add bupropion, or add buspirone.",

  // MAOIs
  19: "PHENTOLAMINE for MAOI HYPERTENSIVE CRISIS (tyramine reaction). Tyramine in aged foods → cannot be metabolized (MAO-A inhibited) → displaces norepinephrine from vesicles → massive sympathetic surge → SEVERE HYPERTENSION. Symptoms: explosive headache, stiff neck, nausea, vomiting, diaphoresis, palpitations. Can lead to stroke, MI, death. Treatment: Phentolamine (alpha-adrenergic blocker) directly counteracts norepinephrine. Why NOT beta-blockers (metoprolol)? Can cause unopposed alpha stimulation, worsening hypertension. Avoid: aged cheeses, cured meats, tap beer, soy sauce, sauerkraut. Board pearl: 2-week washout required before/after MAOI.",

  20: "MEPERIDINE (Demerol) should be AVOIDED with SSRIs and MAOIs - HIGH risk of SEROTONIN SYNDROME. Meperidine has significant serotonergic properties unlike other opioids. SSRI + meperidine → serotonin syndrome. MAOI + meperidine → potentially fatal serotonin syndrome (most dangerous combination). Safe opioid alternatives: morphine, oxycodone, hydrocodone, fentanyl (minimal serotonin activity). Also avoid tramadol with SSRIs/MAOIs (tramadol has SNRI properties). Board pearl: If patient on SSRI needs surgery, ensure meperidine is NOT used for analgesia - communicate with surgical team.",

  // Overdose/Reversal Agents
  32: "FLUMAZENIL (Romazicon) reverses BENZODIAZEPINE overdose. Mechanism: Competitive antagonist at GABA-A benzodiazepine binding site. Onset: 1-2 minutes IV. Duration: 45-90 minutes (shorter than most benzos - may need repeat dosing). CAUTION: Can precipitate SEIZURES in chronic benzodiazepine users or patients on benzos for seizure control (removing GABA inhibition). Also dangerous if co-ingested with TCAs (lowers seizure threshold). Often, supportive care alone is sufficient since isolated benzo overdose is rarely fatal. Board pearl: Benzo + opioid overdose - give naloxone first (respiratory depression is the killer).",

  33: "NALOXONE (Narcan) reverses OPIOID overdose. Classic triad: Pinpoint pupils + respiratory depression + decreased LOC = opioid overdose. Mechanism: Competitive opioid receptor antagonist at mu, kappa, and delta receptors. Onset: 2-5 minutes IV/IM, slightly longer IN. Duration: 30-90 minutes - may need repeat dosing for long-acting opioids (methadone, fentanyl). Can precipitate acute withdrawal in opioid-dependent patients (uncomfortable but not dangerous). Starting dose: 0.4-2mg (start low to avoid severe withdrawal). Board pearl: All patients who receive naloxone for overdose need extended observation - respiratory depression may recur when naloxone wears off.",

  // Substance Use Disorders
  34: "BENZODIAZEPINES are FIRST-LINE for ALCOHOL WITHDRAWAL - potentially life-saving. Both alcohol and benzodiazepines work at GABA-A receptor - cross-tolerance allows benzos to substitute and prevent withdrawal complications. Alcohol withdrawal can be FATAL (seizures, delirium tremens). Commonly used: Chlordiazepoxide (long-acting, less abuse potential), lorazepam (hepatic impairment), diazepam (rapid onset, long-acting metabolites). Dosing: Symptom-triggered (CIWA-based) is preferred over fixed-schedule. Thiamine 100mg before glucose (prevent Wernicke's). Board pearl: Alcohol and benzodiazepine withdrawal can kill; opioid withdrawal cannot (just very uncomfortable).",

  35: "BUPRENORPHINE or METHADONE for opioid use disorder with active withdrawal (COWS ≥13). Why NOT naltrexone? Patient must be fully withdrawn (7-10 days opioid-free, COWS = 0) before starting naltrexone - it would precipitate severe withdrawal. Buprenorphine (partial mu agonist): Wait for COWS ≥8-12 before induction; can be prescribed office-based (DATA waiver). Methadone (full agonist): Can start anytime; requires daily observed dosing at OTP initially. Both reduce cravings, prevent withdrawal, and reduce illicit opioid use. Board pearl: Buprenorphine's ceiling effect makes it safer than methadone for overdose.",

  416: "LORAZEPAM (Ativan) is preferred for alcohol withdrawal in HEPATIC IMPAIRMENT. Mechanism: Lorazepam is metabolized by glucuronidation (Phase II conjugation), NOT oxidation (Phase I). Phase I metabolism is significantly impaired in liver disease; Phase II is relatively preserved. Other benzos (diazepam, chlordiazepoxide) rely on oxidative (Phase I) metabolism → accumulation in liver disease → prolonged sedation, increased encephalopathy risk. Oxazepam and temazepam are also safe in liver disease (glucuronidation). Board pearl: 'LOT' drugs (Lorazepam, Oxazepam, Temazepam) are safe in liver disease - no active metabolites.",

  417: "ALCOHOL WITHDRAWAL TIMELINE: 6-12 hours: tremor, anxiety, headache, GI upset, diaphoresis, palpitations. 12-24 hours: WITHDRAWAL SEIZURES (peak at 24 hours, typically generalized tonic-clonic, often single but can cluster). 24-48 hours: Alcoholic hallucinosis (visual hallucinations with CLEAR SENSORIUM - patient knows hallucinations aren't real). 48-96 hours: DELIRIUM TREMENS (DTs) - confusion, agitation, SEVERE autonomic instability, fever, hallucinations (tactile common), mortality 5-15% untreated. CIWA-Ar guides treatment: <10 (monitor), 10-15 (PRN benzos), ≥16 (scheduled benzos). Board pearl: DTs have highest mortality - prevention with adequate benzodiazepine is key.",

  // DOMAIN 3: DIAGNOSIS AND TREATMENT (22% of exam)
  // DSM-5 criteria, treatment planning, evidence-based interventions

  // Depression
  50: "MAJOR DEPRESSIVE DISORDER DSM-5 CRITERIA: ≥5 symptoms present during same 2-week period, representing change from previous functioning. MUST include at least one of: (1) Depressed mood OR (2) Anhedonia (loss of interest/pleasure). Other symptoms: significant weight/appetite change, insomnia or hypersomnia, psychomotor agitation/retardation, fatigue, worthlessness/guilt, concentration difficulty, suicidal ideation. Symptoms cause significant distress or functional impairment. Not attributable to substance or medical condition. No history of manic/hypomanic episode (would be bipolar). Board pearl: Use mnemonic SIG E CAPS - Sleep, Interest, Guilt, Energy, Concentration, Appetite, Psychomotor, Suicidality.",

  // Bipolar Disorder
  151: "BIPOLAR I vs BIPOLAR II: Bipolar I requires at least ONE MANIC EPISODE (≥7 days of elevated/irritable mood + ≥3 symptoms OR any duration if hospitalized). Bipolar II requires at least one HYPOMANIC EPISODE (≥4 days, same symptoms but less severe, no hospitalization, no psychosis) + at least one major depressive episode. Key distinction: Mania = severe impairment, may need hospitalization, may have psychotic features. Hypomania = noticeable change but functioning maintained, no psychosis, no hospitalization. Board pearl: One manic episode = Bipolar I forever, even if depressions predominate.",

  // Anxiety Disorders
  74: "SSRIs are FIRST-LINE PHARMACOTHERAPY for PANIC DISORDER. Why SSRIs? Good efficacy, better side effect profile than TCAs/MAOIs, no dependence. CRITICAL: Start at HALF usual dose - panic patients are hypersensitive to somatic sensations and may experience activation as a panic trigger. Titrate slowly. Takes 4-6 weeks for full effect (warn patient). CBT (especially interoceptive exposure) is also first-line. Benzodiazepines: Useful short-term for acute relief but risk of dependence; avoid as monotherapy. Goal: eventually taper benzo while SSRI takes effect. Board pearl: 'Start low, go slow' with panic disorder - avoid activation.",

  76: "SSRIs/SNRIs are FIRST-LINE for GENERALIZED ANXIETY DISORDER (GAD). FDA-approved options: duloxetine, venlafaxine XR, escitalopram, paroxetine. SNRIs may have edge for comorbid pain. Takes 2-4 weeks for initial effect, full benefit at 8-12 weeks. Buspirone is alternative - 5-HT1A partial agonist, no dependence potential, but takes 2-4 weeks and must be dosed consistently (not PRN). Benzodiazepines: Short-term only due to dependence risk; useful while waiting for SSRI/SNRI to work. CBT is effective and can be combined with medication. Board pearl: GAD + depression is common - SSRIs/SNRIs treat both.",

  80: "SOCIAL ANXIETY DISORDER (Social Phobia) TREATMENT: First-line medications: SSRIs (paroxetine, sertraline) and SNRIs (venlafaxine). FDA-approved: paroxetine, sertraline, venlafaxine XR. CBT with exposure is highly effective. PERFORMANCE-ONLY subtype (stage fright, public speaking): Propranolol PRN 30-60 minutes before event - blocks peripheral symptoms (tremor, tachycardia). Propranolol does NOT work for generalized social anxiety. Benzodiazepines PRN can help but risk dependence if used frequently. Board pearl: Performance anxiety = beta-blocker PRN; generalized social anxiety = SSRI/SNRI daily + therapy.",

  // PTSD
  72: "PTSD FIRST-LINE TREATMENTS: PSYCHOTHERAPY is preferred - specifically trauma-focused therapies: Prolonged Exposure (PE), Cognitive Processing Therapy (CPT), and EMDR (Eye Movement Desensitization and Reprocessing). All have strong evidence. MEDICATIONS: SSRIs (sertraline, paroxetine are FDA-approved) and SNRIs (venlafaxine). Prazosin for trauma-related NIGHTMARES (blocks noradrenergic hyperarousal). BENZODIAZEPINES are NOT RECOMMENDED - may worsen outcomes by interfering with fear extinction learning. Board pearl: Trauma-focused therapy is preferred over medication alone; combination may be beneficial.",

  // OCD
  85: "OCD FIRST-LINE TREATMENT: CBT with EXPOSURE AND RESPONSE PREVENTION (ERP) has the strongest evidence base. ERP process: Patient is exposed to anxiety trigger (exposure) while prevented from performing compulsive ritual (response prevention). This extinguishes anxiety response over time. MEDICATIONS: SSRIs at HIGH DOSES - often 2-3x the dose used for depression (fluoxetine 60-80mg, sertraline 200mg, fluvoxamine 300mg). Takes 8-12 weeks for medication effect. Clomipramine (TCA) is effective but more side effects. Board pearl: OCD requires higher SSRI doses and longer duration to see effect than depression.",

  // BPD
  71: "DIALECTICAL BEHAVIOR THERAPY (DBT) is the GOLD STANDARD for BORDERLINE PERSONALITY DISORDER (BPD). DBT specifically targets BPD symptoms: emotion dysregulation, interpersonal chaos, impulsivity, chronic suicidality, identity disturbance. Four core modules: (1) Mindfulness - present moment awareness, (2) Distress Tolerance - crisis survival skills without making things worse, (3) Emotion Regulation - understanding and managing emotions, (4) Interpersonal Effectiveness - assertiveness, maintaining relationships. Format: weekly individual therapy + weekly skills group. Evidence shows DBT significantly reduces self-harm, suicide attempts, and hospitalizations. Board pearl: No medication is FDA-approved for BPD - DBT is the treatment.",

  // Schizophrenia
  54: "SCHIZOPHRENIA DSM-5 CRITERIA: ≥2 of the following for significant portion of 1-month period: (1) Delusions, (2) Hallucinations, (3) Disorganized speech, (4) Grossly disorganized or catatonic behavior, (5) Negative symptoms (diminished expression, avolition). AT LEAST ONE must be delusions, hallucinations, or disorganized speech. Continuous signs of disturbance ≥6 months (including prodrome/residual). Significant functional impairment. Not attributable to substances or medical condition. Positive symptoms: hallucinations, delusions, disorganized thinking. Negative symptoms: flat affect, alogia, avolition, anhedonia, asociality. Board pearl: Negative symptoms are harder to treat than positive symptoms.",

  // DOMAIN 4: PSYCHOTHERAPY AND RELATED THEORIES (15% of exam)
  // Therapy modalities, developmental theories, therapeutic communication

  // Developmental Theories
  63: "PIAGET PREOPERATIONAL STAGE (Ages 2-7): Characterized by EGOCENTRISM (cannot take another's perspective - believes moon follows her), ANIMISM (attributes life to inanimate objects - stuffed animals have feelings), MAGICAL THINKING, and CENTRATION (focuses on one aspect, cannot see whole). Cannot understand conservation (water volume stays same in different shaped containers). Language develops rapidly. Symbolic play. Cannot perform mental operations. Board pearl: Piaget's stages - Sensorimotor (0-2): object permanence; Preoperational (2-7): symbolic thinking, no conservation; Concrete operational (7-11): conservation, logical thinking about concrete; Formal operational (11+): abstract thinking.",

  64: "PIAGET CONCRETE OPERATIONAL STAGE (Ages 7-11): Child can now understand CONSERVATION (water volume same in different containers), REVERSIBILITY (can mentally reverse actions), and apply LOGICAL THINKING to concrete objects and events. Can classify, seriate (order by size), and understand cause-effect with physical objects. CANNOT yet think abstractly or hypothetically - that comes in formal operational stage. Board pearl: Classic conservation task - if child says 'same amount of water' regardless of container shape, they've achieved concrete operations.",

  66: "FREUD'S PHALLIC STAGE (Ages 3-6): OEDIPUS COMPLEX (boys) - unconscious sexual attraction to mother, jealousy/rivalry with father. ELECTRA COMPLEX (girls) - attraction to father, rivalry with mother. Resolution occurs through IDENTIFICATION with same-sex parent - child adopts parent's values, gender role. Fixation at this stage theoretically leads to issues with authority, sexuality, gender identity. Board pearl: Freud's stages: Oral (0-1) - feeding; Anal (1-3) - toilet training; Phallic (3-6) - Oedipal; Latency (6-puberty) - dormant sexuality; Genital (puberty+) - mature sexuality.",

  67: "FREUD'S LATENCY STAGE (Ages 6-Puberty): Sexual impulses are DORMANT/SUBLIMATED into socially acceptable activities. Child focuses on school achievement, same-sex friendships, developing skills and competencies. Superego (conscience) strengthens. No significant psychosexual conflict during this period. Precedes genital stage. Board pearl: If asked about a school-age child focused on academics and same-sex peer relationships with no romantic interest, this is developmentally appropriate latency stage.",

  68: "ERIKSON'S INTEGRITY VS DESPAIR (Age 65+): Final psychosocial stage. Task: Review one's life and find meaning. Successful resolution: INTEGRITY - sense of fulfillment, acceptance of life as lived, wisdom, peace with approaching death. Unsuccessful resolution: DESPAIR - regret, bitterness, feeling life was wasted, fear of death. Board pearl: Erikson's stages to know - Trust vs Mistrust (infancy), Autonomy vs Shame (toddler), Initiative vs Guilt (preschool), Industry vs Inferiority (school age), Identity vs Role Confusion (adolescent), Intimacy vs Isolation (young adult), Generativity vs Stagnation (middle adult), Integrity vs Despair (older adult).",

  // Infant Development
  56: "INFANT SOCIAL SMILE: Emerges at 4-6 WEEKS, reliably present by 2 MONTHS. The social smile is in RESPONSE to human face/interaction, unlike earlier reflexive smiles during sleep. This is an important early social milestone indicating attachment development. Red flags: absence of social smile by 3 months warrants developmental evaluation. Other 2-month milestones: tracks past midline, coos, lifts head when prone. Board pearl: Social smile = 2 months; Stranger anxiety = 6-9 months; Separation anxiety = 8-18 months.",

  57: "MORO REFLEX (Startle Reflex) should disappear by 4-6 MONTHS. Present at birth - infant extends arms, opens hands, then brings arms together in embracing motion when startled or head drops back. Persistence beyond 6 months may indicate neurological abnormality (cerebral palsy, brain injury). Other primitive reflexes: Rooting (birth-4 months), Palmar grasp (birth-6 months), Babinski (birth-12-24 months), Stepping (birth-2 months). Board pearl: Primitive reflexes that persist beyond expected age suggest upper motor neuron pathology.",

  69: "4-MONTH DEVELOPMENTAL MILESTONES: Motor - holds head steady, beginning to roll over (front-to-back first), brings hands to midline, reaches for objects. Social - social smile well-established, laughs, enjoys interaction. Language - coos, begins to babble. Vision - follows 180 degrees. NOT YET: sitting without support (6 months), crawling (8-10 months), walking (12 months). Red flags at 4 months: no head control, no social smile, not tracking objects, no response to sounds. Board pearl: Head control is achieved around 4 months - critical milestone to assess.",

  // DOMAIN 5: ETHICS, LEGAL PRINCIPLES & CULTURAL CARE (14% of exam)
  // Confidentiality, informed consent, mandatory reporting, cultural competence

  // Tarasoff Duty
  85: "TARASOFF DUTY TO WARN/PROTECT: When a patient makes a CREDIBLE, SPECIFIC threat against an IDENTIFIABLE victim, the clinician has a legal DUTY TO PROTECT that victim. Options vary by state but generally include: (1) Warn the intended victim directly, (2) Notify law enforcement, (3) Hospitalize the patient if criteria met. Does NOT apply to: vague threats, threats without identifiable victim, threats against self (different protocols). Document your assessment thoroughly. Breaking confidentiality is REQUIRED - not optional - when Tarasoff applies. Board pearl: Specific threat + identifiable victim = duty to protect. Balance maintaining therapeutic alliance while fulfilling legal obligation.",

  // Confidentiality with Minors
  380: "MINOR CONFIDENTIALITY - SEXUAL ORIENTATION: Maintain confidentiality unless there is a SAFETY concern. Sexual orientation is protected health information. The minor's right to privacy must be balanced against potential harm from disclosure. Assess: Is the home environment safe? Would disclosure lead to abuse, rejection, homelessness? In most states, sexual orientation alone is NOT a reason to break confidentiality. Exceptions: if minor is being abused, is suicidal, or is engaging in risky behavior requiring intervention. Document your assessment of safety. Board pearl: Breach confidentiality only for safety - not to inform parents of orientation.",

  // Informed Consent
  88: "INFORMED CONSENT REQUIREMENTS: Patient must receive information about: (1) Diagnosis, (2) Nature and purpose of proposed treatment, (3) Risks and benefits of treatment, (4) Alternative treatments and their risks/benefits, (5) Risks of no treatment. Patient must have CAPACITY - ability to understand information, appreciate consequences, reason about options, communicate a choice. Consent must be VOLUNTARY - no coercion. Document the discussion. For minors: parent/guardian consent required with some exceptions (emergency, emancipated minor, specific situations like STI treatment). Board pearl: Capacity is decision-specific and time-specific - patient may have capacity for some decisions but not others.",

  // Involuntary Commitment
  90: "INVOLUNTARY PSYCHIATRIC HOLD CRITERIA: Patient must be (1) Danger to self (suicidal ideation with intent/plan), (2) Danger to others (homicidal ideation with intent, identifiable victim), OR (3) Gravely disabled (unable to provide for basic needs - food, shelter, clothing - due to mental illness). Duration varies by state (typically 72 hours for initial hold). Requires mental illness as cause. Patient retains rights: informed of rights, right to attorney, right to hearing. This is EMERGENCY detention, not long-term commitment (requires court process). Board pearl: 'Danger to self, others, or gravely disabled' - know this criteria cold.",

  // Cultural Competence
  92: "CULTURAL FORMULATION IN DSM-5: Diagnosis must account for cultural context. What's considered pathological in one culture may be normative in another. Components of cultural assessment: (1) Cultural identity of patient, (2) Cultural conceptualizations of distress (culture-bound syndromes), (3) Psychosocial stressors and cultural features of vulnerability/resilience, (4) Cultural features of relationship between patient and clinician, (5) Overall cultural assessment for diagnosis and care. Example: Hearing deceased relative's voice may be normal bereavement in some cultures, not psychosis. Board pearl: 'A culturally expected response to a stressor is not a mental disorder.'",

  // ADDITIONAL HIGH-YIELD QUESTIONS

  // Pregnancy and Medications
  149: "LAMOTRIGINE is the SAFEST mood stabilizer in PREGNANCY. Teratogenicity risk ranking: Valproate (HIGHEST RISK - neural tube defects 5-10%, contraindicated) > Carbamazepine (facial abnormalities, neural tube defects) > Lithium (Ebstein's anomaly ~1/1000, was thought higher) > Lamotrigine (LOWEST RISK, minimal teratogenicity). For pregnant bipolar patient or woman planning pregnancy: lamotrigine is preferred. If lithium is essential and working well, can continue with shared decision-making, fetal echo at 16-20 weeks, level monitoring. Board pearl: Valproate is absolutely CONTRAINDICATED in pregnancy and women of childbearing potential without reliable contraception.",

  150: "MOOD STABILIZER PREGNANCY SAFETY: LAMOTRIGINE is safest choice. Lithium: Category D, Ebstein's anomaly risk ~1/1000 (10x baseline but still low absolute risk); if continuing, monitor levels frequently (blood volume changes), fetal echo at 16-20 weeks, stop before delivery (rebound toxicity). Valproate: CONTRAINDICATED - neural tube defects (5-10%), lower IQ in offspring, Category X. Carbamazepine: facial abnormalities, developmental delays. Antipsychotics: relatively safe, consider if mood stabilizer not adequate. Board pearl: Never start valproate in woman of childbearing potential without discussing contraception.",

  206: "LITHIUM IN PREGNANCY - EBSTEIN'S ANOMALY: First trimester lithium exposure increases risk of Ebstein's anomaly (tricuspid valve malformation) from 1/20,000 baseline to approximately 1/1,000. Risk is highest weeks 2-6 of gestation (cardiac development). This is still relatively low absolute risk - previously thought much higher. Management options: (1) Taper lithium before conception if possible, (2) If stable and high recurrence risk, may continue with monitoring, (3) Use alternative if available. If continuing: frequent lithium levels (blood volume changes), fetal echocardiogram at 16-20 weeks. Lithium is NOT absolutely contraindicated - it's a risk-benefit discussion. Board pearl: Valproate is far more teratogenic than lithium.",

  394: "ISOTRETINOIN (Accutane) is absolutely CONTRAINDICATED in pregnancy - Category X, highly teratogenic. Causes severe birth defects: craniofacial abnormalities, cardiac defects, CNS malformations, thymus abnormalities. Requires iPLEDGE REMS program: two forms of contraception, two negative pregnancy tests before starting, monthly pregnancy tests, 30-day prescription limits. If patient becomes pregnant while on isotretinoin: discontinue IMMEDIATELY, refer to high-risk OB. Sertraline is relatively safe in pregnancy (preferred SSRI). Board pearl: iPLEDGE program exists specifically because isotretinoin teratogenicity is so severe.",

  // Drug-Induced Conditions
  202: "CORTICOSTEROIDS CAN TRIGGER MANIA in patients with bipolar disorder. Mechanism: corticosteroids increase catecholamine activity. Risk is dose-dependent - higher with systemic steroids (prednisone, dexamethasone) than topical/inhaled (though still possible). Also can cause steroid psychosis, depression, anxiety. When prescribing steroids to bipolar patient: (1) Use lowest effective dose, (2) Use shortest duration, (3) Monitor closely for mood changes, (4) Consider prophylactic mood stabilizer adjustment. Symptoms typically resolve when steroids discontinued. Board pearl: Other medications that can trigger mania: antidepressants (without mood stabilizer), stimulants, thyroid hormones.",

  24: "MEDICATIONS THAT CAN TRIGGER MANIA: (1) CORTICOSTEROIDS - increase catecholamines; (2) ANTIDEPRESSANTS - especially TCAs, less with SSRIs, but still risk without mood stabilizer; (3) ISONIAZID - inhibits MAO, increases catecholamines; (4) DISULFIRAM - inhibits dopamine beta-hydroxylase; (5) STIMULANTS - amphetamines, methylphenidate; (6) THYROID HORMONES - excessive doses; (7) LEVODOPA - dopamine precursor. When these medications are necessary in bipolar patient: monitor closely, consider prophylactic mood stabilizer adjustment. Board pearl: Always ask about substance use and medications when evaluating new-onset mania.",

  // Tardive Dyskinesia
  259: "TARDIVE DYSKINESIA (TD) develops after MONTHS TO YEARS of antipsychotic exposure (unlike acute EPS which occurs early). TD presents as involuntary CHOREOATHETOID movements of face, tongue, jaw (lip smacking, tongue protrusion, chewing), trunk, and extremities. Risk factors: older age, female sex, longer duration of treatment, higher cumulative doses, first-generation antipsychotics. TD may be IRREVERSIBLE. Prevention: use lowest effective dose, monitor with AIMS scale every 6-12 months. Treatment: reduce/discontinue causative agent (may worsen initially), switch to clozapine (lowest TD risk), FDA-approved VMAT2 inhibitors: valbenazine (Ingrezza), deutetrabenazine (Austedo). Board pearl: TD is the most concerning long-term antipsychotic side effect.",

  260: "EXTRAPYRAMIDAL SYMPTOMS (EPS) include: (1) ACUTE DYSTONIA - sustained muscle contractions, oculogyric crisis, onset hours-days; (2) AKATHISIA - subjective and objective restlessness, onset days-weeks; (3) PARKINSONISM - bradykinesia, rigidity, tremor, shuffling gait, onset weeks; (4) TARDIVE DYSKINESIA - involuntary movements, onset months-years. EPS are caused by dopamine blockade in nigrostriatal pathway. HYPOTHERMIA and BRADYCARDIA are NOT EPS - these suggest other conditions. NMS has HYPERthermia. Overdose may cause hypothermia/bradycardia. Board pearl: Know the timeline - acute dystonia (hours), akathisia (days), parkinsonism (weeks), TD (months-years).",

  // Cognitive Disorders
  229: "IADL (Instrumental Activities of Daily Living) impairment is HIGHLY CLINICALLY SIGNIFICANT and often the EARLIEST sign of cognitive decline. Managing finances/checkbook is typically the FIRST IADL affected in dementia - it requires executive function, calculation, sequencing. IADLs include: managing finances, medication management, shopping, cooking, housekeeping, transportation, using telephone. These are affected BEFORE basic ADLs (bathing, dressing, toileting, transferring, eating). A 78-year-old who can no longer manage her checkbook needs cognitive evaluation - this is NOT normal aging. Board pearl: IADL impairment often precedes ADL impairment and may be first sign family notices.",

  // Serotonin-Related
  395: "SEROTONIN SYNDROME KEY FINDING: CLONUS and HYPERREFLEXIA (especially lower extremity clonus). Triad: (1) Altered mental status (agitation, confusion), (2) Autonomic instability (hyperthermia, diaphoresis, tachycardia, BP changes), (3) Neuromuscular hyperactivity (HYPERREFLEXIA, clonus, tremor, myoclonus, rigidity). Clonus is rhythmic, involuntary muscle contractions - test at ankle. Hyperreflexia = exaggerated deep tendon reflexes. This DISTINGUISHES from NMS which has HYPOreflexia and lead-pipe rigidity. Onset rapid (within 24 hours of serotonergic drug change). Causes: SSRI + MAOI (most dangerous), SSRI + tramadol, SSRI + triptan. Board pearl: Clonus = serotonin syndrome.",

  // Carbamazepine Side Effects
  209: "COMMON CARBAMAZEPINE SIDE EFFECTS: sedation, dizziness, ataxia, diplopia (double vision), nausea, headache, blurred vision. These are DOSE-RELATED and often improve with time or dose adjustment. Carbamazepine does NOT typically cause severe hypertension - in fact, it can cause SIADH leading to HYPONATREMIA (low sodium). Rare but serious effects: agranulocytosis, aplastic anemia (monitor CBC), Stevens-Johnson syndrome/TEN (especially in HLA-B*1502+ patients), hepatotoxicity. Board pearl: Diplopia (double vision) is a classic carbamazepine side effect - often signals levels too high.",

  // SSRI Monitoring in Elderly
  305: "SSRIs in ELDERLY patients require SODIUM monitoring. SSRIs can cause SIADH (Syndrome of Inappropriate Antidiuretic Hormone) leading to HYPONATREMIA, especially in patients >65 years. Risk factors: advanced age, female sex, concurrent diuretics, low baseline sodium, medical comorbidities. Symptoms of hyponatremia: confusion (may be mistaken for dementia), falls, lethargy, headache, seizures. Check sodium at baseline and 2-4 weeks after starting SSRI in elderly patients. Also monitor for: falls (SSRIs can increase fall risk), GI bleeding (especially with NSAIDs). Board pearl: Elderly patient on SSRI who becomes confused - check sodium level."
};

// Apply master rationales
let rationaleCount = 0;
Object.entries(masterRationales).forEach(([id, rationale]) => {
  const q = data.find(item => item.id === parseInt(id));
  if (q) {
    q.rationale = rationale;
    rationaleCount++;
  }
});

console.log(`Applied ${rationaleCount} comprehensive educational rationales`);

// ============================================================================
// PART 3: FIX SPECIFIC PROBLEM QUESTIONS
// ============================================================================

console.log('\n=== PHASE 3: FIXING SPECIFIC PROBLEM QUESTIONS ===\n');

// Fix Q51 - PHQ-9 trivia question
const q51 = data.find(q => q.id === 51);
if (q51) {
  q51.question = "A patient completing the PHQ-9 endorses having thoughts that they would be better off dead or of hurting themselves. What is the PMHNP's most important next step?";
  q51.options = [
    "Document the finding and continue the visit",
    "Conduct an immediate suicide risk assessment",
    "Refer to psychiatry and reschedule",
    "Start an antidepressant to address the depression"
  ];
  q51.correctAnswer = 1;
  console.log('✓ Fixed Q51: Changed from trivia to clinical decision-making');
  totalFixes++;
}

// Fix Q305 - Already done but ensure it's correct
const q305 = data.find(q => q.id === 305);
if (q305 && q305.question.includes('reticulocyte')) {
  q305.question = "A 72-year-old patient with depression is started on escitalopram. Which lab should the PMHNP monitor due to a known risk with SSRIs in elderly patients?";
  q305.options = [
    "Reticulocyte count",
    "Serum sodium level",
    "Lipid panel",
    "Hemoglobin A1C"
  ];
  q305.correctAnswer = 1;
  console.log('✓ Fixed Q305: Changed to clinically valid SSRI monitoring question');
  totalFixes++;
}

// Ensure Q202 is fixed
const q202 = data.find(q => q.id === 202);
if (q202) {
  q202.question = "A patient with bipolar disorder requires prednisone for an acute asthma exacerbation. What should the PMHNP counsel the patient about?";
  q202.options = [
    "Corticosteroids may trigger manic episodes",
    "Corticosteroids have no psychiatric effects",
    "Only injectable steroids affect mood",
    "Prednisone will help stabilize mood"
  ];
  q202.correctAnswer = 0;
  console.log('✓ Fixed Q202: Corticosteroids and mania');
  totalFixes++;
}

// ============================================================================
// PART 4: VERIFY AND CLEAN ALL QUESTIONS
// ============================================================================

console.log('\n=== PHASE 4: CLEANING ALL OPTIONS ===\n');

// Remove any remaining hints from all options
let hintsRemoved = 0;
const hintPatterns = [
  /\s*\([^)]*correct[^)]*\)/gi,
  /\s*\([^)]*best[^)]*\)/gi,
  /\s*\([^)]*first[- ]?line[^)]*\)/gi,
  /\s*\([^)]*preferred[^)]*\)/gi,
  /\s*\([^)]*gold standard[^)]*\)/gi,
  /\s*\([^)]*treatment of choice[^)]*\)/gi,
  /\s*\([^)]*safest[^)]*\)/gi,
  /\s*\([^)]*most effective[^)]*\)/gi,
  /\s*- correct answer/gi,
  /\s*- best choice/gi,
  /\s*- first line/gi,
];

data.forEach(q => {
  q.options = q.options.map(opt => {
    let cleaned = opt;
    hintPatterns.forEach(pattern => {
      if (pattern.test(cleaned)) {
        cleaned = cleaned.replace(pattern, '');
        hintsRemoved++;
      }
    });
    return cleaned.trim();
  });
});

console.log(`Removed ${hintsRemoved} remaining hints from options`);

// ============================================================================
// SUMMARY AND SAVE
// ============================================================================

// Count questions with good rationales now
const goodRationales = data.filter(q => q.rationale && q.rationale.length > 150).length;
const withBoardPearl = data.filter(q => q.rationale && q.rationale.toLowerCase().includes('board pearl')).length;

console.log('\n' + '═'.repeat(60));
console.log('QUALITY OVERHAUL SUMMARY');
console.log('═'.repeat(60));
console.log(`Total questions: ${data.length}`);
console.log(`Questions with comprehensive rationales (>150 chars): ${goodRationales}`);
console.log(`Questions with "Board pearl" tips: ${withBoardPearl}`);
console.log(`Specific fixes applied: ${totalFixes}`);
console.log(`Master rationales applied: ${rationaleCount}`);
console.log(`Answer hints removed: ${hintsRemoved}`);

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✓ All changes saved to questions.json');
