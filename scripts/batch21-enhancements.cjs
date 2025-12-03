const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  476: "PTSD therapy: EMDR, Prolonged Exposure (PE), CPT (Cognitive Processing Therapy) are evidence-based. CBT with trauma focus effective. Image rehearsal for nightmares. APA/VA guidelines support trauma-focused approaches.",

  477: "Alcohol withdrawal + hepatic disease: give IM LORAZEPAM (Ativan). Lorazepam metabolized by glucuronidation (not CYP450), safer in liver disease. Other benzos (diazepam, chlordiazepoxide) need hepatic metabolism.",

  478: "20-year-old social difficulties: still in IDENTITY VS ROLE CONFUSION (12-20 years). Forming sense of self. Next stage is Intimacy vs Isolation (20-40). Social struggles relate to identity formation challenges.",

  479: "8-year-old sexualized play: CALL CPS immediately. Age-inappropriate sexual knowledge suggests exposure to sexual activity. Mandatory reporting. Document objectively. Child protection takes priority over other considerations.",

  480: "Thought PROCESS vs CONTENT: PROCESS = how thoughts organized (logical, tangential, loose associations). CONTENT = what thoughts are about (delusions, SI, obsessions). Both documented in Mental Status Exam.",

  481: "Tegretol + erythromycin: DECREASE TEGRETOL. Erythromycin inhibits CYP3A4 → increases Tegretol levels → toxicity. Alternative: use azithromycin (less CYP interaction) or monitor levels closely and reduce dose.",

  482: "Appreciative inquiry: focuses on STRENGTHS AND HOPE, doesn't blame. Positive change methodology. Identifies what works, builds on successes. Solution-focused. 4-D cycle: Discover, Dream, Design, Destiny.",

  483: "Recovery model: gives HOPE to patient. Person-centered, empowerment-focused. Beyond symptom reduction—meaningful life despite illness. Self-determination. SAMHSA guiding principle. Not cure-focused.",

  484: "Executive function: DORSOLATERAL PREFRONTAL CORTEX. Planning, decision-making, working memory, attention, impulse control. Affected in ADHD, schizophrenia, depression. Matures fully around age 25.",

  485: "EMDR: therapy using EYE MOVEMENTS (or bilateral stimulation) to process trauma. Evidence-based for PTSD. 8-phase protocol. Desensitizes traumatic memories. Reduces intrusive symptoms.",

  486: "Weight-neutral mood stabilizer: LAMICTAL (lamotrigine). Doesn't cause weight gain, may cause slight loss. Good for bipolar depression. Other options (lithium, Depakote, atypicals) cause weight gain.",

  487: "Bowen family therapy: TRIANGULATION (involving third person to reduce dyad tension) and SELF-DIFFERENTIATION (maintaining self in relationships). Key concepts. Reduces emotional reactivity in family system.",

  488: "Osteoporosis prevention: WEIGHT-BEARING EXERCISE + STOP SMOKING. Also: calcium 1200mg, vitamin D 800-1000 IU daily. Limit alcohol and caffeine. Relevant for patients on SSRIs, steroids, antipsychotics.",

  489: "Clock drawing: tests RIGHT HEMISPHERE (visuospatial) and DORSOLATERAL PREFRONTAL (executive function, planning). Abnormal in dementia, stroke, frontal lobe lesions. Useful screening tool.",

  490: "Research dissemination: PEER-REVIEWED JOURNALS highest credibility. Expert review ensures quality. Conferences, newspapers reach broader audience but less rigorous. EBP relies on peer-reviewed evidence.",

  491: "Pregnancy teratogen: ACCUTANE (isotretinoin) Category X. Causes severe birth defects: craniofacial, cardiac, CNS abnormalities. iPLEDGE program mandates contraception + pregnancy tests. Absolute contraindication.",

  492: "Stimulant-induced tics: switch to GUANFACINE (alpha-2 agonist). Non-stimulant option that doesn't worsen tics. May actually improve tics. Once-daily dosing. Methamphetamine is a stimulant—would worsen tics.",

  493: "Depression with marital issues (4-6 months): INTERPERSONAL THERAPY (IPT) ideal. Focuses on relationships, role transitions. Time-limited (12-16 sessions). Also consider psychodynamic for deeper exploration.",

  494: "Medication reconciliation: ACE INHIBITORS for HEART FAILURE. First-line for HFrEF. PMHNP must know common medications across specialties. Also: hypertension, diabetic nephropathy. Reduce mortality in HF.",

  495: "DDAVP teaching: mother should say it 'DECREASES URINE PRODUCTION.' Synthetic ADH for enuresis. Give before bed. Watch for hyponatremia. Restrict evening fluids. Confirms understanding of mechanism.",

  496: "MAOI + tyramine crisis: HYPERTENSIVE EMERGENCY. Priority: IV PHENTOLAMINE (alpha-blocker) or nifedipine (calcium channel blocker). Reduces blood pressure. Supportive care. Avoid tyramine-containing foods on MAOIs.",

  497: "Social anxiety first-line: SSRIs or SNRIs. Paroxetine, sertraline FDA-approved. Beta-blockers for performance anxiety only (not generalized SAD). Benzos not first-line (dependence risk). CBT also effective.",

  498: "Antidepressant poop-out: TACHYPHYLAXIS. Loss of response after initial efficacy. Options: dose increase, augmentation, switch medications. Not same as treatment-resistant (which implies multiple failures).",

  499: "Clanging: speech based on SOUND rather than meaning. 'Store, door, floor, explore'—words connected by rhyme. Seen in mania, psychosis. Different from flight of ideas (loosely connected but meaningful).",

  500: "Persistent Depressive Disorder (Dysthymia): 2 YEARS minimum duration in adults (1 year in children/adolescents). Chronic depressed mood most days. Less severe than MDD but longer duration. May have double depression."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 21 complete: Updated ${updateCount} questions (476-500)`);
