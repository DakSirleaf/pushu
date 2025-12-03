const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// BATCH 6 FIXES - Questions 447-500 area

const fixes = {
  // Q447 - ASPD and violence risk - fix rationale
  447: {
    correctAnswer: 1, // HIGH RISK for violence is correct
    rationale: "ANTISOCIAL PD RISK: Significantly increased risk for VIOLENCE and HOMICIDE. High rates of criminality, substance abuse, premature death. Poor treatment prognosis. Cannot diagnose before age 18 (use Conduct Disorder). Comorbid substance use worsens outcomes."
  },

  // Q464 - Pseudodementia - fix rationale (was about refeeding syndrome!)
  464: {
    correctAnswer: 2, // PSEUDODEMENTIA is index 2
    rationale: "PSEUDODEMENTIA: Depression-related cognitive impairment that mimics dementia. Key features: 'I don't know' responses, inconsistent deficits, acute onset, prominent depressive symptoms. REVERSIBLE with depression treatment. Always screen for depression in elderly with cognitive complaints."
  },

  // Q465 - Acute dystonia treatment - Anticholinergics is at index 1
  465: {
    correctAnswer: 1, // Diphenhydramine or Benztropine is index 1
    rationale: "ACUTE DYSTONIA TREATMENT: ANTICHOLINERGICS are first-line - diphenhydramine (Benadryl) 25-50mg IM/IV or benztropine (Cogentin) 1-2mg IM/IV. Rapid relief within minutes. Lorazepam is benzodiazepine, not first-line for dystonia. Prevention: prophylactic anticholinergics with high-potency FGAs."
  },

  // Q478 - Erikson stages - 20-year-old enters Intimacy vs Isolation at this age
  478: {
    correctAnswer: 0, // Intimacy vs. Isolation (20-40 years) is index 0
    rationale: "ERIKSON'S STAGES: At 20 years old, patient is entering INTIMACY VS ISOLATION stage (20-40 years). Struggle to form close relationships ('I cannot make friends') is hallmark of this stage. Success = intimate relationships. Failure = isolation and loneliness."
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
console.log(`\nBatch 6 - Total questions fixed: ${fixCount}`);
