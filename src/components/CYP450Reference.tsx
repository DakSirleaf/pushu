import { AlertTriangle, TrendingDown, TrendingUp, Clock, Zap } from 'lucide-react'

export default function CYP450Reference() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-4">
          <AlertTriangle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">CYP450 Drug Interactions</h1>
        <p className="text-white/70">
          High-yield reference for ANCC PMHNP Board Exam
        </p>
      </div>

      {/* Key Concept Alert */}
      <div className="glass-card p-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-l-4 border-amber-500">
        <div className="flex items-start gap-4">
          <Zap className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-xl mb-2 text-amber-300">Critical Board Exam Concept</h3>
            <p className="text-white/90 leading-relaxed">
              CYP450 enzymes metabolize most psychiatric medications. When enzyme activity changes,
              drug levels change, leading to either <span className="font-bold text-red-400">TOXICITY</span> (inhibition)
              or <span className="font-bold text-yellow-400">SUBTHERAPEUTIC EFFECTS</span> (induction).
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table: Inducers vs Inhibitors */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">INDUCERS vs INHIBITORS - Quick Comparison</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* INDUCERS Column */}
          <div className="bg-yellow-500/10 p-6 rounded-2xl border-2 border-yellow-500/30">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="w-8 h-8 text-yellow-400" />
              <h3 className="text-2xl font-bold text-yellow-300">INDUCERS</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Mechanism</div>
                <div className="font-bold text-lg">↑ Enzyme Activity</div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Drug Levels</div>
                <div className="font-bold text-lg text-yellow-400">↓ DECREASE</div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Clinical Effect</div>
                <div className="font-bold text-lg text-yellow-400">SUBTHERAPEUTIC</div>
                <div className="text-sm text-white/70 mt-2">Drug doesn't work</div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Consequences</div>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• Treatment failure</li>
                  <li>• Symptom relapse</li>
                  <li>• Withdrawal symptoms</li>
                  <li>• Contraceptive failure</li>
                </ul>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Onset/Offset</div>
                <div className="font-bold">Onset: 1-2 weeks (SLOW)</div>
                <div className="font-bold">Offset: 1-2 weeks</div>
              </div>

              <div className="bg-amber-600/20 p-4 rounded-xl border border-amber-500">
                <div className="text-sm font-bold text-amber-300 mb-2">Board Exam Example:</div>
                <p className="text-sm text-white/90">
                  Patient on <span className="font-bold">quetiapine</span> (Seroquel) starts
                  <span className="font-bold"> carbamazepine</span> → quetiapine levels DROP →
                  mania relapse
                </p>
              </div>
            </div>
          </div>

          {/* INHIBITORS Column */}
          <div className="bg-red-500/10 p-6 rounded-2xl border-2 border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-red-400" />
              <h3 className="text-2xl font-bold text-red-300">INHIBITORS</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Mechanism</div>
                <div className="font-bold text-lg">↓ Enzyme Activity</div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Drug Levels</div>
                <div className="font-bold text-lg text-red-400">↑ INCREASE</div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Clinical Effect</div>
                <div className="font-bold text-lg text-red-400">TOXICITY</div>
                <div className="text-sm text-white/70 mt-2">Too much drug in system</div>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Consequences</div>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• Side effects/toxicity</li>
                  <li>• QTc prolongation</li>
                  <li>• Sedation/CNS depression</li>
                  <li>• Arrhythmias, seizures</li>
                </ul>
              </div>

              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-sm text-white/60 mb-1">Onset/Offset</div>
                <div className="font-bold">Onset: 1-3 days (RAPID)</div>
                <div className="font-bold">Offset: Varies by half-life</div>
              </div>

              <div className="bg-red-600/20 p-4 rounded-xl border border-red-500">
                <div className="text-sm font-bold text-red-300 mb-2">Board Exam Example:</div>
                <p className="text-sm text-white/90">
                  Patient on <span className="font-bold">clozapine</span> starts
                  <span className="font-bold"> fluvoxamine</span> → clozapine levels RISE →
                  seizures/toxicity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Major CYP Enzymes */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6">Major CYP450 Enzymes - What You MUST Know</h2>

        <div className="space-y-6">
          {/* CYP1A2 */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-indigo-300">CYP1A2</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-white/60 mb-2">Substrates (Metabolized by 1A2)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Clozapine (major)</div>
                  <div>• Olanzapine</div>
                  <div>• Duloxetine</div>
                  <div>• Caffeine</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Inducers (↓ levels)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Smoking/tobacco</div>
                  <div>• Carbamazepine</div>
                  <div>• Charbroiled food</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Inhibitors (↑ levels)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Fluvoxamine (strong)</div>
                  <div>• Ciprofloxacin</div>
                  <div>• Grapefruit juice</div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-500/20 rounded-lg border-l-4 border-red-500">
              <div className="text-sm font-bold text-red-300">⚠ Board Tip:</div>
              <p className="text-sm text-white/80 mt-1">
                Smoker on clozapine quits smoking → clozapine levels RISE (smoking induces 1A2) → risk of seizures!
              </p>
            </div>
          </div>

          {/* CYP2D6 */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-purple-300">CYP2D6</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-white/60 mb-2">Substrates (Metabolized by 2D6)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Aripiprazole</div>
                  <div className="font-bold">• Risperidone</div>
                  <div>• Haloperidol</div>
                  <div>• Venlafaxine</div>
                  <div>• Codeine (prodrug)</div>
                  <div>• Tramadol</div>
                  <div>• TCAs</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Inducers (↓ levels)</div>
                <div className="space-y-1 text-sm text-white/70">
                  <div className="italic">None clinically significant</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Inhibitors (↑ levels)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Fluoxetine (strong)</div>
                  <div className="font-bold">• Paroxetine (strong)</div>
                  <div>• Bupropion</div>
                  <div>• Duloxetine</div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-500/20 rounded-lg border-l-4 border-amber-500">
              <div className="text-sm font-bold text-amber-300">💡 Board Tip:</div>
              <p className="text-sm text-white/80 mt-1">
                Poor metabolizers (10% of population) can't convert codeine to morphine → no pain relief!
              </p>
            </div>
          </div>

          {/* CYP3A4 */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-green-300">CYP3A4 (Most Important - 50% of drugs!)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-white/60 mb-2">Substrates (Metabolized by 3A4)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Quetiapine</div>
                  <div className="font-bold">• Aripiprazole</div>
                  <div className="font-bold">• Lurasidone</div>
                  <div>• Alprazolam</div>
                  <div>• Midazolam</div>
                  <div>• Buspirone</div>
                  <div>• Most statins</div>
                  <div>• Oral contraceptives</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Inducers (↓ levels)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Carbamazepine</div>
                  <div>• Phenytoin</div>
                  <div>• St. John's Wort</div>
                  <div>• Rifampin</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Inhibitors (↑ levels)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Ketoconazole</div>
                  <div className="font-bold">• Erythromycin</div>
                  <div>• Grapefruit juice</div>
                  <div>• Fluoxetine</div>
                  <div>• Fluvoxamine</div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-red-500/20 rounded-lg border-l-4 border-red-500">
              <div className="text-sm font-bold text-red-300">⚠ High-Yield Alert:</div>
              <p className="text-sm text-white/80 mt-1">
                Patient on quetiapine + carbamazepine → quetiapine won't work! OR patient takes St. John's Wort → birth control fails!
              </p>
            </div>
          </div>

          {/* CYP2C19 */}
          <div className="bg-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-cyan-300">CYP2C19</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-white/60 mb-2">Substrates (Metabolized by 2C19)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Citalopram</div>
                  <div className="font-bold">• Escitalopram</div>
                  <div>• Diazepam</div>
                  <div>• PPIs (omeprazole)</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Inducers (↓ levels)</div>
                <div className="space-y-1 text-sm">
                  <div>• Carbamazepine</div>
                  <div>• Rifampin</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-2">Inhibitors (↑ levels)</div>
                <div className="space-y-1 text-sm">
                  <div className="font-bold">• Fluvoxamine</div>
                  <div>• Fluoxetine</div>
                  <div>• Omeprazole</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Aids */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6">Memory Aids for Board Exam</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-yellow-300">INDUCERS Mnemonic: "CRAP GPS"</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-bold text-yellow-400">C</span>arbamazepine</div>
              <div><span className="font-bold text-yellow-400">R</span>ifampin</div>
              <div><span className="font-bold text-yellow-400">A</span>lcohol (chronic)</div>
              <div><span className="font-bold text-yellow-400">P</span>henytoin</div>
              <div><span className="font-bold text-yellow-400">G</span>riseofulvin</div>
              <div><span className="font-bold text-yellow-400">P</span>henobarbital</div>
              <div><span className="font-bold text-yellow-400">S</span>t. John's Wort / <span className="font-bold text-yellow-400">S</span>moking</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4 text-red-300">INHIBITORS Mnemonic: "SICK FACES.COM"</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-bold text-red-400">S</span>odium valproate</div>
              <div><span className="font-bold text-red-400">I</span>soniazid</div>
              <div><span className="font-bold text-red-400">C</span>imetidine</div>
              <div><span className="font-bold text-red-400">K</span>etoconazole</div>
              <div><span className="font-bold text-red-400">F</span>luconazole</div>
              <div><span className="font-bold text-red-400">A</span>lcohol (acute)</div>
              <div><span className="font-bold text-red-400">C</span>hloramphenicol</div>
              <div><span className="font-bold text-red-400">E</span>rythromycin</div>
              <div><span className="font-bold text-red-400">S</span>ulfonamides</div>
              <div><span className="font-bold text-red-400">C</span>iprofloxacin</div>
              <div><span className="font-bold text-red-400">O</span>meprazole</div>
              <div><span className="font-bold text-red-400">M</span>etronidazole</div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-indigo-500/20 p-6 rounded-2xl border border-indigo-500">
          <h3 className="text-lg font-bold mb-3 text-indigo-300">SSRIs as Inhibitors - Remember:</h3>
          <div className="space-y-2 text-sm">
            <div><span className="font-bold text-indigo-400">Flu</span>oxetine → <span className="font-bold">2D6</span> (strong), 3A4, 2C19</div>
            <div><span className="font-bold text-indigo-400">Flu</span>voxamine → <span className="font-bold">1A2</span> (strong), 2C19, 3A4</div>
            <div><span className="font-bold text-indigo-400">Par</span>oxetine → <span className="font-bold">2D6</span> (strong)</div>
            <div className="text-white/70 italic mt-3">→ Sertraline, citalopram, escitalopram = minimal inhibition (safer!)</div>
          </div>
        </div>
      </div>

      {/* Clinical Scenarios */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-6">High-Yield Board Exam Clinical Scenarios</h2>

        <div className="space-y-4">
          <div className="bg-red-500/10 p-5 rounded-xl border-l-4 border-red-500">
            <div className="font-bold text-red-300 mb-2">Scenario 1: Clozapine + Fluvoxamine</div>
            <p className="text-sm text-white/80 mb-2">
              Patient on clozapine 400mg starts fluvoxamine for OCD → clozapine levels can increase 5-10x!
            </p>
            <div className="text-sm font-bold text-red-400">→ Action: DECREASE clozapine dose by 50% or more</div>
          </div>

          <div className="bg-yellow-500/10 p-5 rounded-xl border-l-4 border-yellow-500">
            <div className="font-bold text-yellow-300 mb-2">Scenario 2: Smoker on Clozapine Quits</div>
            <p className="text-sm text-white/80 mb-2">
              Smoking induces CYP1A2 → when patient quits, clozapine levels rise → seizure risk!
            </p>
            <div className="text-sm font-bold text-yellow-400">→ Action: Decrease clozapine dose by 25-50% over 1 week</div>
          </div>

          <div className="bg-orange-500/10 p-5 rounded-xl border-l-4 border-orange-500">
            <div className="font-bold text-orange-300 mb-2">Scenario 3: Quetiapine + Carbamazepine</div>
            <p className="text-sm text-white/80 mb-2">
              Carbamazepine is strong 3A4 inducer → quetiapine levels drop dramatically → treatment failure
            </p>
            <div className="text-sm font-bold text-orange-400">→ Action: Increase quetiapine dose 5x OR switch mood stabilizer</div>
          </div>

          <div className="bg-red-500/10 p-5 rounded-xl border-l-4 border-red-500">
            <div className="font-bold text-red-300 mb-2">Scenario 4: Contraceptive Failure</div>
            <p className="text-sm text-white/80 mb-2">
              Patient on birth control starts carbamazepine or St. John's Wort → induces 3A4 → contraceptive levels drop
            </p>
            <div className="text-sm font-bold text-red-400">→ Action: Use barrier contraception, increase estrogen dose, or switch medications</div>
          </div>
        </div>
      </div>

      {/* Quick Reference Card */}
      <div className="glass-card p-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-8 h-8 text-indigo-300" />
          <h2 className="text-2xl font-bold">Last-Minute Review Card</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-black/30 p-4 rounded-xl">
            <div className="font-bold text-yellow-400 mb-2">When you see INDUCERS:</div>
            <div className="text-white/90">Think: Drug levels ↓ → Won't work → Increase dose</div>
          </div>

          <div className="bg-black/30 p-4 rounded-xl">
            <div className="font-bold text-red-400 mb-2">When you see INHIBITORS:</div>
            <div className="text-white/90">Think: Drug levels ↑ → Toxicity → Decrease dose</div>
          </div>

          <div className="bg-black/30 p-4 rounded-xl">
            <div className="font-bold text-green-400 mb-2">Safest SSRIs (minimal interactions):</div>
            <div className="text-white/90">Sertraline, Citalopram, Escitalopram</div>
          </div>

          <div className="bg-black/30 p-4 rounded-xl">
            <div className="font-bold text-purple-400 mb-2">Most dangerous combinations:</div>
            <div className="text-white/90">Clozapine + Fluvoxamine (seizures!)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
