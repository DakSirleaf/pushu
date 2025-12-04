const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     FIXING CRITICAL WRONG ANSWERS                              ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let fixCount = 0;

// Q209 - Carbamazepine COMMON side effects
// Question asks which are COMMON - answer should be sedation, dizziness, etc. (index 0)
// NOT severe hypertension (current wrong answer at index 2)
const q209 = data.find(q => q.id === 209);
if (q209) {
  console.log('Q209: Carbamazepine common side effects');
  console.log(`  OLD answer: ${q209.options[q209.correctAnswer]} (index ${q209.correctAnswer})`);
  q209.correctAnswer = 0; // Nausea, dizziness, sedation, headache, and ataxia
  console.log(`  NEW answer: ${q209.options[q209.correctAnswer]} (index ${q209.correctAnswer})`);
  q209.rationale = "CARBAMAZEPINE COMMON SIDE EFFECTS: sedation, dizziness, ataxia, diplopia (double vision), nausea, headache, and blurred vision. These are dose-related and often improve over time. Carbamazepine does NOT cause severe hypertension - it can actually cause SIADH leading to hyponatremia. Serious but rare: agranulocytosis, aplastic anemia, SJS/TEN. Weight loss and hyperactivity are not associated with carbamazepine.";
  fixCount++;
}

// Q229 - IADL impairment significance
// Not managing checkbook IS clinically significant - IADLs are most sensitive
// Current wrong answer says "Not clinically significant"
const q229 = data.find(q => q.id === 229);
if (q229) {
  console.log('\nQ229: IADL impairment significance');
  console.log(`  OLD answer: ${q229.options[q229.correctAnswer]} (index ${q229.correctAnswer})`);
  q229.correctAnswer = 1; // IADLs are most sensitive indicator of cognitive decline
  console.log(`  NEW answer: ${q229.options[q229.correctAnswer]} (index ${q229.correctAnswer})`);
  q229.rationale = "IADL (Instrumental Activities of Daily Living) impairment is HIGHLY CLINICALLY SIGNIFICANT. Managing finances/checkbook is often the FIRST IADL affected in cognitive decline - it's the most sensitive indicator. IADLs (finances, medications, shopping, cooking, transportation) are affected BEFORE ADLs (bathing, dressing, toileting). A 78-year-old who can no longer manage her checkbook requires further cognitive evaluation. This is NOT normal aging.";
  fixCount++;
}

// Let me also check a few more potentially problematic questions
// Q26 - Patient with QTc prolongation history - should AVOID ziprasidone, not use it
const q26 = data.find(q => q.id === 26);
if (q26) {
  console.log('\nQ26: Reviewing QTc prolongation question...');
  console.log(`  Question: ${q26.question.substring(0, 100)}...`);
  console.log(`  Answer: ${q26.options[q26.correctAnswer]}`);

  // If question asks what to AVOID, ziprasidone is correct
  // If question asks what to USE/SELECT, ziprasidone is WRONG
  if (q26.question.toLowerCase().includes('selecting') || q26.question.toLowerCase().includes('choose') || q26.question.toLowerCase().includes('prescribe')) {
    console.log('  ⚠️ Question asks about selecting - need to fix!');
    // Change question to ask what to AVOID
    q26.question = "A PMHNP is reviewing antipsychotic options for a patient with a history of QTc prolongation. Which antipsychotic should be AVOIDED due to highest QTc risk?";
    q26.rationale = "ZIPRASIDONE (Geodon) should be AVOIDED in patients with QTc prolongation - it has the HIGHEST QTc risk among atypical antipsychotics. Also avoid: thioridazine, IV haloperidol, droperidol. Safer alternatives for patients with QTc concerns: aripiprazole, lurasidone. Always get baseline ECG in patients with cardiac history. QTc >500ms or increase >60ms from baseline = discontinue medication.";
    fixCount++;
  }
}

// Save
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`\n${'═'.repeat(50)}`);
console.log(`Critical answers fixed: ${fixCount}`);
console.log('✓ Changes saved to questions.json');
