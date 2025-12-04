const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     FIXING REMAINING MISMATCHES & MORE EDUCATIONAL RATIONALES  ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let fixCount = 0;

// Fix the 8 remaining mismatches
const fixes = {
  // Q6 - Already has good rationale but let's make sure it mentions 0.8
  6: "LITHIUM LEVEL 0.8 mEq/L is optimal for maintenance. Therapeutic range: 0.6-1.2 mEq/L. Why is 0.8 correct? It's in the sweet spot - effective without toxicity risk. 0.3 = subtherapeutic (won't work). 1.6 and 2.2 = TOXIC (>1.5 mEq/L causes tremor, ataxia, confusion, seizures). Board pearl: Draw trough level 12 hours post-dose. Elderly may do well at 0.4-0.8 mEq/L.",

  // Q29 - Valproate loading dose
  29: "VALPROATE LOADING: 20-30 mg/kg/day for acute mania. Why this range? Achieves therapeutic level (85-125 mcg/mL) within 24-48 hours vs 5-7 days with standard titration. 10 mg/kg = too low, won't reach therapeutic level quickly. 40-50 mg/kg = too high, risk of toxicity. 5 mg/kg = way too low. Board pearl: Divide into 2-3 doses to reduce GI side effects. IV loading also option.",

  // Q85 - OCD treatment
  85: "CBT WITH EXPOSURE AND RESPONSE PREVENTION (ERP) is FIRST-LINE for OCD. Why? ERP has the strongest evidence base - patient is exposed to anxiety trigger and prevented from performing compulsive ritual. This extinguishes the anxiety response over time. Medications (SSRIs at HIGH doses) are adjunct. Why not other therapies? Psychodynamic, supportive therapy lack evidence for OCD. Board pearl: OCD requires higher SSRI doses than depression (e.g., fluoxetine 60-80mg).",

  // Q203 - Lithium therapeutic level
  203: "LITHIUM THERAPEUTIC LEVEL: 0.6-1.2 mEq/L for maintenance. Why this range? Below 0.6 = subtherapeutic (inadequate mood stabilization). Above 1.2 = toxicity risk. For ACUTE mania, can target 0.8-1.2 mEq/L. For maintenance, 0.6-1.0 mEq/L often sufficient. Elderly: 0.4-0.8 mEq/L. Board pearl: Always draw TROUGH level (12 hours post-dose). Toxicity: tremor, ataxia, confusion, seizures.",

  // Q208 - Carbamazepine level
  208: "CARBAMAZEPINE THERAPEUTIC LEVEL: 6-12 mcg/mL. Why this range? Below 6 = likely subtherapeutic for seizures/mood. Above 12 = toxicity risk (diplopia, ataxia, nystagmus). Important: Auto-induction occurs - carbamazepine induces its own metabolism, so levels may DROP after 2-4 weeks even at same dose. Recheck levels. Board pearl: Also monitor CBC (agranulocytosis) and sodium (SIADH → hyponatremia).",

  // Q214 - Valproate level
  214: "VALPROATE THERAPEUTIC LEVEL: 50-125 mcg/mL. Why this range? Below 50 = likely subtherapeutic. Above 125 = toxicity risk (tremor, sedation, thrombocytopenia). For acute mania, target 85-125 mcg/mL. For maintenance, 50-100 mcg/mL often adequate. Draw trough level. Board pearl: Monitor LFTs (hepatotoxicity), CBC with platelets, ammonia if confused. CONTRAINDICATED in pregnancy.",

  // Q217 - Valproate loading
  217: "VALPROATE LOADING DOSE: 20 mg/kg for acute mania. Why 20 mg/kg specifically? This achieves therapeutic level (50-125 mcg/mL) rapidly - within 24-48 hours vs 5-7 days with gradual titration. Useful in acute mania, status epilepticus. Can give oral or IV. Board pearl: After loading, maintenance dose is typically 250-500mg BID-TID. Check level 2-3 days after loading.",

  // Q218 - SLUMS scoring
  218: "SLUMS SCORING: 21-26 indicates MILD COGNITIVE IMPAIRMENT (MCI) in high school educated patients. Why 21-26? SLUMS (0-30 scale): 27-30 = normal, 21-26 = MCI, <21 = dementia. For less than high school education: 25-30 normal, 20-24 MCI, <20 dementia. Board pearl: SLUMS is more sensitive than MMSE for detecting MCI. Tests executive function, visuospatial skills, memory.",

  // Additional educational rationales for commonly tested topics

  // Q19 - Tyramine crisis treatment
  19: "PHENTOLAMINE is treatment for MAOI-induced HYPERTENSIVE CRISIS (tyramine reaction). Why phentolamine? It's an alpha-adrenergic blocker - directly counteracts the excessive norepinephrine release causing the hypertension. Why not metoprolol/labetalol? Beta-blockers can cause unopposed alpha stimulation, worsening hypertension. Lisinopril works too slowly. Board pearl: Tyramine crisis = severe headache, hypertension, diaphoresis → stroke risk.",

  // Q24 - Drug-induced mania
  24: "CORTICOSTEROIDS, ANTIDEPRESSANTS, ISONIAZID, DISULFIRAM can trigger MANIA in bipolar patients. Why these? (1) Corticosteroids increase catecholamines, (2) Antidepressants can flip patients into mania without mood stabilizer, (3) Isoniazid inhibits MAO → catecholamine excess, (4) Disulfiram inhibits dopamine beta-hydroxylase. Board pearl: When starting any of these in bipolar patient, monitor closely and consider prophylactic mood stabilizer adjustment.",

  // Q27 - Valproate for breakthrough mania
  27: "VALPROATE (Depakote) is excellent for breakthrough manic episodes on lithium. Why? Different mechanism (GABA enhancement, sodium channel blockade) - adds to lithium's effect. Good for mixed episodes, rapid cycling. Why not lamotrigine? Lamotrigine is better for bipolar DEPRESSION, has less antimanic efficacy. Board pearl: Can use lithium + valproate combination. Therapeutic valproate level: 50-125 mcg/mL.",

  // Q70 - Infant development
  70: "5-MONTH MOTOR MILESTONE: Can transfer objects from one hand to the other, reach for objects. 5-month milestones: reaches, grasps, transfers, rolls both ways, sits with support, babbles. NOT yet: sits independently (6-7 mo), crawls (8-10 mo), pulls to stand (9-10 mo). Board pearl: Red flags: no reaching by 5 months, no babbling, poor head control.",

  // Q71 - DBT for BPD
  71: "DIALECTICAL BEHAVIOR THERAPY (DBT) is the GOLD STANDARD treatment for BORDERLINE PERSONALITY DISORDER. Why DBT? It specifically targets BPD symptoms: emotion dysregulation, interpersonal chaos, impulsivity, suicidality. Four modules: (1) Mindfulness, (2) Distress Tolerance, (3) Emotion Regulation, (4) Interpersonal Effectiveness. Evidence shows DBT significantly reduces self-harm and hospitalizations. Board pearl: DBT combines CBT techniques with acceptance strategies.",

  // Q72 - PTSD first-line
  72: "TRAUMA-FOCUSED CBT (including Prolonged Exposure, CPT, EMDR) is FIRST-LINE for PTSD. Why? These therapies directly address trauma memories and help extinguish fear response. Why not benzos? Benzodiazepines are NOT recommended - may worsen outcomes and interfere with extinction learning. SSRIs/SNRIs are first-line medications but therapy is preferred. Board pearl: Sertraline and paroxetine are FDA-approved for PTSD.",

  // Q74 - Panic disorder treatment
  74: "SSRIs are FIRST-LINE pharmacotherapy for PANIC DISORDER. Why? Good efficacy with better side effect profile than older medications (TCAs, MAOIs). Start at LOW dose (half usual starting dose) - panic patients are sensitive to activation. CBT (especially interoceptive exposure) is also first-line. Why not benzos? Useful short-term but risk of dependence. Board pearl: Takes 4-6 weeks for full SSRI effect.",

  // Q76 - GAD first-line
  76: "SSRIs/SNRIs are FIRST-LINE pharmacotherapy for Generalized Anxiety Disorder. Why? Good efficacy, tolerable side effects, once-daily dosing, treat comorbid depression. Buspirone is alternative - no dependence risk but takes weeks to work. Benzos for short-term only (dependence risk). Board pearl: Duloxetine, venlafaxine also FDA-approved. Consider therapy (CBT) as first-line or adjunct.",

  // Q80 - Social anxiety pharmacotherapy
  80: "SSRIs/SNRIs (particularly paroxetine, sertraline, venlafaxine) are FIRST-LINE for Social Anxiety Disorder. Why? Good evidence base, treat comorbid depression. Propranolol is for PERFORMANCE-ONLY anxiety (public speaking) - doesn't help generalized social anxiety. Benzos helpful short-term but dependence risk. Board pearl: CBT (exposure therapy) is highly effective. Many patients need both medication and therapy.",
};

// Apply fixes
Object.entries(fixes).forEach(([id, rationale]) => {
  const q = data.find(item => item.id === parseInt(id));
  if (q) {
    q.rationale = rationale;
    console.log(`✓ Q${id}: Fixed/enhanced rationale`);
    fixCount++;
  }
});

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\n${'═'.repeat(50)}`);
console.log(`Total rationales fixed/enhanced: ${fixCount}`);
console.log('✓ Changes saved');
