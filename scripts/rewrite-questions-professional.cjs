const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Comprehensive question rewrites to ANCC exam format
const questionRewrites = {
  // Q388: "Know that ACE inhibitors treat CHF"
  388: {
    question: "A PMHNP is reviewing medications for a patient with comorbid depression and congestive heart failure (CHF). Which medication class is considered first-line for CHF management?",
    options: [
      "ACE inhibitors",
      "Beta-blockers only",
      "Calcium channel blockers",
      "Thiazide diuretics only"
    ],
    correctAnswer: 0
  },

  // Q395: "Know serotonin syndrome symptoms, treatment, and NMS labs"
  395: {
    question: "A patient on multiple serotonergic medications presents with hyperthermia, hyperreflexia, and agitation. Which finding would help differentiate serotonin syndrome from neuroleptic malignant syndrome (NMS)?",
    options: [
      "Elevated creatine kinase (CK)",
      "Clonus and hyperreflexia",
      "Muscle rigidity",
      "Leukocytosis"
    ],
    correctAnswer: 1
  },

  // Q403: "Know the part of brain responsible for impulsivity in ADHD"
  403: {
    question: "A PMHNP is explaining the neurobiological basis of ADHD to a parent. Which brain region is primarily associated with the executive dysfunction and impulsivity seen in ADHD?",
    options: [
      "Hippocampus",
      "Prefrontal cortex/Orbitofrontal region",
      "Amygdala",
      "Cerebellum"
    ],
    correctAnswer: 1
  },

  // Q405: "Question on autistic child not following instruction"
  405: {
    question: "A 6-year-old with autism spectrum disorder has difficulty imitating others and understanding social cues. Which brain system dysfunction is theorized to contribute to these deficits?",
    options: [
      "Frontal lobe motor cortex",
      "Mirror neuron system",
      "Temporal lobe auditory cortex",
      "Occipital lobe visual cortex"
    ],
    correctAnswer: 1
  },

  // Q406: "Question about osteoporosis prevention"
  406: {
    question: "A PMHNP is counseling a postmenopausal patient on an SSRI about bone health. Which intervention is MOST effective for osteoporosis prevention?",
    options: [
      "Calcium supplementation alone",
      "Weight-bearing exercise and smoking cessation",
      "Medication therapy only",
      "Vitamin D supplementation alone"
    ],
    correctAnswer: 1
  },

  // Q407: Clock drawing - already good but let's make it clearer
  407: {
    question: "The clock drawing test assesses function of which brain regions?",
    options: [
      "Left hemisphere language areas only",
      "Right hemisphere (visuospatial) and dorsolateral prefrontal cortex (executive function)",
      "Frontal motor cortex only",
      "Parietal sensory cortex only"
    ],
    correctAnswer: 1
  },

  // Q408: "Question on dissemination"
  408: {
    question: "A PMHNP has completed a quality improvement project and wants to share findings with the broader healthcare community. Which dissemination method provides the HIGHEST level of credibility?",
    options: [
      "Social media platforms",
      "Peer-reviewed journal publication",
      "Local newspaper article",
      "Conference presentation only"
    ],
    correctAnswer: 1
  },

  // Q409: "Know meta-analyses and levels of evidence"
  409: {
    question: "When developing evidence-based practice guidelines, which level of evidence is considered HIGHEST in the research hierarchy?",
    options: [
      "Case reports and expert opinion",
      "Meta-analyses and systematic reviews of randomized controlled trials",
      "Single randomized controlled trial",
      "Cohort studies"
    ],
    correctAnswer: 1
  },

  // Q410: "Question about pregnant patient - birth defect"
  410: {
    question: "A PMHNP is reviewing medications for a newly pregnant patient. Which medication is classified as Category X and MUST be discontinued immediately due to high teratogenic risk?",
    options: [
      "Acetaminophen",
      "Isotretinoin (Accutane)",
      "Prenatal vitamins",
      "Folic acid"
    ],
    correctAnswer: 1
  },

  // Q424: "Question on Desmopressin"
  424: {
    question: "A PMHNP has prescribed desmopressin (DDAVP) for a child with enuresis. Which response from the mother BEST indicates understanding of medication administration?",
    options: [
      "\"I will give it with a full glass of water at bedtime\"",
      "\"I will restrict fluids in the evening and give the medication before bed\"",
      "\"I will give it in the morning with breakfast\"",
      "\"I will give it whenever my child has an accident\""
    ],
    correctAnswer: 1
  },

  // Q427: "Know brain parts - Executive function"
  427: {
    question: "During a neuropsychological consultation, the PMHNP explains that a patient's difficulty with planning, decision-making, and working memory is related to dysfunction in which brain structure?",
    options: [
      "Hippocampus",
      "Dorsolateral prefrontal cortex",
      "Amygdala",
      "Cerebellum"
    ],
    correctAnswer: 1
  },

  // Q428: "Know what part of brain controls aggression"
  428: {
    question: "A PMHNP is educating staff about the neurobiology of aggression. Which brain structure is the primary center for processing fear and threat responses that can lead to aggressive behavior?",
    options: [
      "Frontal lobe",
      "Amygdala",
      "Parietal lobe",
      "Occipital lobe"
    ],
    correctAnswer: 1
  },

  // Q436: "Know MMSE - Difference between thought process and content"
  436: {
    question: "When documenting a mental status examination, how does the PMHNP differentiate between thought process and thought content?",
    options: [
      "They are the same component of the MSE",
      "Process describes HOW thoughts flow; content describes WHAT thoughts are about",
      "There is no clinical difference",
      "Only thought content is documented in the MSE"
    ],
    correctAnswer: 1
  },

  // Q437: "Know where to document suicidal ideation on MSE"
  437: {
    question: "A patient reports thoughts of wanting to end their life. In which section of the mental status examination should the PMHNP document this finding?",
    options: [
      "Mood and affect",
      "Thought content",
      "Thought process",
      "Behavior and psychomotor activity"
    ],
    correctAnswer: 1
  },

  // Q442: ODD to CD prevention - already fixed in earlier script

  // Q458-459: Sleep questions - already addressed

  // Q476: "Question about which therapy for PTSD"
  476: {
    question: "A veteran with combat-related PTSD asks about evidence-based therapy options. Which therapeutic modalities are recommended as first-line treatments per VA/DoD clinical practice guidelines?",
    options: [
      "Supportive therapy only",
      "EMDR, Prolonged Exposure (PE), and Cognitive Processing Therapy (CPT)",
      "Psychodynamic therapy only",
      "Medication management without therapy"
    ],
    correctAnswer: 1
  },

  // Q480: "Know you" - completely broken question
  480: {
    question: "When conducting a mental status examination, the PMHNP must distinguish between thought process and thought content. Which statement accurately describes this distinction?",
    options: [
      "Thought process and content are interchangeable terms",
      "Thought process refers to speed only",
      "Thought content includes only mood",
      "Thought process describes organization of thinking; thought content describes the themes and subjects of thoughts"
    ],
    correctAnswer: 3
  },

  // Q481: "You are giving a patient Tegretol and erythromycin"
  481: {
    question: "A patient stabilized on carbamazepine (Tegretol) is prescribed erythromycin for a respiratory infection. Which action should the PMHNP take?",
    options: [
      "Decrease the carbamazepine dose due to CYP3A4 inhibition by erythromycin",
      "Monitor carbamazepine levels only without dose adjustment",
      "Increase carbamazepine due to expected decreased levels",
      "Discontinue carbamazepine during antibiotic treatment"
    ],
    correctAnswer: 0
  },

  // Q482: "Know Appreciative inquiry"
  482: {
    question: "A healthcare organization is implementing a quality improvement initiative using appreciative inquiry. Which statement BEST describes this approach?",
    options: [
      "It emphasizes medication compliance monitoring",
      "It targets symptom reduction as the primary goal",
      "It focuses on identifying deficits and problems to fix",
      "It focuses on strengths, hope, and building on successes without blame"
    ],
    correctAnswer: 3
  },

  // Q483: "Know Recovery model"
  483: {
    question: "A PMHNP is implementing recovery-oriented care for a patient with schizophrenia. Which principle is MOST central to the recovery model?",
    options: [
      "Primary focus on symptom reduction and elimination",
      "Providing hope and supporting self-determination for a meaningful life",
      "Strict emphasis on medication compliance",
      "Focus on patient deficits and limitations"
    ],
    correctAnswer: 1
  },

  // Q484: "Know what different parts of the brain does"
  484: {
    question: "A PMHNP is explaining neuroanatomy to a student. Which brain region is correctly paired with its PRIMARY function?",
    options: [
      "Dorsolateral prefrontal cortex - executive function and working memory",
      "Anterior cingulate cortex - visual processing",
      "Posterior parietal cortex - emotional regulation",
      "Ventromedial prefrontal cortex - motor coordination"
    ],
    correctAnswer: 0
  },

  // Q485: "Therapy that uses movement"
  485: {
    question: "A patient with PTSD asks about a therapy that uses bilateral stimulation, including eye movements, to process traumatic memories. Which therapy is the patient describing?",
    options: [
      "Cognitive Behavioral Therapy (CBT)",
      "Dialectical Behavior Therapy (DBT)",
      "Eye Movement Desensitization and Reprocessing (EMDR)",
      "Psychodynamic therapy"
    ],
    correctAnswer: 2
  },

  // Q486: "Lamictal is the ideal medication..."
  486: {
    question: "A patient with bipolar disorder expresses concern about weight gain from mood stabilizers. Which mood stabilizer is considered weight-neutral and may be the BEST option for this patient?",
    options: [
      "Lithium",
      "Valproate (Depakote)",
      "Lamotrigine (Lamictal)",
      "Olanzapine"
    ],
    correctAnswer: 2
  },

  // Q487: "Question on family therapy"
  487: {
    question: "A PMHNP is using Bowen family systems therapy. Which concepts are CENTRAL to this therapeutic approach?",
    options: [
      "Behavioral reinforcement and extinction",
      "Triangulation and self-differentiation",
      "Dream interpretation and free association",
      "Exposure and response prevention"
    ],
    correctAnswer: 1
  },

  // Q488: "Question about how to prevent osteoporosis"
  488: {
    question: "A PMHNP is providing health promotion counseling to a patient on long-term antipsychotic therapy. Which interventions are MOST important for osteoporosis prevention?",
    options: [
      "Bed rest to prevent falls",
      "Calcium intake only",
      "Avoiding all physical activity",
      "Weight-bearing exercise and smoking cessation"
    ],
    correctAnswer: 3
  },

  // Q489: Clock drawing - already addressed

  // Q490: "Question on dissemination there are options like peer review"
  490: {
    question: "A PMHNP wants to disseminate research findings with the highest level of scientific credibility. Which method should be prioritized?",
    options: [
      "Press release to media",
      "Personal blog",
      "Social media post",
      "Peer-reviewed journal publication"
    ],
    correctAnswer: 3
  },

  // Q491: "Question about pregnant patient - birth defect"
  491: {
    question: "A PMHNP is conducting a medication reconciliation for a patient who just learned she is pregnant. Which medication poses the HIGHEST teratogenic risk and requires immediate discontinuation?",
    options: [
      "Prenatal vitamins",
      "Low-dose aspirin",
      "Isotretinoin (Accutane)",
      "Acetaminophen"
    ],
    correctAnswer: 2
  },

  // Q492: "Question on a child who is on amphetamine and develops tics"
  492: {
    question: "A 9-year-old patient with ADHD on amphetamine salts develops motor tics. Which medication should the PMHNP consider switching to?",
    options: [
      "Methylphenidate (Ritalin)",
      "Higher dose amphetamine",
      "Lisdexamfetamine (Vyvanse)",
      "Guanfacine (Intuniv)"
    ],
    correctAnswer: 3
  },

  // Q493: "Question about a depressed lady who has marital conflicts..."
  493: {
    question: "A 35-year-old woman presents with depression related to marital conflicts and requests time-limited therapy (3-6 months). Which therapeutic approach is MOST appropriate?",
    options: [
      "Long-term psychoanalysis",
      "Interpersonal therapy (IPT)",
      "Prolonged exposure therapy",
      "Medication management only"
    ],
    correctAnswer: 1
  },

  // Q494: "Question on Desmopressin" (duplicate)
  494: {
    question: "A child with primary nocturnal enuresis has been prescribed desmopressin. Which statement by the parent indicates correct understanding of the medication regimen?",
    options: [
      "\"I will encourage extra fluids at bedtime\"",
      "\"My child should restrict fluids for 1 hour before and 8 hours after taking the medication\"",
      "\"I will give it in the morning\"",
      "\"This medication will cure the bedwetting permanently\""
    ],
    correctAnswer: 1
  },

  // Q464: "Question about pseudo dementia"
  464: {
    question: "An elderly patient presents with cognitive complaints, but testing reveals inconsistent deficits and the patient frequently responds \"I don't know\" to questions. Which condition should the PMHNP consider?",
    options: [
      "Alzheimer's dementia",
      "Vascular dementia",
      "Pseudodementia (depression-related cognitive impairment)",
      "Lewy body dementia"
    ],
    correctAnswer: 2
  }
};

let updateCount = 0;
data.forEach(q => {
  if (questionRewrites[q.id]) {
    const rewrite = questionRewrites[q.id];
    q.question = rewrite.question;
    if (rewrite.options) {
      q.options = rewrite.options;
    }
    if (rewrite.correctAnswer !== undefined) {
      q.correctAnswer = rewrite.correctAnswer;
    }
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Professional question rewrites complete: Updated ${updateCount} questions`);
console.log('Questions now formatted to ANCC exam standards with clinical vignettes');
