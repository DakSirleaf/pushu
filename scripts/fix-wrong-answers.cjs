const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     FIXING QUESTIONS WITH WRONG CORRECT ANSWERS                ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let fixCount = 0;

// Q209 - Carbamazepine side effects - "Severe hypertension" is NOT a side effect
// The question asks which is NOT a side effect
const q209 = data.find(q => q.id === 209);
if (q209) {
  console.log(`Q209 Question: ${q209.question}`);
  console.log(`Q209 Current options: ${JSON.stringify(q209.options)}`);
  console.log(`Q209 Current answer index: ${q209.correctAnswer}`);
  console.log(`Q209 Current answer: ${q209.options[q209.correctAnswer]}`);
  // If question asks "which is NOT a side effect", then hypertension is correct answer
  // If question asks "which IS a side effect", need to verify options
  console.log('');
}

// Q229 - Functional assessment - need to check the actual question
const q229 = data.find(q => q.id === 229);
if (q229) {
  console.log(`Q229 Question: ${q229.question}`);
  console.log(`Q229 Current options: ${JSON.stringify(q229.options)}`);
  console.log(`Q229 Current answer index: ${q229.correctAnswer}`);
  console.log(`Q229 Current answer: ${q229.options[q229.correctAnswer]}`);
  console.log('');
}

// Q260 - EPS does not include hypothermia/bradycardia - this could be a "which is NOT" question
const q260 = data.find(q => q.id === 260);
if (q260) {
  console.log(`Q260 Question: ${q260.question}`);
  console.log(`Q260 Current options: ${JSON.stringify(q260.options)}`);
  console.log(`Q260 Current answer index: ${q260.correctAnswer}`);
  console.log(`Q260 Current answer: ${q260.options[q260.correctAnswer]}`);
  console.log('');
}

// Now let's do a broader search for questions that might have wrong answers
console.log('\n=== SCANNING FOR POTENTIALLY PROBLEMATIC QUESTIONS ===\n');

// Common clinically wrong patterns
const clinicalChecks = [
  // Mood stabilizers in pregnancy
  { topic: 'Pregnancy + mood stabilizer', keywords: ['pregnan', 'mood stabilizer'], correctMed: 'lamotrigine', wrongMeds: ['valproate', 'valproic'] },
  // Eating disorders + bupropion
  { topic: 'Eating disorder + antidepressant', keywords: ['eating disorder', 'bulim', 'anorex'], correctMed: 'fluoxetine', wrongMeds: ['bupropion'] },
  // Treatment resistant schizophrenia
  { topic: 'Treatment resistant schizophrenia', keywords: ['treatment resistant', 'refractory schizophrenia'], correctMed: 'clozapine', wrongMeds: [] },
  // Alcohol withdrawal
  { topic: 'Alcohol withdrawal treatment', keywords: ['alcohol withdrawal'], correctMed: ['benzodiazepine', 'lorazepam', 'chlordiazepoxide', 'diazepam'], wrongMeds: ['antipsychotic'] },
];

clinicalChecks.forEach(check => {
  data.forEach(q => {
    const questionLower = q.question.toLowerCase();
    const hasKeywords = check.keywords.every(kw => questionLower.includes(kw));
    if (hasKeywords) {
      const correctAnswer = q.options[q.correctAnswer].toLowerCase();
      console.log(`[${check.topic}] Q${q.id}`);
      console.log(`  Answer: ${q.options[q.correctAnswer]}`);

      // Check for wrong answers
      const hasWrongMed = check.wrongMeds.some(wrong => correctAnswer.includes(wrong));
      if (hasWrongMed) {
        console.log(`  ⚠️ POTENTIAL ERROR: Answer may be incorrect!`);
      }
      console.log('');
    }
  });
});

// Look for any questions with duplicate answers
console.log('\n=== CHECKING FOR DUPLICATE OPTIONS ===\n');
data.forEach(q => {
  const uniqueOpts = new Set(q.options.map(o => o.toLowerCase().trim()));
  if (uniqueOpts.size < q.options.length) {
    console.log(`Q${q.id}: Has duplicate options`);
  }
});

// Look for very short rationales
console.log('\n=== SHORT RATIONALES (<100 chars) ===\n');
let shortCount = 0;
data.forEach(q => {
  if (!q.rationale || q.rationale.length < 100) {
    shortCount++;
    if (shortCount <= 10) {
      console.log(`Q${q.id}: ${(q.rationale || '').length} chars - "${(q.rationale || '').substring(0, 50)}..."`);
    }
  }
});
console.log(`Total questions with short rationales: ${shortCount}`);

console.log('\n✓ Analysis complete');
