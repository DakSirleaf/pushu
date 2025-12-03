import { useState, useEffect } from 'react'
import { Question } from '../types'
import { useProgressStore } from '../store/progressStore'

export default function PracticeExam() {
  const [examStarted, setExamStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [resultsSaved, setResultsSaved] = useState(false)

  // Test customization options
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(25)
  const [excludeCorrect, setExcludeCorrect] = useState(false)
  const [availableCount, setAvailableCount] = useState(0)

  const addExamResult = useProgressStore((state) => state.addExamResult)
  const correctQuestionIds = useProgressStore((state) => state.correctQuestionIds)
  const attemptedQuestionIds = useProgressStore((state) => state.attemptedQuestionIds)
  const resetQuestionHistory = useProgressStore((state) => state.resetQuestionHistory)

  const questionOptions = [25, 50, 75, 100, 150, 175]

  // Load all questions from JSON file
  useEffect(() => {
    fetch('/data/questions.json')
      .then(res => res.json())
      .then(data => {
        setAllQuestions(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading questions:', err)
        setLoading(false)
      })
  }, [])

  // Update available count when options change
  useEffect(() => {
    if (allQuestions.length === 0) return

    if (excludeCorrect) {
      const correctSet = new Set(correctQuestionIds)
      const available = allQuestions.filter(q => !correctSet.has(q.id))
      setAvailableCount(available.length)
    } else {
      setAvailableCount(allQuestions.length)
    }
  }, [allQuestions, excludeCorrect, correctQuestionIds])

  const handleStartExam = () => {
    let questionPool = [...allQuestions]

    // Filter out correctly answered questions if option selected
    if (excludeCorrect && correctQuestionIds.length > 0) {
      const correctSet = new Set(correctQuestionIds)
      questionPool = questionPool.filter(q => !correctSet.has(q.id))

      // If all questions have been answered correctly, reset and use all
      if (questionPool.length === 0) {
        resetQuestionHistory()
        questionPool = [...allQuestions]
      }
    }

    // Randomly select questions
    const shuffled = questionPool.sort(() => Math.random() - 0.5)
    const count = Math.min(selectedQuestionCount, shuffled.length)
    const selected = shuffled.slice(0, count)

    setQuestions(selected)
    setExamStarted(true)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setResultsSaved(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleSubmitExam = () => {
    setShowResults(true)
    setResultsSaved(false)
  }

  const calculateScore = () => {
    let correct = 0
    const categoryPerformance: { [key: string]: { correct: number; total: number } } = {}
    const questionResults: { questionId: number; correct: boolean; domain?: number }[] = []

    questions.forEach((q, idx) => {
      const userAnswer = answers[idx]
      const isCorrect = userAnswer !== undefined && userAnswer === q.correctAnswer

      if (isCorrect) correct++

      // Track individual question results with domain
      questionResults.push({ questionId: q.id, correct: isCorrect, domain: q.domain })

      // Track by category
      if (!categoryPerformance[q.category]) {
        categoryPerformance[q.category] = { correct: 0, total: 0 }
      }
      categoryPerformance[q.category].total++
      if (isCorrect) categoryPerformance[q.category].correct++
    })

    const categoryStats = Object.entries(categoryPerformance).map(([category, stats]) => ({
      category,
      correct: stats.correct,
      total: stats.total,
      percentage: Math.round((stats.correct / stats.total) * 100)
    })).sort((a, b) => b.percentage - a.percentage)

    const percentage = Math.round((correct / questions.length) * 100)
    const passProbability = calculatePassProbability(percentage, categoryStats)

    const strengths = categoryStats.filter(c => c.percentage >= 80 && c.total >= 3).slice(0, 5)
    const weaknesses = categoryStats.filter(c => c.percentage < 70 && c.total >= 3).sort((a, b) => a.percentage - b.percentage).slice(0, 5)

    return {
      correct,
      total: questions.length,
      percentage,
      categoryStats,
      strengths,
      weaknesses,
      passProbability,
      questionResults
    }
  }

  const calculatePassProbability = (practiceScore: number, categoryStats: any[]) => {
    let probability = 0

    if (practiceScore >= 85) probability += 60
    else if (practiceScore >= 80) probability += 55
    else if (practiceScore >= 75) probability += 45
    else if (practiceScore >= 70) probability += 35
    else if (practiceScore >= 65) probability += 25
    else probability += 15

    const highYieldTopics = ['Pharmacology', 'Diagnostic Criteria (DSM-5)', 'Ethics & Legal Issues', 'Assessment Scales & Screening']
    const highYieldPerf = categoryStats
      .filter(c => highYieldTopics.some(hy => c.category.includes(hy)))
      .reduce((acc, c) => acc + c.percentage, 0) / Math.max(categoryStats.filter(c => highYieldTopics.some(hy => c.category.includes(hy))).length, 1)

    if (highYieldPerf >= 80) probability += 25
    else if (highYieldPerf >= 75) probability += 20
    else if (highYieldPerf >= 70) probability += 15
    else probability += 10

    const variance = categoryStats.reduce((acc, c) => acc + Math.pow(c.percentage - practiceScore, 2), 0) / categoryStats.length
    const stdDev = Math.sqrt(variance)

    if (stdDev < 10) probability += 15
    else if (stdDev < 15) probability += 12
    else if (stdDev < 20) probability += 8
    else probability += 5

    return Math.min(Math.round(probability), 99)
  }

  const score = showResults ? calculateScore() : null

  // Save results to progress store when exam is submitted
  useEffect(() => {
    if (showResults && score && !resultsSaved) {
      addExamResult({
        score: score.correct,
        totalQuestions: score.total,
        percentage: score.percentage,
        passProbability: score.passProbability,
        categoryPerformance: score.categoryStats,
        strengths: score.strengths,
        weaknesses: score.weaknesses,
      }, score.questionResults)
      setResultsSaved(true)
    }
  }, [showResults, score, resultsSaved, addExamResult])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (!examStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-6 text-center">Configure Practice Session</h1>

          {/* Question Count */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-3">Number of Questions</label>
            <div className="grid grid-cols-3 gap-2">
              {questionOptions.map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedQuestionCount(count)}
                  disabled={excludeCorrect && count > availableCount}
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedQuestionCount === count
                      ? 'bg-amber-500 text-white'
                      : excludeCorrect && count > availableCount
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Options */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeCorrect}
                onChange={(e) => setExcludeCorrect(e.target.checked)}
                className="mt-1 w-4 h-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
              />
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Exclude previously correct answers
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Focus on questions you haven't mastered yet.
                  {excludeCorrect && (
                    <span className="block mt-1 text-amber-600">
                      {availableCount} questions available
                      {availableCount === 0 && ' (will reset history)'}
                    </span>
                  )}
                </p>
              </div>
            </label>
          </div>

          {/* Stats */}
          <div className="mb-6 text-center text-sm text-gray-500">
            <p>Total: {allQuestions.length} questions</p>
            <p>Mastered: {correctQuestionIds.length} | Attempted: {attemptedQuestionIds.length}</p>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartExam}
            className="w-full glass-button-primary"
          >
            Start Practice ({Math.min(selectedQuestionCount, availableCount || allQuestions.length)} questions)
          </button>

          {/* Info */}
          <div className="mt-4 text-xs text-gray-400 text-center">
            Questions randomly selected • 75% passing score
          </div>
        </div>
      </div>
    )
  }

  if (showResults && score) {
    const passed = score.percentage >= 75

    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Pass Probability */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pass Probability</h2>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-semibold ${
              score.passProbability >= 80 ? 'text-emerald-600' :
              score.passProbability >= 60 ? 'text-amber-600' : 'text-red-500'
            }`}>
              {score.passProbability}%
            </div>
            <div className="flex-1">
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${
                  score.passProbability >= 80 ? 'bg-emerald-500' :
                  score.passProbability >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`} style={{ width: `${score.passProbability}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Score Summary */}
        <div className="grid grid-cols-4 gap-3">
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-semibold text-gray-900">{score.percentage}%</div>
            <div className="text-xs text-gray-500">Score</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-semibold text-emerald-600">{score.correct}</div>
            <div className="text-xs text-gray-500">Correct</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-2xl font-semibold text-red-500">{score.total - score.correct}</div>
            <div className="text-xs text-gray-500">Incorrect</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className={`text-2xl font-semibold ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
              {passed ? 'PASS' : 'FAIL'}
            </div>
            <div className="text-xs text-gray-500">Status</div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <h3 className="font-medium text-emerald-600 mb-3">Strengths</h3>
            {score.strengths.length > 0 ? (
              <div className="space-y-2">
                {score.strengths.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{s.category}</span>
                    <span className="text-emerald-600">{s.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Keep practicing to build strengths</p>
            )}
          </div>

          <div className="glass-card p-5">
            <h3 className="font-medium text-red-500 mb-3">Areas to Improve</h3>
            {score.weaknesses.length > 0 ? (
              <div className="space-y-2">
                {score.weaknesses.map((w, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{w.category}</span>
                    <span className="text-red-500">{w.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No major weaknesses</p>
            )}
          </div>
        </div>

        {/* Category Performance */}
        <div className="glass-card p-5">
          <h3 className="font-medium text-gray-900 mb-3">Category Performance</h3>
          <div className="grid md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {score.categoryStats.map((cat, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className="flex-1 text-gray-700 truncate">{cat.category}</div>
                <div className={`font-medium ${
                  cat.percentage >= 80 ? 'text-emerald-600' :
                  cat.percentage >= 70 ? 'text-amber-600' : 'text-red-500'
                }`}>
                  {cat.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              setExamStarted(false)
              setQuestions([])
              setAnswers({})
              setCurrentQuestion(0)
              setShowResults(false)
            }}
            className="glass-button-primary"
          >
            New Practice Session
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const userAnswer = answers[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Progress */}
      <div className="glass-card p-4">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="glass-card p-6">
        <h2 className="text-lg text-gray-900 mb-6 leading-relaxed">{question.question}</h2>

        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const isSelected = userAnswer === idx
            const isCorrect = idx === question.correctAnswer
            const showFeedback = userAnswer !== undefined

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={userAnswer !== undefined}
                className={`w-full p-4 text-left rounded-lg transition-colors flex items-center gap-3 ${
                  showFeedback
                    ? isCorrect
                      ? 'bg-emerald-50 border border-emerald-300'
                      : isSelected
                      ? 'bg-red-50 border border-red-300'
                      : 'bg-gray-50 border border-gray-200'
                    : 'bg-gray-50 border border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs ${
                  showFeedback
                    ? isCorrect
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isSelected
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'border-gray-300'
                    : 'border-gray-300'
                }`}>
                  {showFeedback && (isCorrect ? '✓' : isSelected ? '✗' : '')}
                </div>
                <span className={`text-sm ${showFeedback && isCorrect ? 'font-medium text-emerald-900' : 'text-gray-700'}`}>
                  {option}
                </span>
              </button>
            )
          })}
        </div>

        {/* Rationale */}
        {userAnswer !== undefined && question.rationale && (
          <div className={`mt-4 p-4 rounded-lg ${
            userAnswer === question.correctAnswer ? 'bg-emerald-50' : 'bg-red-50'
          }`}>
            <p className={`text-sm font-medium mb-1 ${
              userAnswer === question.correctAnswer ? 'text-emerald-800' : 'text-red-800'
            }`}>
              {userAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
            </p>
            <p className="text-sm text-gray-700">{question.rationale}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className={`glass-button ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button onClick={handleSubmitExam} className="glass-button-primary">
            Submit
          </button>
        ) : (
          <button onClick={handleNextQuestion} className="glass-button-primary">
            Next
          </button>
        )}
      </div>
    </div>
  )
}
