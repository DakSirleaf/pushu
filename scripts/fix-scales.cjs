const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Accurate scale rationales for board exams
const scaleCorrections = {
  // PHQ-9 questions
  41: "PHQ-9 (0-27): 0-4=minimal, 5-9=mild, 10-14=moderate, 15-19=moderately severe, 20-27=severe. Treatment threshold: ≥10. Question 9 assesses suicidal ideation—any positive requires safety assessment.",

  42: "PHQ-9 ≥10: 88% sensitivity/specificity for major depression. Score ≥10 indicates need for treatment. Use to screen AND monitor response. Reassess every visit.",

  // MMSE questions
  43: "MMSE (0-30): 24-30=normal, 18-23=mild impairment, 10-17=moderate impairment, <10=severe. Score <24 warrants further workup. Rule out delirium, depression, medications before diagnosing dementia.",

  44: "MMSE 24-30: normal cognition. Limitation: misses mild cognitive impairment in educated patients. Consider MoCA (more sensitive) for subtle deficits.",

  // CIWA questions
  45: "CIWA-Ar (0-67): <10=minimal, 10-15=mild, 16-20=moderate, >20=severe. Start PRN benzos at ≥8. Start scheduled benzos at ≥16. Symptom-triggered dosing prevents over-sedation.",

  // COWS questions
  46: "COWS (0-48): 5-12=mild, 13-24=moderate, 25-36=moderately severe, >36=severe. Start buprenorphine at COWS ≥8-12. Must be in withdrawal to avoid precipitated withdrawal.",

  // GAD-7 questions
  47: "GAD-7 (0-21): 0-4=minimal, 5-9=mild, 10-14=moderate, 15-21=severe. Treatment threshold: ≥10. Self-report. High sensitivity/specificity for GAD.",

  // BDI questions
  48: "BDI-II (0-63): 0-13=minimal, 14-19=mild, 20-28=moderate, 29-63=severe. Self-report, 21 items. Patient-completed (unlike HAM-D which is clinician-rated).",

  // HAM-D questions
  49: "HAM-D 17-item (0-52): 0-7=normal/remission, 8-13=mild, 14-18=moderate, 19-22=severe, ≥23=very severe. Clinician-administered. Remission=score ≤7. Response=≥50% reduction.",

  50: "MMSE documentation: Record total score (X/30) AND specific domain deficits (orientation, registration, attention, recall, language). Tracks progression over time.",

  51: "PHQ-9 Question 9: 'Thoughts you would be better off dead or hurting yourself.' ANY positive response (score ≥1) requires immediate safety assessment. Do not skip.",

  52: "CIWA ≥16: moderate-severe withdrawal with seizure risk. Give scheduled benzodiazepines (not just PRN). Monitor q1-2 hours. Consider ICU if score >25 or hemodynamically unstable.",

  53: "COWS 13-24: moderate opioid withdrawal. Safe to start buprenorphine. Higher scores may need higher initial doses. Monitor for symptom relief.",

  54: "SLUMS (0-30): For high school education: 27-30=normal, 21-26=mild neurocognitive disorder, 1-20=dementia. More sensitive than MMSE for mild impairment and executive dysfunction.",

  55: "HAM-A (0-56): <17=mild, 18-24=moderate, ≥25=severe. Clinician-rated, 14 items. Measures both psychic and somatic anxiety symptoms.",

  // Additional scale questions found in later batches
  218: "SLUMS (0-30): For ≥high school: 27-30=normal, 21-26=mild cognitive impairment, 1-20=dementia. For <high school: 25-30=normal, 20-24=MCI, 1-19=dementia. More sensitive than MMSE.",

  219: "MMSE (0-30): 24-30=normal, 18-23=mild impairment, 10-17=moderate impairment, <10=severe. Commonly tested: score 18-23 is mild, not moderate. Adjust for education.",

  220: "HAM-D 17-item (0-52): 0-7=normal, 8-13=mild, 14-18=moderate, 19-22=severe, ≥23=very severe. Note: NOT 0-76. Treatment response: ≥50% score reduction. Remission: ≤7.",

  221: "PHQ-9 (0-27): 0-4=minimal, 5-9=mild, 10-14=moderate, 15-19=moderately severe, 20-27=severe. Screen at ≥10. Question 9=suicidal ideation. Self-report, 9 items.",

  222: "BDI-II (0-63): 0-13=minimal, 14-19=mild, 20-28=moderate, 29-63=severe. Self-report. Distinguish from HAM-D (clinician-administered). 21 items scored 0-3 each.",

  223: "HAM-A (0-56): <17=mild, 18-24=moderate, ≥25=severe. Clinician-rated. 14 items (psychic + somatic). Used to monitor anxiety treatment response.",

  224: "GAD-7 (0-21): 0-4=minimal, 5-9=mild, 10-14=moderate, 15-21=severe. Self-report. Treatment threshold: ≥10. High sensitivity/specificity for generalized anxiety disorder.",

  225: "COWS (0-48): 5-12=mild, 13-24=moderate, 25-36=moderately severe, >36=severe. Start buprenorphine at COWS ≥8-12. Waiting prevents precipitated withdrawal.",

  226: "CIWA-Ar (0-67): <10=minimal, 10-15=mild, 16-20=moderate, >20=severe. Start PRN benzos ≥8, scheduled benzos ≥16. Symptom-triggered dosing is evidence-based.",

  // Fix specific question rationales
  315: "MMSE (0-30): 18-23=MILD impairment (commonly tested). 24-30=normal. 10-17=moderate. <10=severe. Note: some sources say 21-24=mild. Know your test source.",

  316: "BDI-II scoring: 0-13=minimal, 14-19=mild, 20-28=moderate, 29-63=severe. Alternative cutoffs exist (0-9, 10-18, 19-29, 30-63). Know which version is tested.",

  317: "HAM-D 17-item: 0-7=normal, 8-13=mild, 14-18=moderate, 19-22=severe, ≥23=very severe. Clinician-administered. Treatment response: 50% reduction. Remission: score ≤7.",

  386: "MMSE (0-30): 18-23=mild impairment, 10-17=moderate, <10=severe. For this question, 18-23 indicates MODERATE if using alternative cutoffs. Know your exam's source.",

  417: "CIWA-Ar protocol: Score 8-15=mild (PRN benzos q1h). Score ≥16=moderate-severe (scheduled benzos q2h monitoring). Goal: prevent seizures/DTs while avoiding over-sedation."
};

let updateCount = 0;
data.forEach(q => {
  if (scaleCorrections[q.id]) {
    q.rationale = scaleCorrections[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Scale corrections complete: Updated ${updateCount} questions`);
