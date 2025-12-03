const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  226: "CIWA-Ar (Alcohol Withdrawal): 16-20 = moderate withdrawal, start treatment. 0-9 = minimal. 10-15 = mild. >20 = severe (seizure risk). Score based on tremor, anxiety, sweating, N/V, headache, agitation. Treat with benzodiazepines.",

  227: "Rhabdomyolysis: muscle breakdown → myoglobin in urine (dark red/cola-colored). Risk: intense exercise, statins, trauma, drugs. Labs: elevated CK, myoglobinuria. Teach patient: Stay hydrated during workouts. Can cause acute kidney injury.",

  228: "Treatment-resistant depression: after 3 adequate SSRI trials fail, augment with lithium, atypical antipsychotic, or switch to different class. Consider TMS, ECT, or ketamine/esketamine. Avoid continuing same class that failed.",

  229: "Elderly functional assessment: IADL (Instrumental Activities of Daily Living) includes managing finances/checkbook—most sensitive indicator of cognitive decline. Also: medication management, shopping, cooking. Loss of IADLs often precedes ADL decline.",

  230: "Autism spectrum: poor response to verbal commands is NORMAL—not defiance. Core features: social communication deficits, restricted/repetitive behaviors. Teach parents: Use visual cues, clear simple language, allow processing time.",

  231: "NP in politics: primary role is ADVOCATE. Use evidence-based knowledge to influence health policy. Advocacy includes education, testifying, lobbying, coalition building. Professional obligation to advocate for patients and profession.",

  232: "Conflict of interest: abstain from voting when personal interests may influence decision. Disclose relationships, recuse from relevant decisions. Maintain objectivity and public trust. Board tip: Abstain + disclose = ethical response.",

  233: "Metabolic syndrome: waist circumference is FIRST indicator (central obesity). Criteria: waist >40\" men/>35\" women, triglycerides ≥150, HDL <40 men/<50 women, BP ≥130/85, fasting glucose ≥100. Monitor with antipsychotics.",

  234: "Carbamazepine + CYP3A4 inhibitors (erythromycin, Cipro, grapefruit): INCREASED carbamazepine levels → toxicity. Carbamazepine is also inducer (lowers other drug levels). Teach patient: Tell all providers about Tegretol.",

  235: "Nuchal rigidity: meningitis sign—stiff neck, resistance to flexion. Other meningeal signs: Kernig (knee extension pain), Brudzinski (hip flexion with neck flexion). Medical emergency. Lumbar puncture to confirm. Teach: Fever + headache + stiff neck = ER.",

  236: "ACE inhibitors (lisinopril, enalapril): primary use = heart failure. Also hypertension, diabetic nephropathy. Block angiotensin II → reduce afterload. Side effects: dry cough, hyperkalemia, angioedema. Contraindicated in pregnancy.",

  237: "Serotonin syndrome does NOT cause bradycardia or hypothermia—causes TACHYcardia and HYPERthermia. Symptoms: agitation, hyperreflexia, tremor, diaphoresis, dilated pupils, diarrhea, clonus. Treatment: cyproheptadine, cooling, stop offending agents.",

  238: "Harsh systolic murmur: aortic stenosis. Mnemonic 'MR ASS, MS ARD': Mitral Regurgitation/Aortic Stenosis = Systolic; Mitral Stenosis/Aortic Regurgitation = Diastolic. Grade II/VI = moderate. Crescendo-decrescendo pattern.",

  239: "Pregnancy + GAD: stop Klonopin (benzodiazepine = Category D, teratogenic), continue Buspar (buspirone = safer, Category B). Benzos cause fetal cleft palate, floppy infant syndrome. Teach patient: Taper benzos before conceiving.",

  240: "Acute agitation not responding to benzodiazepine: add IM Geodon (ziprasidone) for rapid tranquilization. Also consider IM Zyprexa (olanzapine) or IM Haldol. Goal: minimize seclusion/restraint time. Monitor QTc with Geodon.",

  241: "Rhabdomyolysis in adolescent: suspect substance use (cocaine, amphetamines) plus intense exercise. Cola-colored urine = myoglobinuria. Check CK (often >10,000), creatinine, electrolytes. IV fluids critical to prevent kidney failure.",

  242: "Gender identity disclosure: balance patient privacy with parents' right to know. Assess safety—is patient at risk if parents know? Use developmentally appropriate approach. Support patient autonomy while maintaining therapeutic relationship.",

  243: "Lithium renal monitoring: proteinuria (protein in urine) indicates nephropathy. Monitor BUN, creatinine, urinalysis every 6 months. Lithium causes nephrogenic diabetes insipidus (polyuria) and chronic kidney disease with long-term use.",

  244: "Amitriptyline (TCA) in elderly: AVOID per Beers Criteria. Strong anticholinergic effects: constipation, urinary retention, dry mouth, confusion, falls. Safer alternatives: SSRIs, SNRIs. Teach patient: Report constipation, confusion.",

  245: "H2 blockers: Ranitidine (Zantac), famotidine (Pepcid), cimetidine (Tagamet). Block histamine-2 receptors in stomach → reduce acid. Different from PPIs (omeprazole) which block proton pump. Cimetidine has most drug interactions.",

  246: "Antihistamines for allergies: H1 blockers. First-gen (diphenhydramine) = sedating, anticholinergic. Second-gen (loratadine, cetirizine) = less sedating, preferred. Don't confuse with H2 blockers (for stomach acid).",

  247: "DBT (Dialectical Behavior Therapy): GOLD STANDARD for Borderline Personality Disorder. Four modules: mindfulness, distress tolerance, emotion regulation, interpersonal effectiveness. Reduces self-harm, suicidality, hospitalizations. Created by Marsha Linehan.",

  248: "ODD prevention of antisocial personality: parent management training + child social skills training. Evidence-based. Prevents progression ODD → Conduct Disorder → Antisocial PD. Teach parents: Consistent discipline, positive reinforcement.",

  249: "Bipolar genetic risk: children of bipolar parent have 4x higher risk. First-degree relatives: 10-15% risk vs 1-2% general population. Stronger genetic link in Bipolar I than Bipolar II. Monitor children for mood symptoms.",

  250: "Elderly metabolic workup: fasting glucose (diabetes screening), thyroid panel (hypothyroidism common), BMI calculation. Rule out medical causes of psychiatric symptoms. Also consider B12, folate, vitamin D."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 11 complete: Updated ${updateCount} questions (226-250)`);
