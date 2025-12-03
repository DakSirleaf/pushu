const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// BATCH 5 FIXES - Questions 400-450 area

const fixes = {
  // Q416 - Benzos in hepatic disease - Lorazepam is at index 1
  416: {
    correctAnswer: 1, // LORAZEPAM is index 1
    rationale: "ALCOHOL WITHDRAWAL + LIVER DISEASE: Use LORAZEPAM (Ativan) - metabolized by GLUCURONIDATION, NOT hepatic CYP450 enzymes. Safe in liver failure. LOT benzos (Lorazepam, Oxazepam, Temazepam) are safer in hepatic impairment. Diazepam and chlordiazepoxide have active metabolites that accumulate."
  },

  // Q417 - CIWA 18 treatment - Scheduled benzos is at index 2
  417: {
    correctAnswer: 2, // Scheduled benzodiazepines is index 2
    rationale: "CIWA-Ar PROTOCOL: Score 8-15 = mild (PRN benzos). Score ≥16 = moderate-severe (SCHEDULED benzos every 2-4 hours). Score of 18 requires SCHEDULED benzodiazepines with frequent monitoring. CRITICAL: Give thiamine BEFORE glucose to prevent Wernicke's encephalopathy."
  },

  // Q424 - DDAVP administration - fix rationale
  424: {
    correctAnswer: 1, // RESTRICT fluids is correct (index 1)
    rationale: "DDAVP (desmopressin) ADMINISTRATION: Give before bedtime AND RESTRICT fluids in evening/overnight to prevent water intoxication and hyponatremia. Don't drink excessive fluids at bedtime. Monitor for: headache, nausea (hyponatremia signs). Nasal spray or oral forms available."
  },

  // Q429 - Acute dystonia treatment - Anticholinergics is at index 2
  429: {
    correctAnswer: 2, // ANTICHOLINERGICS is index 2
    rationale: "ACUTE DYSTONIA EMERGENCY: Give ANTICHOLINERGICS immediately - benztropine (Cogentin) 1-2mg IM/IV or diphenhydramine (Benadryl) 25-50mg IM/IV. Response within minutes. Dystonia is painful muscle spasm from D2 blockade. Can affect airway (laryngeal dystonia). Prevention: prophylactic benztropine with high-potency FGAs."
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
console.log(`\nBatch 5 - Total questions fixed: ${fixCount}`);
