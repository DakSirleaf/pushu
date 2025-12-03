const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║          BALANCING ANSWER DISTRIBUTION                         ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Current distribution
const currentDist = [0, 0, 0, 0];
data.forEach(q => currentDist[q.correctAnswer]++);
console.log('Current distribution:');
console.log(`  A: ${currentDist[0]} (${((currentDist[0]/500)*100).toFixed(1)}%)`);
console.log(`  B: ${currentDist[1]} (${((currentDist[1]/500)*100).toFixed(1)}%)`);
console.log(`  C: ${currentDist[2]} (${((currentDist[2]/500)*100).toFixed(1)}%)`);
console.log(`  D: ${currentDist[3]} (${((currentDist[3]/500)*100).toFixed(1)}%)`);

// Target: roughly 25% each (125 per answer choice)
const targetDist = [125, 125, 125, 125];

// Strategy: For questions where correctAnswer is 1 (B), randomly shuffle options
// to move correct answer to a different position while maintaining the same content

let shuffleCount = 0;
const questionsToShuffle = data.filter(q => q.correctAnswer === 1);

// We need to move about 247 questions from B to other positions
// Target: A needs ~99 more, C needs ~38 more, D needs ~110 more

// Shuffle function that rotates options and updates correctAnswer
function shuffleQuestion(q, newCorrectIndex) {
  const correctOption = q.options[q.correctAnswer];
  const otherOptions = q.options.filter((_, i) => i !== q.correctAnswer);

  // Create new options array with correct answer at newCorrectIndex
  const newOptions = [];
  let otherIdx = 0;

  for (let i = 0; i < 4; i++) {
    if (i === newCorrectIndex) {
      newOptions.push(correctOption);
    } else {
      newOptions.push(otherOptions[otherIdx++]);
    }
  }

  q.options = newOptions;
  q.correctAnswer = newCorrectIndex;
}

// Randomly select questions to redistribute
// Shuffle questionsToShuffle randomly
for (let i = questionsToShuffle.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [questionsToShuffle[i], questionsToShuffle[j]] = [questionsToShuffle[j], questionsToShuffle[i]];
}

// Move first ~99 to A (index 0)
const moveToA = questionsToShuffle.slice(0, 99);
moveToA.forEach(q => {
  shuffleQuestion(q, 0);
  shuffleCount++;
});

// Move next ~38 to C (index 2)
const moveToC = questionsToShuffle.slice(99, 137);
moveToC.forEach(q => {
  shuffleQuestion(q, 2);
  shuffleCount++;
});

// Move next ~110 to D (index 3)
const moveToD = questionsToShuffle.slice(137, 247);
moveToD.forEach(q => {
  shuffleQuestion(q, 3);
  shuffleCount++;
});

console.log(`\nShuffled ${shuffleCount} questions to balance distribution\n`);

// Verify new distribution
const newDist = [0, 0, 0, 0];
data.forEach(q => newDist[q.correctAnswer]++);
console.log('New distribution:');
console.log(`  A: ${newDist[0]} (${((newDist[0]/500)*100).toFixed(1)}%)`);
console.log(`  B: ${newDist[1]} (${((newDist[1]/500)*100).toFixed(1)}%)`);
console.log(`  C: ${newDist[2]} (${((newDist[2]/500)*100).toFixed(1)}%)`);
console.log(`  D: ${newDist[3]} (${((newDist[3]/500)*100).toFixed(1)}%)`);

// Check balance
const maxDeviation = Math.max(...newDist.map(a => Math.abs(a - 125)));
console.log(`\nMax deviation from 25%: ${maxDeviation} questions`);

if (maxDeviation <= 25) {
  console.log('✓ Distribution is now balanced!');
} else {
  console.log('⚠ Distribution could be more balanced');
}

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log('\n✓ Changes saved to questions.json');

// Verify data integrity after shuffle
console.log('\n═══ POST-SHUFFLE VERIFICATION ═══');
let issues = 0;
data.forEach(q => {
  if (q.correctAnswer < 0 || q.correctAnswer > 3) {
    console.log(`❌ Q${q.id}: Invalid correctAnswer ${q.correctAnswer}`);
    issues++;
  }
  if (!q.options || q.options.length !== 4) {
    console.log(`❌ Q${q.id}: Invalid options array`);
    issues++;
  }
});

if (issues === 0) {
  console.log('✓ All questions still valid after shuffling');
}
