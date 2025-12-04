const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     COMPREHENSIVE QUESTION QUALITY AUDIT                       ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const issues = [];

data.forEach(q => {
  const problems = [];

  // 1. Check for incomplete/one-word answers that don't make sense
  q.options.forEach((opt, idx) => {
    // Very short options that might be incomplete
    if (opt.length < 15 && !opt.match(/^\d/) && !opt.includes('mg') && !opt.includes('mEq')) {
      // Check if it's a one-word non-answer
      const words = opt.trim().split(' ');
      if (words.length === 1 && opt.length < 20) {
        problems.push(`Option ${idx} is too short/incomplete: "${opt}"`);
      }
    }
  });

  // 2. Check if options don't grammatically fit the question
  const qEndsWithColon = q.question.trim().endsWith(':');
  const qEndsWithQuestion = q.question.trim().endsWith('?');

  // 3. Check for rationales that don't explain the answer
  const answer = q.options[q.correctAnswer].toLowerCase();
  const rationale = (q.rationale || '').toLowerCase();

  // Get key terms from answer
  const answerWords = answer.replace(/[^a-z0-9\s]/g, '').split(' ').filter(w => w.length > 4);
  const hasAnswerInRationale = answerWords.some(w => rationale.includes(w));

  if (!hasAnswerInRationale && answerWords.length > 0) {
    problems.push('Rationale may not explain the answer');
  }

  // 4. Check for clinically nonsensical monitoring
  const qLower = q.question.toLowerCase();
  if (qLower.includes('monitor') || qLower.includes('lab') || qLower.includes('check')) {
    // SSRIs don't need CBC, reticulocyte, liver monitoring routinely
    if ((qLower.includes('ssri') || qLower.includes('sertraline') || qLower.includes('fluoxetine') ||
         qLower.includes('paroxetine') || qLower.includes('escitalopram')) &&
        (answer.includes('cbc') || answer.includes('liver') || answer.includes('reticulocyte') ||
         answer.includes('thyroid') || answer.includes('renal'))) {
      problems.push('SSRIs dont typically require this monitoring');
    }
  }

  // 5. Check for questions where all options are very similar
  const optionLengths = q.options.map(o => o.length);
  const avgLength = optionLengths.reduce((a, b) => a + b, 0) / 4;
  if (avgLength < 20) {
    problems.push('All options are very short - may be incomplete');
  }

  if (problems.length > 0) {
    issues.push({ id: q.id, question: q.question.substring(0, 80), problems, options: q.options, answer: q.options[q.correctAnswer] });
  }
});

console.log(`Found ${issues.length} questions with potential issues:\n`);

issues.slice(0, 30).forEach(i => {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Q${i.id}: ${i.question}...`);
  console.log(`Options: ${JSON.stringify(i.options)}`);
  console.log(`Answer: ${i.answer}`);
  console.log(`Issues: ${i.problems.join('; ')}`);
});

// Now let's fix the most critical ones
console.log('\n\n=== FIXING CRITICAL ISSUES ===\n');

// Fix Q202 - Corticosteroids and mood
const q202 = data.find(q => q.id === 202);
if (q202) {
  console.log('Fixing Q202: Corticosteroids and mood');
  q202.question = "A patient with bipolar disorder is prescribed prednisone for an asthma exacerbation. The PMHNP should counsel the patient about which psychiatric risk?";
  q202.options = [
    "Corticosteroids may trigger manic episodes",
    "Corticosteroids cause permanent cognitive impairment",
    "Corticosteroids have no psychiatric effects",
    "Corticosteroids only affect mood if injected"
  ];
  q202.correctAnswer = 0;
  q202.rationale = "CORTICOSTEROIDS can trigger MANIC EPISODES in patients with bipolar disorder. Mechanism: increase catecholamine activity. Risk is dose-dependent - higher with systemic steroids (prednisone, dexamethasone) than inhaled/nasal. Board pearl: When a bipolar patient needs steroids, (1) use lowest effective dose, (2) monitor closely for mood changes, (3) consider prophylactic mood stabilizer adjustment. Even short courses can precipitate mania. Symptoms typically resolve when steroids stopped.";
}

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✓ Fixed Q202');
console.log('✓ Changes saved');

// Output list of IDs that need manual review
console.log('\n\nQuestions needing manual review (IDs):');
console.log(issues.map(i => i.id).join(', '));
