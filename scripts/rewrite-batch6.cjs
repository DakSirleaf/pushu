const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 6: Questions 171-200 - MAT, Stages of Change, Pharmacology Mechanisms
const rewrites = {
  171: {
    question: "A 32-year-old patient with opioid use disorder asks about medication options for treatment. He has tried detox twice but relapsed each time. The PMHNP explains medication-assisted treatment (MAT). Which response is accurate?",
    options: [
      "MAT just replaces one drug with another",
      "MAT combines buprenorphine or methadone with counseling; reduces overdose deaths by 50%",
      "Only abstinence-based programs are effective",
      "Detox alone is the gold standard treatment"
    ]
  },
  172: {
    question: "A patient with alcohol use disorder tells the PMHNP, 'I know drinking is bad for me, but I'm not sure I'm ready to quit.' According to the Stages of Change model, which stage is this patient in?",
    options: [
      "Precontemplation (not thinking about change)",
      "Contemplation (ambivalent about change)",
      "Preparation (planning change)",
      "Action (actively making changes)"
    ]
  },
  173: {
    question: "A patient tells the PMHNP, 'I know I need to stop using cocaine, but I'm not sure if I can do it.' The patient is in the contemplation stage. Which intervention is MOST appropriate?",
    options: [
      "Provide a detailed action plan immediately",
      "Use motivational interviewing to explore ambivalence",
      "Focus only on maintenance strategies",
      "No intervention until patient is ready for action"
    ]
  },
  174: {
    question: "A patient with chronic pain and anxiety asks the PMHNP about medical marijuana. The PMHNP practices in a state where medical marijuana is legal. What should the PMHNP understand about recommending medical marijuana?",
    options: [
      "NPs can never recommend medical marijuana",
      "State laws vary; NPs 'certify' or 'recommend' but don't 'prescribe' due to federal Schedule I status",
      "Federal law permits NP prescription in all states",
      "Physician approval is required in all cases"
    ]
  },
  175: {
    question: "A nursing student asks the PMHNP to explain how SSRIs work differently from older antidepressants. Which statement accurately describes the mechanism of SSRIs?",
    options: [
      "Block multiple neurotransmitter receptors like TCAs",
      "Selectively inhibit serotonin reuptake, increasing synaptic serotonin",
      "Inhibit the MAO enzyme that breaks down neurotransmitters",
      "Block dopamine and norepinephrine reuptake"
    ]
  },
  176: {
    question: "A PMHNP is explaining to a patient why amitriptyline causes more side effects than sertraline. What is the mechanism of action of tricyclic antidepressants?",
    options: [
      "Selective serotonin reuptake inhibition only",
      "Block presynaptic reuptake of serotonin AND norepinephrine, plus histamine/alpha/muscarinic receptors",
      "Inhibit monoamine oxidase enzyme",
      "Act as serotonin receptor agonists"
    ]
  },
  177: {
    question: "A patient taking phenelzine is admitted after eating aged cheese at a party. He presents with severe hypertensive crisis. The PMHNP explains to the medical team how MAOIs work. Which statement is correct?",
    options: [
      "MAOIs inhibit reuptake of neurotransmitters",
      "MAOIs inhibit the enzyme that breaks down serotonin, norepinephrine, and dopamine",
      "MAOIs block postsynaptic receptors",
      "MAOIs increase neurotransmitter synthesis"
    ]
  },
  178: {
    question: "A patient asks why duloxetine might help both her depression and chronic back pain. The PMHNP explains the mechanism of SNRIs. Which response is accurate?",
    options: [
      "SNRIs only affect serotonin like SSRIs",
      "SNRIs inhibit reuptake of both serotonin AND norepinephrine",
      "SNRIs inhibit MAO enzyme",
      "SNRIs act primarily on dopamine receptors"
    ]
  },
  179: {
    question: "A patient reports that bupropion has not caused the sexual side effects she experienced with sertraline. The PMHNP explains why. What is bupropion's mechanism of action?",
    options: [
      "Selective serotonin reuptake inhibition",
      "Norepinephrine and dopamine reuptake inhibition (no serotonin effect)",
      "MAO inhibition",
      "Acetylcholine receptor blockade"
    ]
  },
  180: {
    question: "A patient is taking trazodone 50mg at bedtime for insomnia but is not experiencing antidepressant effects. The PMHNP explains that higher doses would be needed for depression. What is trazodone's mechanism of action?",
    options: [
      "Dopamine receptor blockade and reuptake inhibition",
      "5HT-2 receptor antagonism AND serotonin reuptake inhibition",
      "MAO inhibition and reuptake inhibition",
      "Histamine and serotonin blockade only"
    ]
  },
  181: {
    question: "A patient stopped paroxetine abruptly 3 days ago and reports flu-like symptoms, dizziness, and 'electric shock' sensations. The PMHNP recognizes this as SSRI discontinuation syndrome. What causes these symptoms?",
    options: [
      "Excessive dopamine activity",
      "Sudden decrease in serotonin availability after brain adaptation to higher levels",
      "Norepinephrine surge",
      "GABA receptor downregulation"
    ]
  },
  182: {
    question: "A patient who was non-compliant with sertraline presents with nausea, dizziness, and brain zaps. She admits she stopped taking her medication 4 days ago. Which additional symptom is characteristic of SSRI discontinuation?",
    options: [
      "Hypertensive crisis",
      "Flu-like symptoms and sensory disturbances",
      "Generalized seizures",
      "Hyperthermia and muscle rigidity"
    ]
  },
  184: {
    question: "A PMHNP is educating a patient about the importance of tapering SSRIs rather than stopping abruptly. Which factors INCREASE the risk of discontinuation syndrome?",
    options: [
      "Long half-life medications and gradual taper",
      "Short half-life medications, abrupt discontinuation, high dose, and long-term use",
      "Low doses and short duration of treatment",
      "Use of adjunctive therapy"
    ]
  },
  186: {
    question: "A patient on fluoxetine and tramadol presents with fever of 104°F, muscle rigidity, autonomic instability, and altered mental status. Which finding indicates SEVERE serotonin syndrome?",
    options: [
      "Bradycardia and hypothermia",
      "Seizures, respiratory depression, and hyperthermia >104°F",
      "Constipation and urinary retention",
      "Weight loss and fatigue"
    ]
  },
  187: {
    question: "A PMHNP is differentiating serotonin syndrome from neuroleptic malignant syndrome in a patient with fever and altered mental status. Which triad of findings is characteristic of serotonin syndrome?",
    options: [
      "Hyporeflexia, bradycardia, and dry skin",
      "Hyperreflexia/clonus, autonomic instability, and mental status changes",
      "Lead-pipe rigidity, bradykinesia, and mutism",
      "Hypothermia, sedation, and hypotension"
    ]
  },
  188: {
    question: "A patient with depression asks about taking L-tryptophan supplements to boost her mood. She is currently taking sertraline. What should the PMHNP advise?",
    options: [
      "L-tryptophan is safe with SSRIs",
      "L-tryptophan is a serotonin precursor and significantly increases serotonin syndrome risk",
      "L-tryptophan only interacts with MAOIs",
      "L-tryptophan has no serotonergic activity"
    ]
  },
  189: {
    question: "A PMHNP is reviewing a patient's medication list for serotonin syndrome risk. The patient takes sertraline, trazodone, and diphenhydramine. Which medication does NOT contribute to serotonin syndrome risk?",
    options: [
      "Sertraline (SSRI)",
      "Trazodone (SARI)",
      "Diphenhydramine (antihistamine with no serotonergic activity)",
      "All three increase risk equally"
    ]
  },
  190: {
    question: "A patient on phenelzine (MAOI) requires surgery. The anesthesiologist asks the PMHNP which opioid should be AVOIDED. Which opioid is associated with serotonin syndrome when combined with serotonergic medications?",
    options: [
      "Morphine",
      "Meperidine (Demerol)",
      "Hydromorphone",
      "Fentanyl"
    ]
  },
  192: {
    question: "A patient on lithium for 6 months reports a fine hand tremor that is interfering with her work as a graphic designer. What is the MOST appropriate response?",
    options: [
      "Discontinue lithium immediately",
      "Recognize this as a common side effect; may improve with beta-blocker or dose adjustment",
      "This indicates lithium toxicity requiring emergent evaluation",
      "Tremor is not associated with lithium therapy"
    ]
  },
  193: {
    question: "A patient on lithium therapy develops worsening acne and a new psoriasis flare. The dermatologist asks about the medication. What should the PMHNP explain?",
    options: [
      "These are allergic reactions requiring immediate discontinuation",
      "Acne and psoriasis exacerbation are known dermatological side effects of lithium",
      "Lithium does not affect the skin",
      "These indicate Stevens-Johnson syndrome"
    ]
  },
  194: {
    question: "A patient recently started on lithium reports persistent nausea and diarrhea. Her lithium level is 0.9 mEq/L. What is the MOST appropriate intervention?",
    options: [
      "Discontinue lithium due to toxicity",
      "Take with food; consider extended-release formulation; GI symptoms common early in treatment",
      "These symptoms are unrelated to lithium",
      "Increase the dose to achieve better efficacy"
    ]
  },
  195: {
    question: "A patient on lithium for 3 years reports increased urination and thirst. Labs show lithium level of 0.8 mEq/L and creatinine of 1.0. The PMHNP recognizes these symptoms as:",
    options: [
      "Signs of acute renal failure",
      "Nephrogenic diabetes insipidus from lithium-induced renal effects",
      "Normal findings requiring no action",
      "Indication for immediate lithium discontinuation"
    ]
  },
  196: {
    question: "A 52-year-old patient on lithium has an EKG showing T-wave flattening. She is asymptomatic. What should the PMHNP understand about this finding?",
    options: [
      "This indicates serious cardiotoxicity requiring lithium discontinuation",
      "Benign T-wave changes are common with lithium; usually not clinically significant",
      "This is a medical emergency",
      "Lithium does not affect the heart"
    ]
  },
  197: {
    question: "A patient on lithium has routine labs showing WBC of 12,000/μL. She is afebrile with no signs of infection. What does the PMHNP understand about this finding?",
    options: [
      "This indicates serious infection requiring workup",
      "Lithium commonly causes benign leukocytosis (elevated WBC)",
      "This is a sign of lithium toxicity",
      "Lithium causes neutropenia, not leukocytosis"
    ]
  },
  198: {
    question: "A patient presents with depression that began 2 weeks after starting propranolol for hypertension. The PMHNP reviews medications that can cause depression. Which medication classes are known to induce depression?",
    options: [
      "Antibiotics and antivirals",
      "Beta-blockers, corticosteroids, isotretinoin, and interferon",
      "Antipsychotics cause depression as primary effect",
      "SSRIs and SNRIs"
    ]
  },
  199: {
    question: "A patient with hepatitis C is referred for psychiatric evaluation after developing depressive symptoms while on interferon therapy. What is the relationship between interferon and depression?",
    options: [
      "No relationship exists",
      "Interferon commonly causes depression in up to 45% of patients",
      "Interferon only causes anxiety, not depression",
      "Depression only occurs with high-dose interferon"
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
console.log(`Batch 6 complete: Rewrote ${updateCount} questions to clinical vignette format`);
