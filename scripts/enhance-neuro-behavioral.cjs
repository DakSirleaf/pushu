const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const updates = {
  // ===============================
  // GRANULAR BRAIN REGIONS
  // ===============================

  86: "PREFRONTAL CORTEX (PFC) REGIONS: (1) DORSOLATERAL PFC=executive function, working memory, planning. (2) ORBITOFRONTAL=impulse control, social behavior. (3) VENTROMEDIAL=emotion regulation, decision-making. (4) ANTERIOR CINGULATE=error detection, motivation. PFC fully matures age 25. Damaged in TBI, atrophied in schizophrenia. ADHD=underactive PFC.",

  87: "AMYGDALA: Emotional center in LIMBIC SYSTEM (primitive brain). Fear/threat detection, fight-or-flight. HYPERACTIVE in anxiety/PTSD/phobias. HYPOACTIVE in psychopathy. Connected to hippocampus (memory) and PFC (regulation). Exposure therapy 'retrains' amygdala response. Located in temporal lobe medially.",

  88: "HIPPOCAMPUS: Memory formation in TEMPORAL LOBE. Part of LIMBIC SYSTEM. SHORT-TERM→LONG-TERM memory consolidation. SHRINKS with: chronic stress, cortisol, PTSD, Alzheimer's, chronic alcohol. BOARD TIP: 'Hippo'=memory. Connected to amygdala (emotional memories).",

  89: "FRONTAL LOBE: BROCA'S AREA (inferior frontal gyrus)=speech PRODUCTION. Damage=BROCA'S APHASIA (non-fluent, telegraphic speech, preserved comprehension). 'Broca=Broken speech.' Motor cortex=voluntary movement. Personality/behavior regulation. Phineas Gage case=frontal damage→personality change.",

  90: "TEMPORAL LOBE: WERNICKE'S AREA (posterior superior temporal)=speech COMPREHENSION. Damage=WERNICKE'S APHASIA (fluent but meaningless speech, 'word salad,' poor comprehension). 'Wernicke=Word comprehension.' Hippocampus=memory. Auditory cortex=hearing. Seizures cause déjà vu, olfactory hallucinations.",

  91: "PARIETAL LOBE: Sensory processing, spatial awareness, proprioception. RIGHT PARIETAL damage=HEMISPATIAL NEGLECT (ignores left side of body/world). Involved in clock drawing (visuospatial). GERSTMANN SYNDROME: finger agnosia, agraphia, acalculia, left-right confusion.",

  92: "OCCIPITAL LOBE: Visual processing (primary visual cortex). Damage=CORTICAL BLINDNESS (eyes work but brain can't interpret). CHARLES BONNET SYNDROME=visual hallucinations in blind/low vision patients. Occipital seizures cause visual auras, flashing lights.",

  93: "CEREBELLUM: Balance, coordination, motor learning (procedural memory). 'Little brain' behind brainstem. Damage=ATAXIA (unsteady gait), dysmetria (missing targets), intention tremor. ALCOHOL affects cerebellum→stumbling. Cerebellar stroke=acute vertigo, ataxia.",

  94: "PARKINSON'S: SUBSTANTIA NIGRA (midbrain) dopamine neuron degeneration. Part of BASAL GANGLIA circuit. Triad: tremor, rigidity, bradykinesia. DOPAMINE PATHWAY: Substantia nigra→striatum (nigrostriatal). Antipsychotics worsen PD (block dopamine). Lewy bodies=protein aggregates.",

  403: "ADHD + BRAIN: DORSOLATERAL PFC=executive dysfunction (planning, working memory). ORBITOFRONTAL=poor impulse control. ANTERIOR CINGULATE=motivation/attention deficits. Prefrontal-striatal circuits underactive. Stimulants INCREASE dopamine/NE in PFC. Fully matures age 25—explains why some 'outgrow' ADHD symptoms.",

  405: "AUTISM BRAIN: MIRROR NEURON SYSTEM dysfunction (frontal-parietal)—affects imitation, social learning. AMYGDALA abnormalities=emotion processing. LARGER brain volume early life, then normalizes. BASAL GANGLIA involved in repetitive behaviors. Social brain network (STS, fusiform) affected.",

  407: "CLOCK DRAWING: Tests (1) RIGHT HEMISPHERE=visuospatial skills, (2) DORSOLATERAL PFC=executive function, planning, sequencing. Abnormal in dementia, stroke, frontal lesions. Numbers crowded on one side=hemispatial neglect. Poor planning/sequencing=PFC damage.",

  427: "EXECUTIVE FUNCTION: DORSOLATERAL PREFRONTAL CORTEX. Planning, decision-making, working memory, cognitive flexibility, impulse control. AFFECTED IN: ADHD (underactive), schizophrenia (hypofrontality), depression, dementia, TBI. Fully matures around age 25. Tests: Trails B, WCST, clock drawing.",

  428: "AGGRESSION BRAIN CIRCUITS: AMYGDALA=threat detection, fear/anger. LIMBIC SYSTEM (primitive brain)=emotional responses. PREFRONTAL CORTEX=regulates amygdala ('top-down control'). When PFC fails to regulate amygdala→impulsive aggression. Seen in: TBI, antisocial PD, intoxication (alcohol disinhibits PFC).",

  484: "BRAIN REGIONS HIGH-YIELD: DORSOLATERAL PFC=executive function/working memory. ORBITOFRONTAL=impulse control/social. VENTROMEDIAL PFC=emotion/decision-making. ANTERIOR CINGULATE=error detection/motivation. AMYGDALA=fear/emotion. HIPPOCAMPUS=memory. BASAL GANGLIA=movement/habits. SUBSTANTIA NIGRA=dopamine (Parkinson's).",

  489: "CLOCK DRAWING TEST: RIGHT HEMISPHERE for visuospatial processing + DORSOLATERAL PREFRONTAL for executive planning. Tests: planning, organization, visuospatial, abstract thinking. Sensitive for dementia screening. MoCA includes clock drawing. Abnormal patterns indicate specific lesion locations.",

  // ===============================
  // PRIMITIVE/LIMBIC BRAIN & SLEEP
  // ===============================

  95: "ALZHEIMER'S: ACETYLCHOLINE deficiency from nucleus basalis of Meynert degeneration. HIPPOCAMPUS atrophies first (memory loss). Amyloid plaques + tau tangles. Treat: cholinesterase inhibitors (donepezil, rivastigmine). NMDA antagonist memantine for moderate-severe. Early PFC involvement=executive dysfunction.",

  // Add to a relevant question about sleep or melatonin
  // Will find sleep-related question

  // ===============================
  // CD vs ODD vs DMDD
  // ===============================

  374: "DMDD vs ODD vs CD COMPARISON: DMDD=severe CHRONIC irritability + temper outbursts ≥3x/week × 12 months, onset <10 yrs, irritable BETWEEN outbursts. ODD=angry/irritable mood + defiant behavior + vindictiveness × 6 months, developmentally inappropriate. CD=aggression, destruction, deceitfulness, rule violation. PROGRESSION: ODD(30%)→CD(40%)→Antisocial PD. DMDD prevents bipolar over-diagnosis in children.",

  248: "ODD→CONDUCT DISORDER PREVENTION: PARENT MANAGEMENT TRAINING (PMT) + BEHAVIOR THERAPY. Evidence-based. ODD vs DMDD: ODD=defiance/vindictiveness, DMDD=severe irritability. ODD vs CD: ODD=angry/defiant, CD=aggression/destruction/deceit/rule violations. 30% ODD progresses to CD without intervention. Early intervention CRITICAL.",

  442: "PREVENTING ODD→CD: PARENT TRAINING (PMT) is GOLD STANDARD. Teaches: consistent discipline, positive reinforcement, ignoring minor behaviors, time-out technique. DIFFERENTIAL: ODD (defiant)→CD (aggressive/destructive)→Antisocial PD (≥18 yrs). DMDD is NOT on this pathway—it's mood disorder, not conduct problem. DMDD=chronic irritability; ODD=defiance.",

  110: "ANTISOCIAL PD: Requires ≥18 years + history of CONDUCT DISORDER before age 15. TRAJECTORY: ODD(childhood)→CD(adolescence)→Antisocial PD(adulthood). CD DIAGNOSTIC CRITERIA: aggression (bullying, fighting, weapons), destruction (fire-setting, vandalism), deceitfulness (lying, stealing), rule violations (truancy, running away). Callous-unemotional traits=worse prognosis.",

  447: "ANTISOCIAL PD: CANNOT diagnose <18 years—use CONDUCT DISORDER instead. CD CRITERIA: ≥3 behaviors in past year from 4 categories: (1) aggression to people/animals, (2) property destruction, (3) deceitfulness/theft, (4) serious rule violations. CD + CALLOUS-UNEMOTIONAL TRAITS=limited prosocial emotions specifier=worse prognosis, psychopathy precursor.",

  // ===============================
  // WERNICKE'S ENCEPHALOPATHY & THIAMINE
  // ===============================

  34: "ALCOHOL WITHDRAWAL + WERNICKE'S PREVENTION: Give THIAMINE (B1) BEFORE glucose in alcoholics! Glucose without thiamine→precipitates Wernicke's encephalopathy. WERNICKE'S TRIAD: Confusion, Ataxia, Ophthalmoplegia (eye paralysis). Untreated→KORSAKOFF'S SYNDROME (permanent memory loss, confabulation). 'Beer before bread' = thiamine first.",

  45: "CIWA-Ar (0-67) for alcohol WITHDRAWAL severity. ALWAYS give THIAMINE (100mg IV/IM) to prevent WERNICKE'S ENCEPHALOPATHY. Chronic alcohol→thiamine deficiency→brain damage. WERNICKE'S=acute (confusion, ataxia, eye problems). KORSAKOFF'S=chronic (anterograde amnesia, confabulation). HEPATIC ENCEPHALOPATHY=different (liver failure→ammonia→asterixis, confusion).",

  416: "ALCOHOL WITHDRAWAL + HEPATIC DISEASE: Use LORAZEPAM (Ativan)—metabolized by glucuronidation, NOT CYP450 (safer in liver failure). SIGNS: tremors, sweating, tachycardia, anxiety, seizures (24-48hr), DTs (48-96hr). HEPATIC ENCEPHALOPATHY=different: liver can't clear ammonia→asterixis (flapping tremor), confusion, personality changes. Lactulose treats hepatic encephalopathy.",

  477: "ALCOHOL + LIVER: LORAZEPAM for withdrawal (glucuronidation metabolism). HEPATIC ENCEPHALOPATHY vs ALCOHOL WITHDRAWAL: Hepatic=ammonia toxicity (asterixis, confusion, reversed sleep cycle, lactulose treatment). Alcohol withdrawal=GABA underactivity (tremors, seizures, DTs, benzo treatment). WERNICKE'S=thiamine deficiency (confusion, ataxia, eye signs).",

  417: "CIWA PROTOCOL: 8-15=mild (PRN benzos). ≥16=moderate-severe (scheduled benzos q2h). CRITICAL: Give THIAMINE before IV dextrose. ENCEPHALOPATHIES IN ALCOHOLICS: (1) WERNICKE'S=acute thiamine deficiency (reversible if caught early). (2) KORSAKOFF'S=chronic thiamine (irreversible confabulation). (3) HEPATIC=liver failure/ammonia (asterixis, treat with lactulose).",

  // ===============================
  // INTOXICATION vs WITHDRAWAL
  // ===============================

  // Alcohol
  93: "CEREBELLUM + ALCOHOL: Acute intoxication affects cerebellum→ataxia, slurred speech. CHRONIC ALCOHOL EFFECTS: Cerebellar degeneration, Wernicke's encephalopathy (thiamine), Korsakoff's (memory), peripheral neuropathy. INTOXICATION=CNS depression. WITHDRAWAL=CNS hyperexcitability (seizures, DTs). Opposite presentations.",

  // Will update withdrawal questions with intox vs withdrawal comparison

  31: "NSAIDs + LITHIUM: INTOX vs WITHDRAWAL TEACHING: LITHIUM TOXICITY (levels >1.5)=tremor, ataxia, confusion, seizures. No true 'withdrawal' from lithium—but stopping abruptly→mood episode relapse. OPIOID INTOXICATION=pinpoint pupils, respiratory depression, sedation. OPIOID WITHDRAWAL=dilated pupils, tachycardia, GI symptoms, piloerection.",

  46: "COWS for OPIOID WITHDRAWAL. INTOX vs WITHDRAWAL COMPARISON: OPIOID INTOXICATION: pinpoint pupils (MIOSIS), respiratory depression, sedation, constipation, bradycardia. OPIOID WITHDRAWAL: dilated pupils (MYDRIASIS), tachycardia, diarrhea, lacrimation, rhinorrhea, piloerection ('goosebumps'), yawning. Mnemonic: 'Intox=everything SMALL/SLOW, Withdrawal=everything BIG/FAST.'",

  225: "COWS (0-48): INTOXICATION vs WITHDRAWAL SIGNS: OPIOIDS—Intox: MIOSIS (pinpoint pupils), bradycardia, respiratory depression, sedation. Withdrawal: MYDRIASIS (dilated pupils), tachycardia, diarrhea, yawning, piloerection. STIMULANTS—Intox: mydriasis, tachycardia, hypertension, hyperthermia, agitation. Withdrawal: fatigue, hypersomnia, depression, increased appetite.",

  226: "CIWA-Ar: ALCOHOL INTOX vs WITHDRAWAL: INTOXICATION: slurred speech, ataxia, sedation, disinhibition, nystagmus. WITHDRAWAL: tremor, anxiety, tachycardia, hypertension, diaphoresis, seizures (24-48hr), DTs (48-96hr with hallucinations). STIMULANT COMPARISON—Intox: euphoria, tachycardia, dilated pupils. Withdrawal: crash, depression, hypersomnia.",

  // Add comprehensive intox/withdrawal to appropriate questions
  33: "FLUMAZENIL for BENZO OVERDOSE. INTOX vs WITHDRAWAL TABLE: BENZODIAZEPINES—Intoxication: sedation, ataxia, slurred speech, respiratory depression. Withdrawal: anxiety, insomnia, tremor, SEIZURES (life-threatening), psychosis. ALCOHOL similar pattern. OPIOIDS—Intoxication: miosis, respiratory depression, sedation. Withdrawal: mydriasis, tachycardia, GI symptoms (NOT life-threatening but miserable)."
};

// Add a new comprehensive question enhancement for intox vs withdrawal comparison
const intoxWithdrawalTable = {
  // Find a good substance use question to add this comprehensive comparison
};

let updateCount = 0;
data.forEach(q => {
  if (updates[q.id]) {
    q.rationale = updates[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Neuro-behavioral updates complete: Updated ${updateCount} questions`);
console.log('Topics covered: Brain regions, CD/ODD/DMDD, Wernicke encephalopathy, Intox vs Withdrawal');
