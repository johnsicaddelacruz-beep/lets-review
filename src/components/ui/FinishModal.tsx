import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle2, XCircle, RotateCcw, Home, Sparkles, ChevronDown, ChevronUp, BookOpen, Flame } from 'lucide-react';
import { SessionStats } from '../../types';
import { calculateGrade, formatTime } from '../../core/utils';
import { sound } from '../../core/sound';

interface FinishModalProps {
  stats: SessionStats;
  onRestart: () => void;
  onReviewMissed?: () => void;
  onHome: () => void;
  onChangeMode: () => void;
}

export const FinishModal: React.FC<FinishModalProps> = ({
  stats,
  onRestart,
  onReviewMissed,
  onHome,
  onChangeMode,
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const grade = calculateGrade(stats.correctCount, stats.totalQuestions);
  const missedCount = stats.records.filter((r) => !r.isCorrect).length;

  useEffect(() => {
    if (grade.passed) {
      sound.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#facc15', '#4ade80', '#60a5fa', '#f43f5e'],
      });
    }
  }, [grade.passed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl relative text-zinc-100 my-8">
        {/* Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-400 mb-4 shadow-lg shadow-amber-400/10">
            <Trophy className="w-8 h-8 stroke-[2.2]" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-zinc-800 text-amber-300 border border-zinc-700 mb-2">
            Session Finished
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {grade.label}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {grade.passed
              ? 'Excellent performance! You are on track to top the Philippine LET exam!'
              : 'Consistent daily practice turns weak spots into your greatest strengths!'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          <div className="bg-zinc-950/70 border border-zinc-800 p-3 rounded-2xl text-center">
            <span className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Score</span>
            <div className="text-lg font-black text-white">
              {stats.correctCount} <span className="text-xs text-zinc-500 font-normal">/ {stats.totalQuestions}</span>
            </div>
          </div>

          <div className="bg-zinc-950/70 border border-zinc-800 p-3 rounded-2xl text-center">
            <span className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Accuracy</span>
            <div className="text-lg font-black text-amber-400">
              {grade.percentage}%
            </div>
          </div>

          <div className="bg-zinc-950/70 border border-zinc-800 p-3 rounded-2xl text-center">
            <span className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Best Streak</span>
            <div className="text-lg font-black text-emerald-400 flex items-center justify-center gap-1">
              <Flame className="w-4 h-4 fill-emerald-400" />
              <span>{stats.maxStreak}</span>
            </div>
          </div>

          <div className="bg-zinc-950/70 border border-zinc-800 p-3 rounded-2xl text-center">
            <span className="text-[10px] uppercase font-semibold text-zinc-400 block mb-0.5">Time</span>
            <div className="text-lg font-black text-zinc-300 font-mono">
              {formatTime(stats.timeSpentSeconds)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 mb-6">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 stroke-[2.5]" />
              <span>Study Again</span>
            </button>

            {missedCount > 0 && onReviewMissed ? (
              <button
                onClick={onReviewMissed}
                className="flex items-center justify-center gap-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 py-3 text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 stroke-[2.5]" />
                <span>Retry Missed ({missedCount})</span>
              </button>
            ) : (
              <button
                onClick={onChangeMode}
                className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white py-3 text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer border border-zinc-700"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Change Mode</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {missedCount > 0 && onReviewMissed && (
              <button
                onClick={onChangeMode}
                className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 text-xs font-semibold transition active:scale-95 cursor-pointer border border-zinc-700"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Change Mode</span>
              </button>
            )}

            <button
              onClick={onHome}
              className={`flex items-center justify-center gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 py-2.5 text-xs font-semibold transition active:scale-95 cursor-pointer border border-zinc-800 ${
                missedCount === 0 || !onReviewMissed ? 'col-span-2' : ''
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Detailed Review Breakdown Accordion */}
        {stats.records.length > 0 && (
          <div className="border-t border-zinc-800 pt-4">
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="flex items-center justify-between w-full text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition py-1"
            >
              <span>Detailed Question Review ({stats.records.length} items)</span>
              {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showBreakdown && (
              <div className="mt-3 space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {stats.records.map((rec, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      rec.isCorrect
                        ? 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
                        : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        {rec.isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        )}
                        {rec.item.term}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono">
                        {rec.item.difficulty}
                      </span>
                    </div>

                    {!rec.isCorrect && (
                      <div className="text-[11px] text-zinc-400 mb-1">
                        <span className="text-rose-400">Your answer:</span> {rec.userAnswer} &bull;{' '}
                        <span className="text-emerald-400">Correct:</span> {rec.correctAnswer}
                      </div>
                    )}

                    <div className="text-[11px] text-zinc-400 bg-zinc-900/60 p-2 rounded-lg border border-zinc-800/60 mt-1">
                      <strong className="text-amber-400">Rationale: </strong>
                      {rec.rationalization}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
