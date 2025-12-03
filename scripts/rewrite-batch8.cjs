const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 8: Questions 247-300 - Therapy, Pediatrics, Drug Interactions, Misc
const rewrites = {
  247: {
    question: "A patient with borderline personality disorder presents with chronic emptiness, unstable relationships, and recurrent self-harm. The PMHNP is selecting a primary treatment approach. What is the evidence-based first-line therapy for BPD?",
    options: [
      "Cognitive Behavioral Therapy (CBT)",
      "Dialectical Behavior Therapy (DBT)",
      "Psychoanalysis",
      "Supportive therapy alone"
    ]
  },
  248: {
    question: "A 7-year-old with Oppositional Defiant Disorder is referred for treatment. The parents ask how to prevent progression to conduct disorder and antisocial personality disorder. What is the MOST effective intervention?",
    options: [
      "Medication management alone",
      "Parent management training combined with behavioral therapy",
      "Psychiatric hospitalization",
      "School intervention only"
    ]
  },
  249: {
    question: "A patient with bipolar I disorder asks about the risk of her children developing bipolar disorder. What genetic risk information should the PMHNP provide?",
    options: [
      "Children have 2 times the risk of general population",
      "Children have 4 times the risk of general population",
      "No increased genetic risk",
      "Children have 10 times the risk"
    ]
  },
  250: {
    question: "A PMHNP is evaluating a 75-year-old patient presenting with fatigue and depressed mood. Before diagnosing a psychiatric disorder, which laboratory tests should be ordered?",
    options: [
      "Complete blood count only",
      "Fasting glucose, thyroid panel, and calculated BMI",
      "Liver function tests only",
      "Lipid panel only"
    ]
  },
  251: {
    question: "A 55-year-old man with depression and erectile dysfunction is being evaluated. His primary care provider prescribed a PDE5 inhibitor. Which medication characteristic should the PMHNP understand?",
    options: [
      "Testosterone supplementation",
      "Tadalafil (Cialis) is slow-acting (36 hours); sildenafil (Viagra) is faster (4-6 hours)",
      "Blood glucose effect",
      "Thyroid function interaction"
    ]
  },
  252: {
    question: "During a neurological examination, a PMHNP asks the patient to smile and raise his eyebrows. Which cranial nerve is being assessed?",
    options: [
      "Cranial nerve V (Trigeminal)",
      "Cranial nerve VII (Facial)",
      "Cranial nerve IX (Glossopharyngeal)",
      "Cranial nerve X (Vagus)"
    ]
  },
  253: {
    question: "A PMHNP asks a patient to clench his jaw while palpating the temporal muscle. Which cranial nerve is being assessed?",
    options: [
      "Cranial nerve III (Oculomotor)",
      "Cranial nerve V (Trigeminal)",
      "Cranial nerve VII (Facial)",
      "Cranial nerve XI (Accessory)"
    ]
  },
  254: {
    question: "A 17-year-old patient is taking isotretinoin (Accutane) for severe acne. The dermatologist refers to psychiatry. What psychiatric side effect is the PMHNP monitoring for?",
    options: [
      "Hypertension",
      "Depression (FDA Black Box Warning)",
      "Diabetes",
      "Seizures"
    ]
  },
  255: {
    question: "A PMHNP is assessing a 1-month-old infant for developmental milestones and primitive reflexes. Which reflex should be PRESENT at this age?",
    options: [
      "Babinski reflex only",
      "Moro reflex (should disappear by 4-6 months)",
      "Stepping reflex only",
      "No primitive reflexes expected"
    ]
  },
  256: {
    question: "During a developmental assessment of a 1-month-old infant, the PMHNP evaluates motor skills. Which motor ability is expected at this age?",
    options: [
      "Rolling over",
      "Palmar grasp and brief head lifting",
      "Sitting unsupported",
      "Crawling"
    ]
  },
  257: {
    question: "A family has adopted a 2-year-old child diagnosed with fetal alcohol spectrum disorder (FASD). They ask about services and treatment. What should the PMHNP recommend?",
    options: [
      "Regular pediatric follow-up only",
      "Early intervention services for developmental support",
      "No special services needed",
      "Speech therapy only"
    ]
  },
  258: {
    question: "A PMHNP is evaluating a child referred for developmental delays and behavioral problems. The chart notes prenatal alcohol exposure. Which facial features are characteristic of fetal alcohol syndrome?",
    options: [
      "Large head, thick upper lip, and wide-set eyes",
      "Microcephaly, thin upper lip, smooth philtrum, and short palpebral fissures",
      "Macrocephaly and obesity",
      "Normal facial features with cognitive impairment only"
    ]
  },
  259: {
    question: "A patient on haloperidol develops dystonia and akathisia. The PMHNP is concerned about long-term risks. Untreated extrapyramidal symptoms (EPS) can progress to which condition?",
    options: [
      "Neuroleptic Malignant Syndrome",
      "Tardive dyskinesia (may be irreversible)",
      "Serotonin Syndrome",
      "Malignant hyperthermia"
    ]
  },
  260: {
    question: "A PMHNP is educating a nursing student about extrapyramidal symptoms. Which finding is NOT classified as EPS?",
    options: [
      "Akathisia (motor restlessness)",
      "Akinesia (absence of movement)",
      "Hypothermia and bradycardia",
      "Dystonia and pseudoparkinsonism"
    ]
  },
  261: {
    question: "A 45-year-old HIV-positive patient with a CD4 count of 150 presents with progressive memory problems and slowed thinking. What are the INITIAL symptoms of HIV-associated dementia?",
    options: [
      "Seizures and focal deficits",
      "Poor concentration and memory loss (subcortical pattern)",
      "Visual hallucinations",
      "Aggressive behavior"
    ]
  },
  265: {
    question: "A patient with suspected obstructive sleep apnea presents with daytime sleepiness and reports that his wife says he snores loudly. What causes the snoring in sleep apnea?",
    options: [
      "Nasal congestion only",
      "Upper airway obstruction during sleep",
      "Cardiac dysfunction",
      "Medication side effect"
    ]
  },
  266: {
    question: "A patient with specific phobia (fear of flying) asks about medication. Which medication approach should the PMHNP DISCOURAGE for long-term management?",
    options: [
      "Long-term benzodiazepine use (prevents habituation and causes dependence)",
      "Cognitive behavioral therapy",
      "Exposure therapy",
      "SSRIs for severe cases"
    ]
  },
  267: {
    question: "A patient with anorexia nervosa in the refeeding phase reports feeling bloated after meals. How should the PMHNP respond?",
    options: [
      "This is concerning and requires immediate workup",
      "Bloating is normal due to gastroparesis; space meals and eat smaller portions",
      "Prescribe laxatives for relief",
      "Recommend fasting between meals"
    ]
  },
  268: {
    question: "A PMHNP is formulating a clinical research question for an evidence-based practice project. What does the PICOT framework represent?",
    options: [
      "Protocol, Implementation, Control, Outcome, Testing",
      "Population, Intervention, Comparison, Outcome, Time",
      "Patient, Investigation, Comparison, Observation, Treatment",
      "Practice, Intervention, Control, Observation, Timeline"
    ]
  },
  269: {
    question: "A patient on carbamazepine is started on a new medication by another provider. The PMHNP reviews drug interactions. As a potent CYP450 INDUCER, carbamazepine will cause which effect on other medications?",
    options: [
      "Increase serum levels of other drugs",
      "Decrease serum levels of other drugs, potentially causing treatment failure",
      "No effect on other medications",
      "Only affect antibiotic metabolism"
    ]
  },
  270: {
    question: "A patient on carbamazepine develops ataxia and diplopia after starting erythromycin for bronchitis. Which mechanism explains this interaction?",
    options: [
      "Erythromycin induces carbamazepine metabolism",
      "Erythromycin INHIBITS CYP3A4, raising carbamazepine levels to toxic range",
      "Carbamazepine inhibits erythromycin absorption",
      "No pharmacokinetic interaction expected"
    ]
  },
  271: {
    question: "A PMHNP is counseling a patient starting carbamazepine about serious adverse effects. Which effect is NOT associated with carbamazepine?",
    options: [
      "Stevens-Johnson syndrome",
      "Toxic epidermal necrolysis",
      "Hypertensive crisis (associated with MAOIs, not carbamazepine)",
      "Aplastic anemia"
    ]
  },
  272: {
    question: "A pregnant woman discloses daily alcohol use. She asks about medication options for alcohol use disorder during pregnancy. What should the PMHNP explain?",
    options: [
      "Naltrexone is safe during pregnancy",
      "Naltrexone is NOT recommended in pregnancy; behavioral interventions are first-line",
      "Disulfiram is preferred in pregnancy",
      "No treatment is needed during pregnancy"
    ]
  },
  273: {
    question: "A patient on Lexapro (escitalopram) and Wellbutrin (bupropion) is started on digoxin. Which drug interaction is of GREATEST concern?",
    options: [
      "Lexapro causing bleeding",
      "Bupropion lowers seizure threshold; monitor closely with this combination",
      "Digoxin toxicity from Lexapro",
      "Wellbutrin causing hypertension"
    ]
  },
  274: {
    question: "A PMHNP is obtaining informed consent for a research study involving psychiatric patients. What documentation is REQUIRED?",
    options: [
      "Verbal consent is sufficient",
      "Signed written consent documenting understanding and voluntary participation",
      "Witness signature only",
      "No consent needed for minimal risk studies"
    ]
  },
  275: {
    question: "A PMHNP is working in an integrated care model that provides comprehensive, whole-person care in an ambulatory setting. This describes which healthcare delivery model?",
    options: [
      "Emergency department psychiatry",
      "Patient-Centered Medical Home (PCMH) model",
      "Specialty psychiatric clinic",
      "Urgent care psychiatry"
    ]
  },
  277: {
    question: "A patient with HIV presents with progressive cognitive decline. The CD4 count is 180. What is typically the FIRST symptom of HIV-associated dementia?",
    options: [
      "Psychosis with hallucinations",
      "Memory loss and concentration difficulties",
      "Seizures",
      "Mood changes"
    ]
  },
  280: {
    question: "A mother brings her 14-year-old son for evaluation, concerned that his breast tissue appears larger than his 11-year-old sister's. What should the PMHNP explain?",
    options: [
      "This requires immediate endocrinology referral",
      "Pubertal gynecomastia is NORMAL in adolescent males and usually resolves",
      "Hormone therapy is needed",
      "Breast imaging is required"
    ]
  },
  281: {
    question: "A patient with asthma and depression is being evaluated. The PMHNP reviews her medication list including Qvar (inhaled beclomethasone). Which respiratory medication can cause depression?",
    options: [
      "Albuterol",
      "Inhaled corticosteroids and montelukast (FDA warning for neuropsychiatric effects)",
      "Salmeterol",
      "Ipratropium"
    ]
  },
  282: {
    question: "A patient on quetiapine (Seroquel) is prescribed fluconazole (Diflucan) for a fungal infection. What drug interaction should the PMHNP anticipate?",
    options: [
      "No significant interaction",
      "Fluconazole INHIBITS CYP3A4, INCREASING quetiapine levels and side effects",
      "Decreased quetiapine levels",
      "Only affects Diflucan metabolism"
    ]
  },
  283: {
    question: "A PMHNP is researching advocacy organizations. In addition to mental health advocacy, what other area does NAMI (National Alliance on Mental Illness) address?",
    options: [
      "Housing issues only",
      "Mental health public policy and legislation",
      "Research funding only",
      "Insurance coverage only"
    ]
  },
  285: {
    question: "A PMHNP is evaluating a patient with HIV and confusion. The team must differentiate HIV-associated dementia from delirium. HIV dementia is often confused with which condition?",
    options: [
      "Alzheimer's disease",
      "Delirium (both cause confusion but differ in onset and course)",
      "Major depression",
      "Generalized anxiety"
    ]
  },
  286: {
    question: "A PMHNP wants to open an outpatient psychiatric practice and needs to assess economic viability. Which financial document shows assets, liabilities, and equity?",
    options: [
      "Income statement",
      "Balance sheet",
      "Cash flow statement",
      "Budget forecast"
    ]
  },
  287: {
    question: "A PMHNP is evaluating an 80-year-old patient for dementia. The family reports memory problems. What is the MOST important differential diagnosis to rule out?",
    options: [
      "Medication side effects only",
      "Depression (pseudodementia) - treatable and reversible",
      "Normal aging",
      "Delirium only"
    ]
  },
  288: {
    question: "A PMHNP is conducting qualitative research on nurse-patient therapeutic communication. Which method, associated with Hildegard Peplau, involves documenting interactions verbatim?",
    options: [
      "Randomized controlled trial",
      "Process recording",
      "Meta-analysis",
      "Survey methodology"
    ]
  },
  289: {
    question: "A patient with a frontal lobe brain tumor presents with personality changes, poor judgment, and difficulty planning. Which deficits are associated with frontal lobe dysfunction?",
    options: [
      "Visual processing deficits",
      "Executive function, behavioral regulation, and personality changes",
      "Hearing impairment",
      "Memory deficits only"
    ]
  },
  290: {
    question: "A PMHNP is preparing a patient with PTSD for mindfulness-based therapy. What is the recommended FIRST intervention before deeper meditation practices?",
    options: [
      "Silent meditation immediately",
      "Guided imagery to establish safety and reduce hyperarousal",
      "Prolonged exposure therapy",
      "Medication optimization first"
    ]
  },
  291: {
    question: "A pregnant woman with alcohol use disorder asks about pharmacological treatment options. What should the PMHNP explain about naltrexone in pregnancy?",
    options: [
      "Naltrexone is safe throughout pregnancy",
      "Naltrexone is NOT first-line in pregnancy; behavioral interventions are preferred",
      "Naltrexone is only contraindicated in third trimester",
      "Naltrexone is the treatment of choice"
    ]
  },
  292: {
    question: "A mother is anxious about giving her child a new psychiatric medication. She appears tearful and distracted during teaching. What should the PMHNP do FIRST?",
    options: [
      "Complete the medication demonstration quickly",
      "STOP and address her anxiety before continuing education",
      "Have another family member give the medication",
      "Provide written instructions and end the visit"
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
console.log(`Batch 8 complete: Rewrote ${updateCount} questions to clinical vignette format`);
