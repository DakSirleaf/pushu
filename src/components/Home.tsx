import { ArrowRight, Target, Clock, Grid3X3 } from 'lucide-react'

interface HomeProps {
  onStartExam: () => void
  onStartBoardSim: () => void
}

export default function Home({ onStartExam, onStartBoardSim }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="glass-card p-12 text-center max-w-xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
          ANCC PMHNP
        </h1>
        <h2 className="text-xl text-gray-600 mb-6">
          Board Exam Prep
        </h2>

        <p className="text-gray-500 mb-8">
          500+ practice questions to help you pass your certification exam.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={onStartExam}
            className="glass-button-primary inline-flex items-center justify-center gap-3"
          >
            Start Practice
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onStartBoardSim}
            className="glass-button inline-flex items-center justify-center gap-2 bg-amber-50 border-amber-300 hover:bg-amber-100"
          >
            <Target className="w-5 h-5 text-amber-600" />
            Board Simulation
          </button>
        </div>

        {/* Board Sim Info */}
        <div className="bg-amber-50 rounded-xl p-4 mb-8 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-gray-900">Full Board Simulation</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Grid3X3 className="w-3 h-3 text-amber-500" />
              175 Questions
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              3.5 Hour Timer
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber-600">500+</div>
            <div className="text-xs text-gray-500">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber-600">5</div>
            <div className="text-xs text-gray-500">ANCC Domains</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-amber-600">75%</div>
            <div className="text-xs text-gray-500">Pass Score</div>
          </div>
        </div>
      </div>
    </div>
  )
}
