const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  301: "CN VII (Facial nerve): puffing cheeks tests buccinator muscle (facial nerve). Also tests: smile, frown, eye closure, raise eyebrows. Bell's palsy = unilateral facial weakness. Board tip: VII = face expressions; V = chewing.",

  302: "Cultural psychiatry: Puerto Rican and Dominican populations show higher rates of mood disorders (depression, anxiety) in epidemiological studies. Consider cultural expressions of distress (ataque de nervios). Cultural competence essential.",

  303: "Gabapentin (Neurontin) NOT used for depression. FDA-approved for: epilepsy, postherpetic neuralgia. Off-label: neuropathic pain, anxiety, hot flashes, alcohol withdrawal. Does not treat depression—different mechanism.",

  304: "Gabapentin: enhances GABA activity (inhibitory neurotransmitter). Binds to alpha-2-delta subunit of voltage-gated calcium channels. Does NOT directly bind GABA receptors. Calming effect. Lower abuse potential than benzos.",

  305: "Reticulocyte count: assesses bone marrow function. Low reticulocytes with low RBCs suggests aplastic anemia or bone marrow failure. SSRIs rarely cause blood dyscrasias. Also check in diabetes for anemia of chronic disease.",

  306: "Iron absorption DECREASED by: caffeine, tea, antacids (raise gastric pH), calcium, fiber, phytates. Iron absorption INCREASED by: vitamin C (ascorbic acid), meat. Teach patient: Take iron 1 hour before or 2 hours after other meds.",

  307: "Fluoroquinolones (Cipro, Levaquin): FDA Black Box Warning for TENDON RUPTURE, especially Achilles. Also: peripheral neuropathy, CNS effects, aortic aneurysm. Avoid in elderly, steroid users. Teach patient: Stop if tendon pain.",

  308: "Tetracyclines in children: cause permanent TEETH DISCOLORATION (yellow-gray-brown). Contraindicated <8 years old. Also affects bone development. Exception: doxycycline binds calcium less, may be safer in children.",

  309: "Synthroid (levothyroxine): thyroid hormone replacement for HYPOTHYROIDISM. Take on empty stomach, same time daily. Avoid with calcium, iron (separate by 4 hours). Monitor TSH every 6-8 weeks after dose changes.",

  310: "Sensitivity (true positive rate): proportion of people WITH disease who test POSITIVE. 'SnOUT' = Sensitive test, Negative result rules OUT disease. High sensitivity = few false negatives. Useful for screening.",

  311: "Turner syndrome (45,XO): affects females only. Features: short stature, ovarian failure, webbed neck, shield chest, coarctation of aorta. Often infertile. Cognitive abilities usually normal. Hormone replacement needed.",

  312: "NMS: high fever, lead-pipe rigidity, altered mental status, autonomic instability. Labs show leukocytosis, elevated CK, myoglobinuria. Caused by dopamine blockade (antipsychotics). Life-threatening—stop antipsychotic immediately.",

  313: "NMS treatment: STOP antipsychotic, supportive care (cooling, hydration), dantrolene (muscle relaxant) or bromocriptine (dopamine agonist). Monitor CK, renal function. ICU admission often needed. Mortality 10-20% if untreated.",

  314: "Serotonin syndrome: tachycardia, hyperthermia, agitation, hyperreflexia, clonus, diaphoresis, dilated pupils, diarrhea. Caused by excess serotonin. Treatment: stop serotonergic drugs, cyproheptadine, cooling, benzos for agitation.",

  315: "MMSE 18-24: MODERATE cognitive impairment. 25-30 = normal/mild. 10-17 = moderate-severe. <10 = severe. MMSE quick screen; not diagnostic. Consider education level, language. Follow up with neuropsych testing.",

  316: "Beck Depression Inventory (BDI): 0-9 = not depressed, 10-18 = mild-moderate, 19-29 = moderate-severe, 30-63 = severe. Self-report measure. 21 items. Different from clinician-rated scales (HAM-D).",

  317: "HAM-D scoring: 0-7 = no depression, 8-13 = mild, 14-18 = moderate, 19-22 = severe, ≥23 = very severe. Clinician-administered. Treatment response: ≥50% reduction in score. Remission: score ≤7.",

  318: "Termination readiness: patient shows symptom improvement, increased coping skills, met treatment goals, can function independently. Discuss termination early. Gradual spacing of sessions. Address termination feelings.",

  319: "School suicide assessment: comprehensive evaluation includes: ideation, plan, means, intent, history of attempts, risk factors (substance use, family conflict, bullying), protective factors, academic decline, behavior changes.",

  320: "Patient silence in interview: use therapeutic silence, give space for processing. Don't rush to fill silence. Silence can indicate deep reflection, emotion, or resistance. Observe nonverbal cues. Eventually gently explore.",

  321: "Couples therapy: if one partner absent and other is angry, reschedule for both to attend. Couples therapy requires both partners present. Don't conduct individual session disguised as couples work—maintain boundaries.",

  322: "Frequent ED visits (alcohol): consult case management/discharge planning team. Coordinate care, connect to treatment resources, reduce ED utilization. Multidisciplinary approach for complex patients. SBIRT may be helpful.",

  323: "Minor sexual orientation disclosure: maintain confidentiality while assessing safety. Sexual orientation is protected health information. Assess: family acceptance, bullying, mental health, safety at home. Support the adolescent.",

  324: "Crying infant—assess for increased intracranial pressure (ICP): bulging fontanelle, sunset eyes, irritability, poor feeding, vomiting, altered consciousness. ICP can indicate meningitis, hydrocephalus. Medical emergency if suspected.",

  325: "Opioid prescribing and privacy: HIPAA protects all health information including substance use treatment. Prescription drug monitoring programs (PDMPs) have specific privacy rules. Document informed consent for treatment."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 14 complete: Updated ${updateCount} questions (301-325)`);
