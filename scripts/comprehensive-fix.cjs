const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// COMPREHENSIVE FIXES - Questions with wrong answers and/or wrong rationales
// Pattern identified: Many correctAnswers are off by 1, rationales shifted

const fixes = {
  // Q33 - Opioid overdose (pinpoint pupils, track marks) - answer should be Naloxone, not Flumazenil
  33: {
    correctAnswer: 1, // Naloxone (Narcan) is index 1
    rationale: "NALOXONE (NARCAN) reverses opioid overdose. Signs: pinpoint pupils (miosis), respiratory depression, track marks indicate IV drug use. Give naloxone 0.4-2mg IV/IM/IN, repeat every 2-3 minutes. May precipitate withdrawal but saves life. Teach: Always call 911 even after naloxone—short half-life means overdose can return."
  },

  // Q34 - Alcohol withdrawal first-line - answer should be Benzodiazepines, not Anticonvulsants
  34: {
    correctAnswer: 1, // Benzodiazepines is index 1
    rationale: "BENZODIAZEPINES are first-line for alcohol withdrawal—prevent seizures and DTs. CIWA-Ar guides dosing. ALSO give THIAMINE (B1) BEFORE glucose to prevent Wernicke's encephalopathy. Wernicke's triad: Confusion, Ataxia, Ophthalmoplegia. Untreated → Korsakoff's syndrome (permanent memory loss)."
  },

  // Q36 - NMS symptoms on haloperidol - answer should be NMS, not Malignant hyperthermia
  36: {
    correctAnswer: 2, // NMS is index 2
    rationale: "NEUROLEPTIC MALIGNANT SYNDROME (NMS): Life-threatening reaction to antipsychotics. Tetrad: Lead-pipe RIGIDITY, high FEVER (>104°F), altered MENTAL STATUS, AUTONOMIC instability. Labs: Elevated CK (often >1000). Stop antipsychotic immediately, supportive care, dantrolene/bromocriptine for severe cases."
  },

  // Q37 - Serotonin syndrome finding - answer should be Hyperreflexia/clonus
  37: {
    correctAnswer: 2, // Hyperreflexia and clonus is index 2
    rationale: "SEROTONIN SYNDROME vs NMS: SS has HYPERREFLEXIA, CLONUS, and myoclonus (jerky movements). NMS has LEAD-PIPE RIGIDITY and bradyreflexia. SS develops rapidly (hours); NMS develops over days. SS from serotonergic drugs; NMS from dopamine blockers. Both have fever and AMS."
  },

  // Q38 - Highest EPS risk - answer should be Haloperidol
  38: {
    correctAnswer: 2, // Haloperidol (Haldol) is index 2
    rationale: "HALOPERIDOL (Haldol) has HIGHEST EPS risk among antipsychotics due to potent D2 blockade. High-potency FGAs (haloperidol, fluphenazine) = more EPS. Low-potency FGAs (chlorpromazine, thioridazine) = more sedation, anticholinergic effects. Teach patient: Report muscle stiffness, tremor, restlessness."
  },

  // Q40 - Rhabdomyolysis associated with NMS
  40: {
    correctAnswer: 2, // NMS is index 2
    rationale: "RHABDOMYOLYSIS in NMS: Severe muscle rigidity causes muscle breakdown → myoglobin release → kidney damage. CK >1000 (often >10,000) is diagnostic clue. Treat with aggressive IV hydration to protect kidneys. Monitor urine output and renal function. This is a medical emergency."
  },

  // Q68 - Erikson's stage for satisfied 75-year-old - Integrity vs. Despair
  68: {
    correctAnswer: 2, // Integrity vs. Despair is index 2
    rationale: "ERIKSON'S INTEGRITY VS. DESPAIR (65+ years): Life review stage. Success = wisdom, acceptance of one's life. Failure = regret, bitterness, fear of death. Therapeutic approach: Life review therapy, reminiscence. Teach: It's never too late to find meaning and peace."
  },

  // Q69 - 4-month-old motor ability - Rolling over and head steady
  69: {
    correctAnswer: 2, // Rolling over and head steady is index 2
    rationale: "4-MONTH MOTOR MILESTONES: Head control established (no head lag), rolls over (front to back first), brings hands together midline, reaches for objects. Sits with support. Red flags: persistent head lag, no reaching, no social smile by this age."
  },

  // Q70 - 12-month language milestone - 1-3 words with meaning
  70: {
    correctAnswer: 2, // 1-3 words with meaning is index 2
    rationale: "12-MONTH LANGUAGE MILESTONES: Says 'mama/dada' with meaning (not just babbling), 1-3 words total, understands 'no,' follows simple commands, points to objects. Red flags: No babbling by 9 months, no words by 12 months, no gestures. Consider hearing evaluation."
  },

  // Q72 - PTSD first-line treatment - Keep correct but fix rationale
  72: {
    correctAnswer: 0, // Trauma-focused CBT/EMDR is correct (index 0)
    rationale: "PTSD FIRST-LINE TREATMENT: Trauma-focused therapies including Prolonged Exposure (PE), Cognitive Processing Therapy (CPT), and EMDR. These directly process traumatic memories. Medications (sertraline, paroxetine) are adjunctive. Avoid benzodiazepines—interfere with trauma processing and have high abuse potential in PTSD."
  },

  // Q34 duplicate check - Anticonvulsants listed at index 2, need benzos at index 1
  // Already fixed above

  // Additional fixes identified from audit patterns:

  // Q39 - Lowest metabolic risk antipsychotic - Ziprasidone is correct at index 2
  39: {
    correctAnswer: 2, // Ziprasidone (Geodon) is index 2
    rationale: "ZIPRASIDONE and LURASIDONE have LOWEST metabolic risk among atypical antipsychotics. Minimal weight gain, low diabetes/lipid risk. Ziprasidone: Take with food (500 calories). Lurasidone: Take with 350+ calories. Good choices for patients with metabolic concerns. Monitor QTc with ziprasidone."
  },

  // Q46 - COWS score for buprenorphine - answer is correct but rationale may need update
  46: {
    correctAnswer: 1, // >8 is index 1 for initiating buprenorphine
    rationale: "COWS (Clinical Opiate Withdrawal Scale) guides buprenorphine initiation. Score >8-12: Can start buprenorphine (patient in sufficient withdrawal). Starting too early causes precipitated withdrawal. Signs of withdrawal: dilated pupils, tachycardia, lacrimation, rhinorrhea, piloerection, yawning, restlessness."
  },

  // Q47 - GAD-7 score 11 = Moderate anxiety, treatment indicated (index 2)
  47: {
    correctAnswer: 2, // Moderate anxiety (10-14) is index 2
    rationale: "GAD-7 SCORING: 0-4=minimal, 5-9=mild, 10-14=moderate, 15-21=severe. Score of 11 = moderate anxiety = treatment indicated. Options: SSRIs/SNRIs first-line, buspirone, CBT. Avoid benzodiazepines for chronic anxiety. Always screen for co-occurring depression (PHQ-9) and substance use."
  }
};

let fixCount = 0;
data.forEach(q => {
  if (fixes[q.id]) {
    const fix = fixes[q.id];
    if (fix.correctAnswer !== undefined) {
      const oldAnswer = q.correctAnswer;
      q.correctAnswer = fix.correctAnswer;
      console.log(`Q${q.id}: correctAnswer ${oldAnswer} → ${fix.correctAnswer}`);
    }
    if (fix.rationale) {
      q.rationale = fix.rationale;
      console.log(`Q${q.id}: Rationale updated`);
    }
    fixCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\nTotal questions fixed: ${fixCount}`);
