const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// COMPREHENSIVE FIXES for corrupted questions
// These were identified through audit - rationales/answers were shifted

const fixes = {
  // Question 24 - Mania inducing meds
  24: {
    correctAnswer: 1, // Corticosteroids, antidepressants, isoniazid, disulfiram
    rationale: "MANIA-INDUCING MEDICATIONS (SAID mnemonic): Steroids, Antidepressants, INH (isoniazid), Disulfiram. Always screen for bipolar history before starting antidepressants. Monitor for racing thoughts, decreased need for sleep, increased energy."
  },

  // Question 25 - SSRI discontinuation
  25: {
    correctAnswer: 2, // SSRI discontinuation syndrome
    rationale: "SSRI DISCONTINUATION SYNDROME: Flu-like symptoms, dizziness, 'brain zaps' (electric shock sensations), irritability, insomnia. Most common with PAROXETINE (shortest half-life). Prevention: Always taper SSRIs gradually over 2-4 weeks. Fluoxetine rarely causes this due to long half-life."
  },

  // Question 26 - QTc prolongation
  26: {
    correctAnswer: 2, // Ziprasidone (Geodon) - index 2
    rationale: "ZIPRASIDONE (GEODON) requires baseline EKG due to QTc prolongation risk. Can cause fatal arrhythmias (Torsades de Pointes). Contraindicated if QTc >500ms. Also avoid with other QTc-prolonging drugs. Teach patient: Report palpitations, dizziness, fainting."
  },

  // Question 27 - Rapid cycling bipolar
  27: {
    correctAnswer: 2, // Valproate (Depakote)
    rationale: "VALPROATE (DEPAKOTE) is most effective for RAPID CYCLING bipolar disorder (≥4 episodes/year). Lithium is less effective for rapid cycling. Monitor: LFTs, CBC with platelets, drug levels (50-125 mcg/mL)."
  },

  // Question 28 - HLA-B*1502 testing
  28: {
    correctAnswer: 1, // HLA-B*1502 allele
    rationale: "HLA-B*1502 SCREENING: FDA Black Box Warning requires testing in patients of ASIAN descent before starting carbamazepine. This allele increases risk of Stevens-Johnson Syndrome and Toxic Epidermal Necrolysis. If positive, do NOT use carbamazepine."
  },

  // Question 29 - Valproate loading dose
  29: {
    correctAnswer: 1, // 20-30 mg/kg/day
    rationale: "VALPROATE LOADING DOSE: 20-30 mg/kg/day for acute mania achieves therapeutic levels rapidly (1-2 days vs 5-7 days with standard dosing). Divide into 2-3 doses to minimize GI side effects. Monitor drug levels and adjust accordingly."
  },

  // Question 30 - Lithium interactions
  30: {
    correctAnswer: 1, // ACE inhibitors and NSAIDs
    rationale: "ACE INHIBITORS and NSAIDs can approximately DOUBLE lithium levels. NSAIDs reduce renal prostaglandins → decreased lithium clearance. ACEIs reduce GFR. Both increase lithium toxicity risk. Use acetaminophen instead of NSAIDs."
  },

  // Question 31 - NSAIDs and lithium mechanism
  31: {
    correctAnswer: 1, // Decreasing renal clearance
    rationale: "NSAIDs DECREASE RENAL CLEARANCE of lithium by inhibiting prostaglandin synthesis in kidneys. This reduces GFR and sodium excretion, leading to increased lithium reabsorption. Result: Higher lithium levels → toxicity risk. Monitor levels if NSAID use is necessary."
  }
};

let fixCount = 0;
data.forEach(q => {
  if (fixes[q.id]) {
    if (fixes[q.id].correctAnswer !== undefined) {
      q.correctAnswer = fixes[q.id].correctAnswer;
    }
    if (fixes[q.id].rationale) {
      q.rationale = fixes[q.id].rationale;
    }
    fixCount++;
    console.log(`Fixed Q${q.id}: ${q.question.substring(0, 50)}...`);
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\nTotal fixed: ${fixCount} questions`);
