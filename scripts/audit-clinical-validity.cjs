const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     CLINICAL VALIDITY AUDIT - Finding Bad Questions            ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Questions that don't make clinical sense or test fake concepts
const suspiciousPatterns = [];

// 1. SSRIs don't need routine lab monitoring (except maybe sodium in elderly)
data.forEach(q => {
  const qLower = q.question.toLowerCase();
  const rLower = (q.rationale || '').toLowerCase();

  // SSRI + lab monitoring that doesn't make sense
  if ((qLower.includes('ssri') || qLower.includes('sertraline') || qLower.includes('fluoxetine') ||
       qLower.includes('paroxetine') || qLower.includes('citalopram') || qLower.includes('escitalopram')) &&
      (qLower.includes('reticulocyte') || qLower.includes('bone marrow') ||
       qLower.includes('cbc') || qLower.includes('complete blood count'))) {
    suspiciousPatterns.push({
      id: q.id,
      issue: 'SSRIs dont require CBC/reticulocyte monitoring',
      question: q.question.substring(0, 100),
      answer: q.options[q.correctAnswer]
    });
  }

  // Check for vague/meaningless rationales
  if (q.rationale && q.rationale.length < 80) {
    suspiciousPatterns.push({
      id: q.id,
      issue: 'Very short rationale - may lack educational value',
      question: q.question.substring(0, 80),
      rationale: q.rationale
    });
  }

  // Check for rationales that don't explain WHY
  if (q.rationale && !rLower.includes('because') && !rLower.includes('due to') &&
      !rLower.includes('causes') && !rLower.includes('leads to') && !rLower.includes('results in') &&
      !rLower.includes('mechanism') && !rLower.includes('reason') && q.rationale.length < 150) {
    // Might be a rationale that just states facts without explaining
  }
});

console.log(`Found ${suspiciousPatterns.length} potentially problematic questions:\n`);

suspiciousPatterns.forEach(p => {
  console.log(`\nQ${p.id}: ${p.issue}`);
  console.log(`  Question: ${p.question}...`);
  if (p.answer) console.log(`  Answer: ${p.answer}`);
  if (p.rationale) console.log(`  Rationale: ${p.rationale}`);
});

// Now let's specifically fix Q305 (reticulocyte question) - replace with valid clinical content
console.log('\n\n=== FIXING CLINICALLY INVALID QUESTIONS ===\n');

// Q305 - Replace with a REAL monitoring question
const q305 = data.find(q => q.id === 305);
if (q305) {
  console.log('Fixing Q305: Replacing fake reticulocyte question with real SSRI monitoring question');

  q305.question = "A 72-year-old patient with depression is started on citalopram. Which lab should the PMHNP monitor due to a known risk with this medication in elderly patients?";
  q305.options = [
    "Reticulocyte count",
    "Serum sodium level",
    "Liver function tests",
    "Lipid panel"
  ];
  q305.correctAnswer = 1; // Serum sodium
  q305.rationale = "SSRIs can cause SIADH (Syndrome of Inappropriate Antidiuretic Hormone) leading to HYPONATREMIA, especially in ELDERLY patients. Risk factors: age >65, female sex, concurrent diuretics, low baseline sodium. Symptoms of hyponatremia: confusion, falls, seizures. Check sodium at baseline and 2-4 weeks after starting SSRI in elderly. Citalopram also requires ECG monitoring for QTc prolongation at doses >20mg in elderly. SSRIs do NOT cause bone marrow suppression or require CBC monitoring.";
}

// Let's find more questions that might be clinically questionable
console.log('\n=== SEARCHING FOR MORE QUESTIONABLE CONTENT ===\n');

// Find questions where the rationale contradicts standard practice
const contradictions = [];

data.forEach(q => {
  const rLower = (q.rationale || '').toLowerCase();

  // If rationale says "rarely" or "not typically" but question implies it's important
  if (rLower.includes('rarely') || rLower.includes('not typically') || rLower.includes('uncommon')) {
    const qLower = q.question.toLowerCase();
    if (qLower.includes('should') || qLower.includes('important') || qLower.includes('must') || qLower.includes('require')) {
      contradictions.push({
        id: q.id,
        question: q.question.substring(0, 80),
        concern: 'Question implies importance but rationale says rare/uncommon'
      });
    }
  }
});

if (contradictions.length > 0) {
  console.log('Questions where rationale contradicts question premise:');
  contradictions.forEach(c => {
    console.log(`  Q${c.id}: ${c.question}...`);
  });
}

// Save changes
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✓ Fixed Q305 with clinically valid content');
console.log('✓ Changes saved');
