const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     COMPREHENSIVE QC TEST - ANCC PMHNP STUDY APP               ║');
console.log('║     Testing 500 Questions for Board Readiness                  ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const issues = {
  critical: [],
  major: [],
  minor: [],
  warnings: []
};

// ============ TEST 1: DATA INTEGRITY ============
console.log('═══ TEST 1: DATA INTEGRITY ═══');
let test1Pass = true;

// Check total count
if (data.length !== 500) {
  issues.critical.push(`Expected 500 questions, found ${data.length}`);
  test1Pass = false;
}

// Check each question has required fields
data.forEach((q, idx) => {
  if (!q.id) issues.critical.push(`Q index ${idx}: Missing ID`);
  if (!q.question || q.question.length < 20) issues.critical.push(`Q${q.id}: Question too short or missing`);
  if (!q.options || q.options.length !== 4) issues.critical.push(`Q${q.id}: Must have exactly 4 options`);
  if (q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer > 3) {
    issues.critical.push(`Q${q.id}: Invalid correctAnswer index: ${q.correctAnswer}`);
  }
  if (!q.rationale || q.rationale.length < 30) issues.major.push(`Q${q.id}: Rationale too short or missing`);
  if (!q.category) issues.minor.push(`Q${q.id}: Missing category`);
});

// Check for sequential IDs
const ids = data.map(q => q.id).sort((a, b) => a - b);
for (let i = 1; i <= 500; i++) {
  if (!ids.includes(i)) {
    issues.critical.push(`Missing question ID: ${i}`);
    test1Pass = false;
  }
}

console.log(`Total questions: ${data.length}`);
console.log(`ID range: ${Math.min(...ids)} to ${Math.max(...ids)}`);
console.log(`Test 1 Result: ${test1Pass ? '✓ PASS' : '✗ FAIL'}\n`);

// ============ TEST 2: ANSWER-RATIONALE ALIGNMENT ============
console.log('═══ TEST 2: ANSWER-RATIONALE ALIGNMENT ═══');
let alignmentIssues = 0;

// Key clinical terms that should match between answer and rationale
const clinicalTerms = [
  { answer: 'lorazepam', rationale: ['lorazepam', 'ativan', 'glucuronidation'] },
  { answer: 'ziprasidone', rationale: ['ziprasidone', 'geodon', 'qtc'] },
  { answer: 'clozapine', rationale: ['clozapine', 'clozaril', 'agranulocytosis'] },
  { answer: 'lithium', rationale: ['lithium', 'thyroid', 'renal', 'ebstein'] },
  { answer: 'valproate', rationale: ['valproate', 'depakote', 'teratogen', 'neural tube'] },
  { answer: 'lamotrigine', rationale: ['lamotrigine', 'lamictal', 'stevens-johnson', 'weight'] },
  { answer: 'carbamazepine', rationale: ['carbamazepine', 'tegretol', 'hla-b'] },
  { answer: 'haloperidol', rationale: ['haloperidol', 'haldol', 'eps', 'd2'] },
  { answer: 'naloxone', rationale: ['naloxone', 'narcan', 'opioid'] },
  { answer: 'flumazenil', rationale: ['flumazenil', 'benzodiazepine', 'reversal'] },
  { answer: 'benztropine', rationale: ['benztropine', 'cogentin', 'anticholinergic', 'dystonia'] },
  { answer: 'tardive', rationale: ['tardive', 'involuntary', 'movement'] },
  { answer: 'nms', rationale: ['nms', 'neuroleptic malignant', 'rigidity', 'fever'] },
  { answer: 'serotonin syndrome', rationale: ['serotonin syndrome', 'clonus', 'hyperreflexia'] },
];

data.forEach(q => {
  const correctOption = (q.options[q.correctAnswer] || '').toLowerCase();
  const rationale = (q.rationale || '').toLowerCase();

  clinicalTerms.forEach(term => {
    if (correctOption.includes(term.answer)) {
      const hasMatch = term.rationale.some(r => rationale.includes(r));
      if (!hasMatch) {
        issues.major.push(`Q${q.id}: Answer mentions "${term.answer}" but rationale doesn't discuss it`);
        alignmentIssues++;
      }
    }
  });
});

console.log(`Alignment issues found: ${alignmentIssues}`);
console.log(`Test 2 Result: ${alignmentIssues === 0 ? '✓ PASS' : alignmentIssues < 5 ? '⚠ WARNING' : '✗ FAIL'}\n`);

// ============ TEST 3: DUPLICATE DETECTION ============
console.log('═══ TEST 3: DUPLICATE DETECTION ═══');
const questionTexts = new Map();
let duplicates = 0;

data.forEach(q => {
  // Normalize question text for comparison
  const normalized = q.question.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 100);
  if (questionTexts.has(normalized)) {
    const existingId = questionTexts.get(normalized);
    issues.major.push(`Potential duplicate: Q${existingId} and Q${q.id}`);
    duplicates++;
  } else {
    questionTexts.set(normalized, q.id);
  }
});

console.log(`Potential duplicates found: ${duplicates}`);
console.log(`Test 3 Result: ${duplicates === 0 ? '✓ PASS' : duplicates < 10 ? '⚠ WARNING' : '✗ FAIL'}\n`);

// ============ TEST 4: ANSWER HINT CHECK ============
console.log('═══ TEST 4: ANSWER HINT CHECK (Parentheses) ═══');
let hintIssues = 0;

const revealingPatterns = [
  /\([^)]*irreversible[^)]*\)/i,
  /\([^)]*causes[^)]*\)/i,
  /\([^)]*first-line[^)]*\)/i,
  /\([^)]*evidence[^)]*\)/i,
  /\([^)]*warning[^)]*\)/i,
  /\([^)]*black box[^)]*\)/i,
  /\([^)]*safer[^)]*\)/i,
  /\([^)]*preferred[^)]*\)/i,
  /\([^)]*recommended[^)]*\)/i,
];

data.forEach(q => {
  q.options.forEach((opt, i) => {
    revealingPatterns.forEach(pattern => {
      if (pattern.test(opt)) {
        issues.major.push(`Q${q.id} Opt${i}: Contains answer hint - "${opt.substring(0, 50)}..."`);
        hintIssues++;
      }
    });
  });
});

console.log(`Answer hints found: ${hintIssues}`);
console.log(`Test 4 Result: ${hintIssues === 0 ? '✓ PASS' : '✗ FAIL'}\n`);

// ============ TEST 5: OPTION QUALITY ============
console.log('═══ TEST 5: OPTION QUALITY ═══');
let optionIssues = 0;

data.forEach(q => {
  // Check for empty options
  q.options.forEach((opt, i) => {
    if (!opt || opt.trim().length < 3) {
      issues.critical.push(`Q${q.id} Opt${i}: Empty or too short option`);
      optionIssues++;
    }
  });

  // Check for duplicate options
  const uniqueOpts = new Set(q.options.map(o => o.toLowerCase().trim()));
  if (uniqueOpts.size !== 4) {
    issues.major.push(`Q${q.id}: Has duplicate options`);
    optionIssues++;
  }

  // Check correct answer is not obviously different (all caps vs others)
  const correctOpt = q.options[q.correctAnswer];
  const otherOpts = q.options.filter((_, i) => i !== q.correctAnswer);
  if (correctOpt && correctOpt === correctOpt.toUpperCase() && correctOpt.length > 10) {
    const othersAllCaps = otherOpts.every(o => o === o.toUpperCase());
    if (!othersAllCaps) {
      issues.minor.push(`Q${q.id}: Correct answer stands out (all caps)`);
    }
  }
});

console.log(`Option quality issues: ${optionIssues}`);
console.log(`Test 5 Result: ${optionIssues === 0 ? '✓ PASS' : '✗ FAIL'}\n`);

// ============ TEST 6: CLINICAL ACCURACY SPOT CHECK ============
console.log('═══ TEST 6: CLINICAL ACCURACY SPOT CHECK ═══');
let accuracyIssues = 0;

// Verify known correct answers
const knownCorrect = [
  { id: 26, correctAnswer: 2, topic: 'QTc - Ziprasidone' },
  { id: 33, correctAnswer: 1, topic: 'Opioid OD - Naloxone' },
  { id: 34, correctAnswer: 1, topic: 'Alcohol withdrawal - Benzos' },
  { id: 36, correctAnswer: 2, topic: 'NMS diagnosis' },
  { id: 37, correctAnswer: 2, topic: 'Serotonin syndrome - hyperreflexia' },
  { id: 38, correctAnswer: 2, topic: 'Highest EPS - Haloperidol' },
  { id: 97, correctAnswer: 2, topic: 'GAD - 6 months' },
  { id: 99, correctAnswer: 1, topic: 'Adjustment disorder - 3 months' },
  { id: 500, correctAnswer: 2, topic: 'Dysthymia - 2 years' },
];

knownCorrect.forEach(check => {
  const q = data.find(item => item.id === check.id);
  if (q && q.correctAnswer !== check.correctAnswer) {
    issues.critical.push(`Q${check.id} (${check.topic}): Expected answer ${check.correctAnswer}, got ${q.correctAnswer}`);
    accuracyIssues++;
  }
});

console.log(`Clinical accuracy issues: ${accuracyIssues}`);
console.log(`Test 6 Result: ${accuracyIssues === 0 ? '✓ PASS' : '✗ FAIL'}\n`);

// ============ TEST 7: CATEGORY DISTRIBUTION ============
console.log('═══ TEST 7: CATEGORY DISTRIBUTION ═══');
const categories = {};
data.forEach(q => {
  const cat = q.category || 'Uncategorized';
  categories[cat] = (categories[cat] || 0) + 1;
});

console.log('Category breakdown:');
Object.entries(categories)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });

const uncategorized = categories['Uncategorized'] || 0;
console.log(`\nUncategorized questions: ${uncategorized}`);
console.log(`Test 7 Result: ${uncategorized < 10 ? '✓ PASS' : '⚠ WARNING'}\n`);

// ============ TEST 8: RATIONALE QUALITY ============
console.log('═══ TEST 8: RATIONALE QUALITY ═══');
let shortRationales = 0;
let veryLongRationales = 0;

data.forEach(q => {
  const len = (q.rationale || '').length;
  if (len < 50) {
    issues.major.push(`Q${q.id}: Rationale too short (${len} chars)`);
    shortRationales++;
  }
  if (len > 800) {
    issues.minor.push(`Q${q.id}: Rationale very long (${len} chars) - consider trimming`);
    veryLongRationales++;
  }
});

const avgRationale = Math.round(data.reduce((sum, q) => sum + (q.rationale || '').length, 0) / data.length);
console.log(`Average rationale length: ${avgRationale} characters`);
console.log(`Short rationales (<50 chars): ${shortRationales}`);
console.log(`Very long rationales (>800 chars): ${veryLongRationales}`);
console.log(`Test 8 Result: ${shortRationales === 0 ? '✓ PASS' : '✗ FAIL'}\n`);

// ============ TEST 9: QUESTION FORMAT (VIGNETTE CHECK) ============
console.log('═══ TEST 9: QUESTION FORMAT (VIGNETTE CHECK) ═══');
let simpleQuestions = 0;
let vignetteQuestions = 0;

const vignettePatterns = [
  /patient/i,
  /presents/i,
  /reports/i,
  /year-old/i,
  /pmhnp/i,
  /treatment/i,
  /symptoms/i,
  /medication/i,
];

data.forEach(q => {
  const hasVignette = vignettePatterns.some(p => p.test(q.question));
  if (hasVignette) {
    vignetteQuestions++;
  } else {
    if (q.question.startsWith('What is') || q.question.startsWith('Which of')) {
      simpleQuestions++;
      if (simpleQuestions <= 20) {
        issues.minor.push(`Q${q.id}: Simple format - "${q.question.substring(0, 50)}..."`);
      }
    }
  }
});

const vignettePercent = Math.round((vignetteQuestions / data.length) * 100);
console.log(`Clinical vignette questions: ${vignetteQuestions} (${vignettePercent}%)`);
console.log(`Simple format questions: ${simpleQuestions}`);
console.log(`Test 9 Result: ${vignettePercent >= 80 ? '✓ PASS' : vignettePercent >= 60 ? '⚠ WARNING' : '✗ FAIL'}\n`);

// ============ TEST 10: SPELLING/GRAMMAR SPOT CHECK ============
console.log('═══ TEST 10: SPELLING/GRAMMAR CHECK ═══');
let spellingIssues = 0;

const commonMisspellings = [
  ['teh', 'the'],
  ['recieve', 'receive'],
  ['occured', 'occurred'],
  ['definately', 'definitely'],
  ['seperate', 'separate'],
  ['accomodate', 'accommodate'],
  ['occurence', 'occurrence'],
  ['untill', 'until'],
  ['wierd', 'weird'],
  ['thier', 'their'],
  ['alot', 'a lot'],
  ['truely', 'truly'],
];

data.forEach(q => {
  const text = `${q.question} ${q.rationale} ${q.options.join(' ')}`.toLowerCase();
  commonMisspellings.forEach(([wrong, correct]) => {
    if (text.includes(wrong)) {
      issues.minor.push(`Q${q.id}: Possible misspelling "${wrong}" → "${correct}"`);
      spellingIssues++;
    }
  });
});

console.log(`Potential spelling issues: ${spellingIssues}`);
console.log(`Test 10 Result: ${spellingIssues === 0 ? '✓ PASS' : '⚠ WARNING'}\n`);

// ============ FINAL SUMMARY ============
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║                      FINAL SUMMARY                             ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log(`CRITICAL ISSUES: ${issues.critical.length}`);
issues.critical.slice(0, 10).forEach(i => console.log(`  ❌ ${i}`));
if (issues.critical.length > 10) console.log(`  ... and ${issues.critical.length - 10} more`);

console.log(`\nMAJOR ISSUES: ${issues.major.length}`);
issues.major.slice(0, 10).forEach(i => console.log(`  ⚠ ${i}`));
if (issues.major.length > 10) console.log(`  ... and ${issues.major.length - 10} more`);

console.log(`\nMINOR ISSUES: ${issues.minor.length}`);
if (issues.minor.length > 0) {
  console.log(`  (${issues.minor.length} minor formatting/style issues - not critical)`);
}

const totalCritical = issues.critical.length;
const totalMajor = issues.major.length;

console.log('\n════════════════════════════════════════════════════════════════');
if (totalCritical === 0 && totalMajor === 0) {
  console.log('🎉 OVERALL RESULT: ✓✓✓ BOARD READY ✓✓✓');
  console.log('   All critical tests passed. App is ready for use!');
} else if (totalCritical === 0 && totalMajor < 10) {
  console.log('✓ OVERALL RESULT: ACCEPTABLE WITH MINOR ISSUES');
  console.log('   No critical issues. Some improvements recommended.');
} else if (totalCritical < 5) {
  console.log('⚠ OVERALL RESULT: NEEDS ATTENTION');
  console.log('   Some critical issues need to be fixed.');
} else {
  console.log('❌ OVERALL RESULT: NOT READY');
  console.log('   Multiple critical issues found. Requires fixes.');
}
console.log('════════════════════════════════════════════════════════════════\n');

// Save detailed report
const report = { issues, stats: { total: data.length, categories: Object.keys(categories).length } };
fs.writeFileSync('./scripts/qc-report.json', JSON.stringify(report, null, 2));
console.log('Detailed report saved to scripts/qc-report.json');
