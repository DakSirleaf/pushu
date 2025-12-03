const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Look for CRITICAL mismatches - where rationale clearly belongs to different question
const criticalIssues = [];

// Key medication/condition pairs that should match
const strictMatches = [
  { questionTerm: 'ziprasidone', rationaleTerm: 'ziprasidone', topic: 'Ziprasidone/QTc' },
  { questionTerm: 'geodon', rationaleTerm: 'geodon', topic: 'Ziprasidone/QTc' },
  { questionTerm: 'qtc prolongation', rationaleTerm: 'qtc', topic: 'QTc' },
  { questionTerm: 'paroxetine', rationaleTerm: 'paroxetine', topic: 'Paroxetine' },
  { questionTerm: 'discontinuation', rationaleTerm: 'discontinuation', topic: 'Discontinuation' },
  { questionTerm: 'brain zaps', rationaleTerm: 'brain zaps', topic: 'SSRI discontinuation' },
  { questionTerm: 'rapid cycling', rationaleTerm: 'rapid cycling', topic: 'Rapid cycling' },
  { questionTerm: 'hla-b', rationaleTerm: 'hla-b', topic: 'HLA-B testing' },
  { questionTerm: 'loading dose', rationaleTerm: 'loading', topic: 'Loading dose' },
  { questionTerm: 'ace inhibitor', rationaleTerm: 'ace', topic: 'ACE inhibitors' },
  { questionTerm: 'nsaid', rationaleTerm: 'nsaid', topic: 'NSAIDs' },
  { questionTerm: 'clozapine', rationaleTerm: 'clozapine', topic: 'Clozapine' },
  { questionTerm: 'agranulocytosis', rationaleTerm: 'agranulocytosis', topic: 'Agranulocytosis' },
  { questionTerm: 'serotonin syndrome', rationaleTerm: 'serotonin syndrome', topic: 'Serotonin syndrome' },
  { questionTerm: 'nms', rationaleTerm: 'nms', topic: 'NMS' },
  { questionTerm: 'neuroleptic malignant', rationaleTerm: 'neuroleptic malignant', topic: 'NMS' },
  { questionTerm: 'tardive dyskinesia', rationaleTerm: 'tardive', topic: 'TD' },
  { questionTerm: 'eps', rationaleTerm: 'extrapyramidal', topic: 'EPS' },
  { questionTerm: 'dystonia', rationaleTerm: 'dystonia', topic: 'Dystonia' },
  { questionTerm: 'akathisia', rationaleTerm: 'akathisia', topic: 'Akathisia' },
  { questionTerm: 'flumazenil', rationaleTerm: 'flumazenil', topic: 'Flumazenil' },
  { questionTerm: 'naloxone', rationaleTerm: 'naloxone', topic: 'Naloxone' },
  { questionTerm: 'buprenorphine', rationaleTerm: 'buprenorphine', topic: 'Buprenorphine' },
  { questionTerm: 'methadone', rationaleTerm: 'methadone', topic: 'Methadone' },
  { questionTerm: 'wernicke', rationaleTerm: 'wernicke', topic: 'Wernicke' },
  { questionTerm: 'thiamine', rationaleTerm: 'thiamine', topic: 'Thiamine' },
  { questionTerm: 'ciwa', rationaleTerm: 'ciwa', topic: 'CIWA' },
  { questionTerm: 'cows', rationaleTerm: 'cows', topic: 'COWS' },
  { questionTerm: 'lamotrigine', rationaleTerm: 'lamotrigine', topic: 'Lamotrigine' },
  { questionTerm: 'lamictal', rationaleTerm: 'lamictal', topic: 'Lamotrigine' },
  { questionTerm: 'stevens-johnson', rationaleTerm: 'stevens-johnson', topic: 'SJS' },
  { questionTerm: 'ebstein', rationaleTerm: 'ebstein', topic: 'Ebstein anomaly' },
  { questionTerm: 'mirtazapine', rationaleTerm: 'mirtazapine', topic: 'Mirtazapine' },
  { questionTerm: 'remeron', rationaleTerm: 'remeron', topic: 'Mirtazapine' },
  { questionTerm: 'trazodone', rationaleTerm: 'trazodone', topic: 'Trazodone' },
  { questionTerm: 'bupropion', rationaleTerm: 'bupropion', topic: 'Bupropion' },
  { questionTerm: 'wellbutrin', rationaleTerm: 'wellbutrin', topic: 'Bupropion' },
  { questionTerm: 'venlafaxine', rationaleTerm: 'venlafaxine', topic: 'Venlafaxine' },
  { questionTerm: 'effexor', rationaleTerm: 'effexor', topic: 'Venlafaxine' },
  { questionTerm: 'duloxetine', rationaleTerm: 'duloxetine', topic: 'Duloxetine' },
  { questionTerm: 'cymbalta', rationaleTerm: 'cymbalta', topic: 'Duloxetine' },
  { questionTerm: 'maoi', rationaleTerm: 'maoi', topic: 'MAOIs' },
  { questionTerm: 'tyramine', rationaleTerm: 'tyramine', topic: 'Tyramine' },
  { questionTerm: 'phentolamine', rationaleTerm: 'phentolamine', topic: 'Phentolamine' },
  { questionTerm: 'meperidine', rationaleTerm: 'meperidine', topic: 'Meperidine' },
  { questionTerm: 'demerol', rationaleTerm: 'demerol', topic: 'Meperidine' },
  { questionTerm: 'haloperidol', rationaleTerm: 'haloperidol', topic: 'Haloperidol' },
  { questionTerm: 'haldol', rationaleTerm: 'haldol', topic: 'Haloperidol' },
  { questionTerm: 'olanzapine', rationaleTerm: 'olanzapine', topic: 'Olanzapine' },
  { questionTerm: 'zyprexa', rationaleTerm: 'zyprexa', topic: 'Olanzapine' },
  { questionTerm: 'risperidone', rationaleTerm: 'risperidone', topic: 'Risperidone' },
  { questionTerm: 'risperdal', rationaleTerm: 'risperdal', topic: 'Risperidone' },
  { questionTerm: 'quetiapine', rationaleTerm: 'quetiapine', topic: 'Quetiapine' },
  { questionTerm: 'seroquel', rationaleTerm: 'seroquel', topic: 'Quetiapine' },
  { questionTerm: 'aripiprazole', rationaleTerm: 'aripiprazole', topic: 'Aripiprazole' },
  { questionTerm: 'abilify', rationaleTerm: 'abilify', topic: 'Aripiprazole' },
  { questionTerm: 'lurasidone', rationaleTerm: 'lurasidone', topic: 'Lurasidone' },
  { questionTerm: 'latuda', rationaleTerm: 'latuda', topic: 'Lurasidone' },
  { questionTerm: 'methylphenidate', rationaleTerm: 'methylphenidate', topic: 'Methylphenidate' },
  { questionTerm: 'ritalin', rationaleTerm: 'ritalin', topic: 'Methylphenidate' },
  { questionTerm: 'amphetamine', rationaleTerm: 'amphetamine', topic: 'Amphetamine' },
  { questionTerm: 'adderall', rationaleTerm: 'adderall', topic: 'Amphetamine' },
  { questionTerm: 'atomoxetine', rationaleTerm: 'atomoxetine', topic: 'Atomoxetine' },
  { questionTerm: 'strattera', rationaleTerm: 'strattera', topic: 'Atomoxetine' },
  { questionTerm: 'guanfacine', rationaleTerm: 'guanfacine', topic: 'Guanfacine' },
  { questionTerm: 'intuniv', rationaleTerm: 'intuniv', topic: 'Guanfacine' },
  { questionTerm: 'donepezil', rationaleTerm: 'donepezil', topic: 'Donepezil' },
  { questionTerm: 'aricept', rationaleTerm: 'aricept', topic: 'Donepezil' },
  { questionTerm: 'memantine', rationaleTerm: 'memantine', topic: 'Memantine' },
  { questionTerm: 'namenda', rationaleTerm: 'namenda', topic: 'Memantine' },
  { questionTerm: 'dbt', rationaleTerm: 'dbt', topic: 'DBT' },
  { questionTerm: 'dialectical', rationaleTerm: 'dialectical', topic: 'DBT' },
  { questionTerm: 'cbt', rationaleTerm: 'cbt', topic: 'CBT' },
  { questionTerm: 'cognitive behavioral', rationaleTerm: 'cognitive behavioral', topic: 'CBT' },
  { questionTerm: 'exposure therapy', rationaleTerm: 'exposure', topic: 'Exposure therapy' },
  { questionTerm: 'emdr', rationaleTerm: 'emdr', topic: 'EMDR' },
  { questionTerm: 'transference', rationaleTerm: 'transference', topic: 'Transference' },
  { questionTerm: 'countertransference', rationaleTerm: 'countertransference', topic: 'Countertransference' },
  { questionTerm: 'mmse', rationaleTerm: 'mmse', topic: 'MMSE' },
  { questionTerm: 'moca', rationaleTerm: 'moca', topic: 'MoCA' },
  { questionTerm: 'phq-9', rationaleTerm: 'phq', topic: 'PHQ-9' },
  { questionTerm: 'gad-7', rationaleTerm: 'gad-7', topic: 'GAD-7' },
  { questionTerm: 'columbia', rationaleTerm: 'columbia', topic: 'Columbia' },
  { questionTerm: 'erikson', rationaleTerm: 'erikson', topic: 'Erikson' },
  { questionTerm: 'piaget', rationaleTerm: 'piaget', topic: 'Piaget' },
  { questionTerm: 'kohlberg', rationaleTerm: 'kohlberg', topic: 'Kohlberg' },
  { questionTerm: 'freud', rationaleTerm: 'freud', topic: 'Freud' },
  { questionTerm: 'borderline', rationaleTerm: 'borderline', topic: 'BPD' },
  { questionTerm: 'antisocial', rationaleTerm: 'antisocial', topic: 'ASPD' },
  { questionTerm: 'narcissistic', rationaleTerm: 'narcissistic', topic: 'NPD' },
  { questionTerm: 'schizoid', rationaleTerm: 'schizoid', topic: 'Schizoid' },
  { questionTerm: 'schizotypal', rationaleTerm: 'schizotypal', topic: 'Schizotypal' },
  { questionTerm: 'histrionic', rationaleTerm: 'histrionic', topic: 'Histrionic' },
  { questionTerm: 'avoidant', rationaleTerm: 'avoidant', topic: 'Avoidant PD' },
  { questionTerm: 'dependent', rationaleTerm: 'dependent', topic: 'Dependent PD' },
  { questionTerm: 'obsessive-compulsive personality', rationaleTerm: 'ocpd', topic: 'OCPD' },
  { questionTerm: 'panic disorder', rationaleTerm: 'panic', topic: 'Panic disorder' },
  { questionTerm: 'agoraphobia', rationaleTerm: 'agoraphobia', topic: 'Agoraphobia' },
  { questionTerm: 'social anxiety', rationaleTerm: 'social anxiety', topic: 'Social anxiety' },
  { questionTerm: 'specific phobia', rationaleTerm: 'phobia', topic: 'Phobia' },
  { questionTerm: 'ptsd', rationaleTerm: 'ptsd', topic: 'PTSD' },
  { questionTerm: 'acute stress', rationaleTerm: 'acute stress', topic: 'Acute stress disorder' },
  { questionTerm: 'adjustment disorder', rationaleTerm: 'adjustment', topic: 'Adjustment disorder' },
  { questionTerm: 'autism', rationaleTerm: 'autism', topic: 'ASD' },
  { questionTerm: 'adhd', rationaleTerm: 'adhd', topic: 'ADHD' },
  { questionTerm: 'oppositional defiant', rationaleTerm: 'odd', topic: 'ODD' },
  { questionTerm: 'conduct disorder', rationaleTerm: 'conduct disorder', topic: 'Conduct disorder' },
  { questionTerm: 'intellectual disability', rationaleTerm: 'intellectual disability', topic: 'ID' },
  { questionTerm: 'anorexia', rationaleTerm: 'anorexia', topic: 'AN' },
  { questionTerm: 'bulimia', rationaleTerm: 'bulimia', topic: 'BN' },
  { questionTerm: 'binge eating', rationaleTerm: 'binge eating', topic: 'BED' },
  { questionTerm: 'delirium', rationaleTerm: 'delirium', topic: 'Delirium' },
  { questionTerm: 'dementia', rationaleTerm: 'dementia', topic: 'Dementia' },
  { questionTerm: 'alzheimer', rationaleTerm: 'alzheimer', topic: 'Alzheimer' },
  { questionTerm: 'lewy body', rationaleTerm: 'lewy body', topic: 'Lewy body' },
  { questionTerm: 'vascular dementia', rationaleTerm: 'vascular dementia', topic: 'Vascular dementia' },
  { questionTerm: 'frontotemporal', rationaleTerm: 'frontotemporal', topic: 'FTD' },
  { questionTerm: 'pseudodementia', rationaleTerm: 'pseudodementia', topic: 'Pseudodementia' },
  { questionTerm: 'electroconvulsive', rationaleTerm: 'ect', topic: 'ECT' },
  { questionTerm: 'ect', rationaleTerm: 'ect', topic: 'ECT' },
  { questionTerm: 'tms', rationaleTerm: 'tms', topic: 'TMS' },
];

// Check each question for CRITICAL mismatches
data.forEach((q, index) => {
  const questionLower = q.question.toLowerCase();
  const rationaleLower = (q.rationale || '').toLowerCase();
  const correctOption = q.options[q.correctAnswer] || '';
  const correctOptionLower = correctOption.toLowerCase();

  // Check if question mentions a specific medication but rationale talks about something else
  strictMatches.forEach(match => {
    const questionHasTerm = questionLower.includes(match.questionTerm);
    const rationaleHasTerm = rationaleLower.includes(match.rationaleTerm);

    // Question mentions X but rationale doesn't mention X at all
    if (questionHasTerm && !rationaleHasTerm) {
      // Check if correct answer mentions it
      if (!correctOptionLower.includes(match.rationaleTerm)) {
        criticalIssues.push({
          id: q.id,
          type: 'MISSING_TOPIC_IN_RATIONALE',
          topic: match.topic,
          question: q.question.substring(0, 120),
          rationale: q.rationale.substring(0, 150),
          correctAnswer: correctOption.substring(0, 80)
        });
      }
    }
  });

  // Check for rationale that starts with a different medication/topic name than expected
  const rationaleStart = rationaleLower.substring(0, 50);
  const knownMismatchPatterns = [
    { inQuestion: 'ziprasidone', wrongRationale: 'ssri discontinuation' },
    { inQuestion: 'qtc', wrongRationale: 'ssri discontinuation' },
    { inQuestion: 'qtc', wrongRationale: 'paroxetine' },
    { inQuestion: 'qtc', wrongRationale: 'brain zaps' },
    { inQuestion: 'rapid cycling', wrongRationale: 'qtc' },
    { inQuestion: 'hla-b', wrongRationale: 'rapid cycling' },
    { inQuestion: 'loading dose', wrongRationale: 'hla' },
    { inQuestion: 'ace inhibitor', wrongRationale: 'loading' },
    { inQuestion: 'nsaid', wrongRationale: 'ace inhibitor' },
  ];

  knownMismatchPatterns.forEach(pattern => {
    if (questionLower.includes(pattern.inQuestion) && rationaleLower.includes(pattern.wrongRationale)) {
      criticalIssues.push({
        id: q.id,
        type: 'SEVERE_MISMATCH',
        question: q.question.substring(0, 120),
        expectedTopic: pattern.inQuestion,
        actualRationale: pattern.wrongRationale,
        rationale: q.rationale.substring(0, 150)
      });
    }
  });
});

// Remove duplicates
const uniqueIssues = [];
const seenIds = new Set();
criticalIssues.forEach(issue => {
  const key = `${issue.id}-${issue.type}`;
  if (!seenIds.has(key)) {
    seenIds.add(key);
    uniqueIssues.push(issue);
  }
});

console.log('=== CRITICAL MISMATCH AUDIT ===\n');
console.log(`Total critical issues: ${uniqueIssues.length}\n`);

// Group by type
const byType = {};
uniqueIssues.forEach(i => {
  if (!byType[i.type]) byType[i.type] = [];
  byType[i.type].push(i);
});

for (const [type, items] of Object.entries(byType)) {
  console.log(`\n=== ${type} (${items.length}) ===`);
  items.slice(0, 30).forEach(i => {
    console.log(`\nQ${i.id}:`);
    console.log(`  Question: ${i.question}...`);
    if (i.expectedTopic) console.log(`  Expected topic: ${i.expectedTopic}`);
    if (i.topic) console.log(`  Missing topic: ${i.topic}`);
    if (i.actualRationale) console.log(`  But rationale talks about: ${i.actualRationale}`);
    console.log(`  Rationale: ${i.rationale}...`);
  });
  if (items.length > 30) {
    console.log(`\n... and ${items.length - 30} more`);
  }
}

// List all question IDs with issues
console.log('\n\n=== ALL QUESTION IDS WITH CRITICAL ISSUES ===');
const issueIds = [...new Set(uniqueIssues.map(i => i.id))].sort((a, b) => a - b);
console.log(issueIds.join(', '));

fs.writeFileSync('./scripts/critical-issues.json', JSON.stringify(uniqueIssues, null, 2));
console.log('\n\nSaved to scripts/critical-issues.json');
