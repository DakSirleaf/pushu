const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 7: Questions 201-250 - Mood Stabilizers, Assessment Scales, Misc Pharmacology
const rewrites = {
  201: {
    question: "A patient with bipolar disorder presents to the ED in a manic episode. She was started on prednisone 2 weeks ago for asthma exacerbation. The PMHNP recognizes which medications can induce mania?",
    options: [
      "Beta-blockers and benzodiazepines",
      "Steroids, antidepressants, isoniazid (INH), and disulfiram (SAID)",
      "Antipsychotics and lithium",
      "Anticholinergics and antihistamines"
    ]
  },
  202: {
    question: "A patient with asthma and bipolar disorder asks if her Flonase nasal spray could affect her mood. What should the PMHNP explain about corticosteroids and mood?",
    options: [
      "Only injectable steroids affect mood",
      "Corticosteroids (including prednisone, dexamethasone, even inhaled) can induce mania",
      "Only testosterone affects mood",
      "Estrogen causes more mood effects than corticosteroids"
    ]
  },
  203: {
    question: "A patient on lithium for bipolar I disorder has blood drawn for routine monitoring. Which serum concentration indicates the patient is within the therapeutic range?",
    options: [
      "0.4-0.8 mEq/L (subtherapeutic)",
      "0.6-1.2 mEq/L (therapeutic range)",
      "1.5-2.0 mEq/L (toxic)",
      "2.0-3.0 mEq/L (severely toxic)"
    ]
  },
  204: {
    question: "A patient starting lithium asks about common side effects to expect. Which side effects should the PMHNP discuss?",
    options: [
      "Hypertension and tachycardia",
      "Nausea, fine hand tremor, increased urination and thirst, and weight gain",
      "Constipation and dry mouth",
      "Weight loss and insomnia"
    ]
  },
  205: {
    question: "A patient on lithium presents with slurred speech, confusion, vomiting, and ataxia. Her lithium level is 2.3 mEq/L. Which symptoms indicate lithium TOXICITY rather than therapeutic side effects?",
    options: [
      "Mild nausea and slight tremor",
      "Slurred speech, confusion, severe GI symptoms, and ataxia",
      "Mild hand tremor only",
      "Polyuria and polydipsia"
    ]
  },
  206: {
    question: "A woman with bipolar disorder on lithium discovers she is 6 weeks pregnant. She asks if she can continue lithium. What should the PMHNP explain?",
    options: [
      "Lithium is safe throughout pregnancy",
      "Lithium is established treatment for bipolar but Pregnancy Category D; risk of Ebstein's anomaly in first trimester",
      "Lithium has no fetal effects",
      "Lithium is only contraindicated during labor"
    ]
  },
  207: {
    question: "A patient on lithium reports that her primary care provider started lisinopril for hypertension and she also takes ibuprofen for arthritis. What effect do NSAIDs and ACE inhibitors have on lithium levels?",
    options: [
      "Decrease lithium levels significantly",
      "Can approximately DOUBLE lithium levels, increasing toxicity risk",
      "Have no effect on lithium levels",
      "Only affect lithium when taken together"
    ]
  },
  208: {
    question: "A patient on carbamazepine for bipolar disorder has a level drawn. Which serum concentration indicates the patient is within the therapeutic range?",
    options: [
      "2-6 mcg/mL (subtherapeutic)",
      "6-12 mcg/mL (therapeutic range)",
      "12-20 mcg/mL (high)",
      "20-30 mcg/mL (toxic)"
    ]
  },
  209: {
    question: "A patient recently started on carbamazepine reports feeling sedated and dizzy. Which side effects are COMMON with carbamazepine?",
    options: [
      "Nausea, dizziness, sedation, headache, and ataxia",
      "Weight loss and hyperactivity",
      "Severe hypertension",
      "Constipation only"
    ]
  },
  210: {
    question: "A PMHNP is counseling a patient starting carbamazepine about SERIOUS adverse effects that require immediate medical attention. Which effects should be emphasized?",
    options: [
      "Mild sedation requiring activity adjustment",
      "Agranulocytosis, aplastic anemia, and Stevens-Johnson syndrome",
      "Weight gain and appetite changes",
      "Mild tremor"
    ]
  },
  211: {
    question: "A woman on carbamazepine for bipolar disorder asks about pregnancy risks. She also takes oral contraceptives. What is MOST important to discuss?",
    options: [
      "Carbamazepine is safe during pregnancy",
      "Carbamazepine is a CYP inducer; reduces contraceptive efficacy and has teratogenic risk",
      "Carbamazepine has no drug interactions",
      "Carbamazepine enhances contraceptive efficacy"
    ]
  },
  212: {
    question: "A PMHNP is initiating carbamazepine in a patient of Korean descent. What screening is REQUIRED before starting this medication?",
    options: [
      "CBC with differential only",
      "HLA-B*1502 allele screening (FDA Black Box Warning for Asian patients)",
      "Thyroid function tests only",
      "Liver function tests only"
    ]
  },
  213: {
    question: "A PMHNP is selecting a mood stabilizer for a patient with rapid cycling bipolar disorder. Which statement about valproic acid is CORRECT?",
    options: [
      "Effective for rapid cycling bipolar, seizures, and migraine prophylaxis",
      "FDA-approved for schizophrenia treatment",
      "Less effective than lithium for rapid cycling",
      "Only effective for seizure disorders"
    ]
  },
  214: {
    question: "A patient on valproic acid for bipolar disorder has a level drawn. Which serum concentration indicates the patient is within the therapeutic range?",
    options: [
      "25-75 mcg/mL (subtherapeutic)",
      "50-125 mcg/mL (therapeutic range)",
      "100-200 mcg/mL (high)",
      "150-250 mcg/mL (toxic)"
    ]
  },
  215: {
    question: "A patient on valproic acid reports nausea, hair thinning, and has gained 15 pounds since starting the medication. Which side effects are COMMON with valproate?",
    options: [
      "Constipation and dry mouth",
      "Nausea, weight gain, tremor, and alopecia (hair loss)",
      "Hypertension and tachycardia",
      "Weight loss and insomnia"
    ]
  },
  216: {
    question: "A PMHNP is counseling a patient starting valproic acid about SERIOUS adverse effects requiring immediate attention. Which effects should be emphasized?",
    options: [
      "Mild sedation",
      "Hepatotoxicity, pancreatitis, thrombocytopenia, and Stevens-Johnson syndrome",
      "Mild tremor",
      "Appetite changes"
    ]
  },
  217: {
    question: "A patient presents in acute mania and the PMHNP decides to use valproic acid with a loading dose for rapid control. What is the appropriate loading dose?",
    options: [
      "10 mg/kg",
      "20 mg/kg",
      "30 mg/kg",
      "40 mg/kg"
    ]
  },
  218: {
    question: "A PMHNP is using the SLUMS (St. Louis University Mental Status) exam to screen an educated patient for cognitive impairment. Which score range indicates dementia?",
    options: [
      "27-30 (normal)",
      "21-26 (MCI)",
      "1-20 (dementia for high school educated patients)",
      "Only scores below 10"
    ]
  },
  219: {
    question: "A 75-year-old patient is administered the MMSE as part of a dementia workup. She scores 21. What does this score indicate?",
    options: [
      "Severe cognitive impairment (0-9)",
      "Moderate cognitive impairment (10-17)",
      "Mild cognitive impairment (18-23)",
      "Normal cognition (24-30)"
    ]
  },
  220: {
    question: "A PMHNP administers the HAM-D to a patient being treated for depression. The score is 16. What severity level does this indicate?",
    options: [
      "Normal/remission (0-7)",
      "Mild depression (8-13)",
      "Moderate depression (14-18)",
      "Severe depression (19+)"
    ]
  },
  221: {
    question: "A patient completes the PHQ-9 during a follow-up visit and scores 12. What severity level does this indicate?",
    options: [
      "Minimal depression (0-4)",
      "Mild depression (5-9)",
      "Moderate depression (10-14)",
      "Moderately severe depression (15-19)"
    ]
  },
  222: {
    question: "A PMHNP uses the Beck Depression Inventory-II (BDI-II) to assess a patient. The score is 24. What severity level does this indicate?",
    options: [
      "Minimal depression (0-13)",
      "Mild depression (14-19)",
      "Moderate depression (20-28)",
      "Severe depression (29-63)"
    ]
  },
  223: {
    question: "A PMHNP administers the HAM-A to monitor a patient's anxiety treatment response. The score is 20. What severity level does this indicate?",
    options: [
      "Minimal anxiety (<14)",
      "Mild anxiety (14-17)",
      "Moderate anxiety (18-24)",
      "Severe anxiety (≥25)"
    ]
  },
  224: {
    question: "A patient completes the GAD-7 and scores 11. What severity level and clinical action does this indicate?",
    options: [
      "Minimal anxiety (0-4); monitoring only",
      "Mild anxiety (5-9); watchful waiting",
      "Moderate anxiety (10-14); treatment indicated",
      "Severe anxiety (15-21); urgent intervention"
    ]
  },
  225: {
    question: "A patient with opioid use disorder presents to the ED requesting treatment. The COWS score is 15. What is the appropriate clinical action?",
    options: [
      "Score too low; no treatment indicated (0-4)",
      "Mild withdrawal; symptomatic treatment only (5-12)",
      "Moderate withdrawal; buprenorphine or methadone initiation appropriate (≥13)",
      "Only treat when score exceeds 25"
    ]
  },
  226: {
    question: "A patient with alcohol use disorder is being monitored with the CIWA-Ar. The score is 18. What severity level and treatment is indicated?",
    options: [
      "Minimal withdrawal (0-9); no pharmacological treatment",
      "Mild withdrawal (10-15); PRN benzodiazepines",
      "Moderate-severe withdrawal (16-20); scheduled benzodiazepines with close monitoring",
      "Only treat at scores above 25"
    ]
  },
  228: {
    question: "A patient with depression has failed to respond to three adequate trials of different SSRIs. The PMHNP considers treatment-resistant depression strategies. What is the appropriate next step?",
    options: [
      "Try a fourth SSRI at higher doses",
      "Augment with lithium or atypical antipsychotic, or consider TMS/ECT/ketamine",
      "Continue the same SSRI indefinitely",
      "Discontinue all treatment"
    ]
  },
  229: {
    question: "A PMHNP is assessing functional status in a 78-year-old patient with memory complaints. The family reports she can no longer manage her checkbook. What is the significance of this finding?",
    options: [
      "Not clinically significant",
      "IADLs (like managing finances) are most sensitive indicator of cognitive decline",
      "Only ADL impairment is clinically significant",
      "Financial management is not part of functional assessment"
    ]
  },
  230: {
    question: "A 5-year-old boy with autism spectrum disorder does not respond to verbal instructions from the PMHNP. How should this behavior be interpreted?",
    options: [
      "The child is being oppositionally defiant",
      "Poor response to verbal commands is characteristic of autism, not defiance",
      "This indicates hearing impairment requiring audiology referral",
      "This suggests regression from previous abilities"
    ]
  },
  231: {
    question: "A PMHNP is asked to testify before the state legislature about barriers to mental health care access. What is the PRIMARY role of NPs in politics?",
    options: [
      "Fundraising for political candidates",
      "Advocacy using evidence-based knowledge to influence health policy",
      "Campaign management",
      "Political party leadership"
    ]
  },
  233: {
    question: "A patient on olanzapine has gained 25 pounds over 6 months. The PMHNP measures waist circumference as part of metabolic screening. What is the FIRST indicator of metabolic syndrome?",
    options: [
      "Elevated blood pressure",
      "Increased waist circumference (central obesity)",
      "Elevated fasting glucose",
      "Abnormal lipid panel"
    ]
  },
  234: {
    question: "A patient on carbamazepine is prescribed ciprofloxacin for a urinary tract infection. What effect will this interaction have?",
    options: [
      "Decreased carbamazepine levels",
      "Significantly INCREASED carbamazepine levels due to CYP3A4 inhibition",
      "No interaction expected",
      "Only affects antibiotic levels"
    ]
  },
  235: {
    question: "A patient presents with fever, severe headache, and stiff neck. On exam, passive neck flexion is limited by involuntary muscle spasms. What condition does nuchal rigidity indicate?",
    options: [
      "Tension headache",
      "Meningitis (medical emergency)",
      "Migraine with aura",
      "Cervical strain"
    ]
  },
  236: {
    question: "A patient with heart failure is started on lisinopril. The PMHNP notes that ACE inhibitors can interact with lithium. What is the PRIMARY indication for ACE inhibitors?",
    options: [
      "Diabetes management",
      "Heart failure and hypertension",
      "Hyperlipidemia",
      "Cardiac arrhythmias"
    ]
  },
  237: {
    question: "A PMHNP is teaching nursing students about serotonin syndrome. Which finding is NOT consistent with serotonin syndrome?",
    options: [
      "Autonomic instability with tachycardia and hyperthermia",
      "Hyperreflexia, myoclonus, and agitation",
      "Bradycardia and hypothermia",
      "Occurs with SSRI + tramadol or SSRI + St. John's Wort combinations"
    ]
  },
  243: {
    question: "A patient on lithium for 2 years has routine labs. The urinalysis shows protein in the urine. What does this finding indicate?",
    options: [
      "Normal finding unrelated to lithium",
      "Lithium-induced nephropathy requiring close monitoring",
      "Sign of lithium toxicity",
      "Indication to increase lithium dose"
    ]
  },
  244: {
    question: "A PMHNP is selecting an antidepressant for an 80-year-old patient with depression. The patient asks why amitriptyline is not appropriate. What is the PRIMARY concern?",
    options: [
      "Ineffective in elderly patients",
      "Strong anticholinergic effects causing constipation, urinary retention, confusion, and falls",
      "Causes diarrhea",
      "Leads to weight loss"
    ]
  },
  245: {
    question: "A patient on multiple medications asks about drug interactions with his ranitidine (Zantac). The PMHNP considers which H2 blocker has the MOST significant drug interactions?",
    options: [
      "Ranitidine has the most interactions",
      "Cimetidine (Tagamet) is a potent CYP inhibitor with many drug interactions",
      "Famotidine has the most interactions",
      "All H2 blockers have equal interactions"
    ]
  },
  246: {
    question: "A patient with allergies asks the PMHNP about the difference between first-generation and second-generation antihistamines. Which statement is accurate?",
    options: [
      "First-generation (diphenhydramine) are preferred due to fewer side effects",
      "Second-generation (loratadine, cetirizine) are less sedating and preferred for daytime use",
      "Both generations are equally sedating",
      "Second-generation have more anticholinergic effects"
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
console.log(`Batch 7 complete: Rewrote ${updateCount} questions to clinical vignette format`);
