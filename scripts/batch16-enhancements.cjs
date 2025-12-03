const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  351: "Tardive dyskinesia (TD): involuntary, repetitive movements—lip smacking, tongue protrusion, grimacing, finger movements. Caused by chronic dopamine blockade. May be irreversible. Monitor with AIMS scale every 6 months on antipsychotics.",

  352: "Ziprasidone (Geodon): REQUIRES EKG monitoring due to QTc prolongation risk. Contraindicated if QTc >500ms or history of arrhythmia. Also monitor electrolytes (hypokalemia increases risk). Take with food (400+ calories) for absorption.",

  353: "Medications causing depression: steroids, Accutane (isotretinoin), interferon, beta-blockers, benzodiazepines, oral contraceptives, reserpine. Mnemonic: 'Sad BRIC'—Steroids, Accutane, Beta-blockers, Reserpine, Interferon, Contraceptives.",

  354: "Type 2 diabetes first-line: METFORMIN. Benefits: weight neutral, low hypoglycemia risk, cardiovascular protection, inexpensive. Contraindicated: eGFR <30, hepatic failure. Common side effect: GI upset (start low, go slow).",

  355: "Mania-inducing medications: SAID mnemonic—Steroids, Antidepressants, INH (isoniazid), Disulfiram. Antidepressants can 'flip' bipolar patients to mania. Use mood stabilizer before or with antidepressant in bipolar.",

  356: "Cluster A personality disorders (Odd/Eccentric): Paranoid, Schizoid, Schizotypal. Mnemonic: 'Weird'—odd thinking, suspicious, socially withdrawn. Genetic link to schizophrenia. Rarely seek treatment themselves.",

  357: "Cluster B personality disorders (Dramatic/Emotional): Antisocial, Borderline, Histrionic, Narcissistic. Mnemonic: 'Wild'—impulsive, emotional, attention-seeking. DBT effective for Borderline. Most treatment-seeking cluster.",

  358: "Cluster C personality disorders (Anxious/Fearful): Avoidant, Dependent, OCPD. Mnemonic: 'Worried'—anxious, rigid, fearful of rejection. Respond well to therapy. OCPD different from OCD (ego-syntonic vs ego-dystonic).",

  359: "Clozapine ANC monitoring: if ANC <1500, hold clozapine. If ANC <1000, discontinue. Weekly monitoring first 6 months, then biweekly for 6 months, then monthly. REMS program required. Risk of agranulocytosis (~1%).",

  360: "Subclavicular mass: firm mass in subclavicular area requires medical workup. May indicate malignancy, lymphadenopathy, or other pathology. Refer for imaging and possible biopsy. Not primarily psychiatric presentation.",

  361: "Elderly suicide prevention: reduce access to means (firearms, medications), treat depression, address isolation, regular follow-up. School-based clinics relevant for youth suicide prevention, not elderly—focus on community resources for elderly.",

  362: "Support groups: reduce mental health stigma, provide peer support, education, advocacy. NAMI offers support groups. Evidence-based adjunct to treatment. Normalize mental health discussions. Improve treatment adherence.",

  363: "Osteoporosis management: weight-bearing EXERCISE, decrease caffeine (increases calcium excretion), adequate calcium/vitamin D, bisphosphonates if indicated. Relevant for patients on SSRIs (bone density concerns) or antipsychotics.",

  364: "Elderly + SSRI education: exercise benefits mood and bone health. Reduce caffeine (can worsen anxiety, affects bone density). Monitor for hyponatremia, falls. Different from discontinuation syndrome (which needs taper education).",

  365: "ADHD screening in adolescents: screen those at risk (academic problems, behavioral issues, family history). Educate parents about symptoms across settings. Use validated tools: Vanderbilt, Conners. Get collateral from teachers.",

  366: "Social justice: ethical principle ensuring fair distribution of resources, equal treatment, advocating for marginalized groups. NPs have obligation to advocate for healthcare access. Foundation of health equity work.",

  367: "Research randomization: sometimes impossible to randomize (ethical constraints, practical limitations). Preoperative patients may require treatment—can't withhold for control group. Use quasi-experimental designs instead.",

  368: "Evidence hierarchy (highest to lowest): 1) Systematic reviews/meta-analyses, 2) RCTs, 3) Cohort studies, 4) Case-control, 5) Case series/reports, 6) Expert opinion. EBP integrates best evidence + clinical expertise + patient values.",

  369: "Direct vs indirect care time: Direct = face-to-face patient contact. Indirect = documentation, care coordination, phone calls, supervision. Both important for practice management. Calculate for productivity and billing.",

  370: "Community health reform dissemination: community meetings with diverse cultural representation ensure buy-in, cultural appropriateness, and reach. More effective than journal publication for community-level change.",

  371: "Testifying under oath: personal/professional INTEGRITY requires truthfulness. Cannot withhold information at attorney's request—perjury is illegal. Document accurately, testify honestly. Integrity supersedes advocacy.",

  372: "Kava kava: PRIMARY concern is HEPATOTOXICITY (liver damage). FDA warning issued. Requires LFT monitoring. Avoid with alcohol, other hepatotoxic drugs, liver disease. Some countries have banned kava supplements.",

  373: "Healthcare disparities: NPs have ethical obligation to ADVOCATE. Methods include lobbying, media awareness, policy involvement, community education. Social justice principle. Address barriers to care for minorities.",

  374: "DMDD (Disruptive Mood Dysregulation Disorder): severe, chronic irritability with frequent temper outbursts (≥3x/week for 12+ months). Onset before age 10. Between outbursts, mood is irritable. Different from bipolar (episodic) and ODD (less severe).",

  375: "Economic viability: REVENUE AND EXPENSES ANALYSIS (income statement/P&L) shows profitability. Business plan is broader strategy. SWOT analyzes strengths/weaknesses. Market survey assesses demand. For viability, focus on financials."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 16 complete: Updated ${updateCount} questions (351-375)`);
