const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Batch 10: Questions 339-400 - Risk Assessment, Monitoring, Ethics, Various
const rewrites = {
  339: {
    question: "A PMHNP is reviewing suicide risk factors across age groups. Which population has the HIGHEST suicide completion rate?",
    options: [
      "Adolescents under 18 years old",
      "Elderly white males in assisted living facilities",
      "Young adults 25-35 years old",
      "Middle-aged adults 40-50 years old"
    ]
  },
  340: {
    question: "A child with dyspraxia (developmental coordination disorder) is referred for evaluation. Which activity would this child have the MOST difficulty performing?",
    options: [
      "Self-dressing with practice",
      "Coordinating complex motor planning tasks",
      "Self-feeding with adaptive utensils",
      "Walking independently"
    ]
  },
  341: {
    question: "A patient on lithium has a TSH of 8.2 mU/L and complains of fatigue and cold intolerance. What thyroid condition does lithium commonly cause?",
    options: [
      "Hypothyroidism with INCREASED TSH (most common)",
      "Hyperthyroidism with decreased TSH",
      "Normal thyroid function",
      "Variable thyroid effects"
    ]
  },
  342: {
    question: "A PMHNP works in a clinic where mental health and primary care providers share space and collaborate on patient care. This model is called:",
    options: [
      "Consultation-liaison psychiatry",
      "Integrated care (different from coordinated care with separate settings)",
      "Standard specialty referral",
      "Emergency psychiatry"
    ]
  },
  343: {
    question: "A PMHNP is billing for services and must distinguish between time spent with the patient versus documentation time. What are these called?",
    options: [
      "Beneficence vs. justice",
      "Direct care (face-to-face) versus indirect care (documentation, coordination)",
      "Clinical vs. administrative time",
      "Productive vs. nonproductive time"
    ]
  },
  344: {
    question: "A PMHNP is asked to define standard of care during a deposition. What is the BEST definition?",
    options: [
      "Personal preference of the provider",
      "Level of treatment a reasonably competent provider would deliver based on professional guidelines",
      "What the insurance company approves",
      "Local practice patterns only"
    ]
  },
  345: {
    question: "A researcher notes that bipolar treatment efficacy studies in children differ from adult studies. What accounts for this discrepancy?",
    options: [
      "Different diagnostic criteria",
      "Mood stabilizers less studied in pediatric populations; adult data extrapolated",
      "Children respond better to treatment",
      "No discrepancy exists"
    ]
  },
  346: {
    question: "A 28-year-old woman with bipolar disorder on lithium is planning pregnancy. What is the FIRST laboratory test to order?",
    options: [
      "Complete blood count",
      "Pregnancy test (HCG) - lithium is teratogenic (Ebstein's anomaly)",
      "Liver function tests",
      "Thyroid function tests"
    ]
  },
  347: {
    question: "A teenage girl with bipolar disorder is on valproate (Depakote). She has a boyfriend. What laboratory test is MOST important?",
    options: [
      "Complete blood count",
      "Pregnancy test - valproate is highly teratogenic (neural tube defects)",
      "Kidney function tests",
      "Lipid panel"
    ]
  },
  348: {
    question: "A PMHNP is starting a stimulant for ADHD in a child. The mother reports a family history of sudden cardiac death. What cardiac workup is indicated?",
    options: [
      "No cardiac workup needed",
      "EKG screening for family history of cardiovascular disease or sudden death",
      "Echocardiogram for all children",
      "Stress test before starting"
    ]
  },
  349: {
    question: "A PMHNP is reviewing evidence for bipolar medication adherence interventions. What represents the HIGHEST level of evidence?",
    options: [
      "Expert opinion",
      "Systematic review and meta-analysis of adherence studies",
      "Single case study",
      "Descriptive survey"
    ]
  },
  350: {
    question: "A 75-year-old patient presents with depression, fatigue, weight gain, and cold intolerance. Labs show elevated TSH. What condition is causing the depressive symptoms?",
    options: [
      "Primary depression",
      "Hypothyroidism (elevated TSH causes depression-like symptoms)",
      "Medication side effect",
      "Normal aging"
    ]
  },
  351: {
    question: "A patient on long-term haloperidol develops involuntary lip-smacking, tongue protrusion, and finger movements. What condition is this?",
    options: [
      "Parkinson's disease tremor",
      "Tardive dyskinesia (involuntary repetitive movements from chronic dopamine blockade)",
      "Acute dystonia",
      "Essential tremor"
    ]
  },
  352: {
    question: "A PMHNP is prescribing ziprasidone (Geodon) to a patient. What monitoring is REQUIRED due to cardiac risk?",
    options: [
      "No cardiac monitoring needed",
      "EKG monitoring for QTc prolongation",
      "Blood pressure only",
      "Weight monitoring only"
    ]
  },
  353: {
    question: "A patient develops depression after starting prednisone for an autoimmune condition. Which medications are known to cause depression?",
    options: [
      "Antibiotics only",
      "Steroids, isotretinoin (Accutane), interferon, beta-blockers",
      "Antipsychotics only",
      "Vitamins and supplements"
    ]
  },
  354: {
    question: "A patient with type 2 diabetes and depression asks about first-line diabetes medication. What is first-line pharmacotherapy for type 2 diabetes?",
    options: [
      "Insulin",
      "Metformin",
      "Sulfonylureas",
      "DPP-4 inhibitors"
    ]
  },
  355: {
    question: "A patient with bipolar disorder becomes manic after starting prednisone. Which medications are known to INDUCE mania?",
    options: [
      "Lithium and antipsychotics",
      "Steroids, antidepressants, isoniazid (INH), disulfiram (SAID mnemonic)",
      "Benzodiazepines",
      "Mood stabilizers"
    ]
  },
  356: {
    question: "A PMHNP is evaluating a patient who is suspicious, mistrustful, and socially isolated. She interprets benign remarks as threatening. Which personality disorder CLUSTER does this describe?",
    options: [
      "Cluster B (dramatic, emotional)",
      "Cluster A (odd, eccentric - includes paranoid, schizoid, schizotypal)",
      "Cluster C (anxious, fearful)",
      "Not a personality disorder"
    ]
  },
  357: {
    question: "A patient presents with grandiosity, need for admiration, and lack of empathy. Which personality disorder CLUSTER includes narcissistic personality disorder?",
    options: [
      "Cluster A (odd, eccentric)",
      "Cluster B (dramatic, emotional - includes narcissistic, borderline, histrionic, antisocial)",
      "Cluster C (anxious, fearful)",
      "Not classified in clusters"
    ]
  },
  358: {
    question: "A patient is extremely fearful of rejection, desires social connection but avoids it, and is easily hurt by criticism. Which personality disorder CLUSTER does this describe?",
    options: [
      "Cluster A (odd, eccentric)",
      "Cluster B (dramatic, emotional)",
      "Cluster C (anxious, fearful - includes avoidant, dependent, OCPD)",
      "Not a personality disorder"
    ]
  },
  359: {
    question: "A patient on clozapine has an ANC of 900/mm³. What is the appropriate action?",
    options: [
      "Continue clozapine at same dose",
      "DISCONTINUE clozapine (ANC <1000 requires discontinuation)",
      "No monitoring needed",
      "Increase clozapine dose"
    ]
  },
  361: {
    question: "An 80-year-old white male living alone expresses hopelessness. He has access to firearms. What suicide prevention intervention is MOST critical?",
    options: [
      "Prescribe antidepressants only",
      "Lethal means restriction (secure or remove firearms), safety planning, frequent follow-up",
      "Hospitalize all elderly with depression",
      "Weekly therapy only"
    ]
  },
  362: {
    question: "A PMHNP is working to reduce mental health stigma in the community. What intervention is effective for stigma reduction?",
    options: [
      "Avoiding discussion of mental illness",
      "Support groups and community education programs",
      "Isolating patients from community",
      "Medication-only approach"
    ]
  },
  363: {
    question: "A patient on an SSRI asks about osteoporosis prevention. What lifestyle modifications should the PMHNP recommend?",
    options: [
      "Bed rest to prevent falls",
      "Weight-bearing exercise and limiting caffeine",
      "High-protein diet only",
      "Calcium supplements without exercise"
    ]
  },
  364: {
    question: "A PMHNP is educating an elderly patient starting sertraline. Besides medication education, what lifestyle advice is important?",
    options: [
      "Limit all activity",
      "Regular exercise benefits mood; limit caffeine; do not stop medication abruptly",
      "Increase caffeine intake",
      "No lifestyle changes needed"
    ]
  },
  365: {
    question: "A parent asks when adolescents should be screened for ADHD. What screening recommendation should the PMHNP provide?",
    options: [
      "Screen all adolescents routinely",
      "Screen adolescents at risk (academic/behavioral problems, family history); educate parents",
      "No screening needed in adolescence",
      "Only screen if failing all classes"
    ]
  },
  369: {
    question: "A PMHNP opening a private practice must calculate time for patient care versus administrative tasks. What are these time categories called?",
    options: [
      "Revenue vs expense time",
      "Direct (patient care) versus indirect (administrative) processes",
      "Clinical vs billing time",
      "Productive vs nonproductive hours"
    ]
  },
  370: {
    question: "A PMHNP is planning community mental health education. What is the MOST effective way to disseminate information to a diverse community?",
    options: [
      "Medical journal publication",
      "Community meetings with representatives from various cultural groups",
      "Social media only",
      "Professional conferences"
    ]
  },
  371: {
    question: "A PMHNP is testifying under oath. The patient's attorney advises withholding information about missed appointments. Which ethical principle guides the PMHNP's response?",
    options: [
      "Confidentiality only",
      "Personal and professional integrity (truthful testimony required under oath)",
      "Patient advocacy",
      "Legal immunity"
    ]
  },
  372: {
    question: "A patient asks about using kava kava supplements for anxiety. What is the PRIMARY safety concern the PMHNP should discuss?",
    options: [
      "Addiction potential",
      "Hepatotoxicity (liver damage) requiring LFT monitoring",
      "Serotonin syndrome risk",
      "Cardiovascular effects"
    ]
  },
  373: {
    question: "A PMHNP works in a rural area where minority populations have limited access to mental health care. What is the NP's ethical responsibility?",
    options: [
      "Accept the status quo",
      "Advocate through lobbying, media awareness, and community education",
      "Focus only on current patients",
      "Refer elsewhere"
    ]
  },
  374: {
    question: "A 9-year-old is brought in for severe irritability, temper outbursts occurring daily, and persistent anger between outbursts for over a year. This began at age 7. What is the MOST likely diagnosis?",
    options: [
      "Oppositional Defiant Disorder",
      "Disruptive Mood Dysregulation Disorder (DMDD - chronic irritability with outbursts)",
      "Bipolar disorder",
      "Intermittent Explosive Disorder"
    ]
  },
  375: {
    question: "A PMHNP is evaluating economic viability for starting a consulting practice. Which financial analysis shows revenue versus expenses?",
    options: [
      "Business plan narrative",
      "Income statement/profit and loss analysis",
      "Market research survey",
      "SWOT analysis"
    ]
  },
  376: {
    question: "A patient with severe persistent mental illness needs intensive community-based support including housing, employment, and 24/7 crisis services. What treatment model provides this?",
    options: [
      "Standard outpatient care",
      "Assertive Community Treatment (ACT)",
      "Group therapy only",
      "Inpatient treatment"
    ]
  },
  377: {
    question: "A PMHNP is using an organizational change approach that focuses on identifying what works well rather than problems. What approach is this?",
    options: [
      "Problem-focused analysis",
      "Appreciative inquiry (focuses on strengths and competencies)",
      "Root cause analysis",
      "Deficit-based assessment"
    ]
  },
  378: {
    question: "A hospital implements a system where medical errors are analyzed for learning rather than punishment. This distinguishes human error from reckless behavior. What culture is this?",
    options: [
      "Punitive culture",
      "Just culture (learning from experience)",
      "Blame culture",
      "Hierarchical culture"
    ]
  },
  381: {
    question: "A PMHNP's electronic health record documentation is subpoenaed for court. How is the validity of EHR documentation proven?",
    options: [
      "Verbal testimony from provider",
      "Electronic/authorization signature with time-stamp",
      "Witness confirmation only",
      "Printed copies only"
    ]
  },
  382: {
    question: "A patient tells the PMHNP he plans to kill his ex-girlfriend. The PMHNP must act based on which legal precedent?",
    options: [
      "HIPAA regulations",
      "Right to treatment laws",
      "Tarasoff duty to warn (must warn identifiable potential victim)",
      "Informed consent requirements"
    ]
  },
  383: {
    question: "A PMHNP discusses medication risks and benefits with a patient, then sends the prescription to pharmacy without obtaining signature. What did the PMHNP omit?",
    options: [
      "Nothing - discussion is sufficient",
      "Documentation only",
      "Signed informed consent form",
      "Second provider consultation"
    ]
  },
  384: {
    question: "A patient brings internet printouts about symptoms and medications to the visit. How should the PMHNP respond?",
    options: [
      "Discourage internet research entirely",
      "Recommend only .gov websites",
      "Review information together and verify accuracy with clinical judgment",
      "Dismiss the patient's concerns"
    ]
  },
  385: {
    question: "A patient on risperidone needs metabolic monitoring. What parameters should the PMHNP assess?",
    options: [
      "Blood sugar only",
      "Waist circumference, BMI, lipids, glucose, and blood pressure",
      "Weight only",
      "Liver function only"
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
console.log(`Batch 10 complete: Rewrote ${updateCount} questions to clinical vignette format`);
