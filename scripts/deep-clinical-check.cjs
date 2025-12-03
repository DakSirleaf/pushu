const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║          DEEP CLINICAL ACCURACY VERIFICATION                   ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Clinical accuracy checks based on ANCC board exam standards
const clinicalChecks = [
  // PHARMACOLOGY - MOOD STABILIZERS
  { id: 149, topic: 'Valproate teratogenicity', expectInRationale: ['neural tube', 'spina bifida', 'teratogen'] },
  { id: 150, topic: 'Safest mood stabilizer in pregnancy', expectInRationale: ['lamotrigine', 'safer', 'lamictal'] },
  { id: 203, topic: 'Lithium therapeutic range', expectCorrectOption: '0.6-1.2' },
  { id: 214, topic: 'Valproate therapeutic range', expectCorrectOption: '50-125' },

  // PHARMACOLOGY - ANTIPSYCHOTICS
  { id: 26, topic: 'QTc prolongation - Ziprasidone', expectInRationale: ['ziprasidone', 'geodon', 'qtc'] },
  { id: 38, topic: 'Highest EPS risk - Haloperidol', expectInRationale: ['haloperidol', 'haldol', 'eps'] },
  { id: 259, topic: 'EPS progression to TD', expectInRationale: ['tardive'] },

  // EMERGENCY MANAGEMENT
  { id: 33, topic: 'Opioid OD reversal - Naloxone', expectInRationale: ['naloxone', 'narcan', 'opioid'] },
  { id: 34, topic: 'Alcohol withdrawal - Benzos', expectInRationale: ['benzodiazepine', 'withdrawal', 'ciwa'] },
  { id: 36, topic: 'NMS diagnosis', expectInRationale: ['neuroleptic malignant', 'nms', 'rigidity'] },
  { id: 37, topic: 'Serotonin syndrome signs', expectInRationale: ['serotonin', 'clonus', 'hyperreflexia'] },

  // ASSESSMENT TOOLS
  { id: 42, topic: 'PHQ-9 cutoff', expectInRationale: ['phq', '10', 'depression'] },
  { id: 45, topic: 'CIWA treatment threshold', expectInRationale: ['ciwa', '8'] },
  { id: 46, topic: 'COWS for buprenorphine', expectInRationale: ['cows', 'buprenorphine', 'withdrawal'] },

  // DSM-5 CRITERIA
  { id: 97, topic: 'GAD duration', expectInRationale: ['6 month', 'gad'] },
  { id: 99, topic: 'Adjustment disorder onset', expectInRationale: ['3 month', 'adjustment'] },
  { id: 500, topic: 'Dysthymia duration', expectInRationale: ['2 year', 'persistent'] },

  // PSYCHOTHERAPY
  { id: 72, topic: 'PTSD first-line therapy', expectInRationale: ['emdr', 'exposure', 'cpt', 'trauma'] },
  { id: 415, topic: 'PTSD therapies', expectInRationale: ['emdr', 'prolonged exposure', 'cognitive processing'] },

  // DEVELOPMENTAL
  { id: 68, topic: 'Erikson - Integrity vs Despair', expectInRationale: ['erikson', 'integrity', 'despair'] },
  { id: 69, topic: '4-month milestones', expectInRationale: ['roll', 'head', '4'] },
  { id: 70, topic: '12-month language', expectInRationale: ['word', '12', 'mama', 'dada'] },

  // DRUG INTERACTIONS
  { id: 207, topic: 'Lithium + ACE inhibitor', expectInRationale: ['ace', 'lithium', 'double', 'increase'] },
  { id: 270, topic: 'Carbamazepine + Erythromycin', expectInRationale: ['erythromycin', 'cyp3a4', 'inhibit', 'toxicity'] },
  { id: 295, topic: 'Smoking cessation + Olanzapine', expectInRationale: ['cyp1a2', 'smoking', 'olanzapine', 'decrease'] },

  // SUBSTANCE USE
  { id: 416, topic: 'Benzos in liver disease', expectInRationale: ['lorazepam', 'glucuronidation', 'liver'] },
  { id: 417, topic: 'CIWA 18 treatment', expectInRationale: ['scheduled', 'benzo', 'ciwa'] },
];

let passed = 0;
let failed = 0;
const failures = [];

clinicalChecks.forEach(check => {
  const q = data.find(item => item.id === check.id);
  if (!q) {
    console.log(`❌ Q${check.id} (${check.topic}): NOT FOUND`);
    failed++;
    return;
  }

  const rationale = (q.rationale || '').toLowerCase();
  const correctOption = (q.options[q.correctAnswer] || '').toLowerCase();

  let testPassed = true;
  let failReason = '';

  if (check.expectInRationale) {
    const hasMatch = check.expectInRationale.some(term =>
      rationale.includes(term.toLowerCase())
    );
    if (!hasMatch) {
      testPassed = false;
      failReason = `Rationale missing: ${check.expectInRationale.join(' or ')}`;
    }
  }

  if (check.expectCorrectOption) {
    if (!correctOption.includes(check.expectCorrectOption.toLowerCase())) {
      testPassed = false;
      failReason = `Correct answer should contain: ${check.expectCorrectOption}`;
    }
  }

  if (testPassed) {
    console.log(`✓ Q${check.id} (${check.topic}): VERIFIED`);
    passed++;
  } else {
    console.log(`❌ Q${check.id} (${check.topic}): FAILED - ${failReason}`);
    failures.push({ id: check.id, topic: check.topic, reason: failReason });
    failed++;
  }
});

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`CLINICAL ACCURACY RESULTS: ${passed}/${clinicalChecks.length} PASSED`);

if (failures.length > 0) {
  console.log('\nFAILURES:');
  failures.forEach(f => {
    console.log(`  Q${f.id}: ${f.topic} - ${f.reason}`);
  });
}

console.log('\n' + (failed === 0 ? '🎉 ALL CLINICAL CHECKS PASSED!' : `⚠ ${failed} checks need review`));

// Additional random spot checks
console.log('\n═══ RANDOM SPOT CHECKS ═══');

// Pick 10 random questions and verify they have proper structure
const randomIds = [];
while (randomIds.length < 10) {
  const id = Math.floor(Math.random() * 500) + 1;
  if (!randomIds.includes(id)) randomIds.push(id);
}

randomIds.forEach(id => {
  const q = data.find(item => item.id === id);
  if (q) {
    const hasQuestion = q.question && q.question.length > 20;
    const has4Options = q.options && q.options.length === 4 && q.options.every(o => o.length > 2);
    const hasValidAnswer = q.correctAnswer >= 0 && q.correctAnswer <= 3;
    const hasRationale = q.rationale && q.rationale.length > 30;

    const status = hasQuestion && has4Options && hasValidAnswer && hasRationale ? '✓' : '❌';
    console.log(`${status} Q${id}: ${q.question.substring(0, 50)}...`);
  }
});

console.log('\n═══ HIGH-YIELD TOPIC COVERAGE ═══');

// Check coverage of key ANCC topics
const topicKeywords = {
  'Mood Stabilizers': ['lithium', 'valproate', 'depakote', 'lamotrigine', 'carbamazepine'],
  'Antipsychotics': ['haloperidol', 'risperidone', 'olanzapine', 'quetiapine', 'aripiprazole', 'clozapine'],
  'Antidepressants': ['ssri', 'snri', 'tca', 'maoi', 'bupropion', 'mirtazapine'],
  'Anxiolytics': ['benzodiazepine', 'buspirone', 'hydroxyzine'],
  'ADHD Medications': ['methylphenidate', 'amphetamine', 'atomoxetine', 'guanfacine'],
  'Emergency Psych': ['nms', 'serotonin syndrome', 'dystonia', 'akathisia', 'overdose'],
  'Substance Use': ['alcohol', 'opioid', 'withdrawal', 'ciwa', 'cows', 'naloxone', 'buprenorphine'],
  'Psychotherapy': ['cbt', 'dbt', 'emdr', 'exposure', 'psychodynamic'],
  'Assessment Tools': ['phq-9', 'gad-7', 'mmse', 'moca', 'ciwa', 'cows'],
  'Developmental': ['erikson', 'piaget', 'milestone', 'attachment'],
  'Ethics/Legal': ['tarasoff', 'informed consent', 'confidential', 'hipaa', 'mandator'],
};

Object.entries(topicKeywords).forEach(([topic, keywords]) => {
  let count = 0;
  data.forEach(q => {
    const text = `${q.question} ${q.rationale}`.toLowerCase();
    if (keywords.some(kw => text.includes(kw))) count++;
  });
  console.log(`${topic}: ${count} questions`);
});
