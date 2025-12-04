const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     FINAL VALIDATION AND CLEANUP                               ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let issuesFixed = 0;
let issuesFound = 0;

// 1. Check for remaining parenthetical hints in options
console.log('=== SCANNING FOR REMAINING HINTS ===\n');
const hintPatterns = [
  /\(safe[^)]*\)/gi,
  /\(first[- ]?line[^)]*\)/gi,
  /\(correct[^)]*\)/gi,
  /\(best[^)]*\)/gi,
  /\(preferred[^)]*\)/gi,
  /\(therapeutic[^)]*\)/gi,
  /\(toxic[^)]*\)/gi,
  /\(treatment of choice\)/gi,
  /\(gold standard\)/gi,
  /\(category [a-dx]\)/gi,
  /\(teratogen[^)]*\)/gi,
];

data.forEach(q => {
  q.options = q.options.map((opt, idx) => {
    let cleaned = opt;
    hintPatterns.forEach(pattern => {
      if (pattern.test(cleaned)) {
        console.log(`Q${q.id} Opt${idx}: Removing "${opt.match(pattern)?.[0]}"`);
        cleaned = cleaned.replace(pattern, '').trim();
        issuesFixed++;
      }
    });
    return cleaned;
  });
});

// 2. Check for "correct answer" or similar in options
data.forEach(q => {
  q.options.forEach((opt, idx) => {
    if (/correct|best choice|right answer/i.test(opt)) {
      console.log(`Q${q.id} Opt${idx}: Contains "correct/best" hint: "${opt.substring(0, 50)}"`);
      issuesFound++;
    }
  });
});

// 3. Verify all questions have proper structure
console.log('\n=== STRUCTURE VALIDATION ===\n');
let structureErrors = 0;
data.forEach(q => {
  if (!q.id || typeof q.id !== 'number') {
    console.log(`Invalid ID: ${JSON.stringify(q).substring(0, 100)}`);
    structureErrors++;
  }
  if (!q.question || q.question.length < 20) {
    console.log(`Q${q.id}: Question too short`);
    structureErrors++;
  }
  if (!q.options || q.options.length !== 4) {
    console.log(`Q${q.id}: Invalid options count: ${q.options?.length}`);
    structureErrors++;
  }
  if (q.correctAnswer < 0 || q.correctAnswer > 3) {
    console.log(`Q${q.id}: Invalid correctAnswer: ${q.correctAnswer}`);
    structureErrors++;
  }
  if (!q.rationale || q.rationale.length < 50) {
    console.log(`Q${q.id}: Rationale too short (${q.rationale?.length || 0} chars)`);
    structureErrors++;
  }
  if (!q.domain) {
    console.log(`Q${q.id}: Missing domain`);
    structureErrors++;
  }
});

console.log(`Structure errors: ${structureErrors}`);

// 4. Clinical accuracy spot check
console.log('\n=== CLINICAL ACCURACY SPOT CHECK ===\n');
const spotChecks = [
  { id: 149, expectedInAnswer: 'lamotrigine', topic: 'Pregnancy mood stabilizer' },
  { id: 206, expectedInRationale: 'ebstein', topic: 'Lithium pregnancy risk' },
  { id: 37, expectedInRationale: 'hyperreflexia', topic: 'Serotonin syndrome' },
  { id: 36, expectedInRationale: 'rigidity', topic: 'NMS' },
  { id: 34, expectedInAnswer: 'benzo', topic: 'Alcohol withdrawal' },
  { id: 28, expectedInAnswer: 'hla', topic: 'Carbamazepine Asian screening' },
  { id: 71, expectedInAnswer: 'dbt', topic: 'BPD treatment' },
  { id: 209, expectedInAnswer: 'nausea', topic: 'Carbamazepine side effects' },
  { id: 229, expectedInAnswer: 'iadl', topic: 'Cognitive decline indicator' },
];

spotChecks.forEach(check => {
  const q = data.find(item => item.id === check.id);
  if (q) {
    const answer = q.options[q.correctAnswer].toLowerCase();
    const rationale = (q.rationale || '').toLowerCase();

    if (check.expectedInAnswer && !answer.includes(check.expectedInAnswer)) {
      console.log(`❌ Q${check.id} (${check.topic}): Expected "${check.expectedInAnswer}" in answer`);
      console.log(`   Actual: ${q.options[q.correctAnswer]}`);
    } else if (check.expectedInRationale && !rationale.includes(check.expectedInRationale)) {
      console.log(`❌ Q${check.id} (${check.topic}): Expected "${check.expectedInRationale}" in rationale`);
    } else {
      console.log(`✓ Q${check.id} (${check.topic}): Verified`);
    }
  }
});

// 5. Summary stats
console.log('\n=== SUMMARY ===\n');
console.log(`Total questions: ${data.length}`);
console.log(`Questions with domain: ${data.filter(q => q.domain).length}`);
console.log(`Questions with adequate rationale (>100 chars): ${data.filter(q => q.rationale && q.rationale.length > 100).length}`);
console.log(`Hints removed: ${issuesFixed}`);
console.log(`Issues remaining: ${issuesFound + structureErrors}`);

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✓ Final validation complete and saved');
