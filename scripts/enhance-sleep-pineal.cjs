const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const sleepUpdates = {
  // Depression + insomnia question - add sleep neuroanatomy
  17: "DEPRESSION + INSOMNIA: Mirtazapine (Remeron) or trazodone—sedating. SLEEP NEUROANATOMY: PINEAL GLAND (epithalamus) secretes MELATONIN (darkness→production). Regulates CIRCADIAN RHYTHM via suprachiasmatic nucleus (SCN) in hypothalamus. Ramelteon=melatonin receptor agonist. Trazodone: 5HT2 antagonist + sedating H1 blockade.",

  // Sleep apnea - add sleep architecture
  265: "SLEEP APNEA: Snoring from upper airway obstruction. SLEEP STAGES: Stage 1-2=light sleep. Stage 3=slow-wave/deep (restorative). REM=dreaming, memory consolidation, atonia. CIRCADIAN RHYTHM: PINEAL GLAND→melatonin (peaks 2-4am). SUPRACHIASMATIC NUCLEUS (hypothalamus)=master clock, responds to light. Sleep apnea disrupts architecture.",

  // Sleep terror - add parasomnia info
  459: "SLEEP DISORDERS: Ask FAMILY HISTORY. PARASOMNIAS (sleepwalking, night terrors)=Stage 3/NREM, runs in families, no dream recall. NIGHTMARES=REM sleep, dream recall. SLEEP REGULATION: PINEAL GLAND→melatonin (darkness). HYPOTHALAMUS (SCN)=circadian pacemaker. BRAINSTEM (reticular activating system)=arousal. GABA/adenosine=sleep-promoting.",

  // SSRI discontinuation - has insomnia in symptoms
  25: "SSRI DISCONTINUATION: flu-like symptoms, dizziness, brain zaps, INSOMNIA. SEROTONIN + SLEEP: 5HT involved in sleep-wake cycle via RAPHE NUCLEI (brainstem). Abrupt SSRI stop→serotonin depletion→sleep disruption. PINEAL GLAND: melatonin synthesis involves serotonin→N-acetylserotonin→melatonin pathway. Paroxetine worst (short half-life).",

  // Add more sleep neuro content
  458: "NIGHTMARES (4-year-old): NORMAL developmental. SLEEP NEUROBIOLOGY: REM sleep=brainstem activation, prefrontal deactivation (dreams). NIGHT TERRORS=NREM (no recall). CIRCADIAN RHYTHM development: infants=polyphasic, children=consolidated. PINEAL GLAND matures; melatonin rhythm develops by 3-6 months. Screen time=blue light suppresses melatonin."
};

let updateCount = 0;
data.forEach(q => {
  if (sleepUpdates[q.id]) {
    q.rationale = sleepUpdates[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Sleep/pineal updates complete: Updated ${updateCount} questions`);
console.log('Added: Pineal gland, melatonin, circadian rhythm, sleep neuroanatomy');
