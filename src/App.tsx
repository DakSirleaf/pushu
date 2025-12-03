import { useState, useEffect } from 'react'
import { Home as HomeIcon, FileText, Info, RotateCcw, TrendingUp, Target } from 'lucide-react'
import Home from './components/Home'
import PracticeExam from './components/PracticeExam'
import BoardSimulation from './components/BoardSimulation'
import About from './components/About'
import Progress from './components/Progress'
import { useProgressStore } from './store/progressStore'

type PageMode = 'home' | 'practice-exam' | 'board-simulation' | 'about' | 'progress'

function App() {
  const [currentPage, setCurrentPage] = useState<PageMode>('home')
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [logoAnimated, setLogoAnimated] = useState(false)
  const resetProgress = useProgressStore((state) => state.resetProgress)

  // Animate logo after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimated(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  const navigation = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'practice-exam', label: 'Practice', icon: FileText },
    { id: 'board-simulation', label: 'Board Sim', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'about', label: 'About', icon: Info },
  ]

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onStartExam={() => setCurrentPage('practice-exam')} onStartBoardSim={() => setCurrentPage('board-simulation')} />
      case 'practice-exam':
        return <PracticeExam />
      case 'board-simulation':
        return <BoardSimulation />
      case 'progress':
        return <Progress />
      case 'about':
        return <About />
      default:
        return <Home onStartExam={() => setCurrentPage('practice-exam')} onStartBoardSim={() => setCurrentPage('board-simulation')} />
    }
  }

  const handleReset = () => {
    resetProgress()
    setShowResetConfirm(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* Modern Glassmorphic Header */}
      <header className="sticky top-0 z-50 px-4 pt-4">
        <div className="max-w-6xl mx-auto">
          <div className="header-glass rounded-2xl px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3">
                {/* Placeholder for future Kola Lab logo */}
                <div className="w-10 h-10 rounded-lg bg-amber-500"></div>
                <div className="overflow-hidden">
                  <span
                    className={`font-semibold text-xl text-gray-900 inline-block transition-all duration-1000 ease-out ${
                      logoAnimated
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-8'
                    }`}
                  >
                    Pushu
                  </span>
                  <span className={`hidden sm:inline text-xs text-gray-400 ml-2 transition-all duration-1000 delay-300 ${
                    logoAnimated ? 'opacity-100' : 'opacity-0'
                  }`}>
                    by Kola Lab
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex items-center gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = currentPage === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPage(item.id as PageMode)}
                      className={`nav-button ${isActive ? 'nav-button-active' : ''}`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                      <span className="hidden md:inline">{item.label}</span>
                    </button>
                  )
                })}

                {/* Reset Button */}
                <div className="relative ml-2">
                  <button
                    onClick={() => setShowResetConfirm(!showResetConfirm)}
                    className="p-2.5 rounded-xl bg-white/60 hover:bg-red-50 border border-gray-200/50 hover:border-red-300 transition-all duration-300 hover:shadow-lg group"
                    title="Reset Progress"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>

                  {/* Reset Confirmation Dropdown */}
                  {showResetConfirm && (
                    <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                      <p className="text-sm text-gray-700 mb-3">
                        Clear all progress data? This cannot be undone.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleReset}
                          className="flex-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                          Reset All
                        </button>
                        <button
                          onClick={() => setShowResetConfirm(false)}
                          className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400">
        <span className="font-medium">Pushu</span> by A. Ace Sirleaf Kola Lab
      </footer>
    </div>
  )
}

export default App
