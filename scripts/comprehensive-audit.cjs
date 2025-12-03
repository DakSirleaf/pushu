const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Comprehensive audit of all questions
const issues = [];

// Key terms that should appear in both question and rationale if related
const topicKeywords = {
  'QTc': ['QTc', 'prolongation', 'arrhythmia', 'Torsades', 'EKG', 'ziprasidone', 'geodon'],
  'SSRI discontinuation': ['discontinuation', 'brain zaps', 'paroxetine', 'taper', 'withdrawal'],
  'lithium': ['lithium', 'Li', 'thyroid', 'renal', 'tremor', 'levels'],
  'valproate': ['valproate', 'depakote', 'VPA', 'hepatic', 'platelets', 'teratogenic'],
  'carbamazepine': ['carbamazepine', 'tegretol', 'CBZ', 'HLA-B', 'Stevens-Johnson', 'autoinduction'],
  'clozapine': ['clozapine', 'clozaril', 'agranulocytosis', 'ANC', 'REMS', 'seizure'],
  'serotonin syndrome': ['serotonin syndrome', 'hyperreflexia', 'clonus', 'hyperthermia', 'rigidity'],
  'NMS': ['neuroleptic malignant', 'NMS', 'rigidity', 'hyperthermia', 'CK', 'creatine kinase'],
  'tardive dyskinesia': ['tardive dyskinesia', 'TD', 'involuntary movements', 'AIMS'],
  'EPS': ['extrapyramidal', 'EPS', 'dystonia', 'akathisia', 'parkinsonism'],
  'MAOIs': ['MAOI', 'tyramine', 'hypertensive crisis', 'cheese', 'phenelzine', 'tranylcypromine'],
  'benzodiazepine': ['benzodiazepine', 'benzo', 'GABA', 'diazepam', 'lorazepam', 'alprazolam'],
  'antipsychotic': ['antipsychotic', 'dopamine', 'D2', 'psychosis', 'schizophrenia'],
  'stimulant': ['stimulant', 'ADHD', 'methylphenidate', 'amphetamine', 'ritalin', 'adderall'],
  'depression': ['depression', 'MDD', 'depressive', 'antidepressant', 'mood'],
  'anxiety': ['anxiety', 'GAD', 'anxious', 'panic', 'phobia'],
  'bipolar': ['bipolar', 'mania', 'manic', 'mood stabilizer', 'cycling'],
  'psychotherapy': ['therapy', 'CBT', 'DBT', 'psychotherapy', 'therapeutic'],
};

// Check each question
data.forEach((q, index) => {
  const questionText = q.question.toLowerCase();
  const rationaleText = (q.rationale || '').toLowerCase();
  const correctOption = q.options[q.correctAnswer];

  // Check 1: Rationale should relate to the question topic
  let questionTopics = [];
  let rationaleTopics = [];

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    const hasInQuestion = keywords.some(kw => questionText.includes(kw.toLowerCase()));
    const hasInRationale = keywords.some(kw => rationaleText.includes(kw.toLowerCase()));

    if (hasInQuestion) questionTopics.push(topic);
    if (hasInRationale) rationaleTopics.push(topic);
  }

  // Check for mismatch - question talks about one topic, rationale talks about different topic
  const questionOnlyTopics = questionTopics.filter(t => !rationaleTopics.includes(t));
  const rationaleOnlyTopics = rationaleTopics.filter(t => !questionTopics.includes(t));

  // Flag if rationale has a specific medication/syndrome topic that's not in question
  if (rationaleOnlyTopics.length > 0 && questionTopics.length > 0) {
    // Check if the topics are actually unrelated (not just different aspects)
    const severelyDifferent = rationaleOnlyTopics.some(rt =>
      !questionTopics.some(qt => areRelatedTopics(qt, rt))
    );

    if (severelyDifferent) {
      issues.push({
        id: q.id,
        type: 'TOPIC_MISMATCH',
        question: q.question.substring(0, 100),
        questionTopics,
        rationaleTopics,
        rationale: q.rationale.substring(0, 100)
      });
    }
  }

  // Check 2: Correct answer index should be valid
  if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
    issues.push({
      id: q.id,
      type: 'INVALID_ANSWER_INDEX',
      correctAnswer: q.correctAnswer,
      optionsLength: q.options.length
    });
  }

  // Check 3: Rationale should mention the correct answer or related content
  if (correctOption && rationaleText) {
    const correctOptionLower = correctOption.toLowerCase();
    // Extract key terms from correct option (medication names, conditions, etc.)
    const optionKeyTerms = correctOptionLower.match(/\b[a-z]{4,}\b/g) || [];
    const hasRelevantContent = optionKeyTerms.some(term =>
      rationaleText.includes(term) && term.length > 4
    );

    // If rationale doesn't mention anything from the correct answer, flag it
    if (!hasRelevantContent && q.rationale.length > 50) {
      // Double check - maybe it uses different terminology
      const rationaleWords = rationaleText.split(/\s+/);
      const optionWords = correctOptionLower.split(/\s+/);
      const overlap = optionWords.filter(w => rationaleWords.includes(w) && w.length > 3);

      if (overlap.length === 0) {
        issues.push({
          id: q.id,
          type: 'RATIONALE_ANSWER_MISMATCH',
          correctOption: correctOption.substring(0, 80),
          rationale: q.rationale.substring(0, 100)
        });
      }
    }
  }

  // Check 4: Empty or very short rationale
  if (!q.rationale || q.rationale.length < 30) {
    issues.push({
      id: q.id,
      type: 'SHORT_RATIONALE',
      rationale: q.rationale || '(empty)'
    });
  }
});

function areRelatedTopics(t1, t2) {
  const relatedGroups = [
    ['lithium', 'bipolar', 'valproate', 'carbamazepine'],
    ['SSRI discontinuation', 'depression', 'antidepressant'],
    ['NMS', 'EPS', 'tardive dyskinesia', 'antipsychotic'],
    ['serotonin syndrome', 'MAOI', 'antidepressant'],
    ['anxiety', 'benzodiazepine', 'psychotherapy'],
  ];

  return relatedGroups.some(group => group.includes(t1) && group.includes(t2));
}

// Output results
console.log('=== COMPREHENSIVE QUESTION AUDIT ===\n');
console.log(`Total questions analyzed: ${data.length}`);
console.log(`Total issues found: ${issues.length}\n`);

// Group by type
const byType = {};
issues.forEach(i => {
  if (!byType[i.type]) byType[i.type] = [];
  byType[i.type].push(i);
});

for (const [type, items] of Object.entries(byType)) {
  console.log(`\n=== ${type} (${items.length}) ===`);
  items.forEach(i => {
    console.log(`\nQ${i.id}:`);
    if (i.question) console.log(`  Question: ${i.question}...`);
    if (i.rationale) console.log(`  Rationale: ${i.rationale}...`);
    if (i.correctOption) console.log(`  Correct: ${i.correctOption}...`);
    if (i.questionTopics) console.log(`  Question topics: ${i.questionTopics.join(', ')}`);
    if (i.rationaleTopics) console.log(`  Rationale topics: ${i.rationaleTopics.join(', ')}`);
  });
}

// Save detailed report
fs.writeFileSync('./scripts/audit-report.json', JSON.stringify(issues, null, 2));
console.log('\n\nDetailed report saved to scripts/audit-report.json');
