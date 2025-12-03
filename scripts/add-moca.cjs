const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Update MMSE questions to include MoCA comparison
const mocaUpdates = {
  43: "MMSE (0-30): 24-30=normal, 18-23=mild, 10-17=moderate, <10=severe. LIMITATION: ceiling effect misses MCI in educated patients. Use MoCA instead—more sensitive for mild impairment and executive dysfunction.",

  44: "MMSE 24-30=normal. KEY LIMITATION: MMSE misses mild cognitive impairment (MCI), especially in educated patients. MoCA (0-30, cutoff ≥26) is MORE SENSITIVE—tests executive function, visuospatial, abstraction. Use MoCA when suspecting early dementia.",

  219: "MMSE (0-30): 24-30=normal, 18-23=mild, 10-17=moderate, <10=severe. WHY MoCA OVER MMSE: (1) MoCA detects MCI missed by MMSE, (2) tests executive function better, (3) no ceiling effect in educated patients. MoCA cutoff: ≥26 normal, add 1 point if ≤12 years education.",

  315: "MMSE (0-30): 18-23=mild impairment. MMSE LIMITATIONS: misses MCI, poor executive function testing, ceiling effect. MoCA ADVANTAGES: ≥26=normal, more sensitive for early dementia, tests clock drawing/trails/abstraction. Board tip: Know when to use MoCA over MMSE.",

  386: "MMSE 18-23=mild impairment. CRITICAL: If patient scores 24-30 on MMSE but you suspect cognitive decline, USE MoCA. MoCA (0-30): ≥26=normal, <26=impaired. More sensitive for Parkinson's dementia, vascular dementia, frontotemporal dementia.",

  387: "Slow MMSE decline (29→26 over 3 years): too slow for Alzheimer's. Consider MoCA—more sensitive for MCI and early changes. MoCA tests executive function (trails, clock) that MMSE misses. Reconsider diagnosis or use MoCA for better sensitivity.",

  54: "SLUMS (0-30): More sensitive than MMSE for MCI and executive dysfunction. MoCA also superior to MMSE. Use SLUMS or MoCA when: (1) suspecting early dementia, (2) educated patients, (3) need executive function assessment. SLUMS: 27-30=normal, 21-26=MCI, 1-20=dementia (≥HS education).",

  218: "SLUMS (0-30) and MoCA (0-30): Both MORE SENSITIVE than MMSE for mild cognitive impairment. MoCA: ≥26=normal, <26=impaired (+1 point if ≤12 yrs education). Tests: visuospatial, naming, attention, language, abstraction, delayed recall, orientation. ~10 minutes."
};

let updateCount = 0;
data.forEach(q => {
  if (mocaUpdates[q.id]) {
    q.rationale = mocaUpdates[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`MoCA updates complete: Updated ${updateCount} questions`);
