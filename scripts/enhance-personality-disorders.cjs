const fs = require('fs');

const filePath = './public/data/questions.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const pdUpdates = {
  // Cluster A questions
  107: "CLUSTER A ('MAD/WEIRD' - Odd/Eccentric): Paranoid, Schizoid, Schizotypal. Mnemonic: 'Accusatory, Aloof, Awkward.' PARANOID=distrust. SCHIZOID=detached loner. SCHIZOTYPAL=magical thinking, odd beliefs. Genetic link to schizophrenia. Rarely seek treatment. Low-dose antipsychotics may help schizotypal.",

  356: "CLUSTER A (Odd/Eccentric): Paranoid, Schizoid, Schizotypal. Mnemonic: 'MAD'—Mistrustful, Aloof, Disorganized thinking. PMHNP role: Rule out prodromal schizophrenia (especially schizotypal). Low-dose antipsychotics for perceptual disturbances. These patients rarely seek help—family often brings them.",

  // Cluster B questions
  108: "CLUSTER B ('BAD/WILD' - Dramatic/Emotional): Antisocial, Borderline, Histrionic, Narcissistic. Mnemonic: 'Blame others, Act out, Demand attention, Need admiration.' MOST TREATMENT-SEEKING cluster. DBT for Borderline. Antisocial has worst prognosis. High ER utilization.",

  357: "CLUSTER B (Dramatic/Emotional): Antisocial, Borderline, Histrionic, Narcissistic. Mnemonic: 'BAD'—Behavioral acting out, Attention-seeking, Dramatic. PMHNP: DBT gold standard for BPD. No FDA-approved meds for PDs. Treat comorbid depression/anxiety. Set firm boundaries.",

  // Cluster C questions
  109: "CLUSTER C ('SAD/WORRIED' - Anxious/Fearful): Avoidant, Dependent, OCPD. Mnemonic: 'Cowardly, Clingy, Controlling.' BEST PROGNOSIS of all clusters. Respond well to therapy (CBT). OCPD ≠ OCD: OCPD is ego-syntonic (patient thinks they're right). SSRIs may help anxiety symptoms.",

  358: "CLUSTER C (Anxious/Fearful): Avoidant, Dependent, OCPD. Mnemonic: 'SAD'—Scared, Attached, Demanding perfection. PMHNP: Best treatment response of all clusters. CBT effective. SSRIs for anxiety. AVOIDANT wants connection (unlike Schizoid). OCPD is ego-syntonic—patient sees no problem.",

  // Borderline PD
  72: "BORDERLINE PD: Unstable relationships, self-image, affect. Fear of abandonment, impulsivity, self-harm, chronic emptiness. GOLD STANDARD: DBT (Dialectical Behavior Therapy). PMHNP role: NO FDA-approved meds for BPD itself. Treat target symptoms: SSRIs (depression), mood stabilizers (impulsivity), low-dose antipsychotics (dissociation). Avoid benzos (disinhibition risk).",

  247: "DBT FOR BPD: 4 modules—Mindfulness, Distress Tolerance, Emotion Regulation, Interpersonal Effectiveness. Created by Marsha Linehan (who has BPD herself). Reduces self-harm 50%, suicide attempts, hospitalizations. Skills training + individual therapy + phone coaching. Evidence-based gold standard.",

  // Antisocial PD
  110: "ANTISOCIAL PD: Pattern of disregard for others' rights. Must be ≥18 years old with history of Conduct Disorder before age 15. HIGH RISK: violence, homicide, incarceration, substance abuse (especially alcohol), suicide. NO effective treatment. PMHNP role: Safety assessment, treat comorbid SUD, set firm limits. Psychopathy subset = worst prognosis.",

  447: "ANTISOCIAL PD RISKS: Violence, homicide, incarceration, substance abuse (AUDIT screen), suicide. PMHNP considerations: Cannot diagnose <18 (use Conduct Disorder). Treatment-resistant. Focus on harm reduction, comorbid SUD treatment. Document safety assessments. These patients often charm then manipulate.",

  // Narcissistic PD
  357: "CLUSTER B includes NARCISSISTIC PD: Grandiosity, need for admiration, lack of empathy. Fragile self-esteem under surface. May decompensate with perceived failures ('narcissistic injury'). PMHNP: Treat comorbid depression (common when narcissistic supply fails). Therapy difficult—they don't see a problem.",

  // Histrionic PD
  108: "CLUSTER B includes HISTRIONIC PD: Excessive emotionality, attention-seeking, seductive behavior. 'Drama queen.' PMHNP: Often present with somatic complaints. May develop conversion symptoms. Treat comorbid depression. Set boundaries on session length/frequency. Avoid reinforcing dramatic behavior.",

  // OCD vs OCPD
  115: "OCD vs OCPD: OCD = intrusive thoughts + compulsions, EGO-DYSTONIC (patient knows it's irrational, wants to stop). OCPD = rigid perfectionism, orderliness, control, EGO-SYNTONIC (patient thinks it's fine). OCD is Axis I (treatable with SSRIs/ERP). OCPD is Cluster C personality disorder (harder to treat).",

  // Avoidant PD
  358: "CLUSTER C includes AVOIDANT PD: Wants social connection but fears rejection/criticism. Different from Schizoid (doesn't want connection). PMHNP: Responds well to SSRIs + CBT/exposure. May have comorbid social anxiety disorder. Gradual exposure therapy helpful. Better prognosis than Cluster A/B.",

  // Dependent PD
  109: "CLUSTER C includes DEPENDENT PD: Excessive need to be cared for, submissive, clinging, fear of separation. At risk for staying in abusive relationships. PMHNP: CBT to build autonomy. Assertiveness training. Treat comorbid depression/anxiety. Watch for transference—may become dependent on provider.",

  // General PD treatment
  247: "PERSONALITY DISORDER TREATMENT: NO FDA-approved medications for any PD. Meds target SYMPTOMS: SSRIs (depression, anxiety, impulsivity), mood stabilizers (impulsivity, aggression), low-dose antipsychotics (psychotic-like symptoms, dissociation). AVOID BENZOS in Cluster B (disinhibition). Therapy is primary treatment."
};

let updateCount = 0;
data.forEach(q => {
  if (pdUpdates[q.id]) {
    q.rationale = pdUpdates[q.id];
    updateCount++;
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Personality disorder updates complete: Updated ${updateCount} questions`);
