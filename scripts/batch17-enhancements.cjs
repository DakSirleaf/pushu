const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  376: "ACT (Assertive Community Treatment): intensive, community-based team approach for severe mental illness. Multidisciplinary team provides 24/7 support, medication management, case management, housing, employment. Reduces hospitalizations.",

  377: "Appreciative inquiry: focuses on STRENGTHS and COMPETENCIES, not problems. Positive change methodology. 4-D cycle: Discover (what works), Dream (vision), Design (plan), Destiny (implement). Opposite of deficit-based approach.",

  378: "Just culture: learning from errors rather than punishing. Distinguishes human error (system), at-risk behavior (coaching), and reckless behavior (discipline). Promotes safety reporting. Not blame-free but fair.",

  379: "Justice principle: FAIR distribution of resources, equal treatment. Excluding patient from trial based on assumed inability to pay violates justice. All patients deserve equal access to healthcare/research opportunities.",

  380: "Minor sexual orientation disclosure: maintain confidentiality unless safety concern. Sexual orientation is protected health information. Assess family acceptance/rejection risk. Support adolescent's developmental process. Document carefully.",

  381: "EHR validity in court: electronic/authorization SIGNATURE proves validity and accountability. Documentation must be authenticated, time-stamped, unaltered. Metadata tracked. E-signatures legally valid under ESIGN Act.",

  382: "Tarasoff v. Regents (1976): established DUTY TO WARN. Must warn identifiable potential victim when patient makes credible threat. Confidentiality is breached for safety. Know state-specific laws. Document warning given.",

  383: "Informed consent: patient must SIGN consent form before treatment. Discussion alone insufficient—must document patient agreement. Exception: emergencies. Consent includes: diagnosis, treatment options, risks, benefits, alternatives.",

  384: "Internet health information: advise patient that information should be DISCUSSED AND VERIFIED with provider. Validate information-seeking. Recommend reputable sources (.gov, .edu). Don't dismiss concerns.",

  385: "Risperdal (risperidone) monitoring: metabolic panel—waist circumference, BMI, weight, hip-to-waist ratio, fasting glucose, lipid panel. Atypical antipsychotics cause metabolic syndrome. Also monitor for EPS.",

  386: "MMSE 18-23: MODERATE cognitive impairment. 24-30 = normal/mild. 10-17 = moderate-severe. <10 = severe. Note: question states 17-18 as 'lowest' for severe, suggesting 18-23 for moderate impairment.",

  387: "Alzheimer's diagnosis reconsideration: if MMSE only dropped from 29 to 26 over 3 YEARS, progression too slow for typical Alzheimer's (usually 2-4 points/year decline). Reconsider diagnosis—may be MCI or non-Alzheimer's cause.",

  388: "ACE inhibitors treat CHF: TRUE. First-line for heart failure with reduced EF. Reduce mortality. Also: hypertension, post-MI, diabetic nephropathy. Mechanism: block angiotensin II → reduce afterload.",

  389: "Acute agitation unresponsive to benzo: add IM antipsychotic (Geodon/ziprasidone, Haldol, or Zyprexa). Reduces restraint time. Geodon preferred—IM has lower QTc risk than PO. Monitor vitals.",

  390: "Young female on Depakote—order ALL: pregnancy test (teratogenic), LFTs (hepatotoxicity), CBC (thrombocytopenia), AND drug level. Valproate causes neural tube defects, PCOS. Must use contraception.",

  391: "Risperdal + Reglan (metoclopramide): BOTH block dopamine → additive EPS risk, TD, akathisia. Metoclopramide is a dopamine antagonist. Combination increases movement disorder risk. Use alternative antiemetic.",

  392: "SSRI + pantoprazole: PPIs inhibit CYP2C19 → can INCREASE some SSRI levels (especially citalopram, escitalopram metabolized by CYP2C19). Monitor for increased side effects. May need dose adjustment.",

  393: "Lithium nephrotoxicity: 4+ proteinuria indicates renal damage. Lithium causes nephrogenic diabetes insipidus, chronic kidney disease. Monitor BUN, creatinine, urinalysis. May need nephrology referral.",

  394: "Pregnancy + Accutane: DISCONTINUE ACCUTANE immediately—highly teratogenic (Category X), causes severe birth defects. Zoloft (sertraline) generally continued in pregnancy if needed. iPLEDGE prevents pregnancy on Accutane.",

  395: "PDE5 inhibitors (sildenafil, tadalafil): RAPIDLY absorbed. Onset: 30-60 min. Take on empty stomach for faster effect. Tadalafil longest duration (36 hrs). Contraindicated with nitrates.",

  396: "DDAVP (desmopressin): synthetic ADH → REDUCES urine output. Used for: enuresis (bedwetting), diabetes insipidus, bleeding disorders. Risk: hyponatremia from water retention. Monitor sodium.",

  397: "Teenager with DKA leaving without psych eval: COLLABORATE with ER staff. DKA can indicate medication non-adherence, eating disorder, substance use. Provide relevant psychiatric history. Patient safety first.",

  398: "Off-label prescribing in children: FULL DISCLOSURE to guardian required. Explain: lack of FDA pediatric approval, evidence supporting use, risks, alternatives. Document informed consent. Common practice in child psychiatry.",

  399: "NMS vs Serotonin Syndrome: NMS = lead-pipe rigidity, fever, autonomic instability, elevated CK/WBC. Labs distinguish: NMS has elevated CK (rhabdomyolysis). Both emergencies. Stop offending agent.",

  400: "EPS progression to TD: chronic dopamine blockade → receptor upregulation → tardive dyskinesia. Early EPS (acute dystonia, akathisia) may precede TD. Monitor with AIMS. TD may be irreversible."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 17 complete: Updated ${updateCount} questions (376-400)`);
