const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const syndromeUpdates = {
  // Turner syndrome
  311: "TURNER SYNDROME (45,XO): Females only. Features: short stature, webbed neck, shield chest, ovarian failure (infertility), coarctation of aorta. PMHNP considerations: Normal IQ but may have nonverbal learning disabilities, spatial deficits, social anxiety, ADHD. Hormone replacement needed. Support body image concerns.",

  // Fetal Alcohol Syndrome
  257: "FETAL ALCOHOL SYNDROME (FASD): Refer to Early Intervention (birth-3 yrs). PMHNP role: Manage ADHD (common), behavioral dysregulation, learning disabilities, impulsivity. Stimulants often needed. Parent training essential. No safe alcohol amount in pregnancy. Lifelong condition requiring ongoing support.",

  258: "FAS FACIAL FEATURES: Microcephaly, thin upper lip, smooth philtrum, short palpebral fissures, flat midface. PMHNP considerations: High rates of ADHD (60-95%), mood disorders, anxiety. Executive function deficits persist into adulthood. Avoid blame—focus on support. Structured environment helps.",

  272: "Alcohol in pregnancy: FASD is leading preventable cause of intellectual disability. PMHNP managing pregnant woman with AUD: NO naltrexone (limited safety data), behavioral interventions first, benzos ONLY for acute withdrawal. Screen offspring for FASD features and developmental delays."
};

// Add comprehensive syndrome question enhancements
// Find questions we can enhance with syndrome content

let updateCount = 0;
data.forEach(q => {
  if (syndromeUpdates[q.id]) {
    q.rationale = syndromeUpdates[q.id];
    updateCount++;
  }
});

// Now add new comprehensive rationales to existing developmental/genetic questions
const additionalUpdates = {
  // Autism question - add genetic syndrome context
  230: "AUTISM SPECTRUM: Poor response to verbal commands is characteristic—not defiance. Core: social communication deficits, restricted/repetitive behaviors. GENETIC LINKS: Fragile X (most common inherited cause), 22q11.2 deletion, tuberous sclerosis. PMHNP role: Manage irritability (risperidone, aripiprazole FDA-approved), anxiety, sleep. Visual supports help.",

  // Developmental milestones
  255: "MORO REFLEX: Present birth to 4-6 months. Persistence beyond 6 months = neurological concern. PMHNP should know: Primitive reflex retention seen in cerebral palsy, genetic syndromes. Refer for neurology workup. Early intervention referral if developmental delays noted.",

  256: "1-MONTH MOTOR: Palmar grasp, follows to midline, lifts head briefly. SYNDROME RED FLAGS at any age: Hypotonia (Down, Prader-Willi), hypertonia (CP), absent reflexes. Down syndrome: hypotonia, flat facies, single palmar crease, cognitive impairment, high Alzheimer's risk by age 40.",

  // Add to questions about intellectual disability or developmental
  403: "ADHD + PREFRONTAL CORTEX: Executive dysfunction. GENETIC SYNDROMES with ADHD features: Fragile X (long face, large ears, autism), 22q11.2 deletion (high schizophrenia risk), Williams (hypersocial), FASD. Always consider genetic etiology in ID + psychiatric symptoms. Genetic counseling referral.",

  // Personality/behavioral questions where syndromes relevant
  248: "ODD PREVENTION: Parent training + behavioral therapy. DIFFERENTIAL: Consider Prader-Willi (hyperphagia, tantrums, skin picking), FASD (impulsivity, poor judgment), 22q11.2 (behavioral problems, psychosis risk). Genetic syndromes need specialized behavioral approaches. Rule out medical causes of behavior."
};

data.forEach(q => {
  if (additionalUpdates[q.id]) {
    q.rationale = additionalUpdates[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Syndrome updates complete: Updated ${updateCount} questions`);
