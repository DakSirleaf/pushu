const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     MAPPING QUESTIONS TO ANCC PMHNP BOARD DOMAINS              ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Official ANCC PMHNP Exam Domains (2024)
// Domain 1: Scientific Foundation (~15%)
// Domain 2: Advanced Practice Skills (~30%)
// Domain 3: Diagnosis and Treatment (~30%)
// Domain 4: Psychotherapy and Related Theories (~15%)
// Domain 5: Ethical, Legal, and Systems-Based Practice (~10%)

const domainMapping = {
  // Domain 1: Scientific Foundation (15%)
  'Neuroscience & Pathophysiology': 1,
  'Neuroscience & Neuroanatomy': 1,
  'Neurobiology': 1,
  'Genetics': 1,
  'Research and Statistics': 1,
  'Research Methodology': 1,
  'Research Ethics': 1,
  'Research': 1,
  'Research/Pharmacology': 1,
  'Neurological Signs': 1,
  'Neurological Examination': 1,
  'Neurological Disorders': 1,
  'Neuropsychiatry': 1,

  // Domain 2: Advanced Practice Skills (30%)
  'Assessment Scales & Screening': 2,
  'Mental Status Assessment': 2,
  'Depression Assessment': 2,
  'Anxiety Assessment': 2,
  'Substance Use Assessment': 2,
  'Geriatric Assessment': 2,
  'Cardiac Assessment': 2,
  'Cognitive Assessment': 2,
  'Suicide Risk Assessment': 2,
  'Risk Assessment': 2,
  'Assessment': 2,
  'Interviewing Techniques': 2,
  'Pediatric Assessment': 2,
  'Neonatal Assessment': 2,
  'Medical Assessment': 2,
  'ADHD Screening': 2,
  'Differential Diagnosis': 2,
  'Medical Conditions': 2,

  // Domain 3: Diagnosis and Treatment (30%)
  'Pharmacology': 3,
  'Antidepressants - Pharmacology': 3,
  'Antidepressants - Adverse Effects': 3,
  'Serotonin Syndrome': 3,
  'Lithium - Side Effects': 3,
  'Lithium Monitoring': 3,
  'Medications - Psychiatric Side Effects': 3,
  'Mood Stabilizers - Therapeutic Levels': 3,
  'Mood Stabilizers - Side Effects': 3,
  'Mood Stabilizers - Toxicity': 3,
  'Mood Stabilizers - Safety': 3,
  'Mood Stabilizers - Drug Interactions': 3,
  'Mood Stabilizers - Serious Adverse Effects': 3,
  'Mood Stabilizers - Screening': 3,
  'Mood Stabilizers - Indications': 3,
  'Mood Stabilizers - Dosing': 3,
  'Drug Interactions': 3,
  'Cardiovascular Medications': 3,
  'Cardiovascular Pharmacology': 3,
  'Pregnancy and Medications': 3,
  'Geriatric Pharmacology': 3,
  'Gastrointestinal Medications': 3,
  'Medication Side Effects': 3,
  'Antipsychotic Side Effects': 3,
  'Serious Adverse Effects': 3,
  'Medication Monitoring': 3,
  'Anticonvulsants': 3,
  'Laboratory Monitoring': 3,
  'Antibiotic Side Effects': 3,
  'Pediatric Pharmacology': 3,
  'Endocrine Medications': 3,
  'Antipsychotic Emergencies': 3,
  'Medication Management': 3,
  'Valproate Monitoring': 3,
  'Antipsychotic Monitoring': 3,
  'Clozapine Monitoring': 3,
  'Movement Disorders': 3,
  'Medication-Induced Depression': 3,
  'Medication-Induced Mania': 3,
  'Diagnostic Criteria (DSM-5)': 3,
  'Diagnosis': 3,
  'Anxiety Disorders': 3,
  'Eating Disorders': 3,
  'Sleep Disorders': 3,
  'Personality Disorders': 3,
  'Dementia Types': 3,
  'Autism Spectrum Disorder': 3,
  'Treatment Guidelines': 3,
  'Treatment': 3,
  'Treatment Modalities': 3,
  'PTSD Treatment': 3,
  'ADHD Treatment': 3,
  'Bipolar Disorder Treatment': 3,
  'Bipolar Treatment': 3,
  'Geriatric Depression': 3,
  'Smoking Cessation': 3,
  'Emergency Treatment': 3,
  'Medical Emergencies': 3,
  'Acute Agitation Management': 3,
  'Crisis & Emergency Management': 3,
  'Crisis Intervention': 3,
  'Metabolic Syndrome': 3,
  'Medical Complications': 3,
  'Diabetes Management': 3,
  'Osteoporosis Management': 3,
  'Sexual Dysfunction': 3,
  'HIV-Related Conditions': 3,
  'Substance Use in Pregnancy': 3,
  'Pregnancy and Substance Use': 3,
  'Substance Use': 3,
  'Evidence-Based Practice': 3,
  'Integrated Care': 3,

  // Domain 4: Psychotherapy and Related Theories (15%)
  'Psychotherapy & Treatment Modalities': 4,
  'Psychotherapy & Treatment': 4,
  'Psychotherapy': 4,
  'Therapy Approaches': 4,
  'Couples Therapy': 4,
  'Developmental Theory & Lifespan': 4,
  'Developmental Psychology': 4,
  'Development': 4,
  'Pediatric Development': 4,
  'Child Development': 4,
  'Adolescent Development': 4,
  'Psychology': 4,
  'Treatment Philosophy': 4,
  'Recovery Model': 4,
  'Fetal Alcohol Syndrome': 4,

  // Domain 5: Ethical, Legal, and Systems-Based Practice (10%)
  'Ethics & Legal Issues': 5,
  'Ethics/Legal': 5,
  'Ethics': 5,
  'Legal Issues': 5,
  'Legal/Ethics': 5,
  'Legal/Documentation': 5,
  'Legal and Regulatory': 5,
  'Professional Practice': 5,
  'Professional Ethics': 5,
  'Documentation and Consent': 5,
  'Documentation': 5,
  'Child Abuse Reporting': 5,
  'Child Protection': 5,
  'Adolescent Confidentiality': 5,
  'Billing and Coding': 5,
  'Practice Management': 5,
  'Healthcare Delivery': 5,
  'Case Management': 5,
  'Leadership': 5,
  'Standards of Care': 5,
  'Mental Health Advocacy': 5,
  'Health Promotion': 5,
  'Health Education': 5,
  'Patient Education': 5,
  'Prevention': 5,
  'Suicide Prevention': 5,
  'Suicide Risk': 5,
  'Gender Identity and Ethics': 5,
  'Cultural Competence': 5,
  'Cultural Psychiatry': 5,

  // Pediatric categories (map to most relevant domain)
  'Child Psychiatry': 3,
  'Child Psychiatry Diagnosis': 3,
  'Pediatric Orthopedics': 2,
};

const domainNames = {
  1: 'Scientific Foundation',
  2: 'Advanced Practice Skills',
  3: 'Diagnosis and Treatment',
  4: 'Psychotherapy and Related Theories',
  5: 'Ethical and Legal Principles'
};

const domainPercentages = {
  1: 15,
  2: 30,
  3: 30,
  4: 15,
  5: 10
};

// Track unmapped categories
const unmappedCategories = new Set();
const domainCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

// Map each question to a domain
data.forEach(q => {
  const domain = domainMapping[q.category];

  if (domain) {
    q.domain = domain;
    q.domainName = domainNames[domain];
    domainCounts[domain]++;
  } else {
    unmappedCategories.add(q.category);
    // Default mapping based on category keywords
    const cat = q.category.toLowerCase();

    if (cat.includes('pharm') || cat.includes('medic') || cat.includes('drug') ||
        cat.includes('lithium') || cat.includes('ssri') || cat.includes('antipsych') ||
        cat.includes('diagnos') || cat.includes('dsm') || cat.includes('treat') ||
        cat.includes('disorder')) {
      q.domain = 3;
      q.domainName = domainNames[3];
      domainCounts[3]++;
    } else if (cat.includes('assess') || cat.includes('screen') || cat.includes('exam') ||
               cat.includes('evaluat') || cat.includes('interview')) {
      q.domain = 2;
      q.domainName = domainNames[2];
      domainCounts[2]++;
    } else if (cat.includes('therap') || cat.includes('psycho') || cat.includes('develop') ||
               cat.includes('theory')) {
      q.domain = 4;
      q.domainName = domainNames[4];
      domainCounts[4]++;
    } else if (cat.includes('ethic') || cat.includes('legal') || cat.includes('consent') ||
               cat.includes('document') || cat.includes('confidential') || cat.includes('cultur')) {
      q.domain = 5;
      q.domainName = domainNames[5];
      domainCounts[5]++;
    } else if (cat.includes('neuro') || cat.includes('brain') || cat.includes('research') ||
               cat.includes('genetic')) {
      q.domain = 1;
      q.domainName = domainNames[1];
      domainCounts[1]++;
    } else {
      // Default to Diagnosis and Treatment for clinical content
      q.domain = 3;
      q.domainName = domainNames[3];
      domainCounts[3]++;
    }
  }
});

// Report
console.log('Domain Distribution:');
console.log('═══════════════════════════════════════════════════════════════\n');

Object.entries(domainCounts).forEach(([domain, count]) => {
  const name = domainNames[domain];
  const pct = ((count / 500) * 100).toFixed(1);
  const target = domainPercentages[domain];
  const diff = (pct - target).toFixed(1);
  const diffStr = diff >= 0 ? `+${diff}` : diff;
  console.log(`Domain ${domain}: ${name}`);
  console.log(`  Questions: ${count} (${pct}%)`);
  console.log(`  Target: ${target}%  |  Diff: ${diffStr}%\n`);
});

if (unmappedCategories.size > 0) {
  console.log('\nCategories auto-mapped (not in explicit mapping):');
  [...unmappedCategories].forEach(c => console.log(`  - ${c}`));
}

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✓ Domains added to all 500 questions');
console.log('✓ Saved to questions.json');
