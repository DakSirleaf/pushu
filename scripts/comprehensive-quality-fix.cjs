const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     COMPREHENSIVE QUESTION QUALITY FIX                         ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let fixCount = 0;
const issues = [];

// ============================================================================
// CRITICAL CLINICAL FIXES - Based on verified medical knowledge
// ============================================================================

// Q149 - WRONG ANSWER: Asks safest mood stabilizer in pregnancy, answer is Valproic acid (WRONG!)
const q149 = data.find(q => q.id === 149);
if (q149) {
  q149.options = [
    'Lithium',
    'Lamotrigine',
    'Carbamazepine',
    'Valproic acid'
  ];
  q149.correctAnswer = 1; // Lamotrigine is safest
  q149.rationale = "LAMOTRIGINE (Lamictal) is the SAFEST mood stabilizer in pregnancy. Teratogenicity risk ranking: Valproate (HIGHEST - neural tube defects, contraindicated) > Carbamazepine > Lithium (Ebstein's anomaly) > Lamotrigine (LOWEST). Board pearl: If pregnant bipolar patient needs mood stabilizer, lamotrigine is first choice. Valproate is absolutely contraindicated in pregnancy and women of childbearing potential without reliable contraception.";
  console.log('✓ Fixed Q149: Safest mood stabilizer in pregnancy = Lamotrigine');
  fixCount++;
}

// Q206 - WRONG ANSWER: Answer says lithium only contraindicated during labor (WRONG!)
const q206 = data.find(q => q.id === 206);
if (q206) {
  q206.options = [
    'Lithium is safe throughout pregnancy',
    'Lithium poses risk of Ebstein anomaly, especially in first trimester; discuss risks/benefits',
    'Lithium has no fetal effects',
    'Lithium is only dangerous during delivery'
  ];
  q206.correctAnswer = 1;
  q206.rationale = "LITHIUM and pregnancy: Category D. First trimester exposure increases risk of EBSTEIN'S ANOMALY (tricuspid valve malformation) from 1/20,000 to 1/1,000. Risk is highest weeks 2-6 of gestation. Management: If possible, taper lithium before conception or during first trimester. If must continue, use lowest effective dose, check levels frequently (q2-4 weeks), obtain fetal echocardiogram at 16-20 weeks. NOT safe in early pregnancy - counsel patient on risks vs benefits of continuing.";
  console.log('✓ Fixed Q206: Lithium pregnancy risk = Ebstein anomaly in first trimester');
  fixCount++;
}

// Q346 - Remove hint from answer
const q346 = data.find(q => q.id === 346);
if (q346) {
  q346.options = [
    'Complete blood count',
    'Pregnancy test',
    'Liver function tests',
    'Thyroid function tests'
  ];
  q346.correctAnswer = 1;
  q346.rationale = "Women of childbearing age on LITHIUM: FIRST test before any medication changes is PREGNANCY TEST. Lithium is teratogenic (Category D) - causes Ebstein's anomaly. Must know pregnancy status before continuing, adjusting, or discontinuing. If pregnant: discuss risks, consider switching to lamotrigine, or if lithium essential, minimize dose and monitor closely with fetal echo at 16-20 weeks.";
  console.log('✓ Fixed Q346: Removed hint from pregnancy test option');
  fixCount++;
}

// Q297 - Remove hint from answer
const q297 = data.find(q => q.id === 297);
if (q297) {
  q297.options = q297.options.map(opt =>
    opt.replace(/ - valproate is highly teratogenic/gi, '')
       .replace(/ - highly teratogenic/gi, '')
  );
  console.log('✓ Fixed Q297: Removed teratogenic hint');
  fixCount++;
}

// Q347 - Remove hint from answer
const q347 = data.find(q => q.id === 347);
if (q347) {
  q347.options = q347.options.map(opt =>
    opt.replace(/ - valproate is highly teratogenic/gi, '')
       .replace(/ - highly teratogenic/gi, '')
  );
  console.log('✓ Fixed Q347: Removed teratogenic hint');
  fixCount++;
}

// Q394 - Remove hint from isotretinoin option
const q394 = data.find(q => q.id === 394);
if (q394) {
  q394.options = q394.options.map(opt =>
    opt.replace(/ - Category X, highly teratogenic/gi, '')
       .replace(/ - highly teratogenic, Category X/gi, '')
       .replace(/\(Accutane\)/gi, '')
       .trim()
  );
  console.log('✓ Fixed Q394: Removed teratogenic/Category X hint');
  fixCount++;
}

// Q410 - Remove hint
const q410 = data.find(q => q.id === 410);
if (q410) {
  q410.options = q410.options.map(opt =>
    opt.replace(/ - highly teratogenic, Category X/gi, '')
       .replace(/ISOTRETINOIN \(Accutane\)/gi, 'Isotretinoin')
       .trim()
  );
  console.log('✓ Fixed Q410: Removed teratogenic hint');
  fixCount++;
}

// Q42 - PHQ-9 - Remove treatment hint
const q42 = data.find(q => q.id === 42);
if (q42) {
  q42.options = [
    'Score 5 or higher',
    'Score 10 or higher',
    'Score 15 or higher',
    'Score 20 or higher'
  ];
  q42.correctAnswer = 1;
  q42.rationale = "PHQ-9 scoring: 0-4 (minimal), 5-9 (mild), 10-14 (moderate), 15-19 (moderately severe), 20-27 (severe). Score of 10+ indicates moderate depression and is the clinical threshold for considering treatment intervention. Board pearl: PHQ-9 ≥10 = positive screen requiring further assessment and likely treatment. Always assess for suicidality (question 9) regardless of total score.";
  console.log('✓ Fixed Q42: Removed treatment hint from PHQ-9 options');
  fixCount++;
}

// ============================================================================
// REMOVE ALL REMAINING PARENTHETICAL HINTS
// ============================================================================

const hintPatterns = [
  /\s*\([^)]*safe[^)]*\)/gi,
  /\s*\([^)]*first[- ]?line[^)]*\)/gi,
  /\s*\([^)]*correct[^)]*\)/gi,
  /\s*\([^)]*best[^)]*\)/gi,
  /\s*\([^)]*preferred[^)]*\)/gi,
  /\s*\([^)]*recommended[^)]*\)/gi,
  /\s*\([^)]*treatment[^)]*\)/gi,
  /\s*\([^)]*indicated[^)]*\)/gi,
  /\s*\([^)]*therapeutic[^)]*\)/gi,
  /\s*\([^)]*effective[^)]*\)/gi,
  /\s*\([^)]*choice[^)]*\)/gi,
];

let hintRemovals = 0;
data.forEach(q => {
  q.options = q.options.map(opt => {
    let cleaned = opt;
    hintPatterns.forEach(pattern => {
      if (pattern.test(cleaned)) {
        cleaned = cleaned.replace(pattern, '');
        hintRemovals++;
      }
    });
    return cleaned.trim();
  });
});
console.log(`\n✓ Removed ${hintRemovals} additional hint patterns from options`);

// ============================================================================
// ENHANCE WEAK RATIONALES - Add educational content
// ============================================================================

// Find questions with short rationales
const shortRationales = data.filter(q => !q.rationale || q.rationale.length < 100);
console.log(`\nFound ${shortRationales.length} questions with short/missing rationales`);

// Key clinical knowledge enhancements
const rationaleEnhancements = {
  // CIWA scoring
  45: "CIWA-Ar (Clinical Institute Withdrawal Assessment for Alcohol, Revised) scoring: 0-9 (mild, may not need meds), 10-15 (moderate, consider PRN benzos), 16-20 (severe, scheduled benzos needed), >20 (very severe, high risk of seizures/DTs). Score >8-10 typically triggers pharmacologic intervention. Monitor q1-2h initially. Benzodiazepines are first-line treatment - commonly lorazepam, chlordiazepoxide, or diazepam.",

  // COWS scoring
  46: "COWS (Clinical Opiate Withdrawal Scale) scoring: 5-12 (mild), 13-24 (moderate), 25-36 (moderately severe), >36 (severe). For buprenorphine induction, patient should score ≥8-12 to avoid precipitated withdrawal. COWS assesses: resting pulse, sweating, restlessness, pupil size, bone/joint aches, runny nose, GI upset, tremor, yawning, anxiety, gooseflesh. Higher scores = safer to start buprenorphine.",

  // Serotonin syndrome
  37: "SEROTONIN SYNDROME triad: (1) Mental status changes (agitation, confusion), (2) Autonomic instability (hyperthermia, tachycardia, diaphoresis, BP changes), (3) Neuromuscular abnormalities (HYPERREFLEXIA, CLONUS, tremor, rigidity). Key differentiator from NMS: hyperreflexia and clonus (NMS has hyporeflexia and lead-pipe rigidity). Onset: rapid (within 24h of drug change). Treatment: stop offending agent, supportive care, cyproheptadine for severe cases.",

  // NMS
  36: "NEUROLEPTIC MALIGNANT SYNDROME (NMS): Life-threatening reaction to dopamine antagonists (antipsychotics). Classic tetrad: (1) Fever (often >40°C), (2) LEAD-PIPE RIGIDITY, (3) Altered mental status, (4) Autonomic instability. Labs: elevated CK (often >1000), leukocytosis, metabolic acidosis. Key differentiator from serotonin syndrome: HYPOREFLEXIA and lead-pipe rigidity. Treatment: stop antipsychotic, supportive care, dantrolene, bromocriptine.",

  // Lithium levels
  203: "LITHIUM therapeutic levels: Acute mania: 0.8-1.2 mEq/L. Maintenance: 0.6-1.0 mEq/L. Toxicity: >1.5 mEq/L. Draw level 12 hours post-dose (trough). Early toxicity signs: GI symptoms (nausea, vomiting, diarrhea), fine tremor, polyuria. Severe toxicity: coarse tremor, ataxia, slurred speech, confusion, seizures. Factors increasing levels: dehydration, NSAIDs, ACE inhibitors, thiazides, low-sodium diet.",

  // Valproate levels
  214: "VALPROATE (Depakote) therapeutic level: 50-125 mcg/mL. Monitor: LFTs (hepatotoxicity risk, especially in children <2), CBC with platelets (thrombocytopenia), ammonia if altered mental status. Black box warnings: hepatotoxicity, pancreatitis, teratogenicity (neural tube defects - CONTRAINDICATED in pregnancy). Side effects: weight gain, hair loss, tremor, GI upset. Drug interactions: highly protein-bound, displaces other drugs.",

  // Clozapine monitoring
  26: "CLOZAPINE requires REMS monitoring due to agranulocytosis risk (~1%). ANC monitoring schedule: Weekly for first 6 months, every 2 weeks for months 6-12, monthly thereafter if stable. Hold clozapine if ANC <1500 (general population) or <1000 (benign ethnic neutropenia). Also monitor for: metabolic syndrome, myocarditis (first month), seizures (dose-related), constipation (can be fatal), sialorrhea. Only antipsychotic proven effective for treatment-resistant schizophrenia.",
};

Object.entries(rationaleEnhancements).forEach(([id, rationale]) => {
  const q = data.find(item => item.id === parseInt(id));
  if (q) {
    q.rationale = rationale;
    fixCount++;
  }
});
console.log('✓ Enhanced rationales for key clinical topics');

// ============================================================================
// FIX SCALE/LAB QUESTIONS - Remove values that give away answers
// ============================================================================

// Find questions where options contain actual numeric values that could be hints
data.forEach(q => {
  const questionLower = q.question.toLowerCase();

  // For therapeutic level questions, ensure options don't have "therapeutic" or "toxic" labels
  if (questionLower.includes('therapeutic') || questionLower.includes('level')) {
    q.options = q.options.map(opt =>
      opt.replace(/\s*\(therapeutic\)/gi, '')
         .replace(/\s*\(toxic\)/gi, '')
         .replace(/\s*\(subtherapeutic\)/gi, '')
         .replace(/\s*\(normal\)/gi, '')
         .replace(/\s*\(abnormal\)/gi, '')
         .trim()
    );
  }
});

// ============================================================================
// VERIFY CLINICAL ACCURACY OF KEY TOPICS
// ============================================================================

console.log('\n=== CLINICAL ACCURACY VERIFICATION ===');

const clinicalChecks = [
  { id: 149, expectedAnswer: 'Lamotrigine', topic: 'Safest mood stabilizer in pregnancy' },
  { id: 150, expectedAnswer: 'Lamotrigine', topic: 'Safest mood stabilizer in pregnancy' },
  { id: 206, expectedAnswer: 'Ebstein', topic: 'Lithium pregnancy risk' },
  { id: 37, expectedKeyword: 'hyperreflexia', topic: 'Serotonin syndrome' },
  { id: 36, expectedKeyword: 'rigidity', topic: 'NMS' },
  { id: 33, expectedKeyword: 'naloxone', topic: 'Opioid overdose reversal' },
  { id: 34, expectedKeyword: 'benzo', topic: 'Alcohol withdrawal treatment' },
];

clinicalChecks.forEach(check => {
  const q = data.find(item => item.id === check.id);
  if (q) {
    const correctAnswer = q.options[q.correctAnswer].toLowerCase();
    const rationale = (q.rationale || '').toLowerCase();

    if (check.expectedAnswer && !correctAnswer.includes(check.expectedAnswer.toLowerCase())) {
      console.log(`⚠ Q${check.id} (${check.topic}): Answer may not be correct`);
      console.log(`   Current answer: ${q.options[q.correctAnswer]}`);
    } else if (check.expectedKeyword && !rationale.includes(check.expectedKeyword)) {
      console.log(`⚠ Q${check.id} (${check.topic}): Rationale missing key term: ${check.expectedKeyword}`);
    } else {
      console.log(`✓ Q${check.id} (${check.topic}): Verified correct`);
    }
  }
});

// ============================================================================
// SAVE
// ============================================================================

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\n════════════════════════════════════════`);
console.log(`Total fixes applied: ${fixCount}`);
console.log(`Hint patterns removed: ${hintRemovals}`);
console.log(`✓ Changes saved to questions.json`);
