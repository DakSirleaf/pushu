const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  276: "Child with hip/turning pain: refer to hip specialist for Trendelenburg sign assessment. May indicate hip pathology (Legg-Calve-Perthes, slipped capital femoral epiphysis). Don't assume behavioral—rule out organic causes first.",

  277: "HIV-associated dementia: memory loss is FIRST symptom. Subcortical pattern (slowed processing, motor deficits). Occurs when CD4 <200. Rule out opportunistic CNS infections. ART may improve cognitive function.",

  278: "Child gym pain with turning: assess for hip pathology. Trendelenburg gait = hip abductor weakness (positive when pelvis drops on non-stance side). May indicate developmental hip dysplasia, Perthes disease, or SCFE.",

  279: "Mandatory reporting: child sexual abuse MUST be reported to CPS and police regardless of who discloses. This is NOT a confidentiality situation. Separate children for safety. Document objectively. Provide trauma-informed care.",

  280: "Pubertal gynecomastia: NORMAL in adolescent males (up to 65% experience it). Breast tissue growth from hormonal changes. Usually resolves within 2 years. Reassure patient. Only refer if persistent >2 years or painful.",

  281: "Inhaled corticosteroids (Qvar, Flovent): can cause mood changes, depression with long-term use. Also: montelukast (Singulair) has FDA Black Box Warning for neuropsychiatric effects including suicidal ideation. Monitor mood with asthma meds.",

  282: "Fluconazole (Diflucan) + quetiapine: fluconazole inhibits CYP3A4, INCREASING quetiapine levels → more sedation, orthostatic hypotension, QTc prolongation risk. Reduce quetiapine dose or use alternative antifungal.",

  283: "NAMI (National Alliance on Mental Illness): advocates for mental health AND public policy issues. Grassroots organization for education, support, advocacy. Fights stigma. Provides family support groups.",

  284: "Research ethics: if intervention is beneficial, it must be offered to ALL patients (equipoise principle). Withholding proven beneficial treatment is unethical. This creates selection bias but is ethically required.",

  285: "HIV dementia vs delirium: often confused due to similar presentation (confusion, attention deficits). Key difference: dementia = chronic, gradual onset; delirium = acute, fluctuating. Check for reversible causes.",

  286: "Business viability: BALANCE SHEET shows assets, liabilities, equity at a point in time. Income statement shows revenue/expenses. Cash flow shows money movement. For new clinic, balance sheet assesses financial health.",

  287: "Dementia differential: must rule out depression (pseudodementia) and delirium. Depression is treatable and reversible. Use Geriatric Depression Scale. Also check thyroid, B12, medication effects.",

  288: "Peplau's process recording: qualitative method documenting nurse-patient interactions verbatim. Analyzes therapeutic communication. Used for supervision and learning. Hildegard Peplau = mother of psychiatric nursing.",

  289: "Frontal lobe functions: executive function (planning, judgment, problem-solving), personality, behavior regulation, expressive language (Broca's area). Damage causes disinhibition, impulsivity, apathy, or aggression.",

  290: "PTSD mindfulness preparation: start with guided imagery before deeper meditation. Creates safety, reduces hyperarousal. Trauma-sensitive approach. Progress gradually to avoid triggering trauma responses.",

  291: "Naltrexone for alcohol: CONTRAINDICATED in pregnancy (Category C, limited data). Benzodiazepines used ONLY for acute alcohol withdrawal, not maintenance. First-line in pregnancy: behavioral interventions, support.",

  292: "Parent medication anxiety: STOP and address anxiety before teaching. Learning cannot occur when anxious. Use therapeutic communication, validate concerns, then demonstrate technique with return demonstration.",

  293: "Home visit assessment: uncooked chicken out = food safety concern; ice cream for overweight child = nutrition education need. Assess health literacy, provide culturally sensitive education about nutrition and food safety.",

  294: "Anticholinergics slow gastric motility: block acetylcholine → decreased GI muscle contractions. Causes constipation. Opposite of metoclopramide (increases motility). Relevant for psychiatric med side effects (TCAs, antipsychotics).",

  295: "Olanzapine and smoking: smoking INDUCES CYP1A2, lowering olanzapine levels. When patient stops smoking, olanzapine levels INCREASE—may need dose REDUCTION. Monitor for sedation, weight gain when quitting smoking.",

  296: "SSRIs in elderly: HYPONATREMIA (SIADH) is major concern. Symptoms: confusion, falls, seizures. Check sodium at baseline and 2 weeks. Higher risk with: age >65, female, diuretics, low body weight.",

  297: "Teenage girl on Depakote: test HCG (pregnancy test). Valproate is HIGHLY teratogenic—neural tube defects, cognitive impairment in offspring. Must use contraception. If pregnant, discuss alternatives immediately.",

  298: "New NP clinic focus: patient and family outcomes FIRST. Quality of care, patient satisfaction, evidence-based practice. Business success follows quality care. Mission-driven practice builds sustainable referrals.",

  299: "Neonate assessment priority: family history of substance use—critical for identifying neonatal abstinence syndrome (NAS) risk. Symptoms: irritability, tremors, feeding difficulties, seizures. Early identification enables intervention.",

  300: "Medicare billing: CPT codes (Current Procedural Terminology) required for services rendered. Also need NPI number and diagnosis codes (ICD-10). CPT describes what procedure/service was provided."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 13 complete: Updated ${updateCount} questions (276-300)`);
