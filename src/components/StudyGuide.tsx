import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, Check, X } from 'lucide-react'

// Sample questions (in production, this would come from a data file)
const sampleQuestions = [
  {
    id: 1,
    question: "A patient is taking Tegretol (carbamazepine). What medication interaction should you be aware of?",
    options: [
      "Acetaminophen",
      "Ibuprofen",
      "Cipro or Erythromycin",
      "Aspirin"
    ],
    correctAnswer: 2,
    rationale: "Ciprofloxacin and erythromycin are CYP450 INHIBITORS. Carbamazepine (Tegretol) is metabolized by CYP3A4 enzymes. When combined with inhibitors like cipro or erythromycin, these drugs significantly INCREASE the plasma concentration of Tegretol (carbamazepine), potentially leading to toxicity.",
    category: "Pharmacology",
    boardTip: "INHIBITORS → INCREASE drug levels → Risk of TOXICITY"
  },
  {
    id: 2,
    question: "What PHQ-9 score indicates moderate depression requiring treatment?",
    options: [
      "5-9",
      "10-14",
      "15-19",
      "20-27"
    ],
    correctAnswer: 1,
    rationale: "PHQ-9 scores of 10-14 indicate moderate depression. A score ≥10 generally indicates likely clinical depression that requires treatment with counseling and/or medication.",
    category: "Assessment Scales",
    boardTip: "PHQ-9 ≥10 = likely clinical depression needing treatment"
  },
  {
    id: 3,
    question: "At what age should an infant no longer have head lag?",
    options: [
      "2 months",
      "4 months",
      "6 months",
      "9 months"
    ],
    correctAnswer: 1,
    rationale: "Head control is a critical gross motor milestone. By 4 months, an infant should have NO head lag when pulled to sit. Persistent head lag after 4 months is a RED FLAG for developmental delay, hypotonia, or neuromuscular disorders.",
    category: "Developmental Milestones",
    boardTip: "4 months = NO head lag. Persistence beyond 4 months requires referral to pediatric neurology."
  },
];

const categories = [
  "All Topics",
  "Pharmacology",
  "Assessment Scales",
  "Developmental Milestones",
  "Ethics & Legal",
  "Psychotherapy",
  "Neuroscience",
  "Cultural Competence",
  "Diagnostic Criteria",
  "Crisis Management"
];

export default function StudyGuide() {
  const [selectedCategory, setSelectedCategory] = useState("All Topics")
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({})
  const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({})

  const filteredQuestions = selectedCategory === "All Topics"
    ? sampleQuestions
    : sampleQuestions.filter(q => q.category === selectedCategory)

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setUserAnswers(prev => ({...prev, [questionId]: answerIndex}))
  }

  const toggleAnswer = (questionId: number) => {
    setShowAnswer(prev => ({ ...prev, [questionId]: !prev[questionId] }))
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Study Guide</h1>
        <p className="text-white/70">
          175+ questions with detailed rationales from actual exam brain dumps
        </p>
      </div>

      {/* Category Filter */}
      <div className="glass-card p-6">
        <h3 className="font-bold mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-glass'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((question, idx) => {
          const isExpanded = expandedQuestion === question.id
          const userAnswer = userAnswers[question.id]
          const isCorrect = userAnswer === question.correctAnswer
          const hasAnswered = userAnswer !== undefined

          return (
            <div key={question.id} className="glass-card">
              <button
                onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors rounded-3xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                      {question.category}
                    </span>
                    <span className="text-white/50 text-sm">Question {idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-medium">{question.question}</h3>
                </div>
                {isExpanded ? <ChevronUp className="w-6 h-6 flex-shrink-0" /> : <ChevronDown className="w-6 h-6 flex-shrink-0" />}
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 space-y-4">
                  {/* Options */}
                  <div className="space-y-2">
                    {question.options.map((option, optionIdx) => {
                      const isSelected = userAnswer === optionIdx
                      const isCorrectOption = optionIdx === question.correctAnswer
                      const showCorrectness = showAnswer[question.id]

                      return (
                        <button
                          key={optionIdx}
                          onClick={() => handleAnswerSelect(question.id, optionIdx)}
                          className={`w-full p-4 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 ${
                            isSelected
                              ? showCorrectness
                                ? isCorrectOption
                                  ? 'bg-green-500/20 border-2 border-green-500'
                                  : 'bg-red-500/20 border-2 border-red-500'
                                : 'bg-indigo-500/20 border-2 border-indigo-500'
                              : showCorrectness && isCorrectOption
                              ? 'bg-green-500/20 border-2 border-green-500'
                              : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-white/20 border-white' : 'border-white/30'
                          }`}>
                            {isSelected && <div className="w-3 h-3 rounded-full bg-white" />}
                          </div>
                          <span className="flex-1">{option}</span>
                          {showCorrectness && isCorrectOption && (
                            <Check className="w-5 h-5 text-green-400" />
                          )}
                          {showCorrectness && isSelected && !isCorrectOption && (
                            <X className="w-5 h-5 text-red-400" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Show Answer Button */}
                  {hasAnswered && (
                    <button
                      onClick={() => toggleAnswer(question.id)}
                      className="glass-button-primary w-full"
                    >
                      {showAnswer[question.id] ? 'Hide Answer' : 'Show Answer & Rationale'}
                    </button>
                  )}

                  {/* Rationale */}
                  {showAnswer[question.id] && (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-2xl ${
                        isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <>
                              <Check className="w-5 h-5 text-green-400" />
                              <span className="font-bold text-green-400">Correct!</span>
                            </>
                          ) : (
                            <>
                              <X className="w-5 h-5 text-red-400" />
                              <span className="font-bold text-red-400">Incorrect</span>
                            </>
                          )}
                        </div>
                        <p className="text-sm text-white/80">
                          Correct Answer: {question.options[question.correctAnswer]}
                        </p>
                      </div>

                      <div className="bg-white/5 p-6 rounded-2xl space-y-3">
                        <h4 className="font-bold text-lg text-indigo-300">Rationale:</h4>
                        <p className="text-white/90 leading-relaxed">{question.rationale}</p>

                        {question.boardTip && (
                          <div className="mt-4 p-4 bg-amber-500/20 border-l-4 border-amber-500 rounded-lg">
                            <div className="font-bold text-amber-300 mb-1">Board Tip:</div>
                            <p className="text-white/90">{question.boardTip}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Load More (Placeholder) */}
      <div className="text-center">
        <button className="glass-button">
          Load More Questions
        </button>
        <p className="mt-4 text-white/50 text-sm">
          Showing {filteredQuestions.length} of 175+ questions
        </p>
      </div>
    </div>
  )
}
