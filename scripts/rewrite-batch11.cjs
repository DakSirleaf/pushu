const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 11: Questions 386-431 - Assessment, Pharmacology, Various Topics
const rewrites = {
  386: {
    question: "A patient previously diagnosed with Alzheimer's 3 years ago had an MMSE of 29. Today's MMSE is 26. How should the PMHNP interpret this?",
    options: [
      "Expected progression",
      "Score 18-23 indicates mild impairment",
      "Score 10-17 indicates moderate impairment",
      "Slow decline suggests reconsidering diagnosis or using MoCA for better sensitivity"
    ]
  },
  387: {
    question: "An 80-year-old patient with memory complaints has MMSE scores of 29 initially and 26 after 3 years. This slow decline is unusual for Alzheimer's. What should the PMHNP consider?",
    options: [
      "Continue current treatment unchanged",
      "Increase cholinesterase inhibitor dose",
      "Reconsider the diagnosis; use MoCA for better sensitivity to early changes",
      "Refer immediately to neurology"
    ]
  },
  389: {
    question: "A patient in the psychiatric ED remains agitated after receiving lorazepam. To prevent prolonged restraint use, what is the next pharmacological intervention?",
    options: [
      "Repeat same benzodiazepine dose",
      "Add IM antipsychotic (ziprasidone, haloperidol, or olanzapine)",
      "Oral medication only",
      "Physical restraint indefinitely"
    ]
  },
  390: {
    question: "A 22-year-old woman on valproate (Depakote) for bipolar disorder is sexually active. What laboratory monitoring is ESSENTIAL?",
    options: [
      "Pregnancy test only",
      "Liver function tests only",
      "CBC with platelets only",
      "ALL: pregnancy test (teratogenic), LFTs, CBC, and drug levels"
    ]
  },
  391: {
    question: "A patient on risperidone for 10 months is prescribed metoclopramide (Reglan) for nausea. What should the PMHNP teach about this combination?",
    options: [
      "Safe combination with no concerns",
      "BOTH are dopamine antagonists - increased risk of EPS, TD, and akathisia",
      "Only monitor for weight gain",
      "Monitor for cardiac effects only"
    ]
  },
  392: {
    question: "A patient on citalopram is started on omeprazole for GERD. What pharmacokinetic interaction should the PMHNP anticipate?",
    options: [
      "INCREASED SSRI levels (PPI inhibits CYP2C19)",
      "Decreased SSRI levels",
      "No interaction expected",
      "Increased risk of serotonin syndrome"
    ]
  },
  393: {
    question: "A patient on long-term lithium has urinalysis showing 4+ proteinuria. What does this finding indicate?",
    options: [
      "Normal finding",
      "Lithium-induced nephropathy requiring nephrology referral",
      "Dehydration only",
      "Medication non-compliance"
    ]
  },
  394: {
    question: "A pregnant woman is taking sertraline and isotretinoin (Accutane). Which medication MUST be discontinued immediately?",
    options: [
      "Sertraline",
      "Isotretinoin (Accutane) - Category X, highly teratogenic",
      "Both medications",
      "Neither medication"
    ]
  },
  395: {
    question: "A patient on multiple serotonergic medications presents with hyperthermia, altered mental status, and neuromuscular abnormalities. Which finding helps differentiate serotonin syndrome from NMS?",
    options: [
      "Elevated CK levels (more significant in NMS)",
      "CLONUS and HYPERREFLEXIA (characteristic of serotonin syndrome)",
      "Lead-pipe rigidity (more characteristic of NMS)",
      "Leukocytosis"
    ]
  },
  396: {
    question: "A child with enuresis is prescribed desmopressin (DDAVP). What is the medication's mechanism of action?",
    options: [
      "Increases urine production",
      "DECREASES urine production (synthetic ADH)",
      "Relaxes bladder muscle",
      "Promotes deeper sleep"
    ]
  },
  397: {
    question: "A teenager with diabetes presents to the ED with DKA and attempts to leave without psychiatric evaluation. What should the PMHNP do?",
    options: [
      "Allow the patient to leave",
      "Call security immediately",
      "Collaborate with ED staff to ensure medical and psychiatric evaluation",
      "Document only"
    ]
  },
  398: {
    question: "A PMHNP is prescribing an off-label medication to a 10-year-old. What documentation is REQUIRED?",
    options: [
      "No special documentation needed",
      "FULL DISCLOSURE to guardian about off-label use, risks, benefits, and alternatives",
      "Written consent from the child",
      "Second opinion mandatory"
    ]
  },
  399: {
    question: "A patient presents with fever, altered mental status, and neuromuscular symptoms after starting an antipsychotic. Labs show significantly elevated CK. What syndrome is this?",
    options: [
      "Serotonin syndrome",
      "NEUROLEPTIC MALIGNANT SYNDROME (elevated CK distinguishes from serotonin syndrome)",
      "Malignant hyperthermia",
      "Anticholinergic toxicity"
    ]
  },
  400: {
    question: "A patient with extrapyramidal symptoms from antipsychotic use is at risk for developing which chronic condition?",
    options: [
      "Weight loss",
      "TARDIVE DYSKINESIA (irreversible involuntary movements)",
      "Improved motor function",
      "Resolution of all symptoms"
    ]
  },
  401: {
    question: "A Native American patient is in restraints after refusing to give up his healing stick, which staff considered dangerous. What should the PMHNP do?",
    options: [
      "Support staff decision",
      "Remove restraints only",
      "TEACH STAFF about cultural competency and significance of healing traditions",
      "Transfer patient"
    ]
  },
  402: {
    question: "A Hispanic patient who recently lost a parent presents with depression and somatic complaints (stomach ache) that medical workup cannot explain. How should the PMHNP approach this?",
    options: [
      "Refer to gastroenterology",
      "Order more tests",
      "VALIDATE experience and provide culturally sensitive care recognizing somatic expression of grief",
      "Prescribe antacids"
    ]
  },
  404: {
    question: "A patient with anorexia nervosa has a BMI of 16 and heart rate of 45. What determines need for hospitalization in eating disorders?",
    options: [
      "BMI below 15 only",
      "BMI below 17.5 only",
      "BMI below 18.5 only",
      "ANY weight with medical instability (bradycardia, hypotension, arrhythmia)"
    ]
  },
  406: {
    question: "A postmenopausal patient on sertraline is concerned about bone health. What intervention is MOST effective for osteoporosis prevention?",
    options: [
      "Calcium supplements alone",
      "WEIGHT-BEARING EXERCISE and smoking cessation",
      "Medication only",
      "Vitamin D alone"
    ]
  },
  408: {
    question: "A PMHNP completes a quality improvement project. What method of sharing findings provides the HIGHEST credibility?",
    options: [
      "Social media",
      "PEER-REVIEWED JOURNAL publication",
      "Newspaper article",
      "Conference poster only"
    ]
  },
  409: {
    question: "When developing treatment guidelines, what represents the HIGHEST level of evidence?",
    options: [
      "Case reports",
      "META-ANALYSES and SYSTEMATIC REVIEWS of RCTs",
      "Single RCT",
      "Expert opinion"
    ]
  },
  410: {
    question: "A newly pregnant patient is on multiple medications. Which medication is Category X and MUST be discontinued?",
    options: [
      "Acetaminophen",
      "ISOTRETINOIN (Accutane) - highly teratogenic, Category X",
      "Prenatal vitamins",
      "Folic acid"
    ]
  },
  411: {
    question: "A child on amphetamine stimulant develops tics. Which medication should the PMHNP switch to?",
    options: [
      "Different amphetamine formulation",
      "Switch to GUANFACINE (alpha-2 agonist that doesn't worsen tics)",
      "Add antipsychotic",
      "Discontinue all ADHD medications"
    ]
  },
  412: {
    question: "A patient with depression and marital conflicts wants 3-6 months of therapy. Which therapy approach is MOST appropriate?",
    options: [
      "Long-term psychoanalysis",
      "INTERPERSONAL THERAPY (IPT) - focuses on relationships, time-limited",
      "Medication only",
      "Exposure therapy"
    ]
  },
  413: {
    question: "An 8-year-old with ADHD on methylphenidate develops motor tics. What medication change should the PMHNP make?",
    options: [
      "Increase stimulant dose",
      "Switch to different stimulant",
      "Continue same medication",
      "Switch to GUANFACINE (doesn't exacerbate tics)"
    ]
  },
  414: {
    question: "A young woman with bipolar disorder expresses strong concerns about weight gain from medications. Which mood stabilizer is WEIGHT-NEUTRAL?",
    options: [
      "Oxcarbazepine (Trileptal)",
      "Lithium (causes weight gain)",
      "Olanzapine (significant weight gain)",
      "LAMOTRIGINE (Lamictal) - weight neutral to slight loss"
    ]
  },
  415: {
    question: "A patient with PTSD asks about evidence-based psychotherapy options. Which therapies are first-line for PTSD?",
    options: [
      "Psychodynamic therapy only",
      "EMDR, Prolonged Exposure (PE), Cognitive Processing Therapy (CPT)",
      "Supportive therapy only",
      "Medication is the only option"
    ]
  },
  416: {
    question: "A patient with alcohol use disorder AND hepatic impairment presents in withdrawal. Which benzodiazepine is preferred?",
    options: [
      "Diazepam",
      "LORAZEPAM (metabolized by glucuronidation, safer in liver failure)",
      "Chlordiazepoxide",
      "Alprazolam"
    ]
  },
  417: {
    question: "A patient in alcohol withdrawal has a CIWA-Ar score of 18. What treatment protocol should the PMHNP follow?",
    options: [
      "No treatment at this score",
      "PRN benzodiazepines only",
      "SCHEDULED benzodiazepines with frequent reassessment (score ≥16)",
      "Antipsychotics only"
    ]
  },
  418: {
    question: "A 20-year-old says 'I cannot make friends, nobody likes me.' According to Erikson, which developmental stage is this patient in?",
    options: [
      "IDENTITY vs. ROLE CONFUSION (12-20 years)",
      "Intimacy vs. Isolation (20-40 years)",
      "Generativity vs. Stagnation",
      "Industry vs. Inferiority"
    ]
  },
  419: {
    question: "An 8-year-old is observed having dolls engage in explicit sexual activity during play therapy. What should the PMHNP do?",
    options: [
      "Ignore as normal play",
      "REPORT to CPS - age-inappropriate sexual knowledge warrants investigation",
      "Continue observing",
      "Talk to parents only"
    ]
  },
  420: {
    question: "A patient concerned about weight gain asks which mood stabilizer is least likely to cause weight gain. Which is TRUE about lamotrigine?",
    options: [
      "TRUE - Lamotrigine is WEIGHT-NEUTRAL (may cause slight loss)",
      "False - causes significant weight gain",
      "Only weight neutral short-term",
      "Weight effect depends on dose"
    ]
  },
  421: {
    question: "A patient on carbamazepine (Tegretol) is prescribed erythromycin. What dose adjustment is needed?",
    options: [
      "Increase Tegretol dose",
      "DECREASE Tegretol dose (erythromycin inhibits CYP3A4, raising levels)",
      "No adjustment needed",
      "Discontinue erythromycin"
    ]
  },
  422: {
    question: "During medication reconciliation, the PMHNP notes a patient is on lisinopril. ACE inhibitors are primarily used for:",
    options: [
      "Diabetes management",
      "HEART FAILURE (first-line for HFrEF)",
      "Depression",
      "Anxiety"
    ]
  },
  423: {
    question: "A mother asks how desmopressin (DDAVP) works for her child's bedwetting. Which statement indicates correct understanding?",
    options: [
      "It increases urination during the day",
      "It DECREASES urine production at night",
      "It helps the child sleep deeper",
      "It increases bladder capacity"
    ]
  },
  424: {
    question: "A PMHNP is teaching a mother about desmopressin (DDAVP) administration for her child's enuresis. Which response indicates understanding?",
    options: [
      "Give with plenty of fluids at bedtime",
      "RESTRICT fluids in evening and give medication before bed",
      "Give in the morning with breakfast",
      "Give only after accidents occur"
    ]
  },
  425: {
    question: "A patient's family asks about the recovery model in mental health treatment. Which statement BEST describes this approach?",
    options: [
      "TRUE - Recovery model promotes HOPE, empowerment, and meaningful life",
      "False - focuses only on symptom cure",
      "Medical model is the same",
      "Only for mild mental illness"
    ]
  },
  426: {
    question: "A PMHNP is using Bowen family systems therapy. Which concepts are central to this approach?",
    options: [
      "Individual pathology focus",
      "TRIANGULATION and SELF-DIFFERENTIATION",
      "Behavioral modification only",
      "Medication management"
    ]
  },
  429: {
    question: "A patient on haloperidol develops acute dystonia with neck stiffness and torticollis. What is the IMMEDIATE treatment?",
    options: [
      "Benzodiazepines only",
      "Antipsychotic dose increase",
      "ANTICHOLINERGICS (benztropine or diphenhydramine) IM/IV",
      "Supportive care only"
    ]
  },
  430: {
    question: "A patient taking kava kava for anxiety asks about drug interactions. What should the PMHNP advise?",
    options: [
      "Safe with all medications",
      "AVOID benzodiazepines (additive CNS depression)",
      "Only avoid antidepressants",
      "Only avoid antibiotics"
    ]
  },
  431: {
    question: "A patient is using kava kava supplements for anxiety. What PRIMARY safety concern should the PMHNP discuss?",
    options: [
      "Weight gain",
      "HEPATOTOXICITY (liver damage) - FDA warning issued",
      "Renal impairment",
      "Cardiac effects"
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
console.log(`Batch 11 complete: Rewrote ${updateCount} questions to clinical vignette format`);
