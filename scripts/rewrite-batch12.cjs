const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 12: Questions 432-500 - Final Batch - Various Topics
const rewrites = {
  432: {
    question: "A patient with fibromyalgia and depression asks about medication options that could help both conditions. Which medication classes are evidence-based for fibromyalgia?",
    options: [
      "NSAIDs only",
      "Benzodiazepines",
      "TCAs (amitriptyline), SNRIs (duloxetine, milnacipran), or pregabalin",
      "Steroids"
    ]
  },
  433: {
    question: "A widower speaks only positively about his deceased wife, describing her as 'perfect in every way.' Which defense mechanism is this patient using?",
    options: [
      "Denial",
      "Idealization (viewing deceased as all-good)",
      "Projection",
      "Regression"
    ]
  },
  434: {
    question: "A patient on risperidone requires metabolic syndrome screening. What is the BEST initial assessment for central adiposity?",
    options: [
      "Weight only",
      "Waist-to-hip circumference ratio measurement",
      "Blood pressure only",
      "Fasting glucose only"
    ]
  },
  435: {
    question: "A patient on lithium reports taking indomethacin (Indocin) for back pain. What should the PMHNP do?",
    options: [
      "No adjustment needed",
      "DECREASE lithium dose (NSAIDs increase lithium levels by reducing renal clearance)",
      "Increase lithium dose",
      "Continue current regimen"
    ]
  },
  436: {
    question: "A nursing student asks about the difference between thought process and thought content in the mental status exam. What is the correct distinction?",
    options: [
      "They are identical concepts",
      "PROCESS = HOW thoughts flow; CONTENT = WHAT thoughts are about",
      "No clinical relevance",
      "Only content is documented"
    ]
  },
  437: {
    question: "A patient reports thoughts of wanting to die. In which section of the mental status examination should this be documented?",
    options: [
      "Mood and affect",
      "THOUGHT CONTENT (includes SI, delusions, obsessions)",
      "Thought process",
      "Behavior"
    ]
  },
  438: {
    question: "A patient on metoclopramide (Reglan) for nausea develops involuntary facial movements. What adverse effect has occurred?",
    options: [
      "Weight loss",
      "TARDIVE DYSKINESIA (Reglan has FDA Black Box Warning)",
      "Hyperglycemia",
      "Hypertension"
    ]
  },
  439: {
    question: "A PMHNP asks a patient to subtract 7 from 100 and continue subtracting. What cognitive function is being assessed?",
    options: [
      "Memory",
      "CONCENTRATION AND ATTENTION",
      "Language",
      "Mood"
    ]
  },
  440: {
    question: "A child presents with weight loss, irritability, and increased energy. Before assuming a psychiatric diagnosis, what should the PMHNP order?",
    options: [
      "Depression screening only",
      "LEAD LEVEL (lead toxicity mimics psychiatric symptoms)",
      "ADHD assessment",
      "Anxiety screening"
    ]
  },
  441: {
    question: "A PMHNP wants to assess for formal thought disorder in a patient with schizophrenia. What is the BEST assessment technique?",
    options: [
      "Yes/no questions only",
      "PROVERB INTERPRETATION (tests abstract thinking)",
      "Memory testing",
      "Depression scale"
    ]
  },
  442: {
    question: "A 7-year-old with ODD is at risk for developing conduct disorder. What intervention is MOST effective for prevention?",
    options: [
      "Medication alone",
      "PARENT MANAGEMENT TRAINING and behavioral therapy",
      "Punishment-based approaches",
      "Ignoring behaviors"
    ]
  },
  443: {
    question: "A patient on haloperidol develops acute neck stiffness and torticollis. What is the immediate treatment?",
    options: [
      "Increase antipsychotic",
      "BENZTROPINE (Cogentin) IM - anticholinergic for acute dystonia",
      "SSRI",
      "Mood stabilizer"
    ]
  },
  444: {
    question: "A patient using kava kava for anxiety asks what side effects to watch for. What is the PRIMARY education point?",
    options: [
      "Weight changes",
      "HEPATOTOXICITY (FDA warning for liver damage)",
      "Renal effects",
      "Cardiac effects"
    ]
  },
  445: {
    question: "A patient taking kava kava is prescribed medication for anxiety. Which medication should be AVOIDED?",
    options: [
      "Antibiotics",
      "BENZODIAZEPINES (additive CNS depression)",
      "Antihypertensives",
      "Antihistamines"
    ]
  },
  446: {
    question: "A child is admitted to the inpatient unit. Parents express concerns about managing behavior after discharge. When should parent training BEGIN?",
    options: [
      "At discharge",
      "START ON ADMISSION (allows practice before discharge)",
      "After discharge",
      "Only if requested"
    ]
  },
  447: {
    question: "A PMHNP is evaluating risk factors for a patient with antisocial personality disorder. What is this population at increased risk for?",
    options: [
      "Anxiety disorders",
      "HIGH RISK for violence and homicide",
      "Psychosis",
      "Depression primarily"
    ]
  },
  448: {
    question: "A PMHNP asks a patient to subtract 7 from 100 repeatedly. This tests which cognitive function?",
    options: [
      "Memory recall",
      "CONCENTRATION and attention",
      "Language comprehension",
      "Judgment"
    ]
  },
  449: {
    question: "A patient with HIV and CD4 count of 180 presents with slowed thinking and memory problems. What are the EARLY signs of HIV-associated dementia?",
    options: [
      "Memory loss only",
      "CONCENTRATION problems and slowed processing (subcortical pattern)",
      "Hallucinations",
      "Delusions"
    ]
  },
  450: {
    question: "An elderly patient with depression performs poorly on cognitive testing but frequently says 'I don't know.' What distinguishes pseudodementia from true dementia?",
    options: [
      "Progressive, irreversible decline",
      "REVERSIBLE with treatment of underlying depression",
      "Consistent cognitive deficits",
      "No treatment response"
    ]
  },
  451: {
    question: "A PMHNP is assessing suicide risk. Which demographic profile has the HIGHEST risk for completed suicide?",
    options: [
      "Young female",
      "65+ year-old WHITE MALE, single or widowed",
      "Married middle-aged man",
      "Adolescent female"
    ]
  },
  452: {
    question: "An adolescent is newly diagnosed with bipolar disorder. What is the FIRST intervention priority?",
    options: [
      "Start medication immediately",
      "EDUCATE patient and parents about illness, medications, warning signs",
      "Immediate hospitalization",
      "Psychotherapy only"
    ]
  },
  453: {
    question: "A patient in the office suddenly discloses being raped. What is the FIRST response the PMHNP should provide?",
    options: [
      "Call police immediately",
      "REASSURE safety - 'You are in a safe place'",
      "Continue routine appointment",
      "Immediate ER referral"
    ]
  },
  454: {
    question: "A researcher is reviewing pediatric antidepressant trials. What accounts for the discrepancy between child and adult response rates?",
    options: [
      "Children respond better than adults",
      "Children have HIGHER PLACEBO RESPONSE rates (up to 50%)",
      "Same response rates",
      "Children respond worse due to metabolism"
    ]
  },
  455: {
    question: "A PMHNP is teaching about the neurobiological basis of EPS. Which dopamine pathway is involved?",
    options: [
      "Mesocortical pathway",
      "NIGROSTRIATAL pathway (substantia nigra to basal ganglia)",
      "Mesolimbic pathway",
      "Tuberoinfundibular pathway"
    ]
  },
  456: {
    question: "A PMHNP suspects thought disorder in a patient with schizophrenia. What assessment technique should be used?",
    options: [
      "Increase medication first",
      "PROVERB INTERPRETATION to assess abstract thinking",
      "Hospitalization",
      "Change medication"
    ]
  },
  457: {
    question: "A child becomes fearful and worried about dying 2 weeks after a shooting incident near their home. What is the MOST likely diagnosis?",
    options: [
      "PTSD (requires >1 month)",
      "ACUTE STRESS DISORDER (3 days to 1 month after trauma)",
      "Generalized anxiety disorder",
      "Specific phobia"
    ]
  },
  458: {
    question: "A 4-year-old child reports seeing monsters in dreams and wakes up frightened. How should the PMHNP interpret this?",
    options: [
      "Psychotic symptoms requiring evaluation",
      "NORMAL developmental phenomenon",
      "PTSD symptoms",
      "Anxiety disorder"
    ]
  },
  459: {
    question: "A child wakes up screaming at night but cannot be consoled and has no memory of the event. The PMHNP asks about family history. What is the rationale?",
    options: [
      "Assess for nightmares",
      "PARASOMNIAS (sleep terrors, sleepwalking) run in families",
      "Rule out seizures",
      "Screen for trauma"
    ]
  },
  460: {
    question: "A veteran returns from Afghanistan after losing a close friend. He feels sad when remembering but functions well. What is the appropriate approach?",
    options: [
      "Diagnose PTSD",
      "SUPPORTIVE THERAPY and encourage return to normal activities (normal grief)",
      "Diagnose major depression",
      "Start antidepressants"
    ]
  },
  461: {
    question: "A patient presents 3 weeks after receiving a herpes diagnosis, reporting significant distress about the diagnosis. What is the MOST likely diagnosis?",
    options: [
      "PTSD",
      "ADJUSTMENT DISORDER (stressor identified, within 3 months)",
      "Acute stress disorder",
      "GAD"
    ]
  },
  462: {
    question: "A nurse was attacked by a patient 3 weeks ago and is now fearful of returning to work. What is the diagnosis?",
    options: [
      "PTSD (requires >1 month)",
      "ACUTE STRESS DISORDER (3 days to 1 month after trauma)",
      "GAD",
      "Specific phobia"
    ]
  },
  463: {
    question: "A patient with anorexia nervosa has a BMI of 14.5 and bradycardia. What level of care is indicated?",
    options: [
      "Outpatient treatment",
      "INPATIENT hospitalization (BMI <15 + medical instability)",
      "Partial hospitalization",
      "Weekly therapy"
    ]
  },
  464: {
    question: "An elderly patient with cognitive complaints frequently responds 'I don't know' during testing and shows inconsistent deficits. What should the PMHNP suspect?",
    options: [
      "Alzheimer's dementia",
      "Vascular dementia",
      "PSEUDODEMENTIA (depression-related, reversible)",
      "Lewy body dementia"
    ]
  },
  465: {
    question: "A patient develops acute dystonia with neck stiffness after starting an antipsychotic. What medication provides rapid relief?",
    options: [
      "Lorazepam",
      "Diphenhydramine or Benztropine (anticholinergics)",
      "Another antipsychotic",
      "Haloperidol"
    ]
  },
  466: {
    question: "A patient using kava kava asks about drug interactions. Which medication is CONTRAINDICATED with kava?",
    options: [
      "SSRIs",
      "Antipsychotics",
      "Mood stabilizers",
      "BENZODIAZEPINES (additive CNS depression)"
    ]
  },
  467: {
    question: "A patient taking kava kava asks what to monitor. What is the PRIMARY concern?",
    options: [
      "Weight changes",
      "HEPATOTOXICITY (FDA warning for liver damage)",
      "Cardiac effects",
      "Renal function"
    ]
  },
  468: {
    question: "A patient with fibromyalgia asks why benzodiazepines are not recommended. What should the PMHNP explain?",
    options: [
      "Effective but expensive",
      "Effective short-term only",
      "AVOID benzodiazepines - worsen fatigue, cause dependence; use SNRIs/TCAs",
      "Only effective with other medications"
    ]
  },
  469: {
    question: "A man describes his deceased wife as 'perfect' and 'an angel.' Which defense mechanism is operating?",
    options: [
      "Projection",
      "IDEALIZATION (viewing deceased as all-good)",
      "Displacement",
      "Denial"
    ]
  },
  470: {
    question: "A patient on risperidone requires metabolic monitoring. What measurement specifically assesses for central obesity?",
    options: [
      "Blood glucose alone",
      "BMI calculation",
      "WAIST-TO-HIP circumference ratio",
      "Lipid panel"
    ]
  },
  471: {
    question: "A patient on lithium is taking meloxicam (Mobic) for arthritis. What intervention is needed?",
    options: [
      "Switch mood stabilizer",
      "DECREASE lithium dose (NSAIDs reduce lithium clearance)",
      "Increase lithium dose",
      "No change needed"
    ]
  },
  472: {
    question: "A patient on long-term metoclopramide (Reglan) develops involuntary facial movements. What complication has occurred?",
    options: [
      "NMS",
      "Akathisia only",
      "TARDIVE DYSKINESIA (Reglan has FDA Black Box Warning)",
      "Serotonin syndrome"
    ]
  },
  473: {
    question: "A PMHNP asks a patient to perform serial 7s (100-7=93-7=86...). What cognitive domain is being assessed?",
    options: [
      "Memory",
      "CONCENTRATION AND ATTENTION",
      "Orientation",
      "Language"
    ]
  },
  474: {
    question: "A PMHNP suspects thought disorder and wants to assess abstract thinking. What assessment technique is appropriate?",
    options: [
      "Memory testing",
      "Calculation tasks",
      "PROVERB INTERPRETATION",
      "Orientation questions"
    ]
  },
  475: {
    question: "Parents of a child with ODD ask how to prevent progression to conduct disorder. What is the evidence-based intervention?",
    options: [
      "Medication alone",
      "Strict punishment",
      "PARENT MANAGEMENT TRAINING and behavioral therapy",
      "Ignoring all behaviors"
    ]
  },
  477: {
    question: "A patient with alcohol use disorder AND liver disease is in withdrawal. Which benzodiazepine is preferred?",
    options: [
      "Diazepam",
      "Chlordiazepoxide",
      "Alprazolam",
      "LORAZEPAM (Ativan) - metabolized by glucuronidation, safer in hepatic impairment"
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
console.log(`Batch 12 complete: Rewrote ${updateCount} questions to clinical vignette format`);
