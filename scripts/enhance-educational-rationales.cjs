const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     ENHANCING RATIONALES TO BE TRULY EDUCATIONAL               ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let fixCount = 0;

// Educational rationales that explain WHY - board-prep focused
const educationalRationales = {
  // Carbamazepine interactions
  1: "CARBAMAZEPINE + CIPRO/ERYTHROMYCIN = DANGEROUS. These antibiotics are CYP3A4 INHIBITORS which BLOCK carbamazepine metabolism → carbamazepine levels RISE → TOXICITY (diplopia, ataxia, nystagmus, sedation). Why not acetaminophen, ibuprofen, aspirin? These do NOT significantly interact with carbamazepine. Board pearl: CYP3A4 inhibitors (macrolides, azoles, grapefruit) increase carbamazepine toxicity. CYP3A4 inducers decrease levels of other drugs.",

  // Bupropion in eating disorders
  4: "BUPROPION (Wellbutrin) is CONTRAINDICATED in eating disorders because it LOWERS THE SEIZURE THRESHOLD. Patients with bulimia/anorexia have electrolyte imbalances (hypokalemia, hyponatremia) that already increase seizure risk. Bupropion + electrolyte abnormalities = HIGH seizure risk. Fluoxetine (Prozac) is actually FDA-approved for bulimia. Board pearl: Also avoid bupropion with alcohol abuse, head trauma, seizure history.",

  // Lithium level
  6: "Therapeutic LITHIUM level: 0.6-1.2 mEq/L for MAINTENANCE. Why 0.8? It's in the optimal range. Why not 0.3? Subtherapeutic - won't prevent mood episodes. Why not 1.6 or 2.2? These are TOXIC (>1.5 = toxicity). Board pearl: Acute mania may use 0.8-1.2; maintenance 0.6-1.0; elderly 0.4-0.6. Draw trough level 12 hours post-dose.",

  // Lithium and TSH
  8: "Elevated TSH on lithium = HYPOTHYROIDISM. Lithium accumulates in thyroid gland and inhibits thyroid hormone release. Occurs in 20-30% of patients on long-term lithium. Treatment: Add levothyroxine (don't stop lithium if working well). Board pearl: Check TSH baseline and every 6-12 months. Lithium also causes nephrogenic diabetes insipidus (polyuria/polydipsia).",

  // Lithium toxicity causes
  10: "DEHYDRATION is the most common cause of lithium toxicity. Why? Lithium is reabsorbed with sodium in the kidney. Dehydration → sodium/water retention → more lithium reabsorbed → levels rise. Other causes: NSAIDs, ACE inhibitors, thiazides, low-salt diet, vomiting/diarrhea. Board pearl: Teach patients to maintain fluid intake, avoid NSAIDs, and hold lithium if ill with GI symptoms.",

  // Clozapine and smoking
  14: "When patient on clozapine QUITS SMOKING, REDUCE clozapine dose. Why? Cigarette smoke (PAHs, not nicotine) INDUCES CYP1A2 which metabolizes clozapine. No smoking = less CYP1A2 activity = clozapine accumulates = toxicity risk (sedation, seizures). Reduce dose by 25-50% when patient quits. Opposite: if patient STARTS smoking, may need to INCREASE dose.",

  // Fluoxetine for bulimia
  15: "FLUOXETINE (Prozac) 60mg is the ONLY FDA-approved medication for BULIMIA NERVOSA. Why 60mg (not 20mg)? Bulimia requires higher serotonergic activity to reduce binge-purge cycles. Why not other SSRIs? Only fluoxetine has FDA approval and robust evidence for this indication. Board pearl: CBT is first-line; fluoxetine is adjunct or for those who refuse/fail therapy.",

  // Depression with insomnia
  17: "MIRTAZAPINE (Remeron) or TRAZODONE for depression WITH insomnia. Why? Both have sedating properties. Mirtazapine: blocks H1 receptors (sedation) and 5-HT2A/2C (improves sleep architecture). Also increases appetite (good for depression with weight loss). Trazodone: blocks 5-HT2A and H1. Bupropion is activating (worse for insomnia), SSRIs can cause insomnia initially.",

  // Sertraline and meperidine
  20: "MEPERIDINE (Demerol) should be AVOIDED with SSRIs (sertraline). Why? Meperidine has serotonergic properties → combined with SSRI = SEROTONIN SYNDROME risk. Other opioids (morphine, hydrocodone, oxycodone) are safer because they don't significantly affect serotonin. Board pearl: Also avoid meperidine with MAOIs (even more dangerous). Tramadol also has serotonin syndrome risk with SSRIs.",

  // Benzo overdose reversal
  32: "FLUMAZENIL (Romazicon) reverses BENZODIAZEPINE overdose. Mechanism: Competitive antagonist at GABA-A receptor. Why not naloxone? That's for opioids. Caution: Flumazenil can precipitate SEIZURES in chronic benzo users or patients on benzos for seizure control. Board pearl: Use cautiously; supportive care often sufficient since benzos alone rarely fatal.",

  // Opioid overdose reversal
  33: "NALOXONE (Narcan) reverses OPIOID overdose. Classic triad: Pinpoint pupils + respiratory depression + decreased LOC = opioid overdose. Naloxone is a competitive opioid antagonist. Duration: 30-90 minutes (may need repeat dosing for long-acting opioids). Board pearl: IM naloxone for community use; consider starting at 0.4mg to avoid precipitated withdrawal.",

  // Alcohol withdrawal treatment
  34: "BENZODIAZEPINES are FIRST-LINE for alcohol withdrawal. Why? Both alcohol and benzos work on GABA-A receptors - cross-tolerance allows benzos to prevent withdrawal complications. Alcohol withdrawal can be FATAL (seizures, DTs). Commonly used: chlordiazepoxide (long-acting), lorazepam (hepatic impairment), diazepam (rapid onset). Board pearl: Use CIWA protocol for symptom-triggered dosing.",

  // MAT for opioid use disorder
  35: "BUPRENORPHINE or METHADONE for opioid use disorder with withdrawal (COWS 13). Why not naltrexone? Patient must be fully withdrawn (COWS should be 0, 7-10 days abstinent) before starting naltrexone - it would precipitate severe withdrawal. Buprenorphine (partial agonist) or methadone (full agonist) treats withdrawal AND cravings. Board pearl: Wait for COWS >8-12 before starting buprenorphine.",

  // Serotonin syndrome vs NMS
  37: "HYPERREFLEXIA and CLONUS = SEROTONIN SYNDROME (not NMS). Key differentiator: SS has hyperreflexia/clonus; NMS has lead-pipe rigidity and HYPOreflexia. Both have fever, altered mental status, autonomic instability. SS onset: rapid (hours). NMS onset: gradual (days). SS caused by serotonergic drugs; NMS by dopamine antagonists. Board pearl: This is a classic board question!",

  // PHQ-9 threshold
  42: "PHQ-9 ≥10 indicates MODERATE depression warranting treatment consideration. Scoring: 0-4 minimal, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20-27 severe. Why 10? Research shows this threshold has good sensitivity/specificity for major depression. Board pearl: Always assess question 9 (suicidal ideation) separately regardless of total score.",

  // MMSE scoring
  43: "MMSE score <24 suggests COGNITIVE IMPAIRMENT. Scoring: 30 = maximum. Mild impairment 20-24, moderate 10-20, severe <10. Adjust for education (lower cutoffs for less educated). MMSE less sensitive for MCI than MoCA. Tests: orientation, registration, attention, recall, language, visuospatial. Board pearl: MoCA ≤25 = impaired; SLUMS better for executive function.",

  // Piaget stages - Preoperational
  63: "PREOPERATIONAL stage (ages 2-7): Characterized by EGOCENTRISM (believes moon follows her), ANIMISM (stuffed animals have feelings), and magical thinking. Child cannot yet understand conservation or take others' perspectives. Board pearl: Piaget's stages: Sensorimotor (0-2), Preoperational (2-7), Concrete operational (7-11), Formal operational (11+).",

  // Piaget - Concrete operational
  64: "CONCRETE OPERATIONAL stage (ages 7-11): Child understands CONSERVATION (water volume same in different containers), REVERSIBILITY, and logical thinking about concrete objects. Can classify, seriate. Cannot yet think abstractly or hypothetically. Board pearl: If a child understands conservation but can't think abstractly, they're in concrete operational stage.",

  // Freud - Oedipus complex
  66: "PHALLIC STAGE (ages 3-6): Oedipus complex (boys attracted to mother, see father as rival) and Electra complex (girls). Freud's psychosexual theory. Child becomes aware of gender differences. Resolution: identification with same-sex parent. Board pearl: Stages: Oral (0-1), Anal (1-3), Phallic (3-6), Latency (6-puberty), Genital (puberty+).",

  // Freud - Latency
  67: "LATENCY STAGE (ages 6-puberty): Sexual impulses are dormant/sublimated. Focus on academics, same-sex friendships, skill development. No significant psychosexual conflict. Child develops ego and social skills. Follows phallic stage, precedes genital stage. Board pearl: Important for distinguishing normal developmental focus from pathology.",

  // 4-month milestones
  69: "4-MONTH MILESTONES: Holds head steady (since ~2 months), beginning to roll over (typically front-to-back first). NOT yet: sitting without support (6 months), crawling (8-10 months), walking (12 months). Board pearl: Red flags at 4 months: no head control, no social smile, no tracking objects.",
};

// Apply educational rationales
Object.entries(educationalRationales).forEach(([id, rationale]) => {
  const q = data.find(item => item.id === parseInt(id));
  if (q) {
    q.rationale = rationale;
    console.log(`✓ Q${id}: Enhanced rationale`);
    fixCount++;
  }
});

// Now let's also check for questions where the rationale doesn't mention the answer at all
console.log('\n=== FINDING RATIONALES THAT DONT MENTION THE ANSWER ===\n');

let mismatchCount = 0;
data.forEach(q => {
  const answer = q.options[q.correctAnswer].toLowerCase();
  const rationale = (q.rationale || '').toLowerCase();

  // Get meaningful words from answer (not common words)
  const answerWords = answer
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .filter(w => w.length > 3 && !['with', 'from', 'that', 'this', 'have', 'been', 'were', 'what', 'when', 'which', 'their', 'about', 'would', 'could', 'should', 'there', 'these', 'those', 'other'].includes(w));

  // Check if any answer word is in rationale
  const hasMatch = answerWords.some(w => rationale.includes(w));

  if (!hasMatch && answerWords.length > 0 && q.rationale && q.rationale.length > 50) {
    mismatchCount++;
    if (mismatchCount <= 10) {
      console.log(`Q${q.id}: "${q.options[q.correctAnswer].substring(0, 40)}..." not found in rationale`);
    }
  }
});

if (mismatchCount > 10) {
  console.log(`... and ${mismatchCount - 10} more`);
}
console.log(`\nTotal questions with potential answer/rationale mismatch: ${mismatchCount}`);

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\n${'═'.repeat(50)}`);
console.log(`Rationales enhanced: ${fixCount}`);
console.log('✓ Changes saved');
