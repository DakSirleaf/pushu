const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Verify the specific questions that were fixed
const checkQuestions = [
  { id: 26, expected: 'ziprasidone', topic: 'QTc' },
  { id: 33, expected: 'naloxone', topic: 'opioid overdose' },
  { id: 34, expected: 'benzodiazepine', topic: 'alcohol withdrawal' },
  { id: 36, expected: 'neuroleptic malignant', topic: 'NMS' },
  { id: 37, expected: 'hyperreflexia', topic: 'serotonin syndrome' },
  { id: 38, expected: 'haloperidol', topic: 'EPS risk' },
  { id: 68, expected: 'integrity', topic: 'Erikson' },
  { id: 69, expected: 'roll', topic: '4-month motor' },
  { id: 70, expected: 'word', topic: '12-month language' },
  { id: 97, expected: '6 month', topic: 'GAD duration' },
  { id: 99, expected: '3 month', topic: 'Adjustment disorder' },
  { id: 416, expected: 'lorazepam', topic: 'hepatic benzos' },
  { id: 417, expected: 'schedule', topic: 'CIWA 18' },
  { id: 429, expected: 'anticholinergic', topic: 'dystonia treatment' },
  { id: 464, expected: 'pseudodementia', topic: 'pseudodementia' },
  { id: 465, expected: 'diphenhydramine', topic: 'dystonia treatment' },
  { id: 478, expected: 'intimacy', topic: 'Erikson 20yo' },
  { id: 494, expected: 'restrict', topic: 'DDAVP admin' },
];

console.log('=== FINAL VERIFICATION OF FIXED QUESTIONS ===\n');

let passed = 0;
let failed = 0;

checkQuestions.forEach(check => {
  const q = data.find(item => item.id === check.id);
  if (!q) {
    console.log(`❌ Q${check.id}: NOT FOUND`);
    failed++;
    return;
  }

  const correctOption = q.options[q.correctAnswer] || '';
  const rationale = q.rationale || '';

  const optionMatches = correctOption.toLowerCase().includes(check.expected.toLowerCase());
  const rationaleMatches = rationale.toLowerCase().includes(check.expected.toLowerCase());

  if (optionMatches || rationaleMatches) {
    console.log(`✓ Q${check.id} (${check.topic}): PASSED`);
    console.log(`  Correct answer: ${correctOption.substring(0, 60)}...`);
    passed++;
  } else {
    console.log(`❌ Q${check.id} (${check.topic}): FAILED`);
    console.log(`  Expected "${check.expected}" in answer/rationale`);
    console.log(`  Correct answer (index ${q.correctAnswer}): ${correctOption.substring(0, 60)}...`);
    console.log(`  Rationale: ${rationale.substring(0, 80)}...`);
    failed++;
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Passed: ${passed}/${checkQuestions.length}`);
console.log(`Failed: ${failed}/${checkQuestions.length}`);

// Count total questions
console.log(`\nTotal questions in database: ${data.length}`);

// Verify the original Q26 issue
const q26 = data.find(item => item.id === 26);
if (q26) {
  console.log(`\n=== ORIGINAL ISSUE Q26 VERIFICATION ===`);
  console.log(`Question: ${q26.question.substring(0, 80)}...`);
  console.log(`Options:`);
  q26.options.forEach((opt, i) => {
    console.log(`  ${i}: ${opt.substring(0, 50)}${q26.correctAnswer === i ? ' ← CORRECT' : ''}`);
  });
  console.log(`Rationale: ${q26.rationale.substring(0, 100)}...`);
}
