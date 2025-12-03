const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const cypUpdates = {
  // Carbamazepine + inhibitors
  1: "CYP3A4 INHIBITORS (Cipro, erythromycin, grapefruit) + carbamazepine = TOXICITY. PHARMACOKINETICS = body affects drug (metabolism). Inhibitors SLOW metabolism → drug ACCUMULATES → toxicity. Mnemonic inhibitors: 'SICK FACES' - SSRIs, Isoniazid, Cimetidine, Ketoconazole, Fluconazole, Amiodarone, Ciprofloxacin, Erythromycin, Sulfonamides.",

  // Smoking + clozapine (CYP1A2)
  14: "CYP1A2: Smoking INDUCES (speeds up) metabolism of clozapine/olanzapine. Quit smoking → levels RISE 50% → toxicity risk. INDUCERS mnemonic: 'PC BRAS' - Phenytoin, Carbamazepine, Barbiturates, Rifampin, Alcohol (chronic), St. John's Wort, Smoking. REDUCE dose 25-50% when patient quits.",

  // Carbamazepine as inducer
  211: "Carbamazepine = potent CYP3A4 INDUCER. PHARMACOKINETICS: Inducers SPEED UP metabolism → LOWER drug levels → treatment failure. Affects: OCPs (pregnancy!), warfarin, anticonvulsants, antipsychotics. 'PC BRAS' = Phenytoin, Carbamazepine, Barbiturates, Rifampin, Alcohol, St. John's Wort.",

  // Fluconazole + quetiapine
  282: "Fluconazole INHIBITS CYP3A4 → quetiapine levels RISE → toxicity. KINETICS vs DYNAMICS: Pharmacokinetics = what BODY does to DRUG (ADME). Pharmacodynamics = what DRUG does to BODY (receptor effects). CYP interactions = pharmacoKINETIC. Reduce quetiapine dose.",

  // NSAIDs + lithium (not CYP but important kinetics)
  31: "NSAIDs + lithium = PHARMACOKINETIC interaction (not CYP). NSAIDs reduce renal clearance → lithium accumulates. KINETICS = ADME (Absorption, Distribution, Metabolism, Excretion). Lithium affected at Excretion step. Use Tylenol instead.",

  // CYP2D6 question
  29: "CYP2D6: metabolizes MANY psych meds (SSRIs, TCAs, antipsychotics, opioids). 10% Caucasians are POOR METABOLIZERS → high drug levels, toxicity. Inhibitors: fluoxetine, paroxetine, bupropion. Affected drugs: risperidone, aripiprazole, codeine→morphine conversion.",

  // High-yield CYP3A4
  234: "CYP3A4 is MOST COMMON CYP—metabolizes ~50% of drugs. HIGH-YIELD INHIBITORS: azole antifungals, macrolide antibiotics (erythro, clarithro), grapefruit, HIV protease inhibitors. INDUCERS: carbamazepine, phenytoin, rifampin, St. John's Wort. 3A4 = 'the big one.'",

  // Erythromycin + carbamazepine
  270: "Erythromycin (CYP3A4 inhibitor) + carbamazepine = carbamazepine TOXICITY (ataxia, diplopia, nausea). BOARD TIP: Inhibitors cause TOXICITY (drug levels UP). Inducers cause treatment FAILURE (drug levels DOWN). 'Inhibitors Increase, Inducers Impair.'",

  // Carbamazepine neural tube
  269: "Carbamazepine INDUCER: speeds metabolism of OTHER drugs (OCPs, warfarin). ITSELF is metabolized by CYP3A4. Adding inhibitor (erythromycin) → CBZ toxicity. Teratogen: neural tube defects. KINETICS mnemonic: 'Inducers make drugs go IN the toilet (subtherapeutic).'",

  // Olanzapine + smoking
  295: "Olanzapine + smoking: CYP1A2 INDUCED by smoking → low olanzapine levels. QUIT SMOKING → levels RISE → reduce dose 25-50%. Same for clozapine. Board pearl: 'Smoking speeds CYP1A2' (olanzapine, clozapine, caffeine, theophylline).",

  // SSRI + PPI
  392: "SSRI + PPI (omeprazole): PPIs inhibit CYP2C19 → can increase SSRI levels (citalopram, escitalopram). PHARMACOKINETIC interaction. Monitor for increased side effects. CYP2C19 poor metabolizers (~3% Caucasians, 15-20% Asians) already have higher levels.",

  // Cimetidine interactions
  245: "Cimetidine = potent CYP INHIBITOR (multiple CYPs: 3A4, 2D6, 1A2). Causes MANY drug interactions. Famotidine/ranitidine have FEWER interactions. Board tip: If asked 'which H2 blocker has most interactions?' = cimetidine. Inhibitor = levels go UP.",

  // Tegretol + erythromycin (specific question)
  326: "Erythromycin (inhibitor) + Tegretol (carbamazepine) = INCREASED Tegretol levels → TOXICITY. Inhibitor slows metabolism. KINETICS concept: Inhibitors block CYP enzymes → drug can't be broken down → accumulates. Signs: ataxia, diplopia, nystagmus, drowsiness.",

  421: "Tegretol + erythromycin: DECREASE Tegretol dose (or avoid combo). Erythromycin INHIBITS CYP3A4 → Tegretol accumulates. PHARMACOKINETICS summary: INHIBITORS = ↑ drug levels = toxicity. INDUCERS = ↓ drug levels = failure. 'I for Inhibitor = Increase.'",

  481: "Tegretol + erythromycin = DECREASE Tegretol. High-yield CYP facts: (1) 3A4 = most common CYP, (2) 2D6 = psych meds, (3) 1A2 = smoking induces, (4) Inhibitors → toxicity, (5) Inducers → failure. Mnemonic: 'SICK FACES inhibit, PC BRAS induce.'",

  // General drug interaction question
  207: "Wellbutrin (bupropion): CYP2D6 INHIBITOR—can raise levels of drugs metabolized by 2D6 (TCAs, antipsychotics). Also CYP2B6 substrate. PHARMACODYNAMIC effect: blocks NE/DA reuptake → treats depression/smoking. Distinguish: Kinetics = metabolism, Dynamics = receptor action."
};

let updateCount = 0;
data.forEach(q => {
  if (cypUpdates[q.id]) {
    q.rationale = cypUpdates[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`CYP450 updates complete: Updated ${updateCount} questions`);
