import React, { useState } from 'react';
import { Item, SessionStats } from '../../types';
import { MixMatchSet, Engine } from '../../core/engine';
import { sound } from '../../core/sound';
import { Check, Sparkles, ArrowRight, Layers } from 'lucide-react';

interface MixMatchModeProps {
  items: Item[];
  onFinish: (stats: SessionStats) => void;
  onUpdateHUD: (data: { currentIndex: number; score: number; streak: number }) => void;
}

export const MixMatchMode: React.FC<MixMatchModeProps> = ({
  items,
  onFinish,
  onUpdateHUD,
}) => {
  const [sets] = useState<MixMatchSet[]>(() => Engine.buildMixMatch(items));
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedDefId, setSelectedDefId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [mismatched, setMismatched] = useState<boolean>(false);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [records, setRecords] = useState<SessionStats['records']>([]);
  const [startTime] = useState<number>(Date.now());

  const currentSet = sets[currentSetIndex];

  const handleTermClick = (id: string) => {
    if (matchedPairs.has(id)) return;
    sound.playClick();
    setSelectedTermId(id);
    setMismatched(false);

    if (selectedDefId) {
      checkMatch(id, selectedDefId);
    }
  };

  const handleDefClick = (id: string) => {
    if (matchedPairs.has(id)) return;
    sound.playClick();
    setSelectedDefId(id);
    setMismatched(false);

    if (selectedTermId) {
      checkMatch(selectedTermId, id);
    }
  };

  const checkMatch = (termId: string, defId: string) => {
    const isCorrect = termId === defId;

    if (isCorrect) {
      sound.playCorrect();
      const nextMatched = new Set(matchedPairs);
      nextMatched.add(termId);
      setMatchedPairs(nextMatched);

      setSelectedTermId(null);
      setSelectedDefId(null);

      const newScore = score + 1;
      const newStreak = streak + 1;
      const newMaxStreak = Math.max(maxStreak, newStreak);
      setScore(newScore);
      setStreak(newStreak);
      setMaxStreak(newMaxStreak);

      const termObj = currentSet.terms.find((t) => t.id === termId);
      const matchedItem = items.find((i) => i.term === termObj?.text);
      if (matchedItem) {
        setRecords((prev) => [
          ...prev,
          {
            item: matchedItem,
            userAnswer: termObj?.text || '',
            correctAnswer: termObj?.text || '',
            isCorrect: true,
            rationalization: matchedItem.rationalization,
          },
        ]);
      }

      onUpdateHUD({
        currentIndex: currentSetIndex * 5 + nextMatched.size,
        score: newScore,
        streak: newStreak,
      });

      // Check if all in set matched
      if (nextMatched.size === currentSet.terms.length) {
        setTimeout(() => {
          handleNextSet();
        }, 700);
      }
    } else {
      sound.playWrong();
      setMismatched(true);
      setStreak(0);
      onUpdateHUD({
        currentIndex: currentSetIndex * 5 + matchedPairs.size,
        score,
        streak: 0,
      });

      setTimeout(() => {
        setSelectedTermId(null);
        setSelectedDefId(null);
        setMismatched(false);
      }, 600);
    }
  };

  const handleNextSet = () => {
    if (currentSetIndex + 1 < sets.length) {
      setCurrentSetIndex((prev) => prev + 1);
      setMatchedPairs(new Set());
      setSelectedTermId(null);
      setSelectedDefId(null);
      onUpdateHUD({
        currentIndex: (currentSetIndex + 1) * 5,
        score,
        streak,
      });
    } else {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      onFinish({
        modeId: 'mixMatch',
        totalQuestions: sets.length * 5,
        correctCount: score,
        wrongCount: Math.max(0, sets.length * 5 - score),
        maxStreak,
        timeSpentSeconds: timeSpent,
        records,
      });
    }
  };

  if (!currentSet) {
    return <div className="text-center p-8 text-zinc-400">Not enough items for Mix & Match.</div>;
  }

  const isSetComplete = matchedPairs.size === currentSet.terms.length;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* Set Ribbon Header */}
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 font-mono">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-zinc-200">
            Round {currentSetIndex + 1} of {sets.length}
          </span>
          <span className="text-zinc-500">
            ({matchedPairs.size} / {currentSet.terms.length} pairs matched)
          </span>
        </div>

        <span className="text-zinc-400">Click a Term in Column A, then its Definition in Column B</span>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Column A: Terms */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider px-2">
            Column A: Key Terms
          </h3>
          {currentSet.terms.map((t) => {
            const isMatched = matchedPairs.has(t.id);
            const isSelected = selectedTermId === t.id;

            return (
              <button
                key={t.id}
                onClick={() => handleTermClick(t.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all active:scale-[0.99] cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 opacity-60'
                    : isSelected
                    ? mismatched
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-shake'
                      : 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                    : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 text-zinc-100 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>{t.text}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Column B: Definitions */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider px-2">
            Column B: Meaning & Rationale
          </h3>
          {currentSet.definitions.map((d) => {
            const isMatched = matchedPairs.has(d.id);
            const isSelected = selectedDefId === d.id;

            return (
              <button
                key={d.id}
                onClick={() => handleDefClick(d.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-2xl border text-left text-xs leading-relaxed transition-all active:scale-[0.99] cursor-pointer ${
                  isMatched
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 opacity-60'
                    : isSelected
                    ? mismatched
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-shake'
                      : 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                    : 'bg-zinc-900/90 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span>{d.text}</span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Completion Banner for Current Set */}
      {isSetComplete && (
        <div className="rounded-3xl bg-zinc-900 border border-emerald-500/50 p-6 shadow-xl flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3 text-emerald-400">
            <Sparkles className="w-6 h-6 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white">All 5 pairs matched!</h4>
              <p className="text-xs text-zinc-400">Great pattern recognition for the board exam.</p>
            </div>
          </div>

          <button
            onClick={handleNextSet}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            <span>{currentSetIndex + 1 < sets.length ? 'Next Set' : 'View Results'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};
