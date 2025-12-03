const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 13: Final cleanup - Questions 478-497
const rewrites = {
  478: {
    question: "A 20-year-old patient tells the PMHNP, 'I cannot make friends. Nobody likes me.' According to Erikson's psychosocial stages, which developmental stage is this patient navigating?",
    options: [
      "Intimacy vs. Isolation (20-40 years)",
      "Identity vs. Role Confusion (12-20 years)",
      "Trust vs. Mistrust",
      "Generativity vs. Stagnation"
    ]
  },
  479: {
    question: "An 8-year-old child in play therapy has dolls engage in explicit sexual activity. When asked, the child states 'This is how daddy plays with me.' What is the PMHNP's IMMEDIATE obligation?",
    options: [
      "CALL CPS immediately - mandatory reporting of suspected abuse",
      "Consult with supervisor first",
      "Refer to individual therapy",
      "Schedule follow-up appointment"
    ]
  },
  480: {
    question: "A nursing student asks the PMHNP to explain the difference between thought process and thought content. Which description is accurate?",
    options: [
      "They are interchangeable terms",
      "Process refers to speech rate only",
      "Content includes only mood assessment",
      "PROCESS = organization/flow of thinking; CONTENT = themes/subjects of thoughts"
    ]
  },
  482: {
    question: "A healthcare organization is implementing quality improvement using appreciative inquiry. Which statement BEST describes this methodology?",
    options: [
      "Emphasizes medication compliance tracking",
      "Targets symptom reduction as primary goal",
      "Focuses on identifying deficits to fix",
      "Focuses on STRENGTHS and HOPE, building on successes without blame"
    ]
  },
  483: {
    question: "A PMHNP is explaining the recovery model to a patient with schizophrenia. Which principle is CENTRAL to recovery-oriented care?",
    options: [
      "Primary focus on symptom elimination",
      "Providing HOPE and supporting self-determination for a meaningful life",
      "Strict medication compliance emphasis",
      "Focus on patient deficits"
    ]
  },
  489: {
    question: "A PMHNP is teaching about the clock drawing test. Which brain regions are assessed by this screening tool?",
    options: [
      "Temporal lobe only",
      "Occipital lobe only",
      "Frontal motor cortex",
      "DORSOLATERAL PFC (executive function) and RIGHT HEMISPHERE (visuospatial)"
    ]
  },
  490: {
    question: "A PMHNP has completed a research study and wants maximum scientific credibility for dissemination. What is the BEST method?",
    options: [
      "Press release",
      "Personal blog",
      "Social media campaign",
      "PEER-REVIEWED JOURNAL publication"
    ]
  },
  494: {
    question: "A child with enuresis is prescribed desmopressin (DDAVP). Which parent statement indicates correct understanding of administration?",
    options: [
      "I will give extra fluids at bedtime",
      "RESTRICT fluids 1 hour before and 8 hours after medication",
      "I will give it in the morning",
      "This medication permanently cures bedwetting"
    ]
  }
};

let updateCount = 0;
data.forEach(q => {
  if (rewrites[q.id]) {
    q.question = rewrites[q.id].question;
    if (rewrites[q.id].options) {
      q.options = rewrites[q.id].options;
    }
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 13 complete: Rewrote ${updateCount} questions to clinical vignette format`);
