import { TrendingUp, Target, Award, Brain, Calendar, CheckCircle2, BarChart3 } from 'lucide-react'
import { useProgressStore } from '../store/progressStore'
import { ANCC_DOMAINS } from '../types'

export default function Progress() {
  const {
    examResults,
    totalQuestionsAnswered,
    flashcardsReviewed,
    studyStreak,
    getOverallAccuracy,
    getPassProbability,
    getCategoryPerformance,
    getDomainPerformance,
  } = useProgressStore()

  const accuracy = getOverallAccuracy()
  const passProbability = getPassProbability()
  const categoryPerformance = getCategoryPerformance()
  const domainPerformance = getDomainPerformance()
  const recentExams = examResults.slice(0, 5)
  const hasDomainData = domainPerformance.some(d => d.total > 0)

  const getPassProbabilityColor = (prob: number) => {
    if (prob >= 85) return 'bg-emerald-500'
    if (prob >= 75) return 'bg-amber-500'
    return 'bg-red-500'
  }

  const getPassProbabilityMessage = (prob: number) => {
    if (prob >= 90) return 'Excellent! You\'re very likely to pass the exam.'
    if (prob >= 85) return 'Great job! You have a high probability of passing.'
    if (prob >= 75) return 'Good progress! Continue studying to improve your chances.'
    if (prob >= 65) return 'Keep going! More practice will improve your probability.'
    return 'Focus on weak areas. You need more preparation.'
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const hasData = examResults.length > 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-3 bg-emerald-500 rounded-xl mb-4">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-gray-500 text-sm">
          Track your performance and identify areas for improvement
        </p>
      </div>

      {!hasData ? (
        <div className="glass-card p-12 text-center">
          <div className="inline-block p-3 bg-gray-100 rounded-xl mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No Progress Data Yet</h2>
          <p className="text-gray-500 text-sm mb-4">
            Complete a practice exam to start tracking your progress.
          </p>
          <div className="text-xs text-gray-400">
            Go to Practice to get started
          </div>
        </div>
      ) : (
        <>
          {/* Pass Probability */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-amber-500" />
              <h2 className="font-medium text-gray-900">Pass Probability</h2>
            </div>

            <div className={`p-6 rounded-xl ${getPassProbabilityColor(passProbability)} mb-4`}>
              <div className="text-center">
                <div className="text-4xl font-semibold text-white mb-1">{passProbability}%</div>
                <div className="text-sm text-white/80">Predicted Pass Rate</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-600 text-sm mb-3">{getPassProbabilityMessage(passProbability)}</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Accuracy:</span>
                  <span className="text-gray-900">{accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Questions:</span>
                  <span className="text-gray-900">{totalQuestionsAnswered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Exams taken:</span>
                  <span className="text-gray-900">{examResults.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Streak:</span>
                  <span className="text-gray-900">{studyStreak} day{studyStreak !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border-l-3 border-amber-500">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">
                  {passProbability >= 85
                    ? 'You\'re well-prepared! Focus on practice exams to maintain your edge.'
                    : 'Review weak categories and complete more practice questions.'}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 text-center">
              <Target className="w-5 h-5 text-amber-500 mx-auto mb-2" />
              <div className="text-xl font-semibold text-gray-900">{accuracy}%</div>
              <div className="text-xs text-gray-500">Accuracy</div>
            </div>

            <div className="glass-card p-4 text-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
              <div className="text-xl font-semibold text-gray-900">{totalQuestionsAnswered}</div>
              <div className="text-xs text-gray-500">Questions</div>
            </div>

            <div className="glass-card p-4 text-center">
              <Brain className="w-5 h-5 text-purple-500 mx-auto mb-2" />
              <div className="text-xl font-semibold text-gray-900">{flashcardsReviewed}</div>
              <div className="text-xs text-gray-500">Flashcards</div>
            </div>

            <div className="glass-card p-4 text-center">
              <Award className="w-5 h-5 text-rose-500 mx-auto mb-2" />
              <div className="text-xl font-semibold text-gray-900">{examResults.length}</div>
              <div className="text-xs text-gray-500">Exams</div>
            </div>
          </div>

          {/* ANCC Domain Performance */}
          {hasDomainData && (
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-amber-500" />
                <h3 className="font-medium text-gray-900">ANCC Board Domains</h3>
              </div>
              <div className="space-y-4">
                {domainPerformance.map(domain => (
                  <div key={domain.domain}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">
                        <span className="font-medium text-amber-600">D{domain.domain}</span> {domain.domainName}
                      </span>
                      <span className={`font-medium ${
                        domain.percentage >= 75 ? 'text-emerald-600' :
                        domain.percentage >= 65 ? 'text-amber-600' : 'text-red-500'
                      }`}>
                        {domain.total > 0 ? `${domain.percentage}%` : '--'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            domain.percentage >= 75 ? 'bg-emerald-500' :
                            domain.percentage >= 65 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${domain.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 w-16 text-right">
                        {domain.correct}/{domain.total}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Target: {ANCC_DOMAINS[domain.domain as keyof typeof ANCC_DOMAINS]?.percentage}% of exam
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Performance */}
          {categoryPerformance.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="font-medium text-gray-900 mb-4">Performance by Category</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {categoryPerformance.map(cat => (
                  <div key={cat.category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{cat.category}</span>
                      <span className="text-gray-500">{cat.percentage}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          cat.percentage >= 80 ? 'bg-emerald-500' :
                          cat.percentage >= 70 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Exams */}
          {recentExams.length > 0 && (
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-400" />
                <h3 className="font-medium text-gray-900">Recent Exams</h3>
              </div>
              <div className="space-y-2">
                {recentExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="text-gray-400 text-xs font-mono">
                      {formatDate(exam.date)}
                    </div>
                    <div className="flex-1 text-sm text-gray-700">
                      {exam.totalQuestions} questions
                    </div>
                    <div className={`text-sm font-medium ${
                      exam.percentage >= 75 ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      {exam.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Study Streak */}
          <div className="glass-card p-6 bg-amber-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Study Streak</h3>
                <p className="text-gray-600 text-sm">
                  {studyStreak > 0
                    ? `${studyStreak} day${studyStreak > 1 ? 's' : ''} in a row`
                    : 'Start today!'}
                </p>
              </div>
              <div className="text-3xl font-semibold text-amber-600">
                {studyStreak}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Developer Credit */}
      <div className="glass-card p-4 text-center text-sm">
        <p className="text-gray-700">A. Ace Sirleaf</p>
        <p className="text-xs text-gray-400 mt-1">
          BS Applied Mathematics • BS Economics • BS Nursing • MSN
        </p>
      </div>
    </div>
  )
}
