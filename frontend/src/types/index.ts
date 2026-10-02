export type UserRole = 'student' | 'teacher' | 'admin';
export type AppLanguage = 'si' | 'en';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  grade?: string;
  school?: string;
  avatar?: string;
  language: AppLanguage;
  targetYear?: number;
  streakDays?: number;
}

export interface UnitInfo {
  id: number;
  code: string;
  titleSi: string;
  titleEn: string;
  descriptionSi: string;
  descriptionEn: string;
  grade: '12' | '13';
  lessonCount: number;
  questionCount: number;
  masteryPercentage: number;
  iconName: string;
  color: string;
}

export interface LessonInfo {
  id: string;
  unitId: number;
  lessonNumber: string;
  titleSi: string;
  titleEn: string;
  summarySi: string;
  summaryEn: string;
  masteryPercentage: number;
  durationMinutes: number;
  chunkCount: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  unitId?: number;
  sources?: Array<{
    unit: number;
    lesson: string;
    sectionTitle: string;
    similarity: number;
  }>;
  followUpSuggestions?: string[];
  checkQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
}

export interface QuizQuestion {
  id: string;
  unitId: number;
  lessonId?: string;
  type: 'mcq' | 'structured' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  promptSi: string;
  promptEn: string;
  optionsSi?: string[];
  optionsEn?: string[];
  correctOptionIndex?: number;
  modelAnswerSi?: string;
  modelAnswerEn?: string;
  markingCriteria?: string[];
  points: number;
  sourceExam?: string;
}

export interface QuizSession {
  id: string;
  title: string;
  unitId: number | 'all';
  mode: 'practice' | 'exam';
  timeLimitMinutes: number;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: Record<string, any>;
  isCompleted: boolean;
  score?: number;
  totalPoints?: number;
}

export interface GlossaryTerm {
  id: string;
  termSi: string;
  termEn: string;
  definitionSi: string;
  definitionEn: string;
  unitId: number;
  unitTitle: string;
  examFrequency: 'High' | 'Medium' | 'Low';
  inFlashcards: boolean;
}

export interface Flashcard {
  id: string;
  unitId: number;
  termSi: string;
  termEn: string;
  definitionSi: string;
  definitionEn: string;
  explanationSi: string;
  difficulty: 'Again' | 'Hard' | 'Good' | 'Easy';
  nextReviewDays: number;
  reviewCount: number;
}

export interface MistakeEntry {
  id: string;
  questionId: string;
  questionText: string;
  unitId: number;
  unitTitle: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  attemptDate: string;
  resolved: boolean;
}
