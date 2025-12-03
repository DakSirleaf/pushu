import { useState } from 'react'
import { Zap, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react'

// Sample flashcards
const sampleFlashcards = [
  {
    id: 1,
    front: "What PHQ-9 score indicates clinical depression needing treatment?",
    back: "≥10 (Moderate depression)\n\n0-4: Minimal\n5-9: Mild\n10-14: Moderate\n15-19: Moderately Severe\n20-27: Severe",
    category: "Assessment Scales"
  },
  {
    id: 2,
    front: "What is the therapeutic lithium level for maintenance?",
    back: "0.6-1.2 mEq/L\n\n• Acute mania: 0.8-1.2\n• Maintenance: 0.6-1.0\n• Toxicity: >1.5",
    category: "Pharmacology"
  },
  {
    id: 3,
    front: "At what age should head lag disappear?",
    back: "4 months\n\n• Red flag if persists beyond 4 months\n• Indicates possible developmental delay, hypotonia, or neuromuscular disorders",
    category: "Developmental Milestones"
  },
  {
    id: 4,
    front: "Which medications can DOUBLE lithium levels?",
    back: "NSAIDs and ACE inhibitors\n\n• Avoid ibuprofen, naproxen\n• Use acetaminophen instead\n• Educate patients about drug interactions",
    category: "Pharmacology"
  },
  {
    id: 5,
    front: "What is the #1 cause of lithium toxicity?",
    back: "DEHYDRATION\n\n• Educate patients to stay hydrated!\n• Other causes: NSAIDs, ACE inhibitors, renal impairment",
    category: "Pharmacology"
  }
]

const categories = ["All", "Pharmacology", "Assessment Scales", "Developmental Milestones", "Ethics & Legal"]

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredCards = selectedCategory === "All"
    ? sampleFlashcards
    : sampleFlashcards.filter(card => card.category === selectedCategory)

  const currentCard = filteredCards[currentIndex]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length)
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length)
  }

  const handleShuffle = () => {
    setIsFlipped(false)
    const randomIndex = Math.floor(Math.random() * filteredCards.length)
    setCurrentIndex(randomIndex)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold gradient-text mb-2">Flashcards</h1>
        <p className="text-white/70">
          150+ flashcards for rapid recall of high-yield topics
        </p>
      </div>

      {/* Category Filter */}
      <div className="glass-card p-6">
        <h3 className="font-bold mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentIndex(0)
                setIsFlipped(false)
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-glass'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative" style={{ minHeight: '400px' }}>
        <div
          className="glass-card p-12 cursor-pointer transition-all duration-500 transform hover:scale-[1.02]"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          onClick={handleFlip}
        >
          {!isFlipped ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
              <div className="text-sm text-white/50 mb-4">
                {currentIndex + 1} of {filteredCards.length}
              </div>
              <h3 className="text-3xl font-bold text-center">{currentCard.front}</h3>
              <div className="mt-8 px-4 py-2 bg-white/10 rounded-full text-sm">
                Click to reveal answer
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center min-h-[300px] space-y-6"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="text-sm text-white/50 mb-4">
                Answer
              </div>
              <div className="text-xl text-center whitespace-pre-line leading-relaxed">
                {currentCard.back}
              </div>
              <div className="mt-8 px-4 py-2 bg-green-500/20 rounded-full text-sm border border-green-500">
                {currentCard.category}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrevious}
          className="glass-button flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <button
          onClick={handleShuffle}
          className="glass-button flex items-center gap-2"
        >
          <RotateCw className="w-5 h-5" />
          Shuffle
        </button>

        <button
          onClick={handleNext}
          className="glass-button flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Progress */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/70">Progress</span>
          <span className="text-white/70">
            {Math.round(((currentIndex + 1) / filteredCards.length) * 100)}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-white/50 text-sm mt-4">
          Demo: Showing 5 of 150+ flashcards
        </p>
      </div>
    </div>
  )
}
