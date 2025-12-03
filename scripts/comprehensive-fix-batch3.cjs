const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// BATCH 3 FIXES - More questions with wrong rationales (shifted from neighboring questions)

const fixes = {
  // Q129 - ANA Code of Ethics - fix rationale
  129: {
    correctAnswer: 1,
    rationale: "ANA CODE OF ETHICS: Professional framework guiding nursing practice. Key principles: Beneficence (do good), Non-maleficence (do no harm), Autonomy (patient self-determination), Justice (fair treatment), Fidelity (keep promises). Used to guide ethical decisions and as standard of care in legal cases."
  },

  // Q130 - NP Scope of Practice - fix rationale
  130: {
    correctAnswer: 1,
    rationale: "NP SCOPE OF PRACTICE defined by: (1) State Nurse Practice Act (NPA), (2) Board of Nursing regulations, (3) Collaborative agreements (if required by state), (4) Institutional credentialing. Varies significantly by state. Always practice within your scope and maintain current knowledge of state requirements."
  },

  // Q124 - Minor consent - verify correct answer
  124: {
    correctAnswer: 0, // Ages 12-14 depending on state is index 0
    rationale: "MINOR CONSENT for mental health: Typically ages 12-14 depending on state law. Know YOUR state's specific age. Many states also allow minor consent for: substance abuse treatment, STI treatment, pregnancy care, contraception. Document patient's understanding of consent."
  },

  // Q143 - Suicide demographics - verify
  143: {
    correctAnswer: 1, // White males is correct
    rationale: "SUICIDE COMPLETION RATES: White males have highest rate, especially ages 45+ and 75+. Firearms are #1 method (85% lethal). Key risk factors: prior attempt, depression, substance use, access to lethal means, isolation, chronic illness. ALWAYS ask about firearm access."
  },

  // Q97 - Already fixed in batch 2

  // Q134 - Evidence hierarchy - correct
  134: {
    correctAnswer: 2, // Systematic reviews/meta-analyses is index 2
    rationale: "EVIDENCE HIERARCHY (highest to lowest): Level I = Systematic reviews/meta-analyses of RCTs. Level II = RCTs. Level III = Quasi-experimental/cohort studies. Level IV = Case-control/case series. Level V = Expert opinion/case reports. Use highest available evidence for clinical decisions."
  },

  // Q150 - Safest mood stabilizer in pregnancy
  150: {
    correctAnswer: 2, // Lamotrigine is index 2
    rationale: "LAMOTRIGINE (Lamictal) = SAFEST mood stabilizer in pregnancy. Lower teratogenicity than lithium, valproate, carbamazepine. Preferred for bipolar during pregnancy. Important: Levels decrease during pregnancy due to increased metabolism - monitor and adjust dose. Still give folic acid supplementation."
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
console.log(`\nBatch 3 - Total questions fixed: ${fixCount}`);
