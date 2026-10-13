import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Item, SessionStats } from '../../types';
import { MCQQuestion, Engine } from '../../core/engine';
import { sound } from '../../core/sound';
import { Zap, Clock, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface RapidFireModeProps {
  items: Item[];
  allItems: Item[];
  onFinish: (stats: SessionStats) => void;
  onUpdateHUD: (data: { currentIndex: number; score: number; streak: number; timeRemaining?: number }) => void;
}

export const RapidFireMode: React.FC<RapidFireModeProps> = ({
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

  // Base timer calculation according to prompt:
  // "60s + 0.5s per word over 20"
  const initialTime = useMemo(() => {
    const totalWords = items.reduce((acc, i) => acc + (i.definition.split(' ').length), 0);
    const bonus = Math.max(0, Math.round((totalWords - 20) * 0.5));
    return Math.min(180, 60 + bonus);
  }, [items]);

  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isFinished, setIsFinished] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const timeRemainingRef = useRef(initialTime);
  timeRemainingRef.current = timeRemaining;

  const onUpdateHUDRef = useRef(onUpdateHUD);
  onUpdateHUDRef.current = onUpdateHUD;

  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const stateRef = useRef({
    currentIndex,
    score,
    streak,
    maxStreak,
    records,
    questionsLength: questions.length,
    isFinished,
  });
  stateRef.current = {
    currentIndex,
    score,
    streak,
    maxStreak,
    records,
    questionsLength: questions.length,
    isFinished,
  };

  const currentQ = questions[currentIndex];

  const handleTimeUp = () => {
    if (stateRef.current.isFinished) return;
    setIsFinished(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    sound.playWrong();
    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    const cur = stateRef.current;
    onFinishRef.current({
      modeId: 'rapidFire',
      totalQuestions: cur.questionsLength,
      correctCount: cur.score,
      wrongCount: Math.max(0, cur.currentIndex - cur.score),
      maxStreak: cur.maxStreak,
      timeSpentSeconds: timeSpent,
      records: cur.records,
    });
  };

  useEffect(() => {
    if (isFinished) return;

    // Send initial HUD state for RapidFire on mount
    onUpdateHUDRef.current({
      currentIndex: 0,
      score: 0,
      streak: 0,
      timeRemaining: timeRemainingRef.current,
    });

    timerRef.current = setInterval(() => {
      const nextTime = timeRemainingRef.current - 1;

      if (nextTime <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        timeRemainingRef.current = 0;
        setTimeRemaining(0);
        handleTimeUp();
        return;
      }

      timeRemainingRef.current = nextTime;
      setTimeRemaining(nextTime);

      onUpdateHUDRef.current({
        currentIndex: stateRef.current.currentIndex,
        score: stateRef.current.score,
        streak: stateRef.current.streak,
        timeRemaining: nextTime,
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isFinished]);

  const handleSelect = (option: string) => {
    if (isAnswered || isFinished) return;

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

    onUpdateHUDRef.current({
      currentIndex,
      score: newScore,
      streak: newStreak,
      timeRemaining: timeRemainingRef.current,
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
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedAnswer(null);
      setIsAnswered(false);
      onUpdateHUDRef.current({
        currentIndex: nextIdx,
        score,
        streak,
        timeRemaining: timeRemainingRef.current,
      });
    } else {
      setIsFinished(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      onFinishRef.current({
        modeId: 'rapidFire',
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
      {/* Rapid-Fire Speed Header */}
      <div className="flex items-center justify-between text-xs font-semibold mb-3">
        <div className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20">
          <Zap className="w-4 h-4 fill-amber-400 animate-bounce" />
          <span>Rapid-Fire Sprint</span>
        </div>

        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold ${
          timeRemaining <= 10
            ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
            : 'bg-zinc-900 border-zinc-800 text-amber-300'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{timeRemaining}s Left</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="rounded-3xl bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex items-start gap-3 mb-5">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold shrink-0 mt-0.5">
            {currentIndex + 1}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 leading-relaxed">
            {currentQ.prompt}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {currentQ.options.map((option, idx) => {
            const isChosen = selectedAnswer === option;
            const isCorrect = option === currentQ.correctAnswer;

            let buttonStyle = 'bg-zinc-950/70 border-zinc-800 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/60';

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
              } else if (isChosen && !isCorrect) {
                buttonStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
              } else {
                buttonStyle = 'bg-zinc-950/40 border-zinc-900 text-zinc-600 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={`flex items-center justify-between p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all active:scale-[0.98] cursor-pointer ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-zinc-900 text-zinc-400 flex items-center justify-center text-xs font-bold shrink-0">
                    {optionLetters[idx]}
                  </span>
                  <span>{option}</span>
                </div>
                {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                {isAnswered && isChosen && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Instant Action & Skip */}
      {isAnswered && (
        <div className="rounded-3xl bg-zinc-900/95 border border-zinc-800 p-5 shadow-xl animate-in fade-in duration-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400">
            <span className="text-amber-400 font-bold">Fast Rationale: </span>
            {currentQ.rationalization}
          </div>

          <button
            onClick={handleNext}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer shrink-0"
          >
            <span>Next ({currentIndex + 2 > questions.length ? 'Finish' : 'Go'})</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};
