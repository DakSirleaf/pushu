const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 3: Questions 71-120 - Therapy, Neuroscience, DSM Criteria
const rewrites = {
  71: {
    question: "A patient with borderline personality disorder reports chronic feelings of emptiness, unstable relationships, and recurrent self-harm. Which therapeutic approach is considered the gold standard treatment?",
    options: [
      "Cognitive Behavioral Therapy (CBT)",
      "Dialectical Behavior Therapy (DBT)",
      "Psychoanalysis",
      "Supportive therapy"
    ]
  },
  72: {
    question: "A veteran presents with nightmares, hypervigilance, and avoidance behaviors following combat deployment. Which therapeutic approach is evidence-based first-line treatment for PTSD?",
    options: [
      "Trauma-focused CBT with exposure therapy or EMDR",
      "Psychoanalysis",
      "Group therapy alone",
      "Supportive therapy only"
    ]
  },
  73: {
    question: "A PMHNP is conducting family therapy for a family whose teenage son has been acting out. The family has identified the son as 'the problem.' In family systems terms, what is this family member called?",
    options: [
      "The patient who requested therapy",
      "The identified patient (symptom bearer)",
      "The oldest family member",
      "The most cooperative family member"
    ]
  },
  74: {
    question: "A PMHNP is using CBT with a depressed patient who states, 'If I fail this test, my life is ruined.' This represents which CBT concept?",
    options: [
      "Memory impairment",
      "Cognitive distortion (catastrophizing)",
      "Hallucination",
      "Delusion"
    ]
  },
  75: {
    question: "A PMHNP is explaining DBT components to a patient newly diagnosed with borderline personality disorder. Which skills are taught in DBT?",
    options: [
      "Mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness",
      "Exposure and response prevention only",
      "Free association",
      "Dream analysis"
    ]
  },
  76: {
    question: "During supervision, a PMHNP notices she feels irritated by a patient who reminds her of her critical mother. The supervisor explains this is an example of which therapeutic phenomenon?",
    options: [
      "Transference (patient's feelings toward therapist)",
      "Countertransference (therapist's feelings toward patient)",
      "They are the same",
      "Neither occurs in therapy"
    ]
  },
  77: {
    question: "A PMHNP is working with a patient with alcohol use disorder who is ambivalent about quitting. Which therapeutic approach is MOST appropriate to enhance motivation for change?",
    options: [
      "Diagnostic assessment",
      "Motivational interviewing",
      "Intelligence testing",
      "Personality assessment"
    ]
  },
  78: {
    question: "A patient asks the PMHNP about a trauma therapy that uses eye movements to process traumatic memories. Which therapy uses this technique?",
    options: [
      "Eye Movement Desensitization and Reprocessing (EMDR)",
      "Emotional Management and Depression Recovery",
      "Evidence-based Medical Decision Review",
      "Electroconvulsive therapy"
    ]
  },
  79: {
    question: "A patient with agoraphobia has been avoiding leaving home. The PMHNP recommends gradually accompanying the patient to increasingly anxiety-provoking situations. What is the primary goal of this exposure therapy?",
    options: [
      "Complete avoidance of anxiety triggers",
      "Gradual habituation to reduce anxiety response",
      "Medication adjustment",
      "Dream interpretation"
    ]
  },
  80: {
    question: "A patient with OCD spends 4 hours daily washing her hands due to contamination fears. Which therapeutic approach is the gold standard for OCD?",
    options: [
      "Psychoanalysis",
      "Exposure and Response Prevention (ERP)",
      "Supportive therapy only",
      "Hypnotherapy"
    ]
  },
  81: {
    question: "A PMHNP is implementing a recovery-oriented approach with a patient with schizophrenia. Which principle BEST describes the recovery model?",
    options: [
      "Cure-focused approach emphasizing symptom elimination",
      "Patient empowerment, hope, and person-centered care",
      "Medication-only approach",
      "Institutional long-term care"
    ]
  },
  82: {
    question: "A PMHNP is training staff on trauma-informed care principles. Which core principles should be emphasized?",
    options: [
      "Safety, trustworthiness, peer support, collaboration, and empowerment",
      "Confrontation and challenging patient beliefs",
      "Requiring detailed trauma disclosure",
      "Punishment-based behavioral approaches"
    ]
  },
  83: {
    question: "A PMHNP notices she tends to respond immediately after patients finish speaking. Her supervisor recommends implementing which therapeutic technique to allow for patient processing?",
    options: [
      "Sessions limited to 10 seconds",
      "Waiting 10 seconds after patient speaks before responding",
      "Taking 10-second breaks hourly",
      "Limiting each question to 10 seconds"
    ]
  },
  84: {
    question: "A PMHNP is working with a patient from an unfamiliar cultural background. Which approach demonstrates cultural humility?",
    options: [
      "Assuming knowledge about the patient's culture from textbooks",
      "Engaging in lifelong self-reflection and learning FROM the patient about their culture",
      "Avoiding cultural topics to prevent offense",
      "Applying the same approach used with all patients"
    ]
  },
  85: {
    question: "A 10-year-old child is diagnosed with moderate OCD causing significant impairment. What is the first-line treatment approach for pediatric OCD?",
    options: [
      "Medication (SSRI) only",
      "CBT with Exposure and Response Prevention (ERP), with SSRI added for moderate-severe cases",
      "Immediate hospitalization",
      "Family therapy only"
    ]
  },
  86: {
    question: "A PMHNP is teaching a student about neuroanatomy. Which brain structure is responsible for executive functions such as planning, decision-making, and impulse control?",
    options: [
      "Amygdala",
      "Hippocampus",
      "Prefrontal cortex",
      "Cerebellum"
    ]
  },
  87: {
    question: "A patient with PTSD has exaggerated startle response and hypervigilance. Which brain structure is hyperactive in anxiety and fear-based disorders?",
    options: [
      "Prefrontal cortex",
      "Amygdala",
      "Hippocampus",
      "Thalamus"
    ]
  },
  88: {
    question: "A PMHNP is explaining to a family why their loved one with Alzheimer's disease has progressive memory loss. Which brain structure is primarily responsible for memory formation?",
    options: [
      "Amygdala",
      "Hippocampus",
      "Cerebellum",
      "Occipital lobe"
    ]
  },
  89: {
    question: "A patient had a stroke affecting the frontal lobe and now exhibits personality changes, disinhibition, and difficulty with planning. Which functions are localized to the frontal lobe?",
    options: [
      "Vision",
      "Executive function, motor control, speech production (Broca's area), and personality",
      "Hearing",
      "Balance"
    ]
  },
  90: {
    question: "A patient with a temporal lobe lesion has fluent but nonsensical speech and cannot comprehend spoken language. Which area is affected?",
    options: [
      "Visual processing area",
      "Wernicke's area (hearing, language comprehension, memory)",
      "Motor cortex",
      "Sensory cortex"
    ]
  },
  91: {
    question: "A patient with right parietal lobe damage ignores objects and people on his left side and cannot find his way around familiar places. Which functions are localized to the parietal lobe?",
    options: [
      "Vision",
      "Hearing",
      "Sensory processing, spatial awareness, and proprioception",
      "Motor control"
    ]
  },
  92: {
    question: "A patient with occipital lobe damage reports being unable to see despite intact eye function. Which function is localized to the occipital lobe?",
    options: [
      "Visual processing",
      "Hearing",
      "Motor control",
      "Memory"
    ]
  },
  93: {
    question: "A patient with chronic alcohol use presents with ataxia, unsteady gait, and difficulty with coordination. Which brain structure is affected?",
    options: [
      "Amygdala",
      "Hippocampus",
      "Cerebellum",
      "Frontal lobe"
    ]
  },
  94: {
    question: "A patient presents with resting tremor, bradykinesia, and rigidity. The PMHNP knows these symptoms result from deficiency of which neurotransmitter?",
    options: [
      "Serotonin",
      "Dopamine",
      "GABA",
      "Glutamate"
    ]
  },
  95: {
    question: "A PMHNP is explaining the pathophysiology of Alzheimer's disease to a family. Deficiency of which neurotransmitter is primarily involved?",
    options: [
      "Dopamine",
      "Serotonin",
      "Acetylcholine",
      "Norepinephrine"
    ]
  },
  96: {
    question: "A patient presents with 3 weeks of depressed mood, insomnia, and anhedonia. To meet DSM-5 criteria for Major Depressive Disorder, what is the minimum symptom duration required?",
    options: [
      "1 week",
      "2 weeks",
      "1 month",
      "6 months"
    ]
  },
  97: {
    question: "A patient has experienced persistent, excessive worry for the past 8 months, along with muscle tension, sleep disturbance, and irritability. To meet DSM-5 criteria for Generalized Anxiety Disorder, what is the minimum duration?",
    options: [
      "1 month",
      "3 months",
      "6 months",
      "12 months"
    ]
  },
  98: {
    question: "A veteran reports re-experiencing a traumatic event, avoidance behaviors, and hyperarousal for the past 6 weeks. To meet DSM-5 criteria for PTSD, what is the minimum symptom duration?",
    options: [
      "1 week",
      "2 weeks",
      "1 month",
      "6 months"
    ]
  },
  99: {
    question: "A patient developed depressed mood and difficulty concentrating after losing his job 2 months ago. Symptoms began within 3 months of the stressor. According to DSM-5, adjustment disorder symptoms must develop within how long after a stressor?",
    options: [
      "1 month",
      "3 months",
      "6 months",
      "1 year"
    ]
  },
  100: {
    question: "A patient reports 2 years of persistent, low-grade depressed mood. She has never been symptom-free for more than 2 months at a time. This presentation is consistent with which diagnosis?",
    options: [
      "Major Depressive Disorder",
      "Persistent Depressive Disorder (Dysthymia)",
      "Bipolar II Disorder",
      "Adjustment Disorder"
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
console.log(`Batch 3 complete: Rewrote ${updateCount} questions to clinical vignette format`);
