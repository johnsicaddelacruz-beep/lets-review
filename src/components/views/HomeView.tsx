import React, { useState, useMemo } from 'react';
import { Category, Item, UserAccount, StudyModeId } from '../../types';
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
  Play,
  Award,
  BookOpen,
  Trophy,
  Flame,
  Target,
  Brain,
  FileText,
  Lightbulb,
  Layers,
  HelpCircle
} from 'lucide-react';
import { LockBadge } from '../ui/LockBadge';

interface HomeViewProps {
  allItems?: Item[];
  onOpenSetup: (presetCategory?: Category, presetMode?: StudyModeId) => void;
  onStartRandomSprint?: () => void;
  onStartMockBoard?: (category: Category | 'all') => void;
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
  onStartMockBoard,
  onOpenBookmarks,
  onOpenAbout,
  totalItemsCount,
  masteredCount,
  streakRecord,
  bookmarkedCount,
  currentUser,
  isPro,
  onOpenAccount,
  onOpenUpgrade,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMockBoardModalOpen, setIsMockBoardModalOpen] = useState(false);

  // Dynamic live-computed counts per category directly reflecting all loaded files
  const genEdCount = useMemo(() => allItems.filter((i) => i.category === 'General Education').length, [allItems]);
  const profEdCount = useMemo(() => allItems.filter((i) => i.category === 'Professional Education').length, [allItems]);
  const majorshipCount = useMemo(() => allItems.filter((i) => i.category === 'Majorship English').length, [allItems]);

  // Dynamic live-computed top 3 topics per category with trailing ellipsis
  const genEdTopTopics = useMemo(() => {
    const desiredOrder = [
      'Purposive Communication in English',
      'Malayuning Komunikasyon sa Wikang Filipino',
      'Science, Technology and Society',
      'Mathematics in the Modern World',
      'Readings in Philippine History and Society',
      'The Life and Works of Rizal',
      'Ethics',
      'The Contemporary World',
      'Art Appreciation',
      'Understanding the Self',
    ];
    const present = Array.from(new Set(allItems.filter((i) => i.category === 'General Education').map((i) => i.topic)));
    const sorted = [
      ...desiredOrder.filter((t) => present.includes(t)),
      ...present.filter((t) => !desiredOrder.includes(t)),
    ];
    return sorted.slice(0, 3).join(', ') + '...';
  }, [allItems]);

  const profEdTopTopics = useMemo(() => {
    const desiredOrder = [
      'The Teaching Profession',
      'Facilitating Learner-Centered Teaching',
      'Foundations of Special and Inclusive Education',
      'Building and Enhancing New Literacies Across the Curriculum',
      'Technology for Teaching and Learning',
      'The Teacher and the Community, School Culture and Organizational Leadership',
      'Child and Adolescent Learners and Learning Principles',
      'The Teacher and the School Curriculum',
      'Methods and Strategies of Teaching',
      'Assessment of Learning',
      'Action Research',
      'Field Study',
      'Teaching Internship',
    ];
    const present = Array.from(new Set(allItems.filter((i) => i.category === 'Professional Education').map((i) => i.topic)));
    const sorted = [
      ...desiredOrder.filter((t) => present.includes(t)),
      ...present.filter((t) => !desiredOrder.includes(t)),
    ];
    return sorted.slice(0, 3).join(', ') + '...';
  }, [allItems]);

  const majorshipTopTopics = useMemo(() => {
    const present = Array.from(new Set(allItems.filter((i) => i.category === 'Majorship English').map((i) => i.topic)));
    if (present.length >= 3) {
      return present.slice(0, 3).join(', ') + '...';
    }
    return present.join(', ') + '...';
  }, [allItems]);

  const handleSelectMockBoard = (category: Category | 'all') => {
    sound.playClick();
    setIsMockBoardModalOpen(false);
    if (!isPro) {
      onOpenUpgrade();
      return;
    }
    if (onStartMockBoard) {
      onStartMockBoard(category);
    } else {
      onOpenSetup(category === 'all' ? undefined : category);
    }
  };

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

  const popularKeywords = ['Rizal', 'Assessment', 'Curriculum', 'Syntax', 'Child Development', 'STS'];

  return (
    <div className="w-full max-w-4xl mx-auto py-5 sm:py-8 px-4 sm:px-6 space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 0. INTERACTIVE SEARCH BAR */}
      <div className="relative w-full space-y-2">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, questions, laws, or terms (e.g. Rizal, Syntax, Bloom)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/30 transition shadow-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 rounded-lg text-zinc-400 hover:text-white transition cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Suggestions */}
        {!searchQuery && (
          <div className="flex items-center gap-2 flex-wrap px-1 text-xs">
            <span className="text-zinc-500 text-[11px]">Quick search:</span>
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => {
                  sound.playClick();
                  setSearchQuery(kw);
                }}
                className="text-zinc-400 hover:text-amber-300 text-xs transition cursor-pointer"
              >
                {kw}
              </button>
            ))}
          </div>
        )}

        {/* Live Search Results Dropdown */}
        {searchQuery.trim().length >= 2 && (
          <div className="absolute top-full left-0 right-0 mt-2 z-30 rounded-2xl bg-zinc-900/95 border border-zinc-700 shadow-2xl p-2.5 max-h-[380px] overflow-y-auto space-y-1.5 animate-fadeIn backdrop-blur-xl">
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
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-900 group-hover:bg-amber-400 group-hover:text-zinc-950 border border-zinc-800 text-[11px] font-bold text-zinc-300 transition shrink-0 flex items-center gap-1 cursor-pointer"
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
      <section className="relative overflow-hidden rounded-3xl bg-zinc-900/90 border border-zinc-800/90 p-6 sm:p-8 lg:p-9 shadow-xl">
        {/* Subtle decorative top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent blur-2xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-3xl mx-auto space-y-5 text-center flex flex-col items-center">
          {/* Heading - main word of hero section in bigger prominent size */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Tara, <span className="text-amber-400">LETs!</span>
          </h1>

          {/* Subheading - responsive flex & auto adjusting width */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-xl text-center">
            A Gamified-Reviewer for Licensure Examination for Teachers
          </p>

          {/* Streamlined Stats Ribbon (Same total width as the 3 card columns) */}
          <div className="w-full py-3.5 px-4 sm:px-6 rounded-2xl bg-zinc-800/70 border border-zinc-700/60 backdrop-blur-sm space-y-2.5 shadow-sm">
            <div className="flex items-center justify-center gap-3 sm:gap-5 text-center flex-wrap">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                  {totalItemsCount.toLocaleString()}
                </span>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  Board Questions
                </span>
              </div>
              <span className="text-zinc-600 font-light select-none">|</span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                <span>Live Auto-Synced</span>
              </div>
            </div>

            {/* Bottom Breakdown by Subject */}
            <div className="pt-2 border-t border-zinc-700/50 flex items-center justify-center gap-2.5 sm:gap-4 text-xs font-mono text-zinc-400 flex-wrap">
              <span>
                gened: <strong className="text-zinc-200 font-semibold">{genEdCount}</strong>
              </span>
              <span className="text-zinc-600">|</span>
              <span>
                profed: <strong className="text-zinc-200 font-semibold">{profEdCount}</strong>
              </span>
              <span className="text-zinc-600">|</span>
              <span>
                majorship: <strong className="text-zinc-200 font-semibold">{majorshipCount}</strong>
              </span>
            </div>
          </div>

          {/* 3 Quick Action Buttons - Under stats card with matching width, responsive columns, no overlapping */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            {/* Button 1: (customize icon) Play Custom Session */}
            <button
              onClick={() => onOpenSetup()}
              className="group flex items-center justify-center gap-2.5 px-4 py-3 sm:py-3.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/70 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-400/10 transition-all duration-150 cursor-pointer text-xs sm:text-sm font-semibold active:scale-[0.98]"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-zinc-100 group-hover:text-amber-300 transition-colors">
                Play Custom Session
              </span>
            </button>

            {/* Button 2: (sprint icon) Play Random Sprints */}
            <button
              onClick={onStartRandomSprint}
              className="group flex items-center justify-center gap-2.5 px-4 py-3 sm:py-3.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/70 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-400/10 transition-all duration-150 cursor-pointer text-xs sm:text-sm font-semibold active:scale-[0.98]"
              title="Instantly launches a 20-question session from all available categories"
            >
              <Zap className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-zinc-100 group-hover:text-amber-300 transition-colors">
                Play Random Sprints
              </span>
            </button>

            {/* Button 3: (locked icon + pro) Answer Mock Board Exam */}
            <button
              onClick={() => {
                sound.playClick();
                if (!isPro) {
                  onOpenUpgrade();
                  return;
                }
                setIsMockBoardModalOpen(true);
              }}
              className="group flex items-center justify-center gap-2 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/70 hover:border-amber-400/80 hover:shadow-md hover:shadow-amber-400/10 transition-all duration-150 cursor-pointer text-xs sm:text-sm font-semibold active:scale-[0.98]"
              title={isPro ? "Simulate the 150-item PRC Board Examination" : "Upgrade to Pro to unlock 150-item Mock Board Exam"}
            >
              <Lock className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-zinc-100 group-hover:text-amber-300 transition-colors flex items-center gap-1.5 flex-wrap justify-center">
                <span>Answer Mock Board Exam</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono">
                  PRO
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. SUBJECT SUMMARY (LET Subject Categories & Difficulty Levels) */}
      <section className="rounded-3xl bg-zinc-900/90 border border-zinc-800/90 p-5 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>LET Subject Categories &amp; Difficulty Levels</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {/* General Education (100% Free) */}
          <div
            onClick={() => onOpenSetup('General Education')}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/70 hover:border-amber-400/60 transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-sm text-left hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  100% Free
                </span>
                <span className="text-xs text-zinc-300 font-mono font-medium">{genEdCount} Qs</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition mb-1 flex items-center gap-1.5">
                <span>General Education</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {genEdTopTopics}
              </p>
            </div>
            <div className="pt-2.5 border-t border-zinc-700/50 flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-amber-400 transition-colors">
              <span>Practice GenEd</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Professional Education (100% Free) */}
          <div
            onClick={() => onOpenSetup('Professional Education')}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/70 hover:border-amber-400/60 transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-sm text-left hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  100% Free
                </span>
                <span className="text-xs text-zinc-300 font-mono font-medium">{profEdCount} Qs</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition mb-1 flex items-center gap-1.5">
                <span>Professional Education</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {profEdTopTopics}
              </p>
            </div>
            <div className="pt-2.5 border-t border-zinc-700/50 flex items-center justify-between text-xs font-semibold text-zinc-300 group-hover:text-amber-400 transition-colors">
              <span>Practice ProfEd</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Majorship English (₱99 Pro) - Premium Gold-Bordered & Eye-Friendly */}
          <div
            onClick={() => {
              if (!isPro) {
                onOpenUpgrade();
              } else {
                onOpenSetup('Majorship English');
              }
            }}
            className="p-4 sm:p-5 rounded-2xl bg-zinc-800/90 hover:bg-zinc-800 border-2 border-amber-400/80 hover:border-amber-400 transition-all duration-200 cursor-pointer group flex flex-col justify-between shadow-md shadow-amber-500/10 text-left hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30">
                    Majorship
                  </span>
                  {!isPro ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-200 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/25 border border-amber-400/40">
                      <Lock className="w-2.5 h-2.5 text-amber-400" />
                      PRO
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40">
                      <Check className="w-2.5 h-2.5 text-emerald-400" />
                      PRO
                    </span>
                  )}
                </div>
                <span className="text-xs text-amber-300 font-mono font-bold">{majorshipCount} Qs</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition mb-1 flex items-center justify-between">
                <span>Majorship English</span>
                {!isPro ? (
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                )}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {majorshipTopTopics}
              </p>
            </div>
            <div className="pt-2.5 border-t border-zinc-700/60 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
              <span>{isPro ? 'Practice Majorship' : 'Unlock Pro (₱99)'}</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGN IN WITH GMAIL PROMPT (Cloud Sync) */}
      <section className="rounded-3xl bg-zinc-850/90 border border-zinc-700/80 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-xl">
            <div className="w-11 h-11 rounded-2xl bg-sky-400/15 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5 shadow-sm">
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
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-amber-400/50 text-xs font-bold text-zinc-100 hover:text-amber-300 transition active:scale-95 cursor-pointer shrink-0 text-center shadow-md"
          >
            {currentUser ? 'Manage Account' : 'Sign in with Gmail'}
          </button>
        </div>
      </section>

      {/* 7. MOCK BOARD EXAM SELECTION MODAL (150 Questions) */}
      {isMockBoardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-6 sm:p-7 space-y-5 animate-scaleUp max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-zinc-800/80 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-[11px] font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>PRC Licensure Examination Simulator</span>
                </div>
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Mock Board Exam</span>
                  <span className="text-amber-400 font-mono">(150 Qs)</span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Experience a full 150-item board exam under authentic testing conditions. Select your subject category to begin:
                </p>
              </div>

              <button
                onClick={() => setIsMockBoardModalOpen(false)}
                className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject Choices */}
            <div className="space-y-3">
              {/* Option 1: General Education */}
              <button
                onClick={() => handleSelectMockBoard('General Education')}
                className="w-full text-left p-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-emerald-500/50 transition cursor-pointer group flex items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition">
                        General Education
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                        100% Free
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      Purposive Comm, Filipino, Math, STS, History, Rizal, Ethics, Art, Self
                    </p>
                    <div className="text-[10px] font-mono text-emerald-400/80">
                      Pool: {genEdCount} verified questions &bull; 150 items drawn
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition shrink-0" />
              </button>

              {/* Option 2: Professional Education */}
              <button
                onClick={() => handleSelectMockBoard('Professional Education')}
                className="w-full text-left p-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-sky-500/50 transition cursor-pointer group flex items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white group-hover:text-sky-400 transition">
                        Professional Education
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px] font-bold font-mono">
                        100% Free
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      Teaching Profession, Facilitating Learning, Special Ed, EdTech, Curriculum, Assessment, Internship
                    </p>
                    <div className="text-[10px] font-mono text-sky-400/80">
                      Pool: {profEdCount} verified questions &bull; 150 items drawn
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 transition shrink-0" />
              </button>

              {/* Option 3: Majorship English */}
              <button
                onClick={() => handleSelectMockBoard('Majorship English')}
                className="w-full text-left p-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-amber-400/50 transition cursor-pointer group flex items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                        Majorship English
                      </span>
                      {isPro ? (
                        <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold font-mono">
                          Pro Unlocked
                        </span>
                      ) : (
                        <LockBadge isPro={isPro} label="₱99 PRO" size="sm" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      Structure of English, Linguistics, Literary Theories, and Language Teaching
                    </p>
                    <div className="text-[10px] font-mono text-amber-400/80">
                      Specialization Pool: {majorshipCount} items &bull; 150 items full simulation
                    </div>
                  </div>
                </div>
                {isPro ? (
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition shrink-0" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </button>

              {/* Option 4: Comprehensive Mixed Simulation */}
              <button
                onClick={() => handleSelectMockBoard('all')}
                className="w-full text-left p-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-purple-500/50 transition cursor-pointer group flex items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white group-hover:text-purple-400 transition">
                        Comprehensive Mixed Board
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold font-mono">
                        National Exam
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      Balanced combination across all unlocked subjects simulating real LET difficulty
                    </p>
                    <div className="text-[10px] font-mono text-purple-400/80">
                      Total Pool: {totalItemsCount} questions &bull; 150 items drawn
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 transition shrink-0" />
              </button>
            </div>

            {/* Footer */}
            <div className="pt-2 flex items-center justify-between border-t border-zinc-800/80">
              <span className="text-[11px] text-zinc-400">
                Passing standard: 75% PRC BLEPT threshold
              </span>
              <button
                onClick={() => setIsMockBoardModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
