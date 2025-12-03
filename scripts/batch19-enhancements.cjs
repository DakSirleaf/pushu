const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const enhancedRationales = {
  426: "Bowen Family Systems: TRIANGULATION = involving third party to reduce anxiety between two. SELF-DIFFERENTIATION = maintaining sense of self while in relationship. Key concepts for family therapy. Reduces emotional reactivity.",

  427: "Executive function: DORSOLATERAL PREFRONTAL CORTEX. Functions: planning, decision-making, working memory, attention, impulse control. Affected in ADHD, schizophrenia, dementia. Fully matures around age 25.",

  428: "Aggression: AMYGDALA processes fear/threat and triggers fight-or-flight. Overactive in PTSD, anxiety. HIPPOCAMPUS modulates memory/context. Prefrontal cortex regulates amygdala response. Limbic system key for emotional processing.",

  429: "Acute dystonia treatment: ALL anticholinergics work. Benztropine (Cogentin), diphenhydramine (Benadryl), trihexyphenidyl (Artane). Give IM/IV for rapid effect. Dystonia is EPS reaction to dopamine blockade. Medical emergency if affecting airway.",

  430: "Kava + benzodiazepines: AVOID combination. Both are CNS depressants. Additive sedation, respiratory depression risk. Kava also hepatotoxic. Teach patient: no mixing with alcohol, benzos, sedatives.",

  431: "Kava education: HEPATOTOXICITY main concern. FDA warning for liver damage. Can cause fulminant liver failure. Monitor LFTs. Avoid with liver disease, alcohol, hepatotoxic drugs. Report jaundice, dark urine.",

  432: "Fibromyalgia treatment: TCAs (amitriptyline), SNRIs (duloxetine, milnacipran). Also: pregabalin (Lyrica). NOT NSAIDs (don't help), NOT benzos (worsen fatigue). Exercise, CBT also helpful. Multimodal approach.",

  433: "Idealization: defense mechanism where deceased person viewed as perfect, all-good. Common in grief. Protects from ambivalent feelings. Eventually integrate realistic view of person. Different from denial.",

  434: "Metabolic syndrome assessment: HIP-TO-WAIST ratio or waist circumference (central adiposity key marker). Also: fasting glucose, lipid panel, blood pressure. Atypical antipsychotics increase metabolic syndrome risk.",

  435: "Lithium + NSAIDs (Indocin/Meloxicam): NSAIDs INCREASE lithium levels by decreasing renal clearance. DECREASE lithium dose or use Tylenol instead. All NSAIDs interact: ibuprofen, naproxen, indomethacin, meloxicam.",

  436: "Thought PROCESS vs CONTENT: PROCESS = how thoughts flow (logical, tangential, loose associations, circumstantial). CONTENT = what thoughts are about (delusions, suicidal ideation, obsessions). Both documented in MSE.",

  437: "Suicidal ideation documented in THOUGHT CONTENT. Content includes: SI/HI, delusions, obsessions, phobias, ideas of reference, overvalued ideas. Process describes the organization/flow of thinking.",

  438: "Reglan (metoclopramide): causes TARDIVE DYSKINESIA. Dopamine antagonist (like antipsychotics). FDA Black Box Warning for TD with prolonged use (>12 weeks). Also causes EPS, akathisia. Use alternative antiemetics when possible.",

  439: "Serial 7s (100-7=93-7=86...): tests CONCENTRATION AND ATTENTION. Part of MMSE. Also tests calculation. Alternative: spell WORLD backwards. Affected in delirium, dementia, anxiety, ADHD.",

  440: "Child with weight loss, irritability, increased energy: check LEAD LEVEL. Lead toxicity symptoms mimic psychiatric conditions. Also causes developmental delays, behavioral changes. Screen high-risk children.",

  441: "Thought disorder assessment: PROVERB INTERPRETATION tests abstract thinking. Concrete interpretation suggests schizophrenia, cognitive impairment. Example: 'Don't cry over spilled milk' → literal vs. figurative interpretation.",

  442: "ODD prevention of Conduct Disorder: PARENT TRAINING + BEHAVIOR THERAPY. Evidence-based. Consistent discipline, positive reinforcement, clear expectations. Early intervention key. Without treatment, 30% progress to CD.",

  443: "Acute dystonia: BENZTROPINE (Cogentin) IM/IV for rapid relief. Anticholinergic blocks acetylcholine, restores dopamine-acetylcholine balance. Also: diphenhydramine 50mg IM. Prevention: start with anticholinergic in high-risk patients.",

  444: "Kava HEPATOTOXICITY: primary education point. FDA warning for liver damage. Can be fatal. Teach patient: monitor for jaundice, abdominal pain, dark urine. Avoid alcohol. Check LFTs periodically.",

  445: "Kava + benzodiazepines: AVOID. Additive CNS depression, sedation, respiratory depression. Both affect GABA system. Also avoid with alcohol, other sedatives. Hepatotoxicity risk increases with polypharmacy.",

  446: "Inpatient child discharge planning: START PARENT TRAINING ON ADMISSION. Don't wait until discharge. Allows practice, questions, adjustment. Part of comprehensive discharge planning. Ensures continuity of care.",

  447: "Antisocial Personality Disorder: HIGH RISK for violence, homicide, incarceration. No remorse, disregard for others' rights. Also suicide risk. Psychopathy subset particularly dangerous. Limited treatment response.",

  448: "Serial 7s: tests CONCENTRATION and attention (also calculation). Part of cognitive assessment. Affected by delirium, anxiety, ADHD, dementia. Alternative: spell WORLD backwards. Document number of errors.",

  449: "HIV-associated dementia early signs: CONCENTRATION problems, slowed processing, memory impairment. Subcortical dementia pattern. Motor slowing common. Screen when CD4 <200. Antiretroviral therapy may improve cognition.",

  450: "Pseudodementia: REVERSIBLE with depression treatment. Depressed patients appear cognitively impaired but improve when depression treated. Key differentiator: effort on testing (say 'I don't know' vs trying). Treatable."
};

let updateCount = 0;
data.forEach(q => {
  if (enhancedRationales[q.id]) {
    q.rationale = enhancedRationales[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Batch 19 complete: Updated ${updateCount} questions (426-450)`);
