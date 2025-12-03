const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// BATCH 7 FIXES - Final questions with wrong rationales

const fixes = {
  // Q494 - DDAVP administration - rationale talks about ACE inhibitors!
  494: {
    correctAnswer: 1, // RESTRICT fluids is index 1
    rationale: "DDAVP (desmopressin) ADMINISTRATION: RESTRICT fluids 1 hour before and 8 hours after medication. Give before bedtime. Prevents water intoxication and hyponatremia. Does NOT permanently cure bedwetting - works while taking medication. Monitor for headache, nausea (hyponatremia signs)."
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
console.log(`\nBatch 7 - Total questions fixed: ${fixCount}`);
