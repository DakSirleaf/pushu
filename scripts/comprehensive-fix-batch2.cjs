const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// BATCH 2 FIXES - More questions with wrong answers and/or wrong rationales

const fixes = {
  // Q97 - GAD requires 6 months (not 12 months)
  97: {
    correctAnswer: 2, // 6 months is index 2
    rationale: "GAD requires 6 MONTHS of excessive, difficult-to-control worry about multiple areas of life, plus 3+ physical symptoms: restlessness, fatigue, difficulty concentrating, irritability, muscle tension, sleep disturbance. First-line: SSRIs/SNRIs + CBT. Avoid benzodiazepines long-term."
  },

  // Q99 - Adjustment disorder onset within 3 months (not 1 month)
  99: {
    correctAnswer: 1, // 3 months is index 1
    rationale: "ADJUSTMENT DISORDER: Symptoms must develop within 3 MONTHS of identifiable stressor. Response is out of proportion to stressor OR causes significant impairment. Resolves within 6 months of stressor ending. Subtypes: with depressed mood, with anxiety, with mixed anxiety/depression."
  },

  // Q100 - Persistent Depressive Disorder (Dysthymia) - fix rationale
  100: {
    correctAnswer: 1, // Persistent Depressive Disorder (Dysthymia) is correct
    rationale: "PERSISTENT DEPRESSIVE DISORDER (Dysthymia): 2+ years of depressed mood more days than not, never symptom-free for >2 months. Plus 2+ of: appetite change, sleep change, low energy, low self-esteem, poor concentration, hopelessness. Can have 'double depression' (dysthymia + MDD episodes)."
  },

  // Q108 - BPD and childhood trauma - fix rationale
  108: {
    correctAnswer: 1, // Childhood trauma history is correct
    rationale: "BORDERLINE PD and TRAUMA: 70-80% of BPD patients report childhood sexual/physical abuse or neglect. Trauma history is crucial for understanding BPD development and guiding trauma-informed treatment. DBT specifically addresses emotion dysregulation stemming from invalidating environments."
  },

  // Q109 - ASPD and alcohol use disorder - fix rationale
  109: {
    correctAnswer: 2, // Alcohol use disorder is index 2
    rationale: "ANTISOCIAL PD + SUBSTANCE USE: Alcohol use disorder is MOST commonly comorbid (40-50% of ASPD). High rates of polysubstance abuse. Impulsivity drives both conditions. Poor treatment prognosis. Address SUD first for any chance at behavioral change. Naltrexone may help alcohol cravings."
  },

  // Q110 - Panic attack - fix rationale
  110: {
    correctAnswer: 1, // Panic attack is index 1
    rationale: "PANIC ATTACK: Abrupt surge of intense fear peaking within MINUTES, with 4+ symptoms: palpitations, sweating, trembling, shortness of breath, chest pain, nausea, dizziness, chills/heat, numbness, derealization, fear of losing control, fear of dying. Rule out cardiac causes first. Treat: SSRIs + CBT."
  },

  // Q115 - Positive symptoms of schizophrenia - fix rationale
  115: {
    correctAnswer: 1, // Positive symptoms is correct
    rationale: "POSITIVE SYMPTOMS of schizophrenia = ADDITIONS to normal: hallucinations (auditory most common), delusions (paranoid, referential, grandiose), disorganized speech (tangential, loose associations), disorganized behavior. Respond well to antipsychotics. Contrast with negative symptoms (deficits)."
  },

  // Continue finding and fixing more issues...

  // Q34 - Already fixed in batch 1, but verify it mentions CIWA score

  // Q45 - CIWA treatment threshold
  45: {
    correctAnswer: 1, // >8 is index 1
    rationale: "CIWA-Ar TREATMENT THRESHOLDS: Score >8: Consider treatment. Score 8-15: Mild withdrawal, PRN benzos. Score 16-20: Moderate, scheduled benzos. Score >20: Severe, high risk for seizures/DTs, ICU consideration. ALWAYS give thiamine before glucose in alcoholics to prevent Wernicke's."
  },

  // Q52 - CIWA score 18 = scheduled benzos
  52: {
    correctAnswer: 2, // Scheduled benzodiazepines is index 2
    rationale: "CIWA-Ar 18 = MODERATE-SEVERE WITHDRAWAL. Requires SCHEDULED benzodiazepines (not just PRN) to prevent seizures and DTs. Long-acting preferred (diazepam, chlordiazepoxide) unless liver disease (use lorazepam). Monitor q1-2 hours. Seizure risk highest 24-48 hours after last drink."
  },

  // Q53 - COWS 15 = Start MAT
  53: {
    correctAnswer: 2, // Buprenorphine or methadone is index 2
    rationale: "COWS 15 = MODERATE OPIOID WITHDRAWAL - appropriate to start medication-assisted treatment. Options: Buprenorphine (can prescribe in office, start when COWS 8-12+) or Methadone (requires OTP clinic). Starting buprenorphine too early causes precipitated withdrawal."
  }
};

let fixCount = 0;
data.forEach(q => {
  if (fixes[q.id]) {
    const fix = fixes[q.id];
    if (fix.correctAnswer !== undefined) {
      const oldAnswer = q.correctAnswer;
      q.correctAnswer = fix.correctAnswer;
      console.log(`Q${q.id}: correctAnswer ${oldAnswer} → ${fix.correctAnswer}`);
    }
    if (fix.rationale) {
      q.rationale = fix.rationale;
      console.log(`Q${q.id}: Rationale updated`);
    }
    fixCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\nBatch 2 - Total questions fixed: ${fixCount}`);
