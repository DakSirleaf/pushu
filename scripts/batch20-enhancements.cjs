const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  451: "Highest suicide risk: 65+ YEAR-OLD WHITE MALE, single/widowed. Risk factors: male, elderly, Caucasian, living alone, chronic illness, access to firearms. Men complete suicide 4x more than women. Always assess lethality.",

  452: "New adolescent bipolar: EDUCATE patient and parents first. Explain illness course, medication, warning signs, importance of sleep/routine. Psychoeducation improves adherence, reduces relapse. Don't just start meds without education.",

  453: "Trauma disclosure: First REASSURE safety—'You are in a safe place.' Establish trust before gathering details. Trauma-informed approach. Then assess current safety, offer resources (SANE exam, advocacy). Don't force disclosure.",

  454: "Pediatric antidepressant trials: children have HIGHER placebo response than adults (up to 50%). Makes demonstrating drug efficacy harder. Contributes to fewer FDA-approved antidepressants for children. Study design challenges.",

  455: "EPS mechanism: NIGROSTRIATAL PATHWAY dopamine blockade. Movement disorders result from dopamine reduction in substantia nigra → basal ganglia. Both typical and atypical antipsychotics can cause EPS (atypicals less so).",

  456: "Assess thought disorder: PROVERB INTERPRETATION tests abstract thinking. Concrete responses suggest thought disorder/cognitive impairment. Example: 'People in glass houses shouldn't throw stones' → literal vs abstract interpretation.",

  457: "Child fear after shooting: ACUTE STRESS DISORDER if <1 month since trauma (3 days to 1 month). PTSD diagnosis requires >1 month duration. GAD is chronic worry not linked to specific trauma. Distinguish timeline carefully.",

  458: "4-year-old nightmares with monsters: NORMAL developmental occurrence. Magical thinking, vivid imagination at this age. Night terrors different (screaming, no recall). Reassure parents. Consistent bedtime routine helps.",

  459: "Sleep disorder assessment: ASK ABOUT FAMILY HISTORY. Parasomnias (sleep walking, night terrors) often run in families. Also assess: sleep environment, schedule, stressors, medications. Family history aids diagnosis.",

  460: "Veteran grief without PTSD: SUPPORTIVE THERAPY and resuming normal activities. Normal grief response if not meeting PTSD criteria (no re-experiencing, avoidance, hyperarousal). Don't over-pathologize normal grief.",

  461: "Distress 3 weeks after herpes diagnosis: ADJUSTMENT DISORDER. Stressor identifiable, symptoms within 3 months, marked distress out of proportion. Not PTSD (not life-threatening). Time-limited once stressor resolves.",

  462: "Symptoms 3 weeks after attack: ACUTE STRESS DISORDER (3 days to 1 month duration). Features: intrusion, negative mood, dissociation, avoidance, arousal. After 1 month → reassess for PTSD. Treat with trauma-focused CBT.",

  463: "Anorexia hospitalization: BMI <15 generally requires inpatient. Also hospitalize for: medical instability, <75% ideal body weight, acute food refusal, cardiac compromise, electrolyte imbalance, suicidal ideation.",

  464: "Staff feeding patient extra food: CONSULT and EDUCATE staff about treatment plan. Refeeding must be controlled to prevent refeeding syndrome. Clarify calorie orders. Multidisciplinary communication essential.",

  465: "Acute dystonia treatment: BENZTROPINE (anticholinergic) is correct. Diphenhydramine (Benadryl) also works. Give IM for rapid effect. Ativan (lorazepam) is benzodiazepine, not first-line for dystonia.",

  466: "Kava Kava—avoid: BENZODIAZEPINES. Additive CNS depression, sedation. Both affect GABA. Also hepatotoxicity risk. Avoid alcohol and other sedatives. SSRIs and antipsychotics less concerning.",

  467: "Kava education: HEPATOTOXICITY. FDA warning for liver damage. Monitor LFTs. Report jaundice, abdominal pain, dark urine. Can cause liver failure. Avoid with alcohol, other hepatotoxic substances.",

  468: "Fibromyalgia treatment: DO NOT give benzos (worsen fatigue, dependence risk). Use: TCAs (amitriptyline), SNRIs (duloxetine, milnacipran), pregabalin. Exercise, sleep hygiene, CBT also evidence-based.",

  469: "Idealization: defense mechanism making deceased seem perfect. Common in grief. Protects from mixed feelings about relationship. Healthy initially; problematic if prevents moving through grief. Different from denial.",

  470: "Metabolic syndrome—Risperdal: measure HIP-TO-WAIST circumference (central adiposity key marker). Also: weight, BMI, fasting glucose, lipid panel, blood pressure. All atypicals require metabolic monitoring.",

  471: "Lithium + NSAIDs: DECREASE LITHIUM dose. NSAIDs (Indocin, Mobic, ibuprofen) reduce renal clearance → increased lithium levels → toxicity risk. Use Tylenol for pain. Monitor lithium levels closely.",

  472: "Reglan (metoclopramide): causes TARDIVE DYSKINESIA. Dopamine blocker like antipsychotics. FDA Black Box Warning for TD. Limit use to <12 weeks. Also causes EPS, akathisia. Use alternative antiemetics.",

  473: "Serial 7s: tests CONCENTRATION AND ATTENTION. Patient subtracts 7 from 100 repeatedly (100, 93, 86, 79...). Part of MMSE. Also tests calculation. Alternative: spell WORLD backwards.",

  474: "Thought disorder assessment: PROVERB INTERPRETATION. Tests abstract thinking. Concrete interpretation suggests schizophrenia, cognitive impairment. 'A stitch in time saves nine' → patient explains abstract meaning.",

  475: "ODD prevention: PARENT TRAINING and BEHAVIOR THERAPY. Evidence-based. PMT (Parent Management Training) teaches consistent discipline, positive reinforcement. Without intervention, ~30% develop Conduct Disorder."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 20 complete: Updated ${updateCount} questions (451-475)`);
