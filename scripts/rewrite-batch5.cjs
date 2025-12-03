const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 5: Questions 131-170 - Ethics, Cultural Competence, Pediatrics, Crisis
const rewrites = {
  131: {
    question: "A newly licensed PMHNP relocating from New York to Texas asks about scope of practice differences. The preceptor explains that NP scope of practice varies by state. Which statement BEST describes this variation?",
    options: [
      "Same as physicians in all states",
      "Ranges from full practice authority to restricted practice requiring supervision",
      "Always requires physician supervision",
      "No prescriptive authority in any state"
    ]
  },
  132: {
    question: "A PMHNP is establishing a new practice and needs to prescribe controlled substances for patients with ADHD and anxiety. What is required to prescribe controlled substances?",
    options: [
      "Cannot prescribe any controlled substances",
      "DEA registration with state-specific schedule limitations",
      "Only non-controlled medications allowed",
      "Physician must be present for all prescriptions"
    ]
  },
  133: {
    question: "A PMHNP wants to provide telepsychiatry services to patients in rural areas of a neighboring state. What regulatory requirements must be met for telepsychiatry?",
    options: [
      "No special requirements beyond standard licensure",
      "Licensure in patient's state, HIPAA-compliant platform, and informed consent",
      "Can only treat patients in provider's home state",
      "Physician oversight required for all telehealth visits"
    ]
  },
  134: {
    question: "A PMHNP is developing a treatment protocol for treatment-resistant depression. When reviewing the literature for evidence-based recommendations, which represents the HIGHEST level of evidence?",
    options: [
      "Expert opinion from leading psychiatrists",
      "Published case studies and case series",
      "Systematic reviews and meta-analyses of randomized controlled trials",
      "A single well-designed randomized controlled trial"
    ]
  },
  135: {
    question: "A nursing student asks the PMHNP preceptor to explain evidence-based practice. Which response BEST describes EBP?",
    options: [
      "Following research findings exclusively",
      "Integrating best research evidence with clinical expertise and patient values",
      "Adhering strictly to institutional protocols",
      "Basing decisions on patient preferences alone"
    ]
  },
  136: {
    question: "A PMHNP discovers she administered 20mg of escitalopram instead of the prescribed 10mg to a patient. The patient appears stable. What is the FIRST priority action?",
    options: [
      "Document the error after the shift ends",
      "Assess the patient, report immediately, notify the provider, and document",
      "Wait to see if the patient develops symptoms",
      "Ignore since the patient appears unharmed"
    ]
  },
  137: {
    question: "During a quality improvement meeting, the hospital reports that a psychiatric inpatient died by suicide on the unit. This event is classified as which type of occurrence?",
    options: [
      "Minor medication error",
      "Sentinel event requiring root cause analysis",
      "Near miss incident",
      "Routine patient complaint"
    ]
  },
  138: {
    question: "A PMHNP receives feedback from a peer review committee regarding her documentation practices. She is upset about the criticism. What is the PRIMARY purpose of the peer review process?",
    options: [
      "Disciplinary action against clinicians",
      "Quality improvement and professional development",
      "Comparison between providers for rankings",
      "Identifying clinicians for termination"
    ]
  },
  139: {
    question: "A patient with schizophrenia and diabetes is receiving care from a PMHNP, primary care physician, endocrinologist, and case manager. This care delivery model describes which approach?",
    options: [
      "Independent practice model",
      "Collaborative/interprofessional practice for patient-centered care",
      "Nursing-only care coordination",
      "Physician-directed care without NP input"
    ]
  },
  140: {
    question: "A PMHNP is explaining the role of the psychiatric case manager to a patient being discharged after a psychiatric hospitalization. Which description BEST describes the case manager's role?",
    options: [
      "Provides direct medication management",
      "Coordinates care, links to resources, and provides advocacy",
      "Prescribes psychiatric medications",
      "Completes insurance billing only"
    ]
  },
  143: {
    question: "A PMHNP is conducting a suicide risk assessment and considers demographic risk factors. Which population has the HIGHEST rate of suicide completion?",
    options: [
      "Adolescent females aged 15-19",
      "White males in midlife and older adults",
      "Elderly females over age 75",
      "Young adult males aged 18-25"
    ]
  },
  144: {
    question: "A 16-year-old patient who identifies as transgender presents with depression and social withdrawal. The PMHNP understands what about LGBTQ+ youth mental health?",
    options: [
      "Risk is equivalent to the general population",
      "Higher rates of depression, anxiety, and suicide attempts; need affirming care",
      "Lower risk due to supportive peer communities",
      "No specific considerations needed"
    ]
  },
  145: {
    question: "A PMHNP is implementing trauma-informed care principles in a community mental health center. Which statement BEST describes this approach?",
    options: [
      "Applies only to patients with PTSD diagnosis",
      "Recognizes trauma's widespread impact; emphasizes safety, trust, and empowerment",
      "Requires patients to disclose all trauma details",
      "Focuses on avoiding all discussion of past experiences"
    ]
  },
  147: {
    question: "A PMHNP is prescribing sertraline 25mg for an 82-year-old patient with depression. The patient's daughter asks why the dose is lower than her own. Which principle guides geriatric psychopharmacology?",
    options: [
      "Use standard adult doses for consistency",
      "Start low, go slow due to altered pharmacokinetics and increased sensitivity",
      "Avoid all psychiatric medications in elderly",
      "Always use maximum doses for faster efficacy"
    ]
  },
  148: {
    question: "A 28-year-old woman with bipolar II disorder discovers she is pregnant at 8 weeks gestation. She is currently taking valproate and lamotrigine. What is the MOST important consideration?",
    options: [
      "Immediately discontinue all psychiatric medications",
      "Assess risks vs. benefits of each medication; consider safer alternatives",
      "Continue all medications without changes",
      "Psychiatric medications are never safe during pregnancy"
    ]
  },
  149: {
    question: "A PMHNP is counseling a woman with bipolar disorder who is planning pregnancy. She asks about mood stabilizer risks. Which medication poses the HIGHEST risk for neural tube defects?",
    options: [
      "Lithium (cardiac risk)",
      "Valproic acid (spina bifida risk)",
      "Lamotrigine (relatively safe)",
      "Carbamazepine (moderate risk)"
    ]
  },
  150: {
    question: "A woman with bipolar II disorder becomes pregnant while on mood stabilizer therapy. The PMHNP considers medication changes. Which mood stabilizer is considered SAFEST during pregnancy?",
    options: [
      "Lithium",
      "Valproic acid",
      "Lamotrigine",
      "Carbamazepine"
    ]
  },
  151: {
    question: "An 8-year-old is diagnosed with ADHD and the PMHNP plans to start methylphenidate. Before initiating stimulant therapy, which assessment is ESSENTIAL?",
    options: [
      "No specific assessments required",
      "Cardiac history, family history of sudden death, baseline vital signs",
      "Intelligence testing only",
      "Academic performance review only"
    ]
  },
  152: {
    question: "A 7-year-old presents with hyperactivity, impulsivity, and difficulty focusing in school. After comprehensive evaluation confirms ADHD, what is the first-line pharmacological treatment?",
    options: [
      "Antipsychotics (risperidone)",
      "Stimulants (methylphenidate or amphetamines)",
      "Antidepressants (fluoxetine)",
      "Anxiolytics (buspirone)"
    ]
  },
  153: {
    question: "A 10-year-old child presents with excessive worry about school performance, physical symptoms including stomachaches, and difficulty sleeping for the past 8 months. After diagnosing generalized anxiety disorder, what is the first-line medication?",
    options: [
      "Benzodiazepines (lorazepam)",
      "SSRIs (sertraline or fluoxetine)",
      "Antipsychotics (quetiapine)",
      "Beta-blockers (propranolol)"
    ]
  },
  154: {
    question: "A 14-year-old presents with depressed mood, anhedonia, sleep disturbance, and declining grades for 3 months. After confirming major depressive disorder, what is the first-line medication?",
    options: [
      "Tricyclic antidepressants",
      "SSRIs (fluoxetine or escitalopram)",
      "MAOIs",
      "Benzodiazepines"
    ]
  },
  155: {
    question: "A patient is brought to the emergency department by police after being found wandering in traffic and making statements about 'ending it all.' What is the FIRST priority in crisis intervention?",
    options: [
      "Medication administration",
      "Comprehensive safety assessment",
      "Initiating psychotherapy",
      "Discharge planning"
    ]
  },
  157: {
    question: "A patient tells the PMHNP, 'I've been thinking about death a lot lately.' Another patient states, 'I have a plan to overdose on my medications tonight.' The PMHNP must differentiate between these presentations. What is the KEY distinction?",
    options: [
      "Both represent equal risk",
      "Ideation involves thoughts; intent involves a plan and determination to act",
      "Intent is less serious than ideation",
      "Both always require hospitalization"
    ]
  },
  158: {
    question: "A PMHNP is assessing a patient who reports suicidal ideation. The patient states she cannot act on these thoughts because she has young children who need her. What does this represent?",
    options: [
      "Risk factor for suicide",
      "Protective factor (reason for living)",
      "Indication for immediate hospitalization",
      "Evidence of psychosis"
    ]
  },
  159: {
    question: "A patient is being discharged from inpatient psychiatry after a suicide attempt. The treatment team schedules follow-up for 3 weeks later. The PMHNP expresses concern about this plan. What is the rationale?",
    options: [
      "Suicide risk is eliminated after hospitalization",
      "First week post-discharge, especially first 24-48 hours, is highest risk period",
      "Patients don't need follow-up after hospitalization",
      "Risk is same as general population after discharge"
    ]
  },
  161: {
    question: "A patient in the psychiatric unit is agitated but calms down after verbal de-escalation and PRN medication. Later, a nurse asks when restraints would be appropriate. What is the correct indication?",
    options: [
      "When staff are short-staffed",
      "Only when imminent danger exists AND less restrictive interventions have failed",
      "For patient punishment when rules are broken",
      "Whenever the patient is being difficult"
    ]
  },
  162: {
    question: "A patient has been placed in physical restraints due to violent behavior toward staff. What monitoring is REQUIRED while the patient is restrained?",
    options: [
      "Hourly checks are sufficient",
      "Q15 minute checks, offer hydration/toileting, MD evaluation within 1 hour",
      "No monitoring required if patient is calm",
      "Only monitor if patient requests it"
    ]
  },
  164: {
    question: "A PMHNP is evaluating two patients for involuntary commitment. Patient A expresses passive suicidal ideation. Patient B has no suicidal thoughts but has not eaten in 5 days due to paranoid delusions that food is poisoned. The PMHNP considers the difference between danger to self and gravely disabled. Which statement is correct?",
    options: [
      "Both terms mean the same thing",
      "Danger to self involves suicide/self-harm risk; gravely disabled means inability to meet basic needs",
      "Gravely disabled is less serious than danger to self",
      "Neither can justify involuntary commitment"
    ]
  },
  165: {
    question: "A PMHNP works in a primary care clinic where she sees patients for depression and anxiety alongside their medical providers. This practice model is called:",
    options: [
      "Specialty mental health care",
      "Stand-alone psychiatric practice",
      "Integrated/collaborative care",
      "Consultation-liaison psychiatry"
    ]
  },
  166: {
    question: "A 55-year-old woman presents with fatigue, weight gain, depressed mood, and difficulty concentrating. Before diagnosing major depressive disorder, the PMHNP should rule out which medical conditions?",
    options: [
      "No medical workup needed",
      "Hypothyroidism, anemia, vitamin deficiencies, and chronic illness",
      "Only diabetes",
      "Only cardiac disease"
    ]
  },
  167: {
    question: "A 45-year-old patient presents with palpitations, trembling, and feeling of impending doom. Physical exam reveals tachycardia and tremor. Before diagnosing anxiety disorder, which medical conditions should be ruled out?",
    options: [
      "No medical evaluation needed",
      "Hyperthyroidism, cardiac arrhythmias, hypoglycemia, and stimulant use",
      "Only pulmonary conditions",
      "Only neurological conditions"
    ]
  },
  168: {
    question: "A 42-year-old patient presents with depressed mood, anhedonia, and fatigue for 4 weeks. Before initiating antidepressant therapy, which laboratory tests should the PMHNP order?",
    options: [
      "No labs needed for psychiatric diagnosis",
      "TSH, CBC, CMP, Vitamin D, and B12",
      "TSH only",
      "CBC only"
    ]
  },
  169: {
    question: "A PMHNP is presenting a case conceptualization of a patient with depression to colleagues. She describes the patient's genetic vulnerability, cognitive distortions, and recent job loss. Which theoretical framework guides this comprehensive approach?",
    options: [
      "Biological model only",
      "Biopsychosocial model",
      "Psychodynamic model only",
      "Social determinants model only"
    ]
  },
  170: {
    question: "A PMHNP at a community health center provides naloxone kits and education to patients with opioid use disorder, even those not ready for treatment. This approach represents which philosophy?",
    options: [
      "Abstinence-only treatment",
      "Harm reduction",
      "Enabling substance use",
      "Punitive intervention"
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
console.log(`Batch 5 complete: Rewrote ${updateCount} questions to clinical vignette format`);
