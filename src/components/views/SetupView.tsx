import React, { useState } from 'react';
import { StudyModeId, Category, Difficulty } from '../../types';
import { DataLoader } from '../../core/dataLoader';
import { sound } from '../../core/sound';
import { LockBadge } from '../ui/LockBadge';
import { 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  HelpCircle, 
  Table, 
  Brain, 
  CheckCheck, 
  Zap, 
  Shuffle, 
  KeyRound, 
  Sliders, 
  CheckCircle2, 
  ChevronDown, 
  Lock, 
  Sparkles
} from 'lucide-react';

interface SetupViewProps {
  initialCategory?: Category;
  initialMode?: StudyModeId;
  onBack: () => void;
  onStartSession: (config: {
    mode: StudyModeId;
    category: Category | 'all';
    topic: string | 'all';
    subtopic: string | 'all';
    difficulty: Difficulty | 'all';
    itemCount: number;
  }) => void;
  isPro: boolean;
  onOpenUpgrade: () => void;
}

export const SetupView: React.FC<SetupViewProps> = ({
  initialCategory,
  initialMode,
  onBack,
  onStartSession,
  isPro,
  onOpenUpgrade,
}) => {
  // Progressive Step States
  // 1: Mode -> 2: Subject & Topic -> 3: Question Count -> 4: Difficulty Level -> Ready Card
  const [selectedMode, setSelectedMode] = useState<StudyModeId | null>(initialMode || null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | null>(initialCategory || null);
  const [selectedTopic, setSelectedTopic] = useState<string | 'all' | null>(null);
  const [selectedItemCount, setSelectedItemCount] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all' | null>(null);

  // activeStep: 1 = Mode, 2 = Subject/Topic, 3 = Count, 4 = Difficulty, 0 = Collapsed (Ready Card view)
  const [activeStep, setActiveStep] = useState<number>(() => {
    if (!initialMode) return 1;
    if (!initialCategory) return 2;
    return 2;
  });

  // Progressive revelation rules
  const isStep1Done = selectedMode !== null;
  const isStep2Done = isStep1Done && selectedCategory !== null && selectedTopic !== null;
  const isStep3Done = isStep2Done && selectedItemCount !== null && selectedItemCount > 0;
  const isStep4Done = isStep3Done && selectedDifficulty !== null;

  const categories = DataLoader.getCategories();
  const availableTopics = DataLoader.getTopics(
    selectedCategory && selectedCategory !== 'all' ? selectedCategory : undefined
  );

  // Check if selection is locked (Majorship English locked if not Pro)
  const isSelectionLocked = !isPro && DataLoader.isSelectionLocked({
    category: selectedCategory,
    topic: selectedTopic || 'all',
  });

  // Calculate pool count
  const matchingItems = DataLoader.filterItems({
    category: selectedCategory || 'all',
    topic: selectedTopic || 'all',
    subtopic: 'all',
    difficulty: selectedDifficulty || 'all',
  }).filter((item) => {
    if (!isPro && (!selectedCategory || selectedCategory === 'all')) {
      return item.category !== 'Majorship English';
    }
    return true;
  });

  const poolCount = matchingItems.length;
  const readyCount = Math.min(selectedItemCount || 20, poolCount);

  // 8 Study Modes with Mode | Explanation format
  const modesList: Array<{
    id: StudyModeId;
    title: string;
    desc: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'practiceTest',
      title: 'Practice Test',
      desc: 'Authentic 4-choice PRC board exam simulation with rationalizations',
      icon: <HelpCircle className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 'factOrBluff',
      title: 'Fact or Bluff',
      desc: 'Rapid true/false diagnostic drills to identify misconceptions',
      icon: <CheckCheck className="w-4 h-4 text-rose-400" />,
    },
    {
      id: 'rapidFire',
      title: 'Rapid-Fire Sprint',
      desc: 'High-intensity timed challenge testing recall under pressure',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'mixMatch',
      title: 'Mix & Match',
      desc: 'Interactive concept-to-definition board matching exercise',
      icon: <Shuffle className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: 'flashcards',
      title: 'Active Flashcards',
      desc: 'Leitner spaced-repetition memory cards with 3D flip inspection',
      icon: <BookOpen className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'cheatSheet',
      title: 'High-Yield Sheet',
      desc: 'Structured bullet summaries, key laws, and PRC formulas',
      icon: <Table className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'mnemonics',
      title: 'Memory Mnemonics',
      desc: 'Catchy acronyms and retention anchors for complex taxonomies',
      icon: <Brain className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 'completeWord',
      title: 'Complete Word',
      desc: 'Active term recall challenge reinforcing board terminology',
      icon: <KeyRound className="w-4 h-4 text-teal-400" />,
    },
  ];

  const getModeTitle = (id: StudyModeId | null) => {
    if (!id) return '';
    return modesList.find((m) => m.id === id)?.title || id;
  };

  const handleStart = () => {
    sound.playClick();
    if (isSelectionLocked) {
      onOpenUpgrade();
      return;
    }
    if (!selectedMode || !selectedCategory || !selectedTopic || !selectedItemCount || !selectedDifficulty) {
      return;
    }

    onStartSession({
      mode: selectedMode,
      category: selectedCategory,
      topic: selectedTopic,
      subtopic: 'all',
      difficulty: selectedDifficulty,
      itemCount: selectedItemCount,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-5 sm:py-7 px-4 sm:px-6 space-y-5 animate-fadeIn">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>

        <div className="flex items-center gap-2">
          {!isPro && (
            <button
              onClick={onOpenUpgrade}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-bold hover:bg-amber-400/25 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock Majorship (₱99)</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20">
            <Sliders className="w-3.5 h-3.5" />
            <span>Launch Custom Session</span>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {/* ========================================================
            STEP 1: SELECT STUDY MODE (Mode | Explanation)
            ======================================================== */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-sm transition-all">
          <button
            onClick={() => {
              sound.playClick();
              setActiveStep(activeStep === 1 ? 0 : 1);
            }}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/40 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                isStep1Done ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
              }`}>
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>Select Study Mode</span>
                  {selectedMode && (
                    <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30">
                      {getModeTitle(selectedMode)}
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {selectedMode 
                    ? modesList.find((m) => m.id === selectedMode)?.desc 
                    : 'Choose your desired study mode'}
                </p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeStep === 1 ? 'rotate-180' : ''}`} />
          </button>

          {activeStep === 1 && (
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800">
              <div className="space-y-2 pt-2">
                {modesList.map((m) => {
                  const isSelected = selectedMode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedMode(m.id);
                        // Progress to Step 2
                        setActiveStep(2);
                      }}
                      className={`w-full p-3 sm:p-3.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm shadow-amber-400/10'
                          : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0 mt-0.5 sm:mt-0">
                          {m.icon}
                        </div>
                        <div className="min-w-0">
                          {/* Mode | Explanation format */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-amber-400' : 'text-zinc-100'}`}>
                              {m.title}
                            </span>
                            <span className="text-zinc-600 hidden sm:inline">|</span>
                            <span className="text-[11px] sm:text-xs text-zinc-400 leading-tight">
                              {m.desc}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            STEP 2: SELECT SUBJECT, TOPIC
            Revealed once user selects Step 1 (Mode)
            ======================================================== */}
        {isStep1Done && (
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-sm transition-all animate-fadeIn">
            <button
              onClick={() => {
                sound.playClick();
                setActiveStep(activeStep === 2 ? 0 : 2);
              }}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  isStep2Done ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  2
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">
                    <span>Select Subject, Topic</span>
                    {selectedCategory && selectedTopic && (
                      <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30">
                        {selectedCategory === 'all' ? 'All Free Subjects' : selectedCategory} &bull; {selectedTopic === 'all' ? 'All Topics' : selectedTopic}
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    GenEd and ProfEd are 100% Free &bull; Majorship English is ₱99 Pro
                  </p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeStep === 2 ? 'rotate-180' : ''}`} />
            </button>

            {activeStep === 2 && (
              <div className="px-4 pb-4 pt-1 border-t border-zinc-800 space-y-3.5">
                {/* 2A: Subject Selector */}
                <div className="pt-2 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                    Choose Subject:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedCategory('all');
                        setSelectedTopic(null); // prompt user to pick topic or all topics below
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                        selectedCategory === 'all'
                          ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      All Free Subjects
                    </button>

                    {categories.map((cat) => {
                      const isCatPro = DataLoader.isCategoryPro(cat);
                      const isLocked = !isPro && isCatPro;

                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            sound.playClick();
                            if (isLocked) {
                              onOpenUpgrade();
                              return;
                            }
                            setSelectedCategory(cat);
                            setSelectedTopic(null); // prompt user to pick topic or all topics below
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer text-center relative ${
                            selectedCategory === cat
                              ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                              : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1.5">
                            <span className="truncate">
                              {cat === 'General Education'
                                ? 'GenEd (Free)'
                                : cat === 'Professional Education'
                                ? 'ProfEd (Free)'
                                : 'Majorship (Pro)'}
                            </span>
                            {isCatPro && <LockBadge isPro={isPro} label="PRO" size="sm" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2B: Topic Selector (revealed once Subject is selected) */}
                {selectedCategory && (
                  <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                        Choose Topic:
                      </div>
                      <span className="text-[10px] text-amber-400/80 font-medium">
                        Select a topic to proceed
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {/* All Topics Option */}
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedTopic('all');
                          // Both Subject and Topic selected > advance to Step 3
                          setActiveStep(3);
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                          selectedTopic === 'all'
                            ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        All Topics
                      </button>

                      {/* Individual Topics */}
                      {availableTopics.map((topic) => {
                        const isTopLocked = !isPro && DataLoader.isTopicPro(topic, selectedCategory);
                        const isChosen = selectedTopic === topic;

                        return (
                          <button
                            key={topic}
                            onClick={() => {
                              sound.playClick();
                              if (isTopLocked) {
                                onOpenUpgrade();
                                return;
                              }
                              setSelectedTopic(topic);
                              // Both Subject and Topic selected > advance to Step 3
                              setActiveStep(3);
                            }}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                              isChosen
                                ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:text-white'
                            }`}
                          >
                            <span>{topic}</span>
                            {isTopLocked && <LockBadge isPro={isPro} label="PRO" size="sm" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STEP 3: QUESTION COUNT
            Revealed once user selects Step 2 (Subject & Topic)
            ======================================================== */}
        {isStep2Done && (
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-sm transition-all animate-fadeIn">
            <button
              onClick={() => {
                sound.playClick();
                setActiveStep(activeStep === 3 ? 0 : 3);
              }}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  isStep3Done ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  3
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Question Count</span>
                    {selectedItemCount && (
                      <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30">
                        {selectedItemCount} Questions
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Choose how many questions to practice
                  </p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeStep === 3 ? 'rotate-180' : ''}`} />
            </button>

            {activeStep === 3 && (
              <div className="px-4 pb-4 pt-1 border-t border-zinc-800">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {[
                    { num: 10, label: '10 Qs', desc: 'Quick drill' },
                    { num: 20, label: '20 Qs', desc: 'Recommended' },
                    { num: 30, label: '30 Qs', desc: 'Deep dive' },
                    { num: 50, label: '50 Qs', desc: 'Comprehensive' },
                  ].map(({ num, label, desc }) => (
                    <button
                      key={num}
                      onClick={() => {
                        sound.playClick();
                        setSelectedItemCount(num);
                        // Progress to Step 4: Difficulty Level
                        setActiveStep(4);
                      }}
                      className={`p-3 rounded-xl border transition cursor-pointer text-center ${
                        selectedItemCount === num
                          ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-sm shadow-amber-400/20'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="text-xs font-black">{label}</div>
                      <div className={`text-[10px] mt-0.5 ${
                        selectedItemCount === num ? 'text-zinc-900 font-semibold' : 'text-zinc-500'
                      }`}>
                        {desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STEP 4: DIFFICULTY LEVEL
            Revealed once user selects Step 3 (Question Count)
            ======================================================== */}
        {isStep3Done && (
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-sm transition-all animate-fadeIn">
            <button
              onClick={() => {
                sound.playClick();
                setActiveStep(activeStep === 4 ? 0 : 4);
              }}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/40 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                  isStep4Done ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  4
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Difficulty Level</span>
                    {selectedDifficulty && (
                      <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30 capitalize">
                        {selectedDifficulty === 'all' ? 'All Levels' : selectedDifficulty}
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Free for all difficulty levels
                  </p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeStep === 4 ? 'rotate-180' : ''}`} />
            </button>

            {activeStep === 4 && (
              <div className="px-4 pb-4 pt-1 border-t border-zinc-800">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {[
                    { id: 'all', label: 'All Levels', desc: 'Mixed items' },
                    { id: 'easy', label: 'Easy', desc: 'Foundational' },
                    { id: 'medium', label: 'Medium', desc: 'PRC standard' },
                    { id: 'advanced', label: 'Advanced', desc: 'Challenging' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedDifficulty(d.id as Difficulty | 'all');
                        // Collapse to highlight the Ready Card
                        setActiveStep(0);
                      }}
                      className={`p-3 rounded-xl border transition cursor-pointer text-center ${
                        selectedDifficulty === d.id
                          ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-sm shadow-amber-400/20'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="text-xs font-black">{d.label}</div>
                      <div className={`text-[10px] mt-0.5 ${
                        selectedDifficulty === d.id ? 'text-zinc-900 font-semibold' : 'text-zinc-500'
                      }`}>
                        {d.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            REVEAL READY CARD ONCE USER SELECTS DIFFICULTY LEVEL
            Card Format:
            20 questions ready from 547 available pool
            Start Review Session ->
            Mode | Subject - Topic | # of Questions | Difficulty Level
            ======================================================== */}
        {isStep4Done && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-400/40 shadow-xl shadow-amber-400/5 space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ready to Practice</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  {isSelectionLocked ? (
                    'Majorship English Requires Pro (₱99 one-time)'
                  ) : (
                    <span>
                      <strong className="text-amber-400">{readyCount} questions ready</strong> from{' '}
                      <strong className="text-amber-400">{poolCount} available pool</strong>
                    </span>
                  )}
                </div>
              </div>

              {isSelectionLocked ? (
                <button
                  onClick={onOpenUpgrade}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-black shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer shrink-0"
                >
                  <Lock className="w-4 h-4 text-zinc-950" />
                  <span>Unlock Pro (₱99)</span>
                </button>
              ) : (
                <button
                  onClick={handleStart}
                  disabled={poolCount === 0}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-black shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <span>Start Review Session</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950" />
                </button>
              )}
            </div>

            {/* Exact requested summary format: Mode | Subject - Topic | # of Questions | Difficulty Level */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-center sm:justify-start gap-2 text-xs font-medium text-zinc-300 flex-wrap">
              <span className="text-amber-400 font-bold">{getModeTitle(selectedMode)}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-200">
                {selectedCategory === 'all' ? 'All Free Subjects' : selectedCategory} - {selectedTopic === 'all' ? 'All Topics' : selectedTopic}
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-200">{selectedItemCount} Questions</span>
              <span className="text-zinc-600">|</span>
              <span className="capitalize text-zinc-200">
                {selectedDifficulty === 'all' ? 'All Levels' : selectedDifficulty}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
