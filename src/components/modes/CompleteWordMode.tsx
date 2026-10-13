import React, { useState } from 'react';
import { Item, SessionStats } from '../../types';
import { CompleteWordQuestion, Engine } from '../../core/engine';
import { sound } from '../../core/sound';
import { KeyRound, Lightbulb, ArrowRight, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface CompleteWordModeProps {
  items: Item[];
  onFinish: (stats: SessionStats) => void;
  onUpdateHUD: (data: { currentIndex: number; score: number; streak: number }) => void;
}

export const CompleteWordMode: React.FC<CompleteWordModeProps> = ({
  items,
  onFinish,
  onUpdateHUD,
}) => {
  const [questions] = useState<CompleteWordQuestion[]>(() => Engine.buildCompleteWord(items));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [triesLeft, setTriesLeft] = useState(2);
  const [isAnswered, setIsAnswered] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState<Set<number>>(new Set());
  const [hintsUsed, setHintsUsed] = useState(0);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [records, setRecords] = useState<SessionStats['records']>([]);
  const [startTime] = useState<number>(Date.now());

  const currentQ = questions[currentIndex];

  const handleHint = () => {
    if (isAnswered) return;
    sound.playClick();

    // Find first unrevealed letter index
    const targetWord = currentQ.word;
    for (let i = 0; i < targetWord.length; i++) {
      const char = targetWord[i];
      if (/[A-Z0-9]/.test(char) && !revealedLetters.has(i)) {
        const next = new Set(revealedLetters);
        next.add(i);
        setRevealedLetters(next);
        setHintsUsed((h) => h + 1);
        break;
      }
    }
  };

  const cleanString = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered || !inputVal.trim()) return;

    const userClean = cleanString(inputVal);
    const targetClean = cleanString(currentQ.word);

    if (userClean === targetClean) {
      // Correct!
      sound.playCorrect();
      setIsAnswered(true);
      const newScore = score + 1;
      const newStreak = streak + 1;
      const newMaxStreak = Math.max(maxStreak, newStreak);

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
          userAnswer: inputVal,
          correctAnswer: currentQ.word,
          isCorrect: true,
          rationalization: currentQ.rationalization,
        },
      ]);
    } else {
      // Wrong try
      sound.playWrong();
      if (triesLeft > 1) {
        setTriesLeft(1);
        setInputVal('');
      } else {
        // All tries used
        setIsAnswered(true);
        setStreak(0);
        onUpdateHUD({
          currentIndex,
          score,
          streak: 0,
        });

        setRecords((prev) => [
          ...prev,
          {
            item: currentQ.item,
            userAnswer: inputVal,
            correctAnswer: currentQ.word,
            isCorrect: false,
            rationalization: currentQ.rationalization,
          },
        ]);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setInputVal('');
      setTriesLeft(2);
      setIsAnswered(false);
      setRevealedLetters(new Set());
      setHintsUsed(0);
      onUpdateHUD({
        currentIndex: currentIndex + 1,
        score,
        streak,
      });
    } else {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      onFinish({
        modeId: 'completeWord',
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

  // Build the masked display string
  const displayChars = currentQ.word.split('').map((char, index) => {
    if (!/[A-Z0-9]/.test(char)) return char;
    if (isAnswered || revealedLetters.has(index)) return char;
    return currentQ.maskedWord[index];
  });

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      {/* Category ribbon */}
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-3 font-mono">
        <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 font-semibold">
          {currentQ.item.category} &bull; {currentQ.item.subtopic}
        </span>
        <span className="text-zinc-500">
          Word {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Main Clue Card */}
      <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          <KeyRound className="w-4 h-4" />
          <span>Identify The Educational Concept</span>
        </div>

        <p className="text-base sm:text-lg text-zinc-100 font-medium leading-relaxed mb-6">
          "{currentQ.clue}"
        </p>

        {/* Masked Letter Tiles */}
        <div className="bg-zinc-950/80 p-5 rounded-2xl border border-zinc-800/80 mb-6 flex flex-wrap items-center justify-center gap-1.5 font-mono text-base sm:text-xl font-bold tracking-wider">
          {displayChars.map((char, idx) => {
            if (char === ' ') {
              return <span key={idx} className="w-4 inline-block" />;
            }
            const isFilled = char !== '_';
            return (
              <span
                key={idx}
                className={`w-7 h-9 sm:w-9 sm:h-11 flex items-center justify-center rounded-lg border transition-all ${
                  isAnswered
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                    : isFilled
                    ? 'bg-amber-400/10 border-amber-400/40 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                }`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Input Form */}
        {!isAnswered ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type your answer here..."
                autoFocus
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-3.5 text-zinc-100 placeholder-zinc-500 text-sm font-semibold focus:outline-none focus:border-amber-400/70 focus:ring-1 focus:ring-amber-400 transition"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleHint}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-semibold border border-zinc-700 transition active:scale-95 cursor-pointer"
                  title="Reveal one letter hint"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Letter Hint ({hintsUsed})</span>
                </button>

                <span className="text-xs text-zinc-400 font-mono">
                  {triesLeft} {triesLeft === 1 ? 'try' : 'tries'} left
                </span>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-400/20 transition active:scale-95 cursor-pointer"
              >
                Submit Answer
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between gap-2 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-400">Answer:</span>
              <span className="font-bold text-amber-400">{currentQ.word}</span>
            </div>
            {cleanString(inputVal) === cleanString(currentQ.word) ? (
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" /> Solved
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-400 text-xs font-bold">
                <XCircle className="w-4 h-4" /> Revealed
              </span>
            )}
          </div>
        )}
      </div>

      {/* Answer & Rationalization Reveal */}
      {isAnswered && (
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl animate-in fade-in duration-300">
          <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>LET Review Rationalization</span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80 mb-4">
            {currentQ.rationalization}
          </p>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Word' : 'See Results'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
