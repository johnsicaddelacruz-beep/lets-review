export type Difficulty = 'easy' | 'medium' | 'advanced';

export type Category = 'General Education' | 'Professional Education' | 'Majorship English';

export interface Mnemonic {
  title: string;
  phrase: string;
  items: string[];
}

export type BloomsTaxonomy =
  | 'Remembering'
  | 'Understanding'
  | 'Applying'
  | 'Analyzing'
  | 'Evaluating'
  | 'Creating';

export interface Item {
  term: string;
  definition: string;
  rationalization: string;
  mnemonic: Mnemonic | null;
  category: Category;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  isPro?: boolean;
  source?: string;
  tosCompetency?: string;
  bloomsTaxonomy?: BloomsTaxonomy;
  highYield?: boolean;
}

export type StudyModeId =
  | 'practiceTest'
  | 'factOrBluff'
  | 'rapidFire'
  | 'mixMatch'
  | 'completeWord'
  | 'flashcards'
  | 'cheatSheet'
  | 'mnemonics';

export interface StudyModeInfo {
  id: StudyModeId;
  title: string;
  shortTitle: string;
  categoryGroup: 'relax' | 'challenge';
  description: string;
  icon: string;
  badge: string;
  color: string;
}

export interface AnswerRecord {
  item: Item;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  rationalization: string;
}

export interface SessionStats {
  modeId: StudyModeId;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  maxStreak: number;
  timeSpentSeconds: number;
  records: AnswerRecord[];
}

export interface UserStats {
  totalAnswered: number;
  totalCorrect: number;
  streakRecord: number;
  masteredTerms: string[];
  bookmarkedTerms: string[];
  modeSessionsCount: Record<StudyModeId, number>;
}

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  tier: 'free' | 'pro';
  isPro: boolean;
  paymentReference?: string;
  purchasedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubjectMeta {
  name: Category;
  label: string;
  isPro: boolean;
  itemCount: number;
}

export interface TopicMeta {
  name: string;
  category: Category;
  isPro: boolean;
  itemCount: number;
}

export interface SubtopicMeta {
  name: string;
  topic: string;
  category: Category;
  isPro: boolean;
  itemCount: number;
}
