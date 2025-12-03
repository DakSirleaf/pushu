const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// BATCH 4 FIXES

const fixes = {
  // Q176 - TCA mechanism - answer should be index 1
  176: {
    correctAnswer: 1, // Block presynaptic reuptake of serotonin AND norepinephrine is index 1
    rationale: "TRICYCLIC ANTIDEPRESSANTS (TCAs): Block presynaptic reuptake of BOTH serotonin AND norepinephrine. ALSO block histamine (sedation, weight gain), alpha-1 (orthostatic hypotension), muscarinic (anticholinergic: dry mouth, constipation, urinary retention, confusion). Examples: amitriptyline, nortriptyline. Dangerous in overdose."
  },

  // Q165 - Integrated care model - answer should be index 2
  165: {
    correctAnswer: 2, // Integrated/collaborative care is index 2
    rationale: "INTEGRATED/COLLABORATIVE CARE: Mental health services embedded in primary care settings. Same-day access, warm handoffs, team-based care. CoCM (Collaborative Care Model) is evidence-based: PCP + Care manager + Psychiatric consultant. Improves outcomes, reduces stigma, increases access."
  },

  // Q183 - SSRI discontinuation - keep correct but verify
  183: {
    correctAnswer: 1, // SSRI Discontinuation Syndrome is correct
    rationale: "SSRI DISCONTINUATION SYNDROME: Flu-like symptoms, brain zaps (electric shock sensations), nausea, dizziness, insomnia, irritability, crying spells. Starts 2-4 days after stopping. NOT serotonin syndrome (which has hyperthermia, hyperreflexia). Treatment: Restart SSRI and taper slowly over 2-4 weeks."
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
console.log(`\nBatch 4 - Total questions fixed: ${fixCount}`);
