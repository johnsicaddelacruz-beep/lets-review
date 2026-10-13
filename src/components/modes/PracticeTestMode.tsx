import React, { useState } from 'react';
import { Item, SessionStats } from '../../types';
import { MCQQuestion, Engine } from '../../core/engine';
import { sound } from '../../core/sound';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle, Sparkles, BookOpen } from 'lucide-react';

interface PracticeTestModeProps {
  items: Item[];
  allItems: Item[];
  onFinish: (stats: SessionStats) => void;
  onUpdateHUD: (data: { currentIndex: number; score: number; streak: number }) => void;
}

export const PracticeTestMode: React.FC<PracticeTestModeProps> = ({
  items,
  allItems,
  onFinish,
  onUpdateHUD,
}) => {
  const [questions] = useState<MCQQuestion[]>(() => Engine.buildPracticeTest(items, allItems));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [records, setRecords] = useState<SessionStats['records']>([]);
  const [startTime] = useState<number>(Date.now());

  const currentQ = questions[currentIndex];

  const handleSelect = (option: string) => {
    if (isAnswered) return;

    sound.playClick();
    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
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
        userAnswer: option,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
        rationalization: currentQ.rationalization,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      onUpdateHUD({
        currentIndex: currentIndex + 1,
        score,
        streak,
      });
    } else {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      onFinish({
        modeId: 'practiceTest',
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

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4">
      {/* Category & Topic Ribbon with TOS, Bloom's, and High Yield */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-zinc-400 mb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 font-semibold">
            {currentQ.item.category} &bull; {currentQ.item.topic}
          </span>
          {currentQ.item.highYield && (
            <span className="px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold flex items-center gap-1">
              ⭐ High Yield
            </span>
          )}
          {currentQ.item.bloomsTaxonomy && (
            <span className="px-2 py-0.5 rounded-lg bg-sky-400/10 text-sky-300 border border-sky-400/20 text-[10px] font-medium">
              Bloom's: {currentQ.item.bloomsTaxonomy}
            </span>
          )}
          {currentQ.item.tosCompetency && (
            <span className="px-2 py-0.5 rounded-lg bg-indigo-400/10 text-indigo-300 border border-indigo-400/20 text-[10px] font-mono">
              TOS: {currentQ.item.tosCompetency}
            </span>
          )}
        </div>
        <span className="uppercase text-[11px] font-mono tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
          Difficulty: {currentQ.item.difficulty}
        </span>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">
            Q{currentIndex + 1}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 leading-relaxed">
            {currentQ.prompt}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          {currentQ.options.map((option, idx) => {
            const isChosen = selectedAnswer === option;
            const isCorrect = option === currentQ.correctAnswer;

            let buttonStyle = 'bg-zinc-950/70 border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/60';

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/50 border-emerald-500/80 text-emerald-200 shadow-md shadow-emerald-500/10';
              } else if (isChosen && !isCorrect) {
                buttonStyle = 'bg-rose-950/50 border-rose-500/80 text-rose-200 shadow-md shadow-rose-500/10';
              } else {
                buttonStyle = 'bg-zinc-950/40 border-zinc-900 text-zinc-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={`flex items-center justify-between w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all active:scale-[0.99] cursor-pointer ${buttonStyle}`}
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isAnswered && isCorrect
                        ? 'bg-emerald-500 text-zinc-950'
                        : isAnswered && isChosen && !isCorrect
                        ? 'bg-rose-500 text-white'
                        : 'bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {optionLetters[idx]}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isChosen && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rationalization & Next Step Card */}
      {isAnswered && (
        <div className="rounded-3xl bg-zinc-900/95 border border-zinc-800 p-6 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-sm">
            <HelpCircle className="w-4 h-4" />
            <span>Official LET Rationalization</span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80 mb-4">
            {currentQ.rationalization}
          </p>

          {currentQ.item.source && (
            <div className="mb-4 bg-zinc-950/70 border border-zinc-800 rounded-2xl p-3.5 text-xs flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-amber-400 font-bold block mb-0.5">Verified LET Reference / Source:</span>
                <span className="text-zinc-300 leading-relaxed">{currentQ.item.source}</span>
              </div>
            </div>
          )}

          {currentQ.item.mnemonic && (
            <div className="mb-4 bg-amber-400/10 border border-amber-400/30 rounded-2xl p-3.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mnemonic Aid: {currentQ.item.mnemonic.title}</span>
              </div>
              <p className="text-zinc-200 font-medium italic">"{currentQ.item.mnemonic.phrase}"</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
