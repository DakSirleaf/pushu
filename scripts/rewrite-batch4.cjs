const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 4: Questions 101-150 - DSM Criteria, Ethics, Legal
const rewrites = {
  101: {
    question: "A patient reports depressed mood and difficulty sleeping after a job loss 6 weeks ago. The PMHNP must differentiate between adjustment disorder and major depression. What is the KEY distinguishing feature of adjustment disorder?",
    options: [
      "More severe symptoms",
      "Identifiable stressor with symptom onset within 3 months",
      "Requires 2 weeks of symptoms",
      "No distinguishing features"
    ]
  },
  102: {
    question: "A 78-year-old patient is brought to the ED by family who report she was 'fine yesterday but confused today.' The PMHNP must differentiate delirium from dementia. Which description is accurate?",
    options: [
      "Both have identical presentations",
      "Delirium is acute and fluctuating; dementia is gradual and progressive",
      "Delirium is chronic; dementia is acute",
      "Delirium is irreversible; dementia is reversible"
    ]
  },
  103: {
    question: "A patient in the ICU is disoriented, cannot maintain attention, and has waxing and waning consciousness. What is the hallmark feature of this condition?",
    options: [
      "Memory loss alone",
      "Inattention and fluctuating consciousness",
      "Personality changes only",
      "Apathy without other symptoms"
    ]
  },
  104: {
    question: "A family brings their father for evaluation of progressive forgetfulness over the past 2 years. He forgets recent events but remembers the distant past. What is the hallmark feature of dementia?",
    options: [
      "Acute inattention",
      "Progressive memory impairment",
      "Hallucinations",
      "Sudden agitation"
    ]
  },
  105: {
    question: "A patient presents with pervasive distrust of others, interpreting benign remarks as threatening. She has no close friends and bears grudges. Which personality disorder cluster includes this presentation?",
    options: [
      "Cluster A (Paranoid, Schizoid, Schizotypal)",
      "Cluster B (Antisocial, Borderline, Histrionic, Narcissistic)",
      "Cluster C (Avoidant, Dependent, OCPD)",
      "None of the above"
    ]
  },
  106: {
    question: "A patient presents with impulsive self-harm behaviors, chronic emptiness, and tumultuous relationships marked by idealization then devaluation. Which personality disorder cluster includes this presentation?",
    options: [
      "Cluster A",
      "Cluster B (Antisocial, Borderline, Histrionic, Narcissistic)",
      "Cluster C",
      "None of the above"
    ]
  },
  107: {
    question: "A patient is extremely anxious about social situations, fears rejection, but desperately wants relationships. He also defers all decisions to others due to fear of being alone. Which cluster includes Avoidant, Dependent, and OCPD?",
    options: [
      "Cluster A",
      "Cluster B",
      "Cluster C (Anxious/Fearful)",
      "None of the above"
    ]
  },
  108: {
    question: "When evaluating a patient with borderline personality disorder who reports chaotic relationships and chronic emptiness, which historical factor is MOST important to assess?",
    options: [
      "Family history of schizophrenia",
      "History of childhood trauma or sexual abuse",
      "Recent substance use only",
      "Sleep patterns only"
    ]
  },
  109: {
    question: "A 30-year-old male with antisocial personality disorder reports heavy alcohol use. Research indicates which substance use disorder is MOST commonly comorbid with antisocial PD?",
    options: [
      "Cannabis use disorder",
      "Opioid use disorder",
      "Alcohol use disorder",
      "Stimulant use disorder"
    ]
  },
  110: {
    question: "A patient presents to the ED with sudden onset chest tightness, palpitations, diaphoresis, and fear of dying. Symptoms peak in 10 minutes then gradually resolve. What is the MOST likely diagnosis?",
    options: [
      "Acute myocardial infarction",
      "Panic attack",
      "Generalized anxiety disorder",
      "Agoraphobia"
    ]
  },
  111: {
    question: "A patient avoids shopping malls, public transportation, and being in crowds because she fears being unable to escape if she has a panic attack. What is this condition called?",
    options: [
      "Specific phobia",
      "Agoraphobia",
      "Social anxiety disorder",
      "Generalized anxiety"
    ]
  },
  112: {
    question: "A patient avoids public speaking, eating in front of others, and meeting new people due to fear of embarrassment or negative judgment. What condition does this describe?",
    options: [
      "Agoraphobia",
      "Social anxiety disorder",
      "Specific phobia",
      "Generalized worry"
    ]
  },
  113: {
    question: "A patient with intrusive thoughts about contamination spends 4 hours daily washing hands to relieve anxiety. Another patient organizes everything perfectly because 'it's the right way to do things.' What distinguishes OCD from OCPD?",
    options: [
      "No clinical difference",
      "OCD has ego-dystonic obsessions/compulsions; OCPD has ego-syntonic perfectionism",
      "OCPD is more severe",
      "OCD is a personality disorder"
    ]
  },
  114: {
    question: "A patient with schizophrenia has flat affect, rarely speaks, has no motivation, and no longer enjoys activities. Which symptom category do these represent?",
    options: [
      "Positive symptoms (hallucinations, delusions)",
      "Negative symptoms (deficits)",
      "Aggressive symptoms",
      "Paranoid symptoms"
    ]
  },
  115: {
    question: "A patient with schizophrenia reports auditory hallucinations, believes the FBI is monitoring him, and has disorganized speech. Which symptom category do these represent?",
    options: [
      "Negative symptoms",
      "Positive symptoms (additions to normal functioning)",
      "Cognitive symptoms",
      "Mood symptoms"
    ]
  },
  116: {
    question: "A patient has had auditory hallucinations, paranoid delusions, and social withdrawal for 8 months. For a diagnosis of schizophrenia, what is the minimum total duration of symptoms required?",
    options: [
      "1 month",
      "3 months",
      "6 months",
      "1 year"
    ]
  },
  117: {
    question: "A patient developed paranoid delusions and auditory hallucinations 2 weeks ago following the sudden death of a family member. Symptoms are resolving. If duration is less than 1 month, what is the diagnosis?",
    options: [
      "Brief psychotic disorder",
      "Schizophreniform disorder",
      "Schizophrenia",
      "Schizoaffective disorder"
    ]
  },
  118: {
    question: "A patient has had psychotic symptoms (delusions, hallucinations, disorganized speech) for 4 months. Symptoms have not resolved. What is the appropriate diagnosis?",
    options: [
      "Brief psychotic disorder (<1 month)",
      "Schizophreniform disorder (1-6 months)",
      "Schizophrenia (>6 months)",
      "Delusional disorder"
    ]
  },
  119: {
    question: "A patient was hospitalized last year for a week-long episode of decreased need for sleep, grandiosity, pressured speech, and risky spending. She has also had depressive episodes. What is the diagnosis?",
    options: [
      "Major depressive disorder",
      "Bipolar I disorder (requires at least one manic episode)",
      "Bipolar II disorder",
      "Cyclothymia"
    ]
  },
  120: {
    question: "A patient reports several 4-5 day episodes of increased energy, decreased sleep, and elevated mood that did not require hospitalization. She also has recurrent depressive episodes. What is the diagnosis?",
    options: [
      "Bipolar I disorder",
      "Bipolar II disorder (hypomania + depression, no full mania)",
      "Major depressive disorder",
      "Cyclothymia"
    ]
  },
  121: {
    question: "A patient tells his PMHNP that he plans to kill his ex-girlfriend next week and describes a specific plan. What is the PMHNP's legal obligation under Tarasoff?",
    options: [
      "Maintain confidentiality",
      "Warn the identified potential victim and notify authorities",
      "Wait until harm occurs",
      "Only document the threat"
    ]
  },
  122: {
    question: "A PMHNP is reviewing situations that require breaking patient confidentiality. Under what circumstances is disclosure legally permitted or required?",
    options: [
      "Never break confidentiality",
      "Danger to self/others, child/elder abuse, valid court order, patient consent",
      "Any time the clinician prefers",
      "Only with family permission"
    ]
  },
  123: {
    question: "A PMHNP is starting a patient on a new medication. What elements must be included for valid informed consent?",
    options: [
      "Patient signature on a form only",
      "Patient understands risks, benefits, alternatives and voluntarily agrees",
      "Family agreement only",
      "Provider determines best option"
    ]
  },
  124: {
    question: "A 14-year-old presents alone requesting treatment for anxiety. The PMHNP reviews state law regarding minor consent for mental health treatment. At what age can minors typically consent (varies by state)?",
    options: [
      "Ages 12-14 depending on state law",
      "Only at age 18",
      "Only at age 21",
      "Minors can never consent"
    ]
  },
  125: {
    question: "A family asks the PMHNP to determine if their elderly mother is 'competent' to manage her finances. The PMHNP clarifies the distinction between competence and capacity. Which statement is correct?",
    options: [
      "They mean the same thing",
      "Competence is a legal determination by court; capacity is a clinical assessment",
      "Capacity is legal; competence is clinical",
      "Both are determined by physicians"
    ]
  },
  126: {
    question: "A patient involuntarily committed to a psychiatric unit requests to challenge his commitment. He has a constitutional right to what legal protection?",
    options: [
      "Right to treatment",
      "Habeas corpus (right to court hearing to review commitment)",
      "Right to refuse all medications",
      "Automatic release after 24 hours"
    ]
  },
  127: {
    question: "A PMHNP is consulted about involuntary commitment for a patient with schizophrenia who is refusing treatment. What criteria must be met for involuntary commitment?",
    options: [
      "Mental illness alone is sufficient",
      "Mental illness AND danger to self/others or gravely disabled",
      "Family request is sufficient",
      "Homelessness alone"
    ]
  },
  128: {
    question: "A PMHNP is comparing voluntary and involuntary psychiatric admission. Which statement correctly describes voluntary admission?",
    options: [
      "Patient cannot leave once admitted",
      "Patient requests admission and can request discharge (with notice period)",
      "Court order required",
      "Same as involuntary"
    ]
  },
  129: {
    question: "A PMHNP is reviewing the ANA Code of Ethics before a presentation. What is the primary purpose of the Code of Ethics?",
    options: [
      "Legal requirements only",
      "Ethical framework guiding nursing practice (beneficence, autonomy, justice)",
      "Hospital policies",
      "Insurance billing guidelines"
    ]
  },
  130: {
    question: "A new graduate NP asks about scope of practice. What defines the scope of practice for nurse practitioners?",
    options: [
      "Federal law only",
      "State Nurse Practice Act, board of nursing regulations, and collaborative agreements",
      "Individual NP preference",
      "Hospital policy only"
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
console.log(`Batch 4 complete: Rewrote ${updateCount} questions to clinical vignette format`);
