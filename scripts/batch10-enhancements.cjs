const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  201: "SAID causes mania: Steroids, Antidepressants, INH (isoniazid), Disulfiram, and certain antibiotics. Antidepressants can flip bipolar patients into mania. Teach patient: Report sudden mood elevation, decreased sleep, racing thoughts. Board tip: Remember 'SAID it causes mania.'",

  202: "Corticosteroids (prednisone, dexamethasone, Flonase) can induce mania by increasing catecholamines. Even inhaled steroids rarely cause mood changes. Teach patient: Report unusual mood elevation or insomnia with steroid use. Taper steroids slowly.",

  203: "Lithium therapeutic level: 0.6-1.2 mEq/L. Check levels 5 days after dose change (steady state). Draw level 12 hours post-dose. Acute mania may need higher end (1.0-1.2). Maintenance can use lower (0.6-0.8). Teach patient: Get labs as scheduled, same time each draw.",

  204: "Lithium common side effects: nausea, fine hand tremor, polyuria (increased urination), polydipsia (increased thirst), weight gain, hypothyroidism, cognitive dulling. Teach patient: Drink 8-10 glasses water daily, maintain consistent salt intake. Tremor may improve with beta-blockers.",

  205: "Lithium TOXICITY (>1.5 mEq/L): slurred speech, confusion, ataxia, coarse tremor, severe GI symptoms, cardiac arrhythmias, seizures. STOP lithium immediately. Dialysis for severe toxicity. Teach patient: Vomiting + confusion = ER immediately.",

  206: "Lithium pregnancy warning: Category D, causes Ebstein's anomaly (cardiac defect) especially in first trimester. NOT safe early pregnancy. Lactation L3 (limited safety data). Teach patient: Use reliable contraception. If pregnancy desired, discuss alternatives with provider.",

  207: "NSAIDs and ACE inhibitors DOUBLE lithium levels by reducing renal clearance. Other drugs that increase lithium: thiazide diuretics, ibuprofen, naproxen. Teach patient: Avoid OTC ibuprofen/Advil/Aleve. Tylenol is safe. Always tell pharmacy you take lithium.",

  208: "Carbamazepine (Tegretol) therapeutic level: 6-12 mcg/mL. Check levels 1-2 weeks after initiation. Also monitor CBC (agranulocytosis risk) and LFTs (hepatotoxicity). Teach patient: Report unusual bleeding, bruising, or jaundice.",

  209: "Carbamazepine side effects: sedation, dizziness, ataxia, diplopia, nausea, rash. Does NOT typically cause weight loss or hyperactivity. Can cause SIADH (low sodium). Teach patient: Avoid driving until side effects known. Take with food.",

  210: "Carbamazepine SERIOUS effects: Agranulocytosis (low WBC), aplastic anemia, Stevens-Johnson syndrome (severe skin reaction). Get baseline CBC, repeat at 2 weeks. Teach patient: Fever + sore throat + rash = stop med and call immediately.",

  211: "Carbamazepine is CYP450 INDUCER—lowers levels of other drugs (oral contraceptives, warfarin, other anticonvulsants). NOT safe in pregnancy (neural tube defects). Teach patient: Use backup contraception. Alternative to lithium for bipolar.",

  212: "HLA-B*1502 screening REQUIRED before carbamazepine in Asian patients (FDA Black Box Warning). This allele increases Stevens-Johnson syndrome risk 10-fold. Test once before any carbamazepine use. If positive, do NOT use carbamazepine or oxcarbazepine.",

  213: "Valproate NOT effective for schizophrenia (no FDA approval). Effective for: bipolar disorder (especially rapid cycling), seizures, migraine prophylaxis. Divalproex (Depakote) has enteric coating = less GI upset than valproic acid.",

  214: "Valproic acid therapeutic level: 50-125 mcg/mL. Check levels 1-2 weeks after dose changes. Also monitor LFTs and CBC. Higher levels (80-125) may be needed for acute mania. Teach patient: Report unusual bleeding or bruising.",

  215: "Valproate side effects: nausea, diarrhea, abdominal cramps, sedation, tremor, weight GAIN, alopecia (hair loss). Teach patient: Hair usually regrows. Take with food to reduce GI upset. Monitor weight.",

  216: "Valproate SERIOUS effects: hepatotoxicity (elevated LFTs), pancreatitis, Stevens-Johnson syndrome, thrombocytopenia. Highest liver risk in children <2 years and polypharmacy. Teach patient: Report abdominal pain, jaundice, unusual bleeding.",

  217: "Valproic acid loading dose: 20 mg/kg. Used for rapid control of acute mania or seizures. Achieves therapeutic levels faster than gradual titration. Standard maintenance: 15-60 mg/kg/day in divided doses.",

  218: "SLUM (Saint Louis University Mental Status): Score 0-20 indicates dementia. Score 21-26 = mild cognitive impairment. Score 27-30 = normal. Alternative to MMSE. Board tip: SLUM screens for dementia in 0-20 range.",

  219: "MMSE scoring: 21-24 = moderate cognitive impairment. 10-20 = moderate-severe. <10 = severe. 25-30 = normal or mild. Board tip: '21-24 moderate' is commonly tested. Consider causes: depression pseudo-dementia vs true dementia.",

  220: "HAM-D (Hamilton Depression Scale, 0-76): 14-18 = moderate depression. 0-7 = normal. 8-13 = mild. ≥19 = severe. Board tip: HAM-D scores for treatment decision-making. Severe (19+) may need hospitalization if suicidal.",

  221: "PHQ-9 scoring (0-27): 10-14 = moderate depression. 0-4 = none. 5-9 = mild. 15-19 = moderately severe. 20-27 = severe. Question 9 asks about suicidal ideation. Board tip: PHQ-9 ≥10 warrants treatment consideration.",

  222: "Beck Depression Inventory (0-63): 20-28 = moderate depression. 0-13 = minimal. 14-19 = mild. 29-63 = severe. Self-report measure. Board tip: BDI is patient-completed; HAM-D is clinician-administered.",

  223: "HAM-A (Hamilton Anxiety Scale, 0-56): 18-24 = moderate anxiety. <14 = no/mild anxiety. 14-17 = mild-moderate. ≥25 = severe. Clinician-rated scale. Board tip: HAM-A for treatment monitoring in anxiety disorders.",

  224: "GAD-7 (0-21): 10-14 = moderate anxiety. 0-4 = minimal. 5-9 = mild. 15-21 = severe. Self-report screening tool. High sensitivity/specificity for GAD. Board tip: GAD-7 ≥10 suggests clinical anxiety disorder.",

  225: "COWS (Clinical Opiate Withdrawal Scale): Start treatment when score >13 (moderate withdrawal). 5-12 = mild. 13-24 = moderate. 25-36 = moderately severe. >36 = severe. Start buprenorphine at COWS ≥13 to prevent precipitated withdrawal."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 10 complete: Updated ${updateCount} questions (201-225)`);
