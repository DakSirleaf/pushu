const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     DETAILED MISMATCH ANALYSIS                                 ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const mismatches = [];

data.forEach(q => {
  const correctAnswer = q.options[q.correctAnswer];
  const rationale = q.rationale || '';

  // Extract key terms from correct answer
  const answerWords = correctAnswer.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(' ')
    .filter(w => w.length > 3);

  // Check if any key word from answer appears in rationale
  const rationalelow = rationale.toLowerCase();
  const hasMatch = answerWords.some(word => rationalelow.includes(word));

  if (!hasMatch && answerWords.length > 0 && rationale.length > 0) {
    mismatches.push({
      id: q.id,
      question: q.question.substring(0, 80) + '...',
      answer: correctAnswer,
      answerWords: answerWords.slice(0, 5),
      rationaleStart: rationale.substring(0, 150)
    });
  }
});

console.log(`Found ${mismatches.length} questions with possible mismatches:\n`);

mismatches.forEach(m => {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Q${m.id}: ${m.question}`);
  console.log(`CORRECT ANSWER: ${m.answer}`);
  console.log(`KEY WORDS: ${m.answerWords.join(', ')}`);
  console.log(`RATIONALE: ${m.rationaleStart}...`);
});

// Output as JSON for further processing
fs.writeFileSync('./scripts/mismatch-report.json', JSON.stringify(mismatches, null, 2));
console.log('\n\nReport saved to scripts/mismatch-report.json');
