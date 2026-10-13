import React, { useState, useMemo } from 'react';
import { Category, Item, UserAccount } from '../../types';
import { checkProAccess } from '../../core/dataLoader';
import { sound } from '../../core/sound';
import { 
  SlidersHorizontal,
  BookmarkCheck,
  Info,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  GraduationCap,
  Cloud,
  Check,
  Zap,
  Search,
  X,
  Play
} from 'lucide-react';
import { LockBadge } from '../ui/LockBadge';

interface HomeViewProps {
  allItems?: Item[];
  onOpenSetup: (presetCategory?: Category) => void;
  onStartRandomSprint?: () => void;
  onStartWithItems?: (items: Item[], mode?: any) => void;
  onOpenBookmarks: () => void;
  onOpenAbout: () => void;
  totalItemsCount: number;
  masteredCount: number;
  streakRecord: number;
  bookmarkedCount: number;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
  currentUser: UserAccount | null;
  isPro: boolean;
  onOpenAccount: () => void;
  onOpenUpgrade: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  allItems = [],
  onOpenSetup,
  onStartRandomSprint,
  onStartWithItems,
  onOpenBookmarks,
  onOpenAbout,
  totalItemsCount,
  bookmarkedCount,
  currentUser,
  isPro,
  onOpenAccount,
  onOpenUpgrade,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items matching search query
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];

    return allItems
      .filter((item) => {
        return (
          item.term.toLowerCase().includes(q) ||
          item.definition.toLowerCase().includes(q) ||
          item.topic.toLowerCase().includes(q) ||
          item.subtopic.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.rationalization && item.rationalization.toLowerCase().includes(q))
        );
      })
      .slice(0, 8); // show top 8 relevant results
  }, [allItems, searchQuery]);

  const handleSelectSearchResult = (item: Item) => {
    sound.playClick();
    const hasAccess = checkProAccess(item.category, item.topic, item.subtopic, isPro);
    if (!hasAccess) {
      onOpenUpgrade();
      return;
    }
    if (onStartWithItems) {
      onStartWithItems([item], 'practiceTest');
    } else {
      onOpenSetup(item.category);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-5 sm:py-7 px-4 sm:px-6 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 0. INTERACTIVE SEARCH BAR */}
      <div className="relative w-full">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, questions, laws, or terms (e.g. Rizal, Syntax, Bloom)..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-lg text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {searchQuery.trim().length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-30 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl p-2.5 max-h-[380px] overflow-y-auto space-y-1.5 animate-fadeIn">
            <div className="px-3 py-1.5 text-[11px] font-mono text-zinc-400 flex items-center justify-between border-b border-zinc-800 pb-2">
              <span>{searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} found</span>
              <span className="text-amber-400">Click to practice directly</span>
            </div>

            {searchResults.length === 0 ? (
              <div className="p-4 text-center text-xs text-zinc-400">
                No board items matched "{searchQuery}". Try keywords like <span className="text-amber-400">Rizal, Syntax, Heritage, or Curriculum</span>.
              </div>
            ) : (
              searchResults.map((item) => {
                const isItemLocked = !isPro && !checkProAccess(item.category, item.topic, item.subtopic, isPro);
                return (
                  <div
                    key={`${item.term}-${item.topic}`}
                    onClick={() => handleSelectSearchResult(item)}
                    className="p-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-amber-400/40 transition cursor-pointer group flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white group-hover:text-amber-400 transition truncate">
                          {item.term}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          item.category === 'Majorship English'
                            ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {item.category === 'General Education' ? 'GenEd' : item.category === 'Professional Education' ? 'ProfEd' : 'Majorship'}
                        </span>
                        {isItemLocked && <LockBadge isPro={isPro} label="PRO" size="sm" />}
                      </div>

                      <p className="text-[11px] text-zinc-400 line-clamp-1 leading-relaxed">
                        {item.definition}
                      </p>

                      <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5">
                        <span className="text-zinc-300 font-medium">{item.topic}</span>
                        <span>&bull;</span>
                        <span className="truncate">{item.subtopic}</span>
                      </div>
                    </div>

                    <button
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-900 group-hover:bg-amber-400 group-hover:text-zinc-950 border border-zinc-800 text-[11px] font-bold text-zinc-300 transition shrink-0 flex items-center gap-1"
                    >
                      {isItemLocked ? <Lock className="w-3 h-3 text-amber-400 group-hover:text-zinc-950" /> : <Play className="w-3 h-3" />}
                      <span>{isItemLocked ? 'Unlock' : 'Practice'}</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>PRC Board Exam TOS Calibrated</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
            Pass & Top the LET with <span className="text-amber-400">Master Board Prep</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
            {totalItemsCount} high-yield questions with verified rationalizations for General Education, Professional Education, and Majorship English.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onOpenSetup()}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs sm:text-sm font-black shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
              <span>Launch Custom Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onStartRandomSprint && (
              <button
                onClick={onStartRandomSprint}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700/90 border border-zinc-700 text-amber-400 hover:text-amber-300 text-xs sm:text-sm font-bold shadow-md transition active:scale-95 cursor-pointer"
                title="Instantly launches a 20-question session from all available categories"
              >
                <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Randomized Sprint (20 Qs)</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. SUBJECT SUMMARY (LET Subject Categories & Difficulty Levels) */}
      <section className="rounded-3xl bg-zinc-900 border border-zinc-800 p-5 sm:p-7 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400 shrink-0" />
              <span>LET Subject Categories & Difficulty Levels</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              GenEd & ProfEd are 100% Free for all difficulty levels. Majorship English is Pro (₱99).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold font-mono">
              2 Free Subjects
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-[10px] font-bold font-mono">
              ₱99 Pro Majorship
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {/* General Education (100% Free) */}
          <div
            onClick={() => onOpenSetup('General Education')}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase font-black">
                  100% Free
                </span>
                <span className="text-xs text-zinc-400 font-mono">30 Qs</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition mb-1 flex items-center gap-1.5">
                <span>General Education</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Philippine History, Rizal Law (RA 1425), Social Sciences, and General Science.
              </p>
            </div>
            <div className="pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Practice GenEd</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Professional Education (100% Free) */}
          <div
            onClick={() => onOpenSetup('Professional Education')}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-amber-400/50 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase font-black">
                  100% Free
                </span>
                <span className="text-xs text-zinc-400 font-mono">39 Qs</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition mb-1 flex items-center gap-1.5">
                <span>Professional Education</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Teaching Profession, Philosophical Heritage, Child Development, and Curriculum.
              </p>
            </div>
            <div className="pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Practice ProfEd</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Majorship English (₱99 Pro) */}
          <div
            onClick={() => {
              if (!isPro) {
                onOpenUpgrade();
              } else {
                onOpenSetup('Majorship English');
              }
            }}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-amber-400/30 hover:border-amber-400 transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-400 border border-amber-400/40 uppercase font-black">
                    Majorship
                  </span>
                  <LockBadge isPro={isPro} label="PRO" />
                </div>
                <span className="text-xs text-amber-400 font-mono font-bold">41 Qs</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition mb-1 flex items-center justify-between">
                <span>Majorship English</span>
                {!isPro && <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Structure of English, Syntax, Morphology, Literary Criticism, and Applied Linguistics.
              </p>
            </div>
            <div className="pt-2.5 border-t border-zinc-800 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>{isPro ? 'Practice Majorship' : 'Unlock Pro (₱99)'}</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NAVIGATION LINKS (Clean Quick Access) */}
      <section className="space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
          Quick Access
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onOpenSetup()}
            className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/40 text-left transition active:scale-[0.99] cursor-pointer group flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white text-xs sm:text-sm block truncate group-hover:text-amber-400 transition">
                Custom Session
              </span>
              <span className="text-[11px] text-zinc-400 block truncate">
                Pick mode, count & difficulty
              </span>
            </div>
          </button>

          <button
            onClick={onOpenBookmarks}
            className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/40 text-left transition active:scale-[0.99] cursor-pointer group flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white text-xs sm:text-sm block truncate group-hover:text-sky-400 transition">
                Saved Questions
              </span>
              <span className="text-[11px] text-zinc-400 block truncate">
                {bookmarkedCount} bookmarked items
              </span>
            </div>
          </button>

          <button
            onClick={onOpenAbout}
            className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/40 text-left transition active:scale-[0.99] cursor-pointer group flex items-center gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
              <Info className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white text-xs sm:text-sm block truncate group-hover:text-emerald-400 transition">
                PRC Exam Guide
              </span>
              <span className="text-[11px] text-zinc-400 block truncate">
                TOS & Bloom's Taxonomy
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* 4. SIGN IN WITH GMAIL PROMPT */}
      <section className="rounded-3xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-xl">
            <div className="w-11 h-11 rounded-2xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                <span>{currentUser ? 'Database Linked to Gmail' : 'Sign in with Gmail to Sync'}</span>
                {currentUser && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                    <Check className="w-3 h-3" /> Synced
                  </span>
                )}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {currentUser 
                  ? `Signed in as ${currentUser.displayName || currentUser.email}. All your bookmarks, quiz scores, and licenses stay safely backed up in the cloud.`
                  : 'Save quiz scores, bookmarks, and Pro license to your Google account. Seamlessly continue your review across phone, tablet, and PC.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAccount}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-bold text-zinc-100 transition active:scale-95 cursor-pointer shrink-0 text-center"
          >
            {currentUser ? 'Manage Account' : 'Sign in with Gmail'}
          </button>
        </div>
      </section>
    </div>
  );
};
