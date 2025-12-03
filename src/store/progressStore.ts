import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ExamResult, CategoryPerformance, DomainPerformance, ANCC_DOMAINS } from '../types'

interface ProgressState {
  // Exam history
  examResults: ExamResult[];

  // Question tracking
  correctQuestionIds: number[];  // IDs of questions answered correctly
  attemptedQuestionIds: number[]; // All attempted question IDs

  // Aggregate stats
  totalQuestionsAnswered: number;
  totalCorrect: number;
  flashcardsReviewed: number;
  studyStreak: number;
  lastStudyDate: string | null;

  // Category tracking (cumulative)
  categoryStats: { [category: string]: { correct: number; total: number } };

  // Domain tracking (cumulative)
  domainStats: { [domain: number]: { correct: number; total: number } };

  // Actions
  addExamResult: (result: Omit<ExamResult, 'id' | 'date'>, questionResults: { questionId: number; correct: boolean; domain?: number }[]) => void;
  incrementFlashcards: (count: number) => void;
  updateStudyStreak: () => void;
  resetProgress: () => void;
  resetQuestionHistory: () => void;

  // Computed getters
  getOverallAccuracy: () => number;
  getPassProbability: () => number;
  getCategoryPerformance: () => CategoryPerformance[];
  getDomainPerformance: () => DomainPerformance[];
  getRecentExams: (count: number) => ExamResult[];
  getCorrectQuestionIds: () => number[];
  getAttemptedQuestionIds: () => number[];
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      examResults: [],
      correctQuestionIds: [],
      attemptedQuestionIds: [],
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      flashcardsReviewed: 0,
      studyStreak: 0,
      lastStudyDate: null,
      categoryStats: {},
      domainStats: {},

      addExamResult: (result, questionResults) => {
        const newResult: ExamResult = {
          ...result,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        }

        set((state) => {
          // Update category stats
          const updatedCategoryStats = { ...state.categoryStats }
          result.categoryPerformance.forEach((cat) => {
            if (!updatedCategoryStats[cat.category]) {
              updatedCategoryStats[cat.category] = { correct: 0, total: 0 }
            }
            updatedCategoryStats[cat.category].correct += cat.correct
            updatedCategoryStats[cat.category].total += cat.total
          })

          // Update domain stats
          const updatedDomainStats = { ...state.domainStats }
          questionResults.forEach(({ correct, domain }) => {
            if (domain) {
              if (!updatedDomainStats[domain]) {
                updatedDomainStats[domain] = { correct: 0, total: 0 }
              }
              updatedDomainStats[domain].total++
              if (correct) {
                updatedDomainStats[domain].correct++
              }
            }
          })

          // Update question tracking
          const newCorrectIds = new Set(state.correctQuestionIds)
          const newAttemptedIds = new Set(state.attemptedQuestionIds)

          questionResults.forEach(({ questionId, correct }) => {
            newAttemptedIds.add(questionId)
            if (correct) {
              newCorrectIds.add(questionId)
            }
          })

          return {
            examResults: [newResult, ...state.examResults],
            totalQuestionsAnswered: state.totalQuestionsAnswered + result.totalQuestions,
            totalCorrect: state.totalCorrect + result.score,
            categoryStats: updatedCategoryStats,
            domainStats: updatedDomainStats,
            correctQuestionIds: Array.from(newCorrectIds),
            attemptedQuestionIds: Array.from(newAttemptedIds),
          }
        })

        // Update study streak
        get().updateStudyStreak()
      },

      incrementFlashcards: (count) => {
        set((state) => ({
          flashcardsReviewed: state.flashcardsReviewed + count,
        }))
        get().updateStudyStreak()
      },

      updateStudyStreak: () => {
        const today = new Date().toDateString()
        const state = get()

        if (state.lastStudyDate === today) {
          return // Already studied today
        }

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toDateString()

        set({
          lastStudyDate: today,
          studyStreak: state.lastStudyDate === yesterdayStr
            ? state.studyStreak + 1
            : 1,
        })
      },

      resetProgress: () => {
        set({
          examResults: [],
          correctQuestionIds: [],
          attemptedQuestionIds: [],
          totalQuestionsAnswered: 0,
          totalCorrect: 0,
          flashcardsReviewed: 0,
          studyStreak: 0,
          lastStudyDate: null,
          categoryStats: {},
          domainStats: {},
        })
      },

      resetQuestionHistory: () => {
        set({
          correctQuestionIds: [],
          attemptedQuestionIds: [],
        })
      },

      getOverallAccuracy: () => {
        const state = get()
        if (state.totalQuestionsAnswered === 0) return 0
        return Math.round((state.totalCorrect / state.totalQuestionsAnswered) * 100)
      },

      getPassProbability: () => {
        const state = get()
        if (state.examResults.length === 0) return 0

        // Weight recent exams more heavily
        const recentExams = state.examResults.slice(0, 5)
        const weights = [0.35, 0.25, 0.20, 0.12, 0.08]

        let weightedSum = 0
        let totalWeight = 0

        recentExams.forEach((exam, i) => {
          const weight = weights[i] || 0.05
          weightedSum += exam.passProbability * weight
          totalWeight += weight
        })

        return Math.round(weightedSum / totalWeight)
      },

      getCategoryPerformance: () => {
        const state = get()
        return Object.entries(state.categoryStats)
          .map(([category, stats]) => ({
            category,
            correct: stats.correct,
            total: stats.total,
            percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
          }))
          .sort((a, b) => b.percentage - a.percentage)
      },

      getDomainPerformance: () => {
        const state = get()
        return [1, 2, 3, 4, 5].map(domain => {
          const stats = state.domainStats[domain] || { correct: 0, total: 0 }
          return {
            domain,
            domainName: ANCC_DOMAINS[domain as keyof typeof ANCC_DOMAINS]?.name || `Domain ${domain}`,
            correct: stats.correct,
            total: stats.total,
            percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
          }
        })
      },

      getRecentExams: (count) => {
        return get().examResults.slice(0, count)
      },

      getCorrectQuestionIds: () => {
        return get().correctQuestionIds
      },

      getAttemptedQuestionIds: () => {
        return get().attemptedQuestionIds
      },
    }),
    {
      name: 'pushu-progress',
    }
  )
)
