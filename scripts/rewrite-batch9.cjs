const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 9: Questions 293-340 - Pharmacology, Assessment, Various Topics
const rewrites = {
  293: {
    question: "During a home visit to assess an overweight child, the PMHNP observes uncooked chicken left on the counter and the mother giving the child ice cream. What should be assessed?",
    options: [
      "Food preferences only",
      "Understanding of nutrition and food safety practices",
      "Financial status only",
      "Cultural practices only"
    ]
  },
  294: {
    question: "A patient on a TCA complains of constipation. The PMHNP explains that anticholinergic medications affect GI motility. Which medication class SLOWS gastric motility?",
    options: [
      "Metoclopramide (increases motility)",
      "Anticholinergics (slow motility by blocking acetylcholine)",
      "Proton pump inhibitors",
      "H2 blockers"
    ]
  },
  295: {
    question: "A patient on olanzapine announces she is enrolling in a smoking cessation program. The PMHNP knows smoking affects olanzapine levels. What adjustment may be needed?",
    options: [
      "Increase olanzapine dose when patient quits smoking",
      "DECREASE olanzapine dose by 25-50% when patient quits (smoking induces CYP1A2)",
      "No dose adjustment needed",
      "Switch to different antipsychotic"
    ]
  },
  296: {
    question: "A PMHNP is prescribing sertraline to a 78-year-old patient. What electrolyte abnormality should be monitored, especially in elderly patients on SSRIs?",
    options: [
      "Hyperkalemia",
      "Hyponatremia (SIADH is common in elderly on SSRIs)",
      "Hyperglycemia",
      "Hyperlipidemia"
    ]
  },
  297: {
    question: "A 16-year-old female is being treated with valproic acid for bipolar disorder. She has a boyfriend and is sexually active. What TEST is essential?",
    options: [
      "Thyroid function tests",
      "Pregnancy test (HCG) - valproate is highly teratogenic",
      "Vitamin D levels",
      "Lipid panel"
    ]
  },
  298: {
    question: "A PMHNP is opening a new outpatient psychiatric practice. What should be the PRIMARY focus?",
    options: [
      "Marketing and advertising strategy",
      "Patient and family outcomes and quality of care",
      "Profit maximization",
      "Rapid expansion plans"
    ]
  },
  299: {
    question: "When assessing a neonate in the nursery, the PMHNP prioritizes one assessment over others. What is MOST important to assess in a newborn?",
    options: [
      "Primitive reflexes",
      "Family history of substance use (for neonatal abstinence syndrome risk)",
      "Growth parameters only",
      "Hearing screening first"
    ]
  },
  300: {
    question: "A PMHNP is submitting a claim to Medicare for a patient visit. What coding system is required to identify services provided?",
    options: [
      "Social security number",
      "CPT codes (Current Procedural Terminology)",
      "NPI number only",
      "Tax identification number"
    ]
  },
  301: {
    question: "During a neurological exam, the PMHNP asks the patient to puff out his cheeks. Which cranial nerve is being tested?",
    options: [
      "Trigeminal (CN V - mastication)",
      "Facial (CN VII - facial expressions)",
      "Glossopharyngeal (CN IX)",
      "Hypoglossal (CN XII)"
    ]
  },
  302: {
    question: "A PMHNP is reviewing epidemiological data on mood disorders among Hispanic populations. Research indicates which groups have higher rates of mood disorders?",
    options: [
      "Mexican and Central American populations",
      "Puerto Rican and Dominican populations",
      "Cuban and Colombian populations",
      "All Hispanic groups have equal rates"
    ]
  },
  303: {
    question: "A patient asks if gabapentin could help her depression. She is currently taking it for neuropathic pain. Which condition is gabapentin NOT indicated for?",
    options: [
      "Epilepsy (FDA approved)",
      "Depression (not effective for depression)",
      "Neuropathic pain (off-label but common)",
      "Hot flashes (off-label)"
    ]
  },
  304: {
    question: "A nursing student asks the PMHNP how gabapentin produces its calming effect. Which neurotransmitter system does gabapentin primarily affect?",
    options: [
      "Serotonin",
      "GABA (enhances GABAergic activity)",
      "Dopamine",
      "Norepinephrine"
    ]
  },
  305: {
    question: "A patient with diabetes and depression is on sertraline. The PMHNP orders routine labs including a reticulocyte count. What is the rationale for checking reticulocytes?",
    options: [
      "To assess for infection",
      "To evaluate for bone marrow suppression or aplastic anemia",
      "To monitor diabetes control",
      "To check liver function"
    ]
  },
  306: {
    question: "A patient on iron supplementation for anemia reports taking it with her morning coffee and antacid. What should the PMHNP advise?",
    options: [
      "Continue current regimen",
      "Caffeine and antacids DECREASE iron absorption; take separately",
      "Increase iron dose",
      "Switch to IV iron"
    ]
  },
  307: {
    question: "A patient is prescribed ciprofloxacin for a urinary tract infection. The PMHNP reviews the FDA Black Box warnings. Which serious adverse effect is associated with fluoroquinolones?",
    options: [
      "Minor GI upset only",
      "Tendon rupture (especially Achilles tendon)",
      "Mild headache",
      "Temporary insomnia"
    ]
  },
  308: {
    question: "A mother asks if it's safe to give her 6-year-old child tetracycline for an infection. What adverse effect makes tetracyclines contraindicated in young children?",
    options: [
      "Growth retardation",
      "Permanent teeth discoloration (contraindicated under age 8)",
      "Bone deformities",
      "Liver damage"
    ]
  },
  309: {
    question: "A patient with fatigue, weight gain, and depression has a TSH of 8.5 mU/L. The PMHNP recognizes the need for treatment. What is Synthroid (levothyroxine) used for?",
    options: [
      "Hyperthyroidism",
      "Osteoporosis",
      "Hypothyroidism (thyroid hormone replacement)",
      "Diabetes"
    ]
  },
  310: {
    question: "A PMHNP is evaluating a new depression screening tool. The test correctly identifies 95% of patients who actually have depression. This statistic describes which test characteristic?",
    options: [
      "Specificity",
      "Positive predictive value",
      "Sensitivity (true positive rate)",
      "Negative predictive value"
    ]
  },
  311: {
    question: "A PMHNP is evaluating a female patient with short stature, webbed neck, and primary amenorrhea. Genetic testing reveals 45,XO. Which genetic syndrome is this?",
    options: [
      "Down syndrome (trisomy 21)",
      "Klinefelter syndrome (47,XXY)",
      "Turner syndrome (45,XO - females with ovarian failure)",
      "Triple X syndrome"
    ]
  },
  312: {
    question: "A patient on haloperidol develops fever of 104°F, severe muscle rigidity, altered mental status, and elevated CK. What syndrome should the PMHNP suspect?",
    options: [
      "Hypotension syndrome",
      "Neuroleptic Malignant Syndrome (fever, rigidity, autonomic instability, elevated CK)",
      "Mild extrapyramidal symptoms",
      "Common medication side effects"
    ]
  },
  313: {
    question: "A patient with NMS is transferred to the ICU. The antipsychotic has been discontinued. What pharmacological treatment is indicated for NMS?",
    options: [
      "Resume antipsychotic at lower dose",
      "Dantrolene (muscle relaxant) and/or bromocriptine (dopamine agonist)",
      "Increase antipsychotic dose",
      "SSRIs"
    ]
  },
  314: {
    question: "A patient on sertraline and tramadol develops fever, agitation, tremor, hyperreflexia, and diaphoresis. What syndrome should the PMHNP suspect?",
    options: [
      "Hypothermia and bradycardia (not consistent)",
      "Serotonin syndrome (hyperthermia, tachycardia, hyperreflexia, agitation)",
      "Lead-pipe rigidity and mutism",
      "Hypotension and sedation"
    ]
  },
  315: {
    question: "A patient scores 22 on the MMSE. The PMHNP interprets this score. What severity of cognitive impairment does a score of 18-23 indicate?",
    options: [
      "Severe impairment (0-9)",
      "Moderate impairment (10-17)",
      "Mild impairment (18-23)",
      "Normal cognition (24-30)"
    ]
  },
  316: {
    question: "A patient completes the Beck Depression Inventory-II and scores 25. What severity does this indicate using standard cutoffs?",
    options: [
      "Minimal depression (0-13)",
      "Mild depression (14-19)",
      "Moderate depression (20-28)",
      "Severe depression (29-63)"
    ]
  },
  317: {
    question: "A PMHNP administers the HAM-D to assess treatment response. The patient scores 20. What severity level does this clinician-administered scale indicate?",
    options: [
      "Normal/remission (0-7)",
      "Mild depression (8-13)",
      "Moderate depression (14-18)",
      "Severe depression (19-22)"
    ]
  },
  318: {
    question: "A patient in therapy has met treatment goals, shows improved coping skills, and functions well independently. The PMHNP considers termination. What indicates readiness for termination?",
    options: [
      "Patient becomes more dependent on therapist",
      "Patient shows no progress",
      "Patient demonstrates progress, goal achievement, and ability to function independently",
      "Patient requests more frequent sessions"
    ]
  },
  319: {
    question: "A school counselor calls about a student who made suicidal statements. The PMHNP consults on suicide risk assessment. What should a comprehensive school-based suicide assessment include?",
    options: [
      "Asking only about suicidal thoughts",
      "Assessment of ideation, plan, means, intent, risk/protective factors, and behavioral changes",
      "Family history only",
      "Peer relationships only"
    ]
  },
  320: {
    question: "During a psychiatric interview, the patient becomes silent and stops responding. What is the appropriate therapeutic response?",
    options: [
      "End the interview immediately",
      "Use therapeutic silence; allow space for processing before gently exploring",
      "Fill the silence by talking more",
      "Immediately change topics"
    ]
  },
  321: {
    question: "A PMHNP is conducting couples therapy. One partner arrives alone and angrily complains about the absent partner. What should the PMHNP do?",
    options: [
      "Continue therapy with the present partner",
      "Reschedule for when both partners can attend",
      "Side with the present partner",
      "Terminate therapy"
    ]
  },
  322: {
    question: "A patient with alcohol use disorder has presented to the ED three times this month. The PMHNP needs to coordinate care. Who should be consulted?",
    options: [
      "Primary care physician only",
      "Case management and discharge planning team for care coordination",
      "Social work only",
      "Psychiatry consultation only"
    ]
  },
  326: {
    question: "A patient on carbamazepine is prescribed erythromycin for a respiratory infection. The PMHNP is concerned about a drug interaction. What effect will erythromycin have on carbamazepine levels?",
    options: [
      "Decrease carbamazepine levels",
      "INCREASE carbamazepine levels (erythromycin inhibits CYP3A4) causing toxicity",
      "No interaction expected",
      "Only affects erythromycin levels"
    ]
  },
  327: {
    question: "A patient started on sertraline 3 weeks ago reports persistent nausea and headache. How should the PMHNP manage these side effects?",
    options: [
      "Discontinue sertraline immediately",
      "Evaluate severity; early side effects often resolve; consider dose adjustment or switch if severe",
      "Double the dose",
      "Add an additional SSRI"
    ]
  },
  328: {
    question: "A 5-year-old child recently experienced parental divorce. He has decreased appetite without weight loss and seems less interested in activities. He can attend to tasks when engaged. What is the MOST likely diagnosis?",
    options: [
      "Major Depressive Disorder",
      "Adjustment disorder with depressed mood",
      "ADHD",
      "Oppositional Defiant Disorder"
    ]
  },
  329: {
    question: "A patient on risperidone develops NMS with fever, rigidity, and CK of 15,000. The antipsychotic has been stopped. What monitoring and treatment is indicated?",
    options: [
      "Resume antipsychotic at lower dose",
      "Monitor CK and WBC; give dantrolene and/or bromocriptine; supportive care",
      "Add an SSRI",
      "Start lithium"
    ]
  },
  330: {
    question: "A PMHNP learns about a new regulation affecting prescriptive authority. This regulation was passed by the state legislature. What type of law is this?",
    options: [
      "Hospital policy",
      "State statute (law passed by state legislature)",
      "Federal regulation",
      "Professional guideline"
    ]
  },
  331: {
    question: "A non-English speaking patient has been waiting for hours in the psychiatric ED. The PMHNP obtains an interpreter to communicate with him. This approach exemplifies which care principle?",
    options: [
      "Cultural assessment completion",
      "Patient-centered care (ensuring communication and understanding)",
      "Efficiency optimization",
      "Standard documentation"
    ]
  },
  332: {
    question: "A patient with heart failure and depression asks why she was started on lisinopril. What is the PRIMARY indication for ACE inhibitors?",
    options: [
      "Diabetes management",
      "Heart failure (first-line treatment)",
      "Hyperlipidemia",
      "Kidney disease only"
    ]
  },
  333: {
    question: "A PMHNP leads a quality improvement initiative and motivates staff through inspiration and modeling exemplary behavior. What leadership style does this describe?",
    options: [
      "Authoritarian leadership",
      "Transformational leadership (inspires through example and innovation)",
      "Transactional leadership",
      "Laissez-faire leadership"
    ]
  },
  334: {
    question: "A PMHNP is explaining the recovery model to a patient's family. What is the PRIMARY focus of the recovery model in mental health?",
    options: [
      "Complete symptom elimination",
      "Patient empowerment, hope, and self-determination toward meaningful life",
      "Hospitalization prevention",
      "Medication cure"
    ]
  },
  335: {
    question: "A patient with frontotemporal dementia exhibits social disinhibition and personality changes but relatively preserved memory. What deficits are characteristic of frontal lobe involvement?",
    options: [
      "Memory impairment as primary feature",
      "Social skills deficits and personality changes",
      "Visual processing deficits",
      "Motor function impairment only"
    ]
  },
  336: {
    question: "A PMHNP is starting work at a new psychiatric clinic. The administrator asks about the practice focus. What should be the PRIMARY focus?",
    options: [
      "Revenue generation",
      "Patient and family-centered care and outcomes",
      "Administrative efficiency",
      "Marketing strategies"
    ]
  },
  337: {
    question: "A PMHNP is reviewing evidence to develop a treatment protocol. What represents the HIGHEST level of evidence in the evidence hierarchy?",
    options: [
      "Expert opinion (lowest level)",
      "Systematic reviews and meta-analyses of RCTs (highest level)",
      "Case studies",
      "Cohort studies"
    ]
  },
  338: {
    question: "A PMHNP is assessing developmental milestones in a 2-year-old child. What social development skill is expected at this age?",
    options: [
      "Writing letters",
      "Parallel play and beginning peer interactions",
      "Abstract thinking",
      "Formal logical reasoning"
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
console.log(`Batch 9 complete: Rewrote ${updateCount} questions to clinical vignette format`);
