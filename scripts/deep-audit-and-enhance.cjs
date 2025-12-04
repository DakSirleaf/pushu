const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     DEEP AUDIT AND ENHANCEMENT                                 ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const issues = [];
let fixCount = 0;

// ============================================================================
// PART 1: Find questions where rationale doesn't mention the correct answer
// ============================================================================

console.log('=== CHECKING ANSWER/RATIONALE ALIGNMENT ===\n');

data.forEach(q => {
  const correctAnswer = q.options[q.correctAnswer];
  const rationale = q.rationale || '';

  // Extract key terms from correct answer (first word or drug name)
  const answerWords = correctAnswer.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .filter(w => w.length > 3);

  // Check if any key word from answer appears in rationale
  const rationalelow = rationale.toLowerCase();
  const hasMatch = answerWords.some(word => rationalelow.includes(word));

  if (!hasMatch && answerWords.length > 0 && rationale.length > 0) {
    // This might be a mismatch
    issues.push({
      id: q.id,
      type: 'POSSIBLE_MISMATCH',
      answer: correctAnswer,
      rationaleStart: rationale.substring(0, 100)
    });
  }
});

console.log(`Found ${issues.length} questions with possible answer/rationale mismatches`);

// ============================================================================
// PART 2: Find ALL parenthetical content in options and remove
// ============================================================================

console.log('\n=== REMOVING ALL ANSWER-REVEALING PARENTHETICAL CONTENT ===\n');

let parentheticalRemovals = 0;

// Patterns that give away answers
const revealingPatterns = [
  /\s*\([^)]*safe[^)]*\)/gi,
  /\s*\([^)]*first[- ]?line[^)]*\)/gi,
  /\s*\([^)]*correct[^)]*\)/gi,
  /\s*\([^)]*best[^)]*\)/gi,
  /\s*\([^)]*preferred[^)]*\)/gi,
  /\s*\([^)]*treatment[^)]*\)/gi,
  /\s*\([^)]*moderate[^)]*\)/gi,
  /\s*\([^)]*severe[^)]*\)/gi,
  /\s*\([^)]*mild[^)]*\)/gi,
  /\s*\([^)]*normal[^)]*\)/gi,
  /\s*\([^)]*abnormal[^)]*\)/gi,
  /\s*\([^)]*therapeutic[^)]*\)/gi,
  /\s*\([^)]*toxic[^)]*\)/gi,
  /\s*\([^)]*subtherapeutic[^)]*\)/gi,
  /\s*\([^)]*indicated[^)]*\)/gi,
  /\s*\([^)]*contraindicated[^)]*\)/gi,
  /\s*\([^)]*teratogen[^)]*\)/gi,
  /\s*\([^)]*category [a-dx][^)]*\)/gi,
  /\s*\([^)]*high risk[^)]*\)/gi,
  /\s*\([^)]*low risk[^)]*\)/gi,
  /\s*\([^)]*effective[^)]*\)/gi,
  /\s*\([^)]*ineffective[^)]*\)/gi,
  /\s*\([^)]*choice[^)]*\)/gi,
  /\s*\([^)]*gold standard[^)]*\)/gi,
  /\s*\([^)]*relatively[^)]*\)/gi,
];

// Also patterns with dashes that give hints
const dashPatterns = [
  /\s+-\s+[^,]+safe[^,]*/gi,
  /\s+-\s+[^,]+teratogen[^,]*/gi,
  /\s+-\s+[^,]+first[- ]?line[^,]*/gi,
  /\s+-\s+[^,]+treatment of choice[^,]*/gi,
  /\s+-\s+[^,]*category [a-dx][^,]*/gi,
  /\s+-\s+[^,]*high risk[^,]*/gi,
];

data.forEach(q => {
  q.options = q.options.map((opt, idx) => {
    let cleaned = opt;
    let wasChanged = false;

    revealingPatterns.forEach(pattern => {
      if (pattern.test(cleaned)) {
        cleaned = cleaned.replace(pattern, '');
        wasChanged = true;
      }
    });

    dashPatterns.forEach(pattern => {
      if (pattern.test(cleaned)) {
        cleaned = cleaned.replace(pattern, '');
        wasChanged = true;
      }
    });

    if (wasChanged) {
      parentheticalRemovals++;
      console.log(`Q${q.id} Opt${idx}: "${opt}" → "${cleaned.trim()}"`);
    }

    return cleaned.trim();
  });
});

console.log(`\nRemoved revealing content from ${parentheticalRemovals} options`);

// ============================================================================
// PART 3: Enhance rationales with educational board-style content
// ============================================================================

console.log('\n=== ENHANCING RATIONALES WITH BOARD-STYLE CONTENT ===\n');

// Key topics that need comprehensive rationales
const educationalEnhancements = {
  // Antipsychotics - EPS
  38: "HALOPERIDOL (Haldol) = HIGHEST EPS risk among antipsychotics. First-generation (typical) antipsychotics block D2 receptors in nigrostriatal pathway causing EPS. Risk ranking: High-potency typicals (haloperidol, fluphenazine) > Low-potency typicals (chlorpromazine) > Second-generation atypicals. EPS includes: acute dystonia (hours-days), akathisia (days-weeks), parkinsonism (weeks), tardive dyskinesia (months-years). Treatment: Benztropine or diphenhydramine for acute dystonia; reduce dose or switch to atypical for other EPS.",

  // QTc prolongation
  27: "QTc PROLONGATION risk with antipsychotics - highest risk: ZIPRASIDONE (Geodon), thioridazine, IV haloperidol. QTc >500ms or increase >60ms from baseline = high risk for Torsades de Pointes. Risk factors: female sex, hypokalemia, hypomagnesemia, bradycardia, congenital long QT, concurrent QTc-prolonging drugs. Before starting high-risk antipsychotic: baseline ECG, electrolytes. Avoid combinations of QTc-prolonging drugs. Ziprasidone contraindicated with other QTc-prolonging agents.",

  // Clozapine specific
  28: "CLOZAPINE is the ONLY antipsychotic proven effective for TREATMENT-RESISTANT SCHIZOPHRENIA (failed 2+ adequate antipsychotic trials). Requires REMS program for agranulocytosis monitoring (risk ~1%). ANC monitoring: weekly x 6 months, biweekly x 6 months, then monthly. Other serious risks: myocarditis (first month), seizures (dose-related, >600mg), severe constipation (can be fatal - monitor bowel function), metabolic syndrome. Despite risks, significantly reduces suicidality in schizophrenia.",

  // Bupropion contraindications
  4: "BUPROPION (Wellbutrin) CONTRAINDICATIONS: (1) Seizure disorder - lowers seizure threshold, (2) EATING DISORDERS (anorexia, bulimia) - electrolyte imbalances increase seizure risk, (3) Concurrent MAOIs, (4) Abrupt alcohol/benzo withdrawal. Seizure risk is dose-dependent (0.4% at 450mg). Also avoid in patients with history of head trauma, brain tumor. NOT associated with sexual dysfunction or weight gain - often used for these reasons. Good choice for depression with fatigue/low energy.",

  // SSRIs and bleeding
  15: "SSRIs increase BLEEDING RISK by inhibiting serotonin uptake in platelets (serotonin needed for platelet aggregation). Risk highest when combined with NSAIDs, aspirin, or anticoagulants. GI bleeding risk increased 3-fold with SSRI alone, 6-fold with SSRI + NSAID. Clinical pearls: Consider PPI if prescribing SSRI + NSAID; use caution in patients on anticoagulants; watch for bruising, GI bleeding. All SSRIs have this effect - not specific to one agent.",

  // MAOIs dietary restrictions
  18: "MAOIs (phenelzine, tranylcypromine, selegiline patch >6mg) require TYRAMINE-RESTRICTED DIET to prevent hypertensive crisis. High tyramine foods: aged cheeses, cured meats, tap beer, soy sauce, sauerkraut, overripe bananas. Symptoms of tyramine reaction: severe headache, hypertension, diaphoresis, can progress to stroke/death. Drug interactions: meperidine (serotonin syndrome), sympathomimetics (hypertensive crisis). Wash-out periods: 2 weeks before starting MAOI after stopping other antidepressants; 2 weeks after stopping MAOI before starting other drugs.",

  // Lithium drug interactions
  207: "ACE INHIBITORS + LITHIUM = DANGEROUS interaction. ACE inhibitors decrease renal lithium clearance, can DOUBLE lithium levels causing toxicity. Same risk with ARBs. Other drugs that increase lithium: NSAIDs, thiazide diuretics (not loop diuretics), metronidazole. Drugs that decrease lithium: caffeine, theophylline, acetazolamide. When starting ACE inhibitor in patient on lithium: reduce lithium dose by 25-50%, check level in 5-7 days, monitor for toxicity (tremor, ataxia, confusion, GI symptoms).",

  // Carbamazepine interactions
  270: "CARBAMAZEPINE is a potent CYP3A4 INDUCER - decreases levels of many drugs including: OCPs (contraceptive failure), warfarin, valproate, lamotrigine, atypical antipsychotics. Also auto-induces own metabolism. CYP3A4 INHIBITORS increase carbamazepine levels causing toxicity: erythromycin, clarithromycin, ketoconazole, grapefruit juice, cimetidine. Carbamazepine toxicity: diplopia, ataxia, nystagmus, drowsiness. HLA-B*1502 screening required in Asian patients (risk of SJS/TEN).",

  // Pregnancy categories
  151: "PSYCHIATRIC MEDICATIONS IN PREGNANCY - Risk categories: SAFEST: Lamotrigine (mood stabilizer), most SSRIs (sertraline preferred - most data). MODERATE RISK: Lithium (Ebstein's anomaly 1/1000 vs 1/20000 baseline). CONTRAINDICATED: Valproate (neural tube defects, lower IQ), Carbamazepine (facial abnormalities). Benzodiazepines: avoid first trimester (cleft palate), third trimester (floppy infant syndrome). General principle: untreated maternal mental illness also poses risks - weigh benefits vs risks individually.",

  // Akathisia vs anxiety
  259: "AKATHISIA vs ANXIETY - commonly confused. Akathisia: subjective restlessness + objective motor restlessness (pacing, inability to sit still, leg swinging). Caused by dopamine blockade. Onset: usually within days-weeks of starting/increasing antipsychotic. Treatment: reduce dose, switch to lower-risk agent, or add propranolol (first-line), benzodiazepine, or anticholinergic. If unrecognized and antipsychotic increased (thinking it's anxiety), akathisia worsens. Associated with suicidal ideation - take seriously.",

  // Tardive dyskinesia
  260: "TARDIVE DYSKINESIA (TD): involuntary movements of face, tongue, jaw, extremities developing after months-years of antipsychotic exposure. Risk factors: older age, female sex, longer duration, higher doses, first-generation antipsychotics. May be irreversible. Prevention: use lowest effective dose, monitor with AIMS scale. Treatment: discontinue causative agent if possible (may worsen initially), switch to clozapine (lowest TD risk), FDA-approved treatments: valbenazine (Ingrezza), deutetrabenazine (Austedo) - both VMAT2 inhibitors.",

  // Alcohol withdrawal timeline
  417: "ALCOHOL WITHDRAWAL TIMELINE: 6-12h: tremor, anxiety, headache, GI upset, palpitations. 12-24h: withdrawal seizures (peak 24h, usually generalized tonic-clonic). 24-48h: alcoholic hallucinosis (visual hallucinations with clear sensorium). 48-96h: DELIRIUM TREMENS (DTs) - confusion, agitation, fever, autonomic instability, hallucinations, mortality 5-15% untreated. CIWA-Ar score guides treatment: <10 (may not need meds), 10-15 (PRN benzos), >15 (scheduled benzos). Benzodiazepines are first-line for all stages.",

  // Opioid withdrawal
  416: "OPIOID WITHDRAWAL is extremely uncomfortable but NOT life-threatening (unlike alcohol/benzo withdrawal). Symptoms: lacrimation, rhinorrhea, yawning, piloerection, mydriasis, GI upset, muscle aches. Timeline: Short-acting opioids (heroin): onset 8-12h, peak 36-72h. Long-acting (methadone): onset 12-48h, peak day 3-8. COWS score ≥8-12 = moderate withdrawal, appropriate for buprenorphine induction. Starting buprenorphine too early causes PRECIPITATED WITHDRAWAL (acute severe symptoms due to buprenorphine's partial agonist activity displacing full agonist).",

  // GAD-7 scoring
  43: "GAD-7 (Generalized Anxiety Disorder 7-item scale): Score range 0-21. Cutoffs: 5-9 (mild), 10-14 (moderate), 15-21 (severe). Score ≥10 suggests clinically significant anxiety warranting treatment consideration. Questions assess: feeling nervous, unable to stop worrying, worrying too much, trouble relaxing, restless, irritable, afraid something awful will happen. Time frame: past 2 weeks. Used for screening and monitoring treatment response. Can also screen for panic disorder, social anxiety, PTSD.",

  // PHQ-9 detailed
  44: "PHQ-9 (Patient Health Questionnaire-9): Score range 0-27. Cutoffs: 5-9 (mild), 10-14 (moderate), 15-19 (moderately severe), 20-27 (severe). Score ≥10 is clinical threshold for treatment consideration. Questions map to DSM-5 MDD criteria: anhedonia, depressed mood, sleep, energy, appetite, guilt, concentration, psychomotor changes, suicidal ideation. Question 9 (suicidal thoughts) requires direct assessment regardless of total score. Time frame: past 2 weeks.",

  // Erikson stages
  68: "ERIKSON'S PSYCHOSOCIAL STAGES - Older adults (65+): INTEGRITY vs DESPAIR. Successful resolution: wisdom, acceptance of life lived, peace with mortality. Unsuccessful: despair, regret, fear of death. Other key stages for boards: Infancy (Trust vs Mistrust), Toddler (Autonomy vs Shame), Preschool (Initiative vs Guilt), School age (Industry vs Inferiority), Adolescence (Identity vs Role Confusion), Young adult (Intimacy vs Isolation), Middle adult (Generativity vs Stagnation).",

  // PTSD treatment
  72: "PTSD FIRST-LINE TREATMENTS: Psychotherapy: Prolonged Exposure (PE), Cognitive Processing Therapy (CPT), EMDR (Eye Movement Desensitization and Reprocessing). All are trauma-focused therapies. Medications: SSRIs (sertraline, paroxetine - FDA approved), SNRIs (venlafaxine). Second-line: prazosin for nightmares. NOT recommended: benzodiazepines (may worsen outcomes, interfere with extinction learning). Important: trauma-focused therapy is preferred over medication alone. Combination may be beneficial.",

  // Tarasoff
  85: "TARASOFF DUTY: When patient makes credible threat against identifiable victim, clinician has DUTY TO PROTECT that victim. Options: (1) Warn intended victim directly, (2) Notify police, (3) Hospitalize patient. Varies by state - some require warning, others allow other protective actions. Does NOT apply to: vague threats, threats against self, threats without identifiable victim. Balance: maintain therapeutic alliance while fulfilling legal duty. Document assessment thoroughly.",
};

Object.entries(educationalEnhancements).forEach(([id, rationale]) => {
  const q = data.find(item => item.id === parseInt(id));
  if (q) {
    q.rationale = rationale;
    fixCount++;
  }
});

console.log(`Enhanced ${Object.keys(educationalEnhancements).length} rationales with comprehensive board-style content`);

// ============================================================================
// PART 4: Ensure all questions have proper structure
// ============================================================================

console.log('\n=== VALIDATING QUESTION STRUCTURE ===\n');

let structureIssues = 0;
data.forEach(q => {
  if (!q.rationale || q.rationale.length < 50) {
    structureIssues++;
    if (structureIssues <= 5) {
      console.log(`Q${q.id}: Short/missing rationale (${(q.rationale || '').length} chars)`);
    }
  }
  if (q.correctAnswer < 0 || q.correctAnswer > 3) {
    console.log(`Q${q.id}: Invalid correctAnswer index: ${q.correctAnswer}`);
  }
  if (!q.options || q.options.length !== 4) {
    console.log(`Q${q.id}: Invalid options array`);
  }
});

if (structureIssues > 5) {
  console.log(`... and ${structureIssues - 5} more questions with short rationales`);
}

// ============================================================================
// SAVE
// ============================================================================

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n════════════════════════════════════════');
console.log(`Rationales enhanced: ${Object.keys(educationalEnhancements).length}`);
console.log(`Answer hints removed: ${parentheticalRemovals}`);
console.log(`Total fixes: ${fixCount}`);
console.log('✓ All changes saved to questions.json');
