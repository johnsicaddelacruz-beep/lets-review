import React, { useState } from 'react';
import { Item, SessionStats } from '../../types';
import { FactOrBluffQuestion, Engine } from '../../core/engine';
import { sound } from '../../core/sound';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';

interface FactOrBluffModeProps {
  items: Item[];
  allItems: Item[];
  onFinish: (stats: SessionStats) => void;
  onUpdateHUD: (data: { currentIndex: number; score: number; streak: number }) => void;
}

export const FactOrBluffMode: React.FC<FactOrBluffModeProps> = ({
  items,
  allItems,
  onFinish,
  onUpdateHUD,
}) => {
  const [questions] = useState<FactOrBluffQuestion[]>(() => Engine.buildFactOrBluff(items, allItems));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [records, setRecords] = useState<SessionStats['records']>([]);
  const [startTime] = useState<number>(Date.now());

  const currentQ = questions[currentIndex];

  const handleChoice = (choice: boolean) => {
    if (isAnswered) return;

    sound.playClick();
    setUserChoice(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQ.isFact;
    const newScore = isCorrect ? score + 1 : score;
    const newStreak = isCorrect ? streak + 1 : 0;
    const newMaxStreak = Math.max(maxStreak, newStreak);

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    setScore(newScore);
    setStreak(newStreak);
    setMaxStreak(newMaxStreak);

    onUpdateHUD({
      currentIndex,
      score: newScore,
      streak: newStreak,
    });

    setRecords((prev) => [
      ...prev,
      {
        item: currentQ.item,
        userAnswer: choice ? 'FACT' : 'BLUFF',
        correctAnswer: currentQ.isFact ? 'FACT' : 'BLUFF',
        isCorrect,
        rationalization: currentQ.rationalization,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserChoice(null);
      setIsAnswered(false);
      onUpdateHUD({
        currentIndex: currentIndex + 1,
        score,
        streak,
      });
    } else {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      onFinish({
        modeId: 'factOrBluff',
        totalQuestions: questions.length,
        correctCount: score,
        wrongCount: questions.length - score,
        maxStreak,
        timeSpentSeconds: timeSpent,
        records,
      });
    }
  };

  if (!currentQ) {
    return <div className="text-center p-8 text-zinc-400">No questions available.</div>;
  }

  const isUserCorrect = userChoice === currentQ.isFact;

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      {/* Category badge */}
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 font-mono">
        <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 font-semibold">
          {currentQ.item.category} &bull; {currentQ.item.subtopic}
        </span>
        <span className="text-zinc-500">
          Statement {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Main Statement Card */}
      <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 shadow-xl text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-4">
          Read Statement Carefully
        </span>

        <h2 className="text-lg sm:text-xl font-bold text-zinc-100 leading-relaxed mb-6">
          "{currentQ.statement}"
        </h2>

        {/* Fact vs Bluff Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => handleChoice(true)}
            disabled={isAnswered}
            className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border text-sm font-black transition-all active:scale-95 cursor-pointer ${
              isAnswered
                ? currentQ.isFact
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10'
                  : userChoice === true
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : 'bg-zinc-950/40 border-zinc-900 text-zinc-600 opacity-50'
                : 'bg-emerald-950/30 hover:bg-emerald-900/40 border-emerald-500/40 text-emerald-300 hover:border-emerald-500/80'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <span className="tracking-widest text-base">FACT</span>
          </button>

          <button
            onClick={() => handleChoice(false)}
            disabled={isAnswered}
            className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border text-sm font-black transition-all active:scale-95 cursor-pointer ${
              isAnswered
                ? !currentQ.isFact
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10'
                  : userChoice === false
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : 'bg-zinc-950/40 border-zinc-900 text-zinc-600 opacity-50'
                : 'bg-rose-950/30 hover:bg-rose-900/40 border-rose-500/40 text-rose-300 hover:border-rose-500/80'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <X className="w-6 h-6 stroke-[3]" />
            </div>
            <span className="tracking-widest text-base">BLUFF</span>
          </button>
        </div>
      </div>

      {/* Answer Explanation Reveal */}
      {isAnswered && (
        <div
          className={`rounded-3xl p-6 shadow-xl border animate-in fade-in duration-300 ${
            isUserCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
          }`}
        >
          <div className="flex items-center gap-2 mb-2 font-black text-sm">
            <Sparkles className="w-4 h-4" />
            <span>
              {isUserCorrect ? 'Correct! ' : 'Incorrect! '}
              The statement is indeed a {currentQ.isFact ? 'FACT' : 'BLUFF'}.
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800/80 mb-4">
            {currentQ.rationalization}
          </p>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Statement' : 'See Results'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
