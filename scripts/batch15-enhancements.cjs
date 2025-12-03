const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  326: "Erythromycin (CYP3A4 inhibitor) + carbamazepine: INCREASES carbamazepine levels → toxicity risk. Symptoms: ataxia, diplopia, nausea. Reduce carbamazepine dose or use alternative antibiotic. Monitor levels closely.",

  327: "SSRI side effects at 3 weeks: evaluate type/severity. Common early side effects (nausea, headache) often resolve. Sexual dysfunction may require switch. Don't discontinue abruptly—taper if changing. Consider drug interactions affecting metabolism.",

  328: "Adjustment disorder: emotional/behavioral symptoms in response to identifiable stressor, within 3 months. Symptoms resolve within 6 months of stressor ending. Less severe than MDD. Supportive therapy first-line; SSRIs if needed.",

  329: "NMS treatment: STOP antipsychotic, monitor CK (for rhabdomyolysis) and WBC (leukocytosis common), give dantrolene (muscle relaxant) ± bromocriptine (dopamine agonist). Benzodiazepines for agitation. IV fluids. ICU admission.",

  330: "State statute: law passed by state legislature. Different from: federal law (Congress), regulations (agency rules), policies (institutional guidelines). NPs must follow state-specific scope of practice laws.",

  331: "Patient-centered care: providing interpreter for non-English speaker is fundamental to patient-centered care. Ensures informed consent, accurate history, treatment adherence. Use professional interpreters, not family when possible.",

  332: "ACE inhibitors: first-line for heart failure with reduced ejection fraction (HFrEF). Reduce mortality. Also: hypertension, diabetic nephropathy. Side effects: dry cough, hyperkalemia, angioedema. Contraindicated in pregnancy.",

  333: "Transformational leadership: motivates staff through inspiration, leading by example, innovation. Fosters change and growth. Different from transactional (rewards/punishments) or laissez-faire (hands-off) leadership styles.",

  334: "Recovery model: focuses on person's goals, hope, empowerment, self-determination. Beyond symptom reduction—aims for meaningful, satisfying life. Patient-centered. Addresses medication adherence through shared decision-making.",

  335: "Frontotemporal dementia (FTD): early SOCIAL SKILLS and PERSONALITY changes (disinhibition, apathy). Memory relatively preserved early on. Different from Alzheimer's (memory first). Behavioral variant most common.",

  336: "New NP practice focus: PATIENT and FAMILY oriented care first. Quality outcomes, patient safety, evidence-based practice. Strong patient relationships build sustainable practice. Business follows quality care.",

  337: "Evidence hierarchy: highest = systematic reviews/meta-analyses of RCTs. Then: single RCTs, cohort studies, case-control, case series, expert opinion (lowest). NPs should advocate for access to current evidence.",

  338: "Toddler development (1-3 years): parallel play, beginning peer interaction, imitation, developing routines/traditions. Not yet cooperative play. Erikson: autonomy vs shame/doubt. Language explosion occurs.",

  339: "Highest suicide risk: elderly white males. Risk factors: living alone/assisted living, chronic illness, pain, depression, widowhood, access to firearms. Elderly make fewer attempts but higher lethality. Screen all elderly for depression.",

  340: "Dyspraxia (developmental coordination disorder): difficulty with motor planning and coordination. Can often perform ADLs (dress, feed, walk) but with difficulty. Integrative care with OT helpful. Not primarily a behavioral issue.",

  341: "Lithium causes HYPOTHYROIDISM: TSH is INCREASED (high TSH = hypothyroid). Lithium inhibits thyroid hormone synthesis and release. Monitor TSH every 6 months. May need levothyroxine supplementation.",

  342: "Integrated care: mental health and primary care in same setting. Improves access, reduces stigma, better outcomes. Different from coordinated care (separate settings, shared information). Crisis intervention may be part of integrated model.",

  343: "Direct vs indirect care: Direct = face-to-face patient care time. Indirect = documentation, care coordination, phone calls. Both are billable but coded differently. Time spent with patient is direct care.",

  344: "Standard of care: level of treatment that a reasonably competent provider would deliver. Based on clinical guidelines, research evidence, professional standards. Legal standard for malpractice determination.",

  345: "Bipolar treatment in children vs adults: mood stabilizers less studied in children. Efficacy data primarily from adult studies. Special considerations: growth, development, different side effect profiles. Careful risk-benefit analysis.",

  346: "Female on lithium—first test: PREGNANCY TEST (HCG). Lithium is Category D, causes Ebstein's anomaly. Must rule out pregnancy before continuing. If pregnant, discuss risks/alternatives. Reliable contraception essential.",

  347: "Depakote monitoring: pregnancy test (teratogenic), LFTs (hepatotoxicity), CBC with platelets (thrombocytopenia), and drug levels (50-125 mcg/mL). Pregnanediol is a pregnancy metabolite—pregnancy testing is the key concern.",

  348: "ADHD stimulant EKG: screen with EKG if family history of cardiovascular disease, sudden death, arrhythmias, or cardiomyopathy. Not routine for all children. Also ask about syncope, chest pain, palpitations.",

  349: "Bipolar medication adherence: systematic reviews provide highest level evidence. Adherence critical—poor adherence leads to relapse. Strategies: psychoeducation, simplified regimens, side effect management, therapeutic alliance.",

  350: "Hypothyroidism causes depression: symptoms include fatigue, weight gain, cold intolerance, dry skin, constipation, cognitive slowing. TSH is INCREASED in hypothyroidism. Screen thyroid in all depressed patients. Treatable cause."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 15 complete: Updated ${updateCount} questions (326-350)`);
