import { useState, useEffect, useCallback, useRef } from 'react'
import { Question, ANCC_DOMAINS, DomainPerformance } from '../types'
import { useProgressStore } from '../store/progressStore'
import {
  Clock, Flag, ChevronLeft, ChevronRight, Grid3X3, AlertTriangle,
  CheckCircle2, XCircle, BarChart3, Target, Award, Play, Pause
} from 'lucide-react'

// ANCC PMHNP Exam: 175 questions, 3.5 hours (210 minutes)
const EXAM_QUESTIONS = 175
const EXAM_TIME_MINUTES = 210

export default function BoardSimulation() {
  const [examStarted, setExamStarted] = useState(false)
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [showNavigator, setShowNavigator] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Timer state (in seconds)
  const [timeRemaining, setTimeRemaining] = useState(EXAM_TIME_MINUTES * 60)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const addExamResult = useProgressStore((state) => state.addExamResult)

  // Load questions
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

  // Timer effect
  useEffect(() => {
    if (examStarted && !examSubmitted && !isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [examStarted, examSubmitted, isPaused])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimeColor = () => {
    const percentRemaining = (timeRemaining / (EXAM_TIME_MINUTES * 60)) * 100
    if (percentRemaining > 50) return 'text-emerald-600'
    if (percentRemaining > 25) return 'text-amber-600'
    return 'text-red-600'
  }

  const handleStartExam = () => {
    // Distribute questions by domain according to ANCC percentages
    const domainQuestions: { [key: number]: Question[] } = { 1: [], 2: [], 3: [], 4: [], 5: [] }

    allQuestions.forEach(q => {
      if (domainQuestions[q.domain]) {
        domainQuestions[q.domain].push(q)
      }
    })

    // Shuffle each domain
    Object.keys(domainQuestions).forEach(domain => {
      domainQuestions[Number(domain)] = domainQuestions[Number(domain)]
        .sort(() => Math.random() - 0.5)
    })

    // Select proportional questions from each domain
    const selectedQuestions: Question[] = []
    const domainCounts = {
      1: Math.round(EXAM_QUESTIONS * 0.15), // 26 questions
      2: Math.round(EXAM_QUESTIONS * 0.30), // 53 questions
      3: Math.round(EXAM_QUESTIONS * 0.30), // 53 questions
      4: Math.round(EXAM_QUESTIONS * 0.15), // 26 questions
      5: Math.round(EXAM_QUESTIONS * 0.10), // 17 questions
    }

    Object.entries(domainCounts).forEach(([domain, count]) => {
      const available = domainQuestions[Number(domain)]
      const toSelect = Math.min(count, available.length)
      selectedQuestions.push(...available.slice(0, toSelect))
    })

    // If we don't have enough, fill with remaining questions
    if (selectedQuestions.length < EXAM_QUESTIONS) {
      const selectedIds = new Set(selectedQuestions.map(q => q.id))
      const remaining = allQuestions
        .filter(q => !selectedIds.has(q.id))
        .sort(() => Math.random() - 0.5)
      selectedQuestions.push(...remaining.slice(0, EXAM_QUESTIONS - selectedQuestions.length))
    }

    // Final shuffle
    const finalQuestions = selectedQuestions
      .slice(0, EXAM_QUESTIONS)
      .sort(() => Math.random() - 0.5)

    setQuestions(finalQuestions)
    setExamStarted(true)
    setTimeRemaining(EXAM_TIME_MINUTES * 60)
    setCurrentQuestion(0)
    setAnswers({})
    setFlaggedQuestions(new Set())
    setExamSubmitted(false)
    setShowReview(false)
    setIsPaused(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (examSubmitted) return
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }))
  }

  const toggleFlag = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion)
      } else {
        newSet.add(currentQuestion)
      }
      return newSet
    })
  }

  const handleNavigation = (index: number) => {
    setCurrentQuestion(index)
    setShowNavigator(false)
  }

  const handleSubmitExam = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setExamSubmitted(true)
    setShowReview(false)
  }, [])

  const calculateScore = () => {
    let correct = 0
    const categoryPerformance: { [key: string]: { correct: number; total: number } } = {}
    const domainPerformance: { [key: number]: { correct: number; total: number; name: string } } = {
      1: { correct: 0, total: 0, name: ANCC_DOMAINS[1].name },
      2: { correct: 0, total: 0, name: ANCC_DOMAINS[2].name },
      3: { correct: 0, total: 0, name: ANCC_DOMAINS[3].name },
      4: { correct: 0, total: 0, name: ANCC_DOMAINS[4].name },
      5: { correct: 0, total: 0, name: ANCC_DOMAINS[5].name },
    }
    const questionResults: { questionId: number; correct: boolean; domain: number }[] = []

    questions.forEach((q, idx) => {
      const userAnswer = answers[idx]
      const isCorrect = userAnswer !== undefined && userAnswer === q.correctAnswer

      if (isCorrect) correct++

      questionResults.push({ questionId: q.id, correct: isCorrect, domain: q.domain })

      // Track by category
      if (!categoryPerformance[q.category]) {
        categoryPerformance[q.category] = { correct: 0, total: 0 }
      }
      categoryPerformance[q.category].total++
      if (isCorrect) categoryPerformance[q.category].correct++

      // Track by domain
      if (domainPerformance[q.domain]) {
        domainPerformance[q.domain].total++
        if (isCorrect) domainPerformance[q.domain].correct++
      }
    })

    const categoryStats = Object.entries(categoryPerformance).map(([category, stats]) => ({
      category,
      correct: stats.correct,
      total: stats.total,
      percentage: Math.round((stats.correct / stats.total) * 100)
    })).sort((a, b) => b.percentage - a.percentage)

    const domainStats: DomainPerformance[] = Object.entries(domainPerformance).map(([domain, stats]) => ({
      domain: Number(domain),
      domainName: stats.name,
      correct: stats.correct,
      total: stats.total,
      percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    })).sort((a, b) => a.domain - b.domain)

    const percentage = Math.round((correct / questions.length) * 100)
    const passed = percentage >= 75
    const timeUsed = EXAM_TIME_MINUTES * 60 - timeRemaining
    const avgTimePerQuestion = questions.length > 0 ? Math.round(timeUsed / questions.length) : 0

    const strengths = categoryStats.filter(c => c.percentage >= 80 && c.total >= 3).slice(0, 5)
    const weaknesses = categoryStats.filter(c => c.percentage < 70 && c.total >= 3).sort((a, b) => a.percentage - b.percentage).slice(0, 5)

    return {
      correct,
      total: questions.length,
      percentage,
      passed,
      categoryStats,
      domainStats,
      strengths,
      weaknesses,
      questionResults,
      timeUsed,
      avgTimePerQuestion,
      unanswered: questions.length - Object.keys(answers).length,
      flagged: flaggedQuestions.size
    }
  }

  const score = examSubmitted ? calculateScore() : null

  // Save results when exam is submitted
  useEffect(() => {
    if (examSubmitted && score) {
      const passProbability = Math.min(99, Math.max(10,
        score.percentage >= 85 ? 90 :
        score.percentage >= 80 ? 82 :
        score.percentage >= 75 ? 70 :
        score.percentage >= 70 ? 55 :
        score.percentage >= 65 ? 40 : 25
      ))

      addExamResult({
        score: score.correct,
        totalQuestions: score.total,
        percentage: score.percentage,
        passProbability,
        categoryPerformance: score.categoryStats,
        strengths: score.strengths,
        weaknesses: score.weaknesses,
      }, score.questionResults)
    }
  }, [examSubmitted])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading Board Simulation...</p>
        </div>
      </div>
    )
  }

  // Pre-exam setup screen
  if (!examStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-amber-500 rounded-xl mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              ANCC PMHNP Board Simulation
            </h1>
            <p className="text-gray-500">
              Experience the actual board exam format
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl p-6 mb-6">
            <h2 className="font-medium text-gray-900 mb-4">Exam Parameters</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">{EXAM_QUESTIONS} Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">3.5 Hours (210 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">Flag & Review</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">Domain Analytics</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="font-medium text-gray-900 mb-3">ANCC Domain Distribution</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(ANCC_DOMAINS).map(([domain, info]) => (
                <div key={domain} className="flex justify-between">
                  <span className="text-gray-600">
                    Domain {domain}: {info.name}
                  </span>
                  <span className="text-gray-900 font-medium">{info.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Important</p>
                <p className="text-sm text-red-700">
                  This simulates actual exam conditions. Timer starts immediately.
                  You can flag questions and return to them before submitting.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartExam}
            className="w-full glass-button-primary py-4 text-lg flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Begin Board Simulation
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            75% passing score required
          </p>
        </div>
      </div>
    )
  }

  // Results screen
  if (examSubmitted && score) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className={`glass-card p-6 ${score.passed ? 'bg-emerald-50' : 'bg-red-50'}`}>
          <div className="text-center">
            <div className={`inline-block p-3 rounded-xl mb-3 ${score.passed ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {score.passed ? (
                <CheckCircle2 className="w-8 h-8 text-white" />
              ) : (
                <XCircle className="w-8 h-8 text-white" />
              )}
            </div>
            <h1 className={`text-3xl font-bold mb-1 ${score.passed ? 'text-emerald-700' : 'text-red-700'}`}>
              {score.passed ? 'PASSED' : 'DID NOT PASS'}
            </h1>
            <p className="text-gray-600">Board Simulation Complete</p>
          </div>
        </div>

        {/* Score Grid */}
        <div className="grid grid-cols-4 gap-3">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-gray-900">{score.percentage}%</div>
            <div className="text-xs text-gray-500">Final Score</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-emerald-600">{score.correct}</div>
            <div className="text-xs text-gray-500">Correct</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-red-500">{score.total - score.correct}</div>
            <div className="text-xs text-gray-500">Incorrect</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{formatTime(score.timeUsed)}</div>
            <div className="text-xs text-gray-500">Time Used</div>
          </div>
        </div>

        {/* Domain Performance */}
        <div className="glass-card p-6">
          <h2 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-500" />
            Performance by ANCC Domain
          </h2>
          <div className="space-y-4">
            {score.domainStats.map(domain => (
              <div key={domain.domain}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">
                    Domain {domain.domain}: {domain.domainName}
                  </span>
                  <span className={`font-medium ${
                    domain.percentage >= 75 ? 'text-emerald-600' :
                    domain.percentage >= 65 ? 'text-amber-600' : 'text-red-500'
                  }`}>
                    {domain.correct}/{domain.total} ({domain.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      domain.percentage >= 75 ? 'bg-emerald-500' :
                      domain.percentage >= 65 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${domain.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass-card p-4">
            <div className="text-sm text-gray-500 mb-1">Avg Time/Question</div>
            <div className="text-xl font-semibold text-gray-900">
              {score.avgTimePerQuestion}s
            </div>
            <div className="text-xs text-gray-400">
              Target: {Math.round((EXAM_TIME_MINUTES * 60) / EXAM_QUESTIONS)}s
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="text-sm text-gray-500 mb-1">Unanswered</div>
            <div className="text-xl font-semibold text-gray-900">{score.unanswered}</div>
            <div className="text-xs text-gray-400">Questions skipped</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-sm text-gray-500 mb-1">Flagged for Review</div>
            <div className="text-xl font-semibold text-gray-900">{score.flagged}</div>
            <div className="text-xs text-gray-400">Questions marked</div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass-card p-5">
            <h3 className="font-medium text-emerald-600 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" /> Strengths
            </h3>
            {score.strengths.length > 0 ? (
              <div className="space-y-2">
                {score.strengths.map((s, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700 truncate">{s.category}</span>
                    <span className="text-emerald-600 ml-2">{s.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Complete more questions to identify strengths</p>
            )}
          </div>

          <div className="glass-card p-5">
            <h3 className="font-medium text-red-500 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" /> Areas to Improve
            </h3>
            {score.weaknesses.length > 0 ? (
              <div className="space-y-2">
                {score.weaknesses.map((w, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700 truncate">{w.category}</span>
                    <span className="text-red-500 ml-2">{w.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No major weaknesses identified</p>
            )}
          </div>
        </div>

        {/* Question Review */}
        <div className="glass-card p-6">
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full flex items-center justify-between"
          >
            <h3 className="font-medium text-gray-900">Review All Questions</h3>
            <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showReview ? 'rotate-90' : ''}`} />
          </button>

          {showReview && (
            <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
              {questions.map((q, idx) => {
                const userAnswer = answers[idx]
                const isCorrect = userAnswer === q.correctAnswer
                const wasFlagged = flaggedQuestions.has(idx)

                return (
                  <div key={q.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-gray-500">
                        Q{idx + 1} | Domain {q.domain} | {q.category}
                      </span>
                      <div className="flex items-center gap-2">
                        {wasFlagged && <Flag className="w-3 h-3 text-amber-500" />}
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-900 mb-2">{q.question}</p>
                    <div className="text-xs space-y-1">
                      <p className="text-emerald-700">
                        Correct: {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                      </p>
                      {!isCorrect && userAnswer !== undefined && (
                        <p className="text-red-700">
                          Your answer: {String.fromCharCode(65 + userAnswer)}. {q.options[userAnswer]}
                        </p>
                      )}
                      {userAnswer === undefined && (
                        <p className="text-amber-700">Not answered</p>
                      )}
                    </div>
                    {q.rationale && (
                      <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-200">
                        {q.rationale}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              setExamStarted(false)
              setExamSubmitted(false)
            }}
            className="glass-button-primary"
          >
            Start New Simulation
          </button>
        </div>
      </div>
    )
  }

  // Exam in progress
  const question = questions[currentQuestion]
  const userAnswer = answers[currentQuestion]
  const isFlagged = flaggedQuestions.has(currentQuestion)
  const answeredCount = Object.keys(answers).length
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Timer Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${getTimeColor()}`}>
              <Clock className="w-5 h-5" />
              <span className="text-xl font-mono font-bold">{formatTime(timeRemaining)}</span>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-lg hover:bg-gray-100"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              <span className="text-gray-900 font-medium">{answeredCount}</span>/{questions.length} answered
            </div>
            <button
              onClick={() => setShowNavigator(!showNavigator)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
            >
              <Grid3X3 className="w-4 h-4" />
              Navigator
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="glass-card p-8 text-center">
            <Pause className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Exam Paused</h2>
            <p className="text-gray-500 mb-4">Timer is stopped. Click resume to continue.</p>
            <button
              onClick={() => setIsPaused(false)}
              className="glass-button-primary flex items-center gap-2 mx-auto"
            >
              <Play className="w-4 h-4" /> Resume Exam
            </button>
          </div>
        </div>
      )}

      {/* Question Navigator Modal */}
      {showNavigator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Question Navigator</h3>
              <button
                onClick={() => setShowNavigator(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-4 mb-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-emerald-500 rounded" /> Answered
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded" /> Unanswered
              </div>
              <div className="flex items-center gap-1">
                <Flag className="w-3 h-3 text-amber-500" /> Flagged
              </div>
            </div>

            <div className="grid grid-cols-10 gap-2">
              {questions.map((_, idx) => {
                const isAnswered = answers[idx] !== undefined
                const isCurrentQ = idx === currentQuestion
                const isFlaggedQ = flaggedQuestions.has(idx)

                return (
                  <button
                    key={idx}
                    onClick={() => handleNavigation(idx)}
                    className={`relative w-8 h-8 rounded text-xs font-medium transition-colors ${
                      isCurrentQ
                        ? 'bg-amber-500 text-white'
                        : isAnswered
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {idx + 1}
                    {isFlaggedQ && (
                      <Flag className="absolute -top-1 -right-1 w-3 h-3 text-amber-500" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between">
              <button
                onClick={() => {
                  const nextFlagged = [...flaggedQuestions].find(f => f > currentQuestion) ?? [...flaggedQuestions][0]
                  if (nextFlagged !== undefined) {
                    handleNavigation(nextFlagged)
                  }
                }}
                className="text-sm text-amber-600 hover:text-amber-700"
                disabled={flaggedQuestions.size === 0}
              >
                Go to next flagged ({flaggedQuestions.size})
              </button>
              <button
                onClick={() => {
                  const nextUnanswered = questions.findIndex((_, idx) => answers[idx] === undefined && idx > currentQuestion)
                  if (nextUnanswered !== -1) {
                    handleNavigation(nextUnanswered)
                  }
                }}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Go to next unanswered ({questions.length - answeredCount})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Card */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-500">
              Domain {question.domain}: {question.domainName}
            </span>
          </div>
          <button
            onClick={toggleFlag}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              isFlagged
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Flag className="w-4 h-4" />
            {isFlagged ? 'Flagged' : 'Flag'}
          </button>
        </div>

        <h2 className="text-lg text-gray-900 mb-6 leading-relaxed">{question.question}</h2>

        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const isSelected = userAnswer === idx

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full p-4 text-left rounded-lg transition-colors flex items-center gap-3 ${
                  isSelected
                    ? 'bg-amber-50 border-2 border-amber-500'
                    : 'bg-gray-50 border border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-sm font-medium ${
                  isSelected
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className={`text-sm ${isSelected ? 'text-amber-900' : 'text-gray-700'}`}>
                  {option}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className={`glass-button flex items-center gap-1 ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex gap-2">
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmitExam}
              className="glass-button-primary bg-red-500 hover:bg-red-600"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
              className="glass-button-primary flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex justify-center gap-6 text-xs text-gray-500">
        <span>Answered: {answeredCount}</span>
        <span>Flagged: {flaggedQuestions.size}</span>
        <span>Remaining: {questions.length - answeredCount}</span>
      </div>
    </div>
  )
}
