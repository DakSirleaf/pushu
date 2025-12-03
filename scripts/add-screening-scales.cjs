const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const screeningUpdates = {
  // Depression scale questions - add disorder-specific guidance
  41: "PHQ-9 (0-27): Depression screening. 0-4=minimal, 5-9=mild, 10-14=moderate, 15-19=mod-severe, 20-27=severe. Treat ≥10. CO-OCCURRING: Always screen for SUD (AUDIT/CAGE/DAST)—substances worsen depression scores. Use separate tools for each condition.",

  42: "PHQ-9 ≥10: 88% sensitivity/specificity for major depression. CRITICAL: SUD can inflate depression scores. Screen BOTH conditions: PHQ-9 for depression + AUDIT/CAGE for alcohol + DAST for drugs. Treat as co-occurring disorders.",

  49: "HAM-D 17-item (0-52): Clinician-rated depression scale. 0-7=remission, 8-13=mild, 14-18=moderate, 19-22=severe, ≥23=very severe. CO-OCCURRING: Screen for SUD separately—alcohol/drugs worsen HAM-D scores. Use AUDIT (alcohol) or DAST (drugs).",

  // Add to alcohol-related questions
  34: "Benzodiazepines for alcohol withdrawal: Use CIWA-Ar to guide dosing. SCREENING: Use AUDIT (10 items, ≥8=hazardous) or CAGE (≥2=problem drinking) to identify AUD. Always screen for co-occurring depression (PHQ-9)—each worsens the other.",

  45: "CIWA-Ar (0-67): Alcohol WITHDRAWAL severity (not screening). For SCREENING use: AUDIT (0-40, ≥8=hazardous use) or CAGE (≥2/4=problem). CO-OCCURRING: Screen depression with PHQ-9—SUD worsens depression, depression worsens SUD outcomes.",

  // Substance use question
  110: "Antisocial PD + alcohol: highest comorbidity. SCREENING TOOLS: AUDIT (alcohol, 10 items), CAGE (4 questions), DAST (drugs, 10 items). Always screen for co-occurring depression/anxiety—treat BOTH conditions simultaneously for best outcomes.",

  // Update assessment category questions with scale-by-disorder info
  48: "BDI-II (0-63): Self-report depression scale. 0-13=minimal, 14-19=mild, 20-28=moderate, 29-63=severe. SCALES BY DISORDER: Depression=PHQ-9/HAM-D/BDI. Anxiety=GAD-7/HAM-A. Alcohol=AUDIT/CAGE. Drugs=DAST. Cognition=MoCA/MMSE. Always screen co-occurring SUD.",

  47: "GAD-7 (0-21): Anxiety screening. 0-4=minimal, 5-9=mild, 10-14=moderate, 15-21=severe. Treat ≥10. REMEMBER: Anxiety often co-occurs with SUD and depression. Screen all three: GAD-7 + PHQ-9 + AUDIT/DAST. Substances can cause or worsen anxiety.",

  55: "HAM-A (0-56): Clinician-rated anxiety. <17=mild, 18-24=moderate, ≥25=severe. SCALE SELECTION: GAD-7=self-report screening. HAM-A=clinician-rated severity/monitoring. CO-OCCURRING: Rule out substance-induced anxiety with AUDIT/DAST.",

  // COWS question - add context
  46: "COWS (0-48): Opioid WITHDRAWAL severity. 5-12=mild, 13-24=moderate, 25-36=mod-severe, >36=severe. Start buprenorphine ≥8-12. FOR SCREENING OUD: Use DAST or ask about use. Always screen co-occurring depression (PHQ-9)—opioid users have high depression rates.",

  225: "COWS (0-48): Opioid withdrawal severity scale. Start buprenorphine at COWS ≥8-12. SCREENING vs SEVERITY: DAST screens for drug problems. COWS measures withdrawal severity. CO-OCCURRING: Screen depression (PHQ-9)—depression common in OUD, worsens outcomes.",

  226: "CIWA-Ar (0-67): Alcohol WITHDRAWAL severity. SCREENING TOOLS (different purpose): AUDIT (10 items, ≥8 hazardous), CAGE (Cut down, Annoyed, Guilty, Eye-opener—≥2 positive). CO-OCCURRING: Always screen depression/anxiety—SUD and mood disorders worsen each other."
};

let updateCount = 0;
data.forEach(q => {
  if (screeningUpdates[q.id]) {
    q.rationale = screeningUpdates[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Screening scale updates complete: Updated ${updateCount} questions`);
