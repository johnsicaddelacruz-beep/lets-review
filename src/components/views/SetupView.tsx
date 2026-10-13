import React, { useState } from 'react';
import { StudyModeId, Category, Difficulty } from '../../types';
import { DataLoader } from '../../core/dataLoader';
import { sound } from '../../core/sound';
import { LockBadge } from '../ui/LockBadge';
import { 
  ArrowLeft, 
  Play, 
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
  initialMode = 'practiceTest',
  onBack,
  onStartSession,
  isPro,
  onOpenUpgrade,
}) => {
  // 1-4 Sequential Selection States
  // Step 1: Mode selected (defaults to practiceTest)
  const [selectedMode, setSelectedMode] = useState<StudyModeId | null>(initialMode || 'practiceTest');
  
  // Step 2: Subject, topic, subtopic (defaults to initialCategory or 'all')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all' | null>(initialCategory || 'all');
  const [selectedTopic, setSelectedTopic] = useState<string | 'all'>('all');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | 'all'>('all');

  // Step 3: Question count (defaults to 20)
  const [selectedItemCount, setSelectedItemCount] = useState<number | null>(20);

  // Step 4: Difficulty level
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all' | null>('all');

  // Active step that is expanded for user selection
  // 1 = Mode, 2 = Subject, 3 = Count, 4 = Difficulty
  const [activeStep, setActiveStep] = useState<number>(4);

  // Sequential revelation rules:
  // User select on 1 > reveal select 2 > user select on 2 > reveal 3 > user select on 3 > reveal 4 > user select 4 > reveal Ready to Practice
  const isStep1Selected = selectedMode !== null;
  const isStep2Selected = isStep1Selected && selectedCategory !== null;
  const isStep3Selected = isStep2Selected && selectedItemCount !== null && selectedItemCount > 0;
  const isStep4Selected = isStep3Selected && selectedDifficulty !== null;

  const categories = DataLoader.getCategories();
  const availableTopics = DataLoader.getTopics(selectedCategory && selectedCategory !== 'all' ? selectedCategory : undefined);
  const availableSubtopics = DataLoader.getSubtopics(selectedTopic !== 'all' ? selectedTopic : undefined);

  // Check if locked: Majorship English is locked if not Pro
  const isSelectionLocked = !isPro && DataLoader.isSelectionLocked({
    category: selectedCategory,
    topic: selectedTopic,
    subtopic: selectedSubtopic,
  });

  // Pool calculation
  const matchingItems = DataLoader.filterItems({
    category: selectedCategory || 'all',
    topic: selectedTopic,
    subtopic: selectedSubtopic,
    difficulty: selectedDifficulty || 'all',
  }).filter((item) => {
    if (!isPro && (!selectedCategory || selectedCategory === 'all')) {
      return item.category !== 'Majorship English';
    }
    return true;
  });

  const poolCount = matchingItems.length;
  const readyCount = Math.min(selectedItemCount || 20, poolCount);

  const modesList: Array<{
    id: StudyModeId;
    title: string;
    categoryGroup: 'Relax' | 'Challenge';
    desc: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'practiceTest',
      title: 'Practice Test',
      categoryGroup: 'Relax',
      desc: 'PRC multiple choice with rationalizations',
      icon: <HelpCircle className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 'factOrBluff',
      title: 'Fact or Bluff',
      categoryGroup: 'Challenge',
      desc: 'Detect misleading distractors and board traps',
      icon: <CheckCheck className="w-4 h-4 text-rose-400" />,
    },
    {
      id: 'rapidFire',
      title: 'Rapid-Fire Sprint',
      categoryGroup: 'Challenge',
      desc: 'Speed-based sprint with countdown HUD timer',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'mixMatch',
      title: 'Mix & Match',
      categoryGroup: 'Challenge',
      desc: 'Connect Column A keywords with Column B concepts',
      icon: <Shuffle className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: 'completeWord',
      title: 'Complete Word',
      categoryGroup: 'Challenge',
      desc: 'Solve masked keywords from definition clues',
      icon: <KeyRound className="w-4 h-4 text-teal-400" />,
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      categoryGroup: 'Relax',
      desc: 'Active recall cards with flip rationalizations',
      icon: <BookOpen className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 'cheatSheet',
      title: 'Cheat Sheet',
      categoryGroup: 'Relax',
      desc: 'Searchable 2-column reference table with TTS',
      icon: <Table className="w-4 h-4 text-sky-400" />,
    },
    {
      id: 'mnemonics',
      title: 'Mnemonics',
      categoryGroup: 'Relax',
      desc: 'Acronym formulas and active recall review cards',
      icon: <Brain className="w-4 h-4 text-purple-400" />,
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
    if (!selectedMode || !selectedCategory || !selectedItemCount || !selectedDifficulty) {
      return;
    }

    onStartSession({
      mode: selectedMode,
      category: selectedCategory,
      topic: selectedTopic,
      subtopic: selectedSubtopic,
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
            STEP 1: SELECT CUSTOM MODE
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
                isStep1Selected ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
              }`}>
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Select Study Mode</span>
                  {selectedMode && (
                    <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30">
                      {getModeTitle(selectedMode)}
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {selectedMode ? modesList.find(m => m.id === selectedMode)?.desc : 'Choose among 8 review modes'}
                </p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeStep === 1 ? 'rotate-180' : ''}`} />
          </button>

          {activeStep === 1 && (
            <div className="px-4 pb-4 pt-1 border-t border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {modesList.map((m) => {
                  const isSelected = selectedMode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedMode(m.id);
                        // User select on 1 > reveal select 2
                        setActiveStep(2);
                      }}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-400/20 border-amber-400 text-white'
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {m.icon}
                        <div>
                          <div className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-zinc-200'}`}>
                            {m.title}
                          </div>
                          <div className="text-[10px] text-zinc-400 truncate max-w-[200px]">{m.desc}</div>
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
            STEP 2: SELECT SUBJECT, TOPIC & SUBTOPIC
            Revealed once user selects Step 1
            ======================================================== */}
        {isStep1Selected && (
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
                  isStep2Selected ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  2
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Select Subject, Topic & Subtopic</span>
                    {selectedCategory && (
                      <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30">
                        {selectedCategory === 'all' ? 'All Free Subjects' : selectedCategory}
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    GenEd and ProfEd are 100% Free • Majorship English is ₱99 Pro
                  </p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${activeStep === 2 ? 'rotate-180' : ''}`} />
            </button>

            {activeStep === 2 && (
              <div className="px-4 pb-4 pt-1 border-t border-zinc-800 space-y-3">
                {/* Subject Selector */}
                <div className="pt-2">
                  <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold mb-1.5">
                    Choose Subject:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        sound.playClick();
                        setSelectedCategory('all');
                        setSelectedTopic('all');
                        setSelectedSubtopic('all');
                        // User select on 2 > reveal select 3
                        setActiveStep(3);
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
                            setSelectedTopic('all');
                            setSelectedSubtopic('all');
                            // User select on 2 > reveal select 3
                            setActiveStep(3);
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

                {/* Optional Topics Filter */}
                {availableTopics.length > 0 && (
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                      Topic (Optional):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedTopic('all');
                          setSelectedSubtopic('all');
                        }}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                          selectedTopic === 'all'
                            ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        All Topics
                      </button>
                      {availableTopics.map((topic) => {
                        const isTopLocked = !isPro && DataLoader.isTopicPro(topic, selectedCategory);
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
                              setSelectedSubtopic('all');
                            }}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                              selectedTopic === topic
                                ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
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

                {/* Optional Subtopics Filter */}
                {availableSubtopics.length > 0 && selectedTopic !== 'all' && (
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                      Subtopic (Optional):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedSubtopic('all');
                        }}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                          selectedSubtopic === 'all'
                            ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        All Subtopics
                      </button>
                      {availableSubtopics.map((sub) => {
                        const isSubLocked = !isPro && DataLoader.isSubtopicPro(sub, selectedTopic);
                        return (
                          <button
                            key={sub}
                            onClick={() => {
                              sound.playClick();
                              if (isSubLocked) {
                                onOpenUpgrade();
                                return;
                              }
                              setSelectedSubtopic(sub);
                            }}
                            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                              selectedSubtopic === sub
                                ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                            }`}
                          >
                            <span>{sub}</span>
                            {isSubLocked && <LockBadge isPro={isPro} label="PRO" size="sm" />}
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
            Revealed once user selects Step 2
            ======================================================== */}
        {isStep2Selected && (
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
                  isStep3Selected ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
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
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {[10, 20, 30, 50].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        sound.playClick();
                        setSelectedItemCount(num);
                        // User select on 3 > reveal select 4
                        setActiveStep(4);
                      }}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        selectedItemCount === num
                          ? 'bg-amber-400 text-zinc-950 border-amber-400'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            STEP 4: DIFFICULTY LEVEL
            Revealed once user selects Step 3
            ======================================================== */}
        {isStep3Selected && (
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
                  isStep4Selected ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  4
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Difficulty Level</span>
                    {selectedDifficulty && (
                      <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30 capitalize">
                        {selectedDifficulty}
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
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {[
                    { id: 'all', label: 'All Levels' },
                    { id: 'easy', label: 'Easy' },
                    { id: 'medium', label: 'Medium' },
                    { id: 'advanced', label: 'Advanced' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        sound.playClick();
                        setSelectedDifficulty(d.id as Difficulty | 'all');
                        // Step 4 selected! Ready to Practice will be revealed
                        setActiveStep(0); // collapse to focus on ready card
                      }}
                      className={`py-2.5 px-1 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                        selectedDifficulty === d.id
                          ? 'bg-amber-400 text-zinc-950 border-amber-400'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            REVEAL READY TO PRACTICE ONCE USER SELECTS 4
            Exact user requested card:
            Ready to Practice
            20 questions ready from 69 available pool
            Mode: Practice Test • All Free Subjects

            Start Review Session
            ======================================================== */}
        {isStep4Selected && (
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl animate-fadeIn">
            <div className="text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Practice</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">
                {isSelectionLocked ? (
                  'Majorship English Requires Pro (₱99 one-time)'
                ) : (
                  <span>
                    <strong className="text-amber-400">{readyCount}</strong> questions ready from{' '}
                    <strong className="text-amber-400">{poolCount}</strong> available pool
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400">
                Mode: {getModeTitle(selectedMode)} &bull; {selectedCategory === 'all' ? 'All Free Subjects' : selectedCategory}
              </p>
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-black shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Play className="w-4 h-4 fill-zinc-950" />
                <span>Start Review Session</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
