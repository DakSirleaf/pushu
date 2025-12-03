const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 2: Questions 41-80 - Assessment Scales & Development
const rewrites = {
  41: {
    question: "A PMHNP administers the PHQ-9 to a patient presenting with depressed mood. The patient scores 12. Based on this score, what severity level and treatment approach is indicated?",
    options: [
      "Mild depression (5-9); watchful waiting appropriate",
      "Moderate depression (10-14); treatment indicated",
      "Moderately severe depression (15-19); aggressive treatment needed",
      "Severe depression (20-27); hospitalization may be needed"
    ]
  },
  42: {
    question: "A patient completes the PHQ-9 during a routine visit. At what score should the PMHNP consider this a positive screen indicating likely clinical depression?",
    options: [
      "≥5",
      "≥10",
      "≥15",
      "≥20"
    ]
  },
  43: {
    question: "A PMHNP is evaluating a 72-year-old patient for cognitive impairment using the MMSE. Which score indicates the patient has cognitive impairment?",
    options: [
      "<30",
      "<27",
      "<24",
      "<20"
    ]
  },
  44: {
    question: "An 80-year-old patient scores 26 on the MMSE. The family reports subtle memory changes at home. How should the PMHNP interpret this score?",
    options: [
      "Score 20-24 indicates mild impairment",
      "Score 24-30 is considered normal cognition",
      "Score 27-30 is the only normal range",
      "Only a perfect score of 30 is considered normal"
    ]
  },
  45: {
    question: "A patient with alcohol use disorder presents 18 hours after his last drink with tremors and anxiety. The CIWA-Ar score is 12. At what score should treatment be initiated?",
    options: [
      ">5",
      ">8",
      ">10",
      ">15"
    ]
  },
  46: {
    question: "A patient with opioid use disorder presents in withdrawal. The COWS score is 10. At what score is it appropriate to initiate buprenorphine treatment?",
    options: [
      ">5",
      ">8",
      ">10",
      ">15"
    ]
  },
  47: {
    question: "A PMHNP is screening a patient for anxiety using the GAD-7. The patient scores 11. What does this score indicate?",
    options: [
      "Minimal anxiety (0-4); no treatment needed",
      "Mild anxiety (5-9); monitoring appropriate",
      "Moderate anxiety (10-14); treatment indicated",
      "Severe anxiety (15-21); urgent intervention needed"
    ]
  },
  48: {
    question: "A patient completes the Beck Depression Inventory-II (BDI-II) and scores 24. How should the PMHNP classify this severity level?",
    options: [
      "Minimal depression (0-13)",
      "Mild depression (14-19)",
      "Moderate depression (20-28)",
      "Severe depression (29-63)"
    ]
  },
  49: {
    question: "A PMHNP is monitoring a patient's depression treatment response using the clinician-administered HAM-D. A score of 21 indicates what severity level?",
    options: [
      "Mild depression (8-13)",
      "Moderate depression (14-18)",
      "Severe depression (≥19)",
      "Very severe depression (≥25 only)"
    ]
  },
  50: {
    question: "A PMHNP has administered the MMSE to a patient with suspected dementia. What is the correct approach to documenting the results?",
    options: [
      "Document only the total numerical score",
      "Document the total score AND describe specific domain deficits",
      "Documentation is only required if the score is abnormal",
      "Document only a qualitative summary without the score"
    ]
  },
  51: {
    question: "While reviewing a patient's PHQ-9, the PMHNP notes the patient endorsed Question 9. What does this specific question assess?",
    options: [
      "Sleep disturbance",
      "Appetite changes",
      "Thoughts of self-harm or suicide",
      "Difficulty concentrating"
    ]
  },
  52: {
    question: "A patient in alcohol withdrawal scores 18 on the CIWA-Ar. The PMHNP should order which treatment regimen?",
    options: [
      "No pharmacological treatment needed at this level",
      "PRN benzodiazepines only",
      "Scheduled benzodiazepines with frequent monitoring",
      "Antipsychotic medication"
    ]
  },
  53: {
    question: "A patient in opioid withdrawal has a COWS score of 15. What treatment is indicated?",
    options: [
      "No treatment; score too low",
      "Symptomatic treatment only with clonidine",
      "Initiation of buprenorphine or methadone",
      "Benzodiazepines for withdrawal"
    ]
  },
  54: {
    question: "A PMHNP is selecting a cognitive screening tool for a highly educated patient with subtle memory complaints. The SLUMS score range indicating dementia is:",
    options: [
      "0-9 for all patients",
      "1-20 for patients with high school education or higher",
      "21-26 indicates dementia",
      "27-30 indicates dementia"
    ]
  },
  55: {
    question: "A PMHNP is using the clinician-administered Hamilton Anxiety Rating Scale (HAM-A) to monitor treatment response. A score of 20 indicates what severity level?",
    options: [
      "Minimal anxiety (0-13)",
      "Mild anxiety (14-17)",
      "Moderate anxiety (18-24)",
      "Severe anxiety (≥25)"
    ]
  },
  56: {
    question: "A mother brings her 5-month-old infant for developmental assessment. She is concerned about head control. By what age should head lag be completely resolved?",
    options: [
      "2 months",
      "4 months",
      "6 months",
      "9 months"
    ]
  },
  57: {
    question: "A PMHNP is assessing primitive reflexes in a 7-month-old infant and notes the Moro reflex is still present. By what age should this reflex typically disappear?",
    options: [
      "2 months",
      "4-6 months",
      "9 months",
      "12 months"
    ]
  },
  58: {
    question: "During a well-child exam, a PMHNP tests the Babinski reflex in a 15-month-old. The toes fan upward. By what age should this reflex disappear?",
    options: [
      "6 months",
      "9 months",
      "12-24 months",
      "36 months"
    ]
  },
  59: {
    question: "A new mother asks the PMHNP about responding to her infant's cries. According to Erikson's psychosocial theory, what developmental task is the infant (0-1 year) working to resolve?",
    options: [
      "Autonomy vs. Shame and Doubt",
      "Trust vs. Mistrust",
      "Initiative vs. Guilt",
      "Industry vs. Inferiority"
    ]
  },
  60: {
    question: "A 2-year-old child is brought for evaluation because he says 'no' frequently and insists on dressing himself. According to Erikson, which developmental stage is this child navigating?",
    options: [
      "Trust vs. Mistrust",
      "Autonomy vs. Shame and Doubt",
      "Initiative vs. Guilt",
      "Identity vs. Role Confusion"
    ]
  },
  61: {
    question: "A 16-year-old is experimenting with different peer groups, styles, and beliefs. According to Erikson's theory, which psychosocial stage is this adolescent (12-18 years) working through?",
    options: [
      "Industry vs. Inferiority",
      "Identity vs. Role Confusion",
      "Intimacy vs. Isolation",
      "Generativity vs. Stagnation"
    ]
  },
  62: {
    question: "A 50-year-old patient expresses feeling unfulfilled and questions whether his life has meaning. According to Erikson, which developmental stage (40-65 years) is this patient experiencing?",
    options: [
      "Intimacy vs. Isolation",
      "Generativity vs. Stagnation",
      "Integrity vs. Despair",
      "Identity vs. Role Confusion"
    ]
  },
  63: {
    question: "A 4-year-old child believes the moon follows her car at night and that her stuffed animals have feelings. According to Piaget, which cognitive stage (ages 2-7) explains this thinking?",
    options: [
      "Sensorimotor",
      "Preoperational",
      "Concrete Operational",
      "Formal Operational"
    ]
  },
  64: {
    question: "An 8-year-old child can now understand that pouring water from a tall glass to a wide glass doesn't change the amount. According to Piaget, which stage (ages 7-11) has the child entered?",
    options: [
      "Preoperational",
      "Concrete Operational",
      "Formal Operational",
      "Sensorimotor"
    ]
  },
  65: {
    question: "A mother reports that her 10-month-old infant cries when she hides a toy under a blanket and now searches for it. This demonstrates which Piagetian concept?",
    options: [
      "Present from birth",
      "Develops at 3-4 months",
      "Object permanence developing (8-12 months)",
      "Not expected until 18-24 months"
    ]
  },
  66: {
    question: "A 5-year-old boy is very attached to his mother and views his father as competition. According to Freud, which psychosexual stage (ages 3-6 years) is this child in?",
    options: [
      "Oral stage",
      "Anal stage",
      "Phallic stage (Oedipus complex)",
      "Latency stage"
    ]
  },
  67: {
    question: "A 9-year-old child focuses on academics and same-sex friendships with little interest in romantic relationships. According to Freud, which stage (ages 6-12) is this child experiencing?",
    options: [
      "Phallic stage",
      "Latency stage",
      "Genital stage",
      "Anal stage"
    ]
  },
  68: {
    question: "A 75-year-old patient reflects on her life with satisfaction and acceptance. According to Erikson, she has successfully resolved which developmental stage?",
    options: [
      "Generativity vs. Stagnation",
      "Intimacy vs. Isolation",
      "Integrity vs. Despair",
      "Identity vs. Role Confusion"
    ]
  },
  69: {
    question: "A PMHNP is assessing developmental milestones. A typically developing 4-month-old infant should demonstrate which motor ability?",
    options: [
      "Walking independently",
      "Sitting without support",
      "Rolling over and holding head steady",
      "Crawling on hands and knees"
    ]
  },
  70: {
    question: "During a developmental assessment, a PMHNP notes a 12-month-old child says 'mama' and 'dada' specifically. What is the expected language milestone at this age?",
    options: [
      "Cooing sounds only",
      "Babbling with no meaning",
      "1-3 words with meaning",
      "2-word phrases"
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
console.log(`Batch 2 complete: Rewrote ${updateCount} questions to clinical vignette format`);
