const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Fix Q42 - PHQ-9 scores (expand options for clarity)
const q42 = data.find(q => q.id === 42);
if (q42) {
  q42.options = [
    "Score 5 or higher (mild depression)",
    "Score 10 or higher (moderate depression - treatment indicated)",
    "Score 15 or higher (moderately severe)",
    "Score 20 or higher (severe depression)"
  ];
  q42.correctAnswer = 1;
  console.log('Fixed Q42: PHQ-9 score options expanded');
}

// Fix Q45 - CIWA scores (expand options)
const q45 = data.find(q => q.id === 45);
if (q45) {
  q45.options = [
    "CIWA score greater than 5",
    "CIWA score greater than 8",
    "CIWA score greater than 10",
    "CIWA score greater than 15"
  ];
  q45.correctAnswer = 1;
  console.log('Fixed Q45: CIWA score options expanded');
}

// Fix Q46 - COWS scores (expand options)
const q46 = data.find(q => q.id === 46);
if (q46) {
  q46.options = [
    "COWS score greater than 5",
    "COWS score greater than 8",
    "COWS score greater than 10",
    "COWS score greater than 15"
  ];
  q46.correctAnswer = 1;
  console.log('Fixed Q46: COWS score options expanded');
}

// Fix Q207 - Lithium + ACE inhibitor (wrong rationale)
const q207 = data.find(q => q.id === 207);
if (q207) {
  q207.rationale = "ACE INHIBITORS (lisinopril, enalapril) can approximately DOUBLE lithium levels by reducing renal blood flow and GFR. Result: lithium toxicity risk. Same concern with ARBs. When starting ACE inhibitor: check lithium level in 1 week, may need to reduce lithium dose by 25-50%. Teach patient toxicity signs.";
  console.log('Fixed Q207: Corrected rationale for lithium + ACE inhibitor');
}

// Fix Q213 - Rapid cycling bipolar (wrong answer and rationale)
const q213 = data.find(q => q.id === 213);
if (q213) {
  q213.question = "A PMHNP is selecting a mood stabilizer for a patient with rapid cycling bipolar disorder. Which statement about VALPROATE (Depakote) is TRUE?";
  q213.options = [
    "Valproate is MORE effective than lithium for rapid cycling",
    "Valproate is FDA-approved for schizophrenia",
    "Valproate is contraindicated in rapid cycling",
    "Valproate has no effect on mania"
  ];
  q213.correctAnswer = 0;
  q213.rationale = "VALPROATE (Depakote) is MORE effective than lithium for RAPID CYCLING bipolar (≥4 episodes/year). Also effective for mixed episodes. Lithium works best for classic euphoric mania. Therapeutic level: 50-125 mcg/mL. Monitor: LFTs, CBC, platelets. Teratogenic - avoid in pregnancy.";
  console.log('Fixed Q213: Corrected question, options, answer, and rationale for rapid cycling');
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n=== All critical issues fixed ===');
