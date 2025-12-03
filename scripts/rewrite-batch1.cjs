const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 1: Questions 1-50 - Rewrite to ANCC clinical vignette format
const rewrites = {
  2: {
    question: "A patient started on an SSRI and tramadol two days ago now presents with agitation, diaphoresis, and muscle twitching. Which additional findings would confirm the PMHNP's suspected diagnosis?",
    options: [
      "Bradycardia, hypothermia, and lethargy",
      "Tachycardia, hyperreflexia, and hyperthermia",
      "Lead-pipe rigidity, fever, and mutism",
      "Hypotension, respiratory depression, and pinpoint pupils"
    ]
  },
  3: {
    question: "A 22-year-old college student is brought to the clinic by her roommate after exhibiting paranoid delusions and auditory hallucinations for the past 3 weeks. This is her first psychotic episode. Which antipsychotic is considered first-line treatment?",
    options: [
      "Haloperidol (Haldol)",
      "Clozapine (Clozaril)",
      "Chlorpromazine (Thorazine)",
      "Paliperidone (Invega)"
    ]
  },
  5: {
    question: "A PMHNP is selecting an antipsychotic for a patient with schizophrenia who has a BMI of 32 and prediabetes. Which antipsychotic poses the HIGHEST risk for worsening this patient's metabolic status?",
    options: [
      "Aripiprazole (Abilify)",
      "Ziprasidone (Geodon)",
      "Clozapine (Clozaril)",
      "Risperidone (Risperdal)"
    ]
  },
  6: {
    question: "A patient with bipolar I disorder has been stable on lithium for 2 years. The PMHNP is reviewing the patient's most recent lithium level. Which serum concentration indicates the patient is within the therapeutic range for maintenance therapy?",
    options: [
      "0.3 mEq/L",
      "0.8 mEq/L",
      "1.6 mEq/L",
      "2.2 mEq/L"
    ]
  },
  7: {
    question: "A patient on lithium is scheduled for routine monitoring. To obtain an accurate trough level, the PMHNP should instruct the patient to have blood drawn at which time?",
    options: [
      "4 hours after the last dose",
      "8 hours after the last dose",
      "12 hours after the last dose",
      "24 hours after the last dose"
    ]
  },
  10: {
    question: "A patient on lithium presents with tremor, ataxia, and confusion. The lithium level is 2.1 mEq/L. When reviewing potential causes, the PMHNP knows the MOST common cause of lithium toxicity is:",
    options: [
      "Intentional overdose",
      "Dehydration",
      "Drug-drug interaction",
      "Acute renal failure"
    ]
  },
  11: {
    question: "A PMHNP is initiating a mood stabilizer for a patient with bipolar II disorder. Which medication requires slow titration due to the risk of Stevens-Johnson Syndrome?",
    options: [
      "Lithium carbonate",
      "Lamotrigine (Lamictal)",
      "Aripiprazole (Abilify)",
      "Fluoxetine (Prozac)"
    ]
  },
  12: {
    question: "A PMHNP is considering clozapine for a patient with treatment-resistant schizophrenia. When discussing the medication with the patient, which BLACK BOX WARNING must be emphasized?",
    options: [
      "Hypothyroidism requiring thyroid monitoring",
      "Agranulocytosis requiring regular blood monitoring",
      "Hepatotoxicity requiring liver function tests",
      "Nephrotoxicity requiring renal function monitoring"
    ]
  },
  16: {
    question: "A 45-year-old patient presents with major depressive disorder and a 20-year smoking history. He expresses motivation to quit smoking. Which antidepressant would provide dual benefit for both conditions?",
    options: [
      "Fluoxetine (Prozac)",
      "Sertraline (Zoloft)",
      "Bupropion (Wellbutrin)",
      "Duloxetine (Cymbalta)"
    ]
  },
  18: {
    question: "A 35-year-old man with depression reports that sexual dysfunction from his previous SSRI caused him to stop taking it. Which antidepressant has the LOWEST risk of sexual side effects?",
    options: [
      "Fluoxetine (Prozac)",
      "Sertraline (Zoloft)",
      "Paroxetine (Paxil)",
      "Bupropion (Wellbutrin)"
    ]
  },
  19: {
    question: "A patient on phenelzine (Nardil) presents to the emergency department with severe occipital headache, hypertension (220/120), and diaphoresis after eating aged cheese. Which medication should be administered for this hypertensive crisis?",
    options: [
      "Metoprolol",
      "Phentolamine",
      "Labetalol",
      "Lisinopril"
    ]
  },
  20: {
    question: "A patient on sertraline requires surgery and will receive opioid pain management. The PMHNP should alert the surgical team that which opioid can precipitate serotonin syndrome when combined with SSRIs?",
    options: [
      "Morphine",
      "Hydrocodone",
      "Meperidine (Demerol)",
      "Oxycodone"
    ]
  },
  21: {
    question: "A PMHNP is educating a nursing student about antidepressant mechanisms. When explaining how SSRIs work, which statement accurately describes their mechanism of action?",
    options: [
      "They inhibit monoamine oxidase enzyme activity",
      "They block dopamine reuptake in the synapse",
      "They selectively inhibit serotonin reuptake, increasing synaptic serotonin",
      "They block NMDA glutamate receptors"
    ]
  },
  22: {
    question: "A patient asks the PMHNP how bupropion (Wellbutrin) works differently from SSRIs. Which response accurately describes bupropion's mechanism of action?",
    options: [
      "It is a selective serotonin reuptake inhibitor (SSRI)",
      "It is a serotonin-norepinephrine reuptake inhibitor (SNRI)",
      "It is a norepinephrine-dopamine reuptake inhibitor (NDRI)",
      "It is a monoamine oxidase inhibitor (MAOI)"
    ]
  },
  23: {
    question: "A PMHNP is evaluating a patient who developed depression after starting a new medication for hypertension. Which medication classes are known to INDUCE depression?",
    options: [
      "SSRIs and SNRIs",
      "Beta-blockers, corticosteroids, interferon, and isotretinoin",
      "Stimulants and wake-promoting agents",
      "Benzodiazepines only"
    ]
  },
  24: {
    question: "A patient with bipolar I disorder is admitted to the hospital in a manic episode. The PMHNP reviews the medication history and notes the patient started a new medication two weeks ago. Which medications are known to INDUCE mania?",
    options: [
      "Mood stabilizers",
      "Corticosteroids, antidepressants, isoniazid, and disulfiram",
      "Benzodiazepines",
      "Antipsychotics"
    ]
  },
  25: {
    question: "A patient abruptly stopped paroxetine 3 days ago and presents with dizziness, electric shock sensations, irritability, and flu-like symptoms. Which condition is the MOST likely diagnosis?",
    options: [
      "Serotonin syndrome",
      "Medication withdrawal seizure",
      "SSRI discontinuation syndrome",
      "Recurrence of depression"
    ]
  },
  26: {
    question: "A PMHNP is selecting an antipsychotic for a patient with a history of QTc prolongation on EKG. Which antipsychotic requires a baseline EKG due to significant QTc prolongation risk?",
    options: [
      "Aripiprazole (Abilify)",
      "Olanzapine (Zyprexa)",
      "Ziprasidone (Geodon)",
      "Risperidone (Risperdal)"
    ]
  },
  27: {
    question: "A patient with bipolar I disorder has had multiple breakthrough manic episodes despite adequate trials of lithium and valproate. Which mood stabilizer is MOST effective for rapid cycling bipolar disorder?",
    options: [
      "Lithium",
      "Carbamazepine",
      "Valproate (Depakote)",
      "Lamotrigine"
    ]
  },
  28: {
    question: "Before initiating carbamazepine (Tegretol) in a patient of Asian descent, the PMHNP should order which genetic test?",
    options: [
      "CYP2D6 genotype",
      "HLA-B*1502 allele",
      "MTHFR mutation",
      "COMT polymorphism"
    ]
  },
  29: {
    question: "A patient presents to the emergency department in acute mania. The PMHNP decides to use valproate (Depakote) with a loading dose strategy. What is the appropriate loading dose?",
    options: [
      "10 mg/kg/day",
      "20-30 mg/kg/day",
      "40-50 mg/kg/day",
      "5 mg/kg/day"
    ]
  },
  30: {
    question: "A patient on lithium is prescribed a new medication by their primary care provider. The PMHNP should warn that which TWO medication classes can approximately DOUBLE lithium levels?",
    options: [
      "Acetaminophen and antihistamines",
      "ACE inhibitors and NSAIDs",
      "Proton pump inhibitors and statins",
      "Calcium channel blockers and antibiotics"
    ]
  },
  31: {
    question: "A patient on lithium reports starting ibuprofen for knee pain. The PMHNP should advise that NSAIDs affect lithium levels by which mechanism?",
    options: [
      "Increasing hepatic metabolism of lithium",
      "Decreasing renal clearance of lithium, raising levels",
      "Increasing GI absorption of lithium",
      "Displacing lithium from protein binding"
    ]
  },
  32: {
    question: "A patient presents to the emergency department after a benzodiazepine overdose with respiratory depression. Which medication should be administered as the antidote?",
    options: [
      "Naloxone (Narcan)",
      "Flumazenil (Romazicon)",
      "Atropine",
      "Physostigmine"
    ]
  },
  33: {
    question: "Emergency medical services brings in an unresponsive patient with pinpoint pupils and respiratory rate of 6. Track marks are visible on both arms. Which medication is the appropriate antidote?",
    options: [
      "Flumazenil",
      "Naloxone (Narcan)",
      "Activated charcoal",
      "N-acetylcysteine"
    ]
  },
  34: {
    question: "A patient presents with tremors, diaphoresis, and tachycardia 24 hours after his last alcoholic drink. The CIWA-Ar score is 18. Which medication class is first-line for alcohol withdrawal?",
    options: [
      "Antipsychotics",
      "Benzodiazepines",
      "Anticonvulsants",
      "Beta-blockers"
    ]
  },
  35: {
    question: "A patient with opioid use disorder presents in moderate withdrawal with COWS score of 16. Which medication is appropriate for treating opioid withdrawal and preventing relapse?",
    options: [
      "Benzodiazepines",
      "Buprenorphine or methadone",
      "Naltrexone",
      "Clonidine only"
    ]
  },
  36: {
    question: "A patient on haloperidol develops high fever (104°F), severe muscle rigidity, altered mental status, and autonomic instability. Which condition should the PMHNP suspect?",
    options: [
      "Serotonin syndrome",
      "Malignant hyperthermia",
      "Neuroleptic Malignant Syndrome (NMS)",
      "Anticholinergic toxicity"
    ]
  },
  37: {
    question: "A patient on multiple medications presents with fever, rigidity, and altered mental status. The PMHNP must differentiate between NMS and serotonin syndrome. Which finding is MORE characteristic of serotonin syndrome?",
    options: [
      "Lead-pipe rigidity",
      "Bradyreflexia",
      "Hyperreflexia and clonus",
      "Elevated creatine kinase >10,000"
    ]
  },
  38: {
    question: "A PMHNP is comparing first-generation antipsychotics. Which typical antipsychotic has the HIGHEST risk of extrapyramidal symptoms (EPS)?",
    options: [
      "Chlorpromazine (Thorazine)",
      "Thioridazine (Mellaril)",
      "Haloperidol (Haldol)",
      "Perphenazine (Trilafon)"
    ]
  },
  39: {
    question: "A patient with schizophrenia has significant weight gain and metabolic concerns. The PMHNP wants to switch to an atypical antipsychotic with the LOWEST metabolic risk. Which medication is most appropriate?",
    options: [
      "Olanzapine (Zyprexa)",
      "Quetiapine (Seroquel)",
      "Ziprasidone (Geodon)",
      "Clozapine (Clozaril)"
    ]
  },
  40: {
    question: "A patient on clozapine is brought to the emergency department obtunded with a CK level of 15,000. The PMHNP suspects rhabdomyolysis. Which condition is this complication associated with?",
    options: [
      "Serotonin syndrome",
      "Tardive dyskinesia",
      "Neuroleptic Malignant Syndrome",
      "Anticholinergic toxicity"
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
console.log(`Batch 1 complete: Rewrote ${updateCount} questions to clinical vignette format`);
