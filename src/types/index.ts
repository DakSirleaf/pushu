export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  rationale: string;
  category: string;
  domain: number;
  domainName: string;
  boardTip?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  boardHighYield?: boolean;
}

// ANCC PMHNP Board Domains
export const ANCC_DOMAINS = {
  1: { name: 'Scientific Foundation', percentage: 15 },
  2: { name: 'Advanced Practice Skills', percentage: 30 },
  3: { name: 'Diagnosis and Treatment', percentage: 30 },
  4: { name: 'Psychotherapy and Related Theories', percentage: 15 },
  5: { name: 'Ethical and Legal Principles', percentage: 10 },
} as const;

export interface DomainPerformance {
  domain: number;
  domainName: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
}

export interface StudyProgress {
  questionsCompleted: number;
  questionsCorrect: number;
  flashcardsReviewed: number;
  examsTaken: number;
  lastStudyDate: string;
}

export interface CategoryPerformance {
  category: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface ExamResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passProbability: number;
  categoryPerformance: CategoryPerformance[];
  strengths: CategoryPerformance[];
  weaknesses: CategoryPerformance[];
}

export type StudyMode = 'home' | 'study-guide' | 'practice-exam' | 'board-simulation' | 'flashcards' | 'cyp450' | 'progress';
