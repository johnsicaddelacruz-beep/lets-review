import { UserStats, StudyModeId } from '../types';

const STORAGE_KEY = 'lets_review_user_stats';

const defaultStats: UserStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  streakRecord: 0,
  masteredTerms: [],
  bookmarkedTerms: [],
  modeSessionsCount: {
    practiceTest: 0,
    factOrBluff: 0,
    rapidFire: 0,
    mixMatch: 0,
    completeWord: 0,
    flashcards: 0,
    cheatSheet: 0,
    mnemonics: 0,
  },
};

export const Storage = {
  getStats(): UserStats {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return defaultStats;
      return { ...defaultStats, ...JSON.parse(data) };
    } catch {
      return defaultStats;
    }
  },

  saveStats(stats: UserStats) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (err) {
      console.warn('LocalStorage save failed', err);
    }
  },

  recordSession(modeId: StudyModeId, answered: number, correct: number, maxStreak: number) {
    const stats = this.getStats();
    stats.totalAnswered += answered;
    stats.totalCorrect += correct;
    stats.streakRecord = Math.max(stats.streakRecord, maxStreak);
    stats.modeSessionsCount[modeId] = (stats.modeSessionsCount[modeId] || 0) + 1;
    this.saveStats(stats);
  },

  toggleBookmark(term: string): boolean {
    const stats = this.getStats();
    const index = stats.bookmarkedTerms.indexOf(term);
    let isBookmarked = false;
    if (index >= 0) {
      stats.bookmarkedTerms.splice(index, 1);
      isBookmarked = false;
    } else {
      stats.bookmarkedTerms.push(term);
      isBookmarked = true;
    }
    this.saveStats(stats);
    return isBookmarked;
  },

  isBookmarked(term: string): boolean {
    const stats = this.getStats();
    return stats.bookmarkedTerms.includes(term);
  },

  getBookmarks(): string[] {
    return this.getStats().bookmarkedTerms;
  },

  toggleMastered(term: string): boolean {
    const stats = this.getStats();
    const index = stats.masteredTerms.indexOf(term);
    let isMastered = false;
    if (index >= 0) {
      stats.masteredTerms.splice(index, 1);
      isMastered = false;
    } else {
      stats.masteredTerms.push(term);
      isMastered = true;
    }
    this.saveStats(stats);
    return isMastered;
  },

  isMastered(term: string): boolean {
    return this.getStats().masteredTerms.includes(term);
  },

  getProStatus(): { isPro: boolean; paymentReference?: string } {
    try {
      const data = localStorage.getItem('lets_review_pro_status');
      if (data) return JSON.parse(data);
    } catch {}
    return { isPro: false };
  },

  setProStatus(isPro: boolean, paymentReference?: string) {
    try {
      localStorage.setItem(
        'lets_review_pro_status',
        JSON.stringify({ isPro, paymentReference, updatedAt: new Date().toISOString() })
      );
    } catch {}
  },

  clearProStatus() {
    try {
      localStorage.removeItem('lets_review_pro_status');
    } catch {}
  },

  mergeStats(local: UserStats, cloud: UserStats): UserStats {
    const combinedMastered = Array.from(new Set([...(local.masteredTerms || []), ...(cloud.masteredTerms || [])]));
    const combinedBookmarks = Array.from(new Set([...(local.bookmarkedTerms || []), ...(cloud.bookmarkedTerms || [])]));
    const modes: Record<StudyModeId, number> = {
      practiceTest: Math.max(local.modeSessionsCount?.practiceTest || 0, cloud.modeSessionsCount?.practiceTest || 0),
      factOrBluff: Math.max(local.modeSessionsCount?.factOrBluff || 0, cloud.modeSessionsCount?.factOrBluff || 0),
      rapidFire: Math.max(local.modeSessionsCount?.rapidFire || 0, cloud.modeSessionsCount?.rapidFire || 0),
      mixMatch: Math.max(local.modeSessionsCount?.mixMatch || 0, cloud.modeSessionsCount?.mixMatch || 0),
      completeWord: Math.max(local.modeSessionsCount?.completeWord || 0, cloud.modeSessionsCount?.completeWord || 0),
      flashcards: Math.max(local.modeSessionsCount?.flashcards || 0, cloud.modeSessionsCount?.flashcards || 0),
      cheatSheet: Math.max(local.modeSessionsCount?.cheatSheet || 0, cloud.modeSessionsCount?.cheatSheet || 0),
      mnemonics: Math.max(local.modeSessionsCount?.mnemonics || 0, cloud.modeSessionsCount?.mnemonics || 0),
    };

    return {
      totalAnswered: Math.max(local.totalAnswered || 0, cloud.totalAnswered || 0),
      totalCorrect: Math.max(local.totalCorrect || 0, cloud.totalCorrect || 0),
      streakRecord: Math.max(local.streakRecord || 0, cloud.streakRecord || 0),
      masteredTerms: combinedMastered,
      bookmarkedTerms: combinedBookmarks,
      modeSessionsCount: modes,
    };
  },

  clearAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('lets_review_pro_status');
  },
};
