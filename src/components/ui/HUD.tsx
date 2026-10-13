import React from 'react';
import { ArrowLeft, Volume2, VolumeX, Flame, Bookmark, Clock, Award } from 'lucide-react';
import { StudyModeId } from '../../types';
import { sound } from '../../core/sound';
import { formatTime } from '../../core/utils';

interface HUDProps {
  modeId: StudyModeId;
  modeTitle: string;
  categoryName?: string;
  currentIndex: number;
  totalItems: number;
  score: number;
  streak: number;
  timeRemaining?: number; // For Rapid-Fire countdown
  timeElapsed?: number; // For regular stopwatch
  soundEnabled: boolean;
  onToggleSound: () => void;
  onExit: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  modeTitle,
  categoryName,
  currentIndex,
  totalItems,
  score,
  streak,
  timeRemaining,
  timeElapsed,
  soundEnabled,
  onToggleSound,
  onExit,
  isBookmarked,
  onToggleBookmark,
}) => {
  const progressPercent = totalItems > 0 ? Math.round(((currentIndex + 1) / totalItems) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Back button & Mode Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition active:scale-95 cursor-pointer"
            title="Exit Session"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-amber-400 tracking-wide">
                {modeTitle}
              </span>
              {categoryName && (
                <span className="hidden md:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                  {categoryName}
                </span>
              )}
            </div>
            <div className="text-[11px] text-zinc-400 font-mono">
              Item <span className="text-zinc-200 font-bold">{Math.min(currentIndex + 1, totalItems)}</span> of{' '}
              <span>{totalItems}</span>
            </div>
          </div>
        </div>

        {/* Center: Timer / Score Stats */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
          {/* Score */}
          <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-xl">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-400 hidden xs:inline">Score:</span>
            <span className="font-bold text-zinc-100">{score}</span>
          </div>

          {/* Streak Flame */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border transition-all ${
              streak >= 3
                ? 'bg-amber-400/15 border-amber-400/40 text-amber-300 font-bold shadow-sm shadow-amber-400/10'
                : 'bg-zinc-900/90 border-zinc-800 text-zinc-400'
            }`}
            title={`Current streak: ${streak}`}
          >
            <Flame
              className={`w-3.5 h-3.5 ${
                streak >= 3 ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-zinc-500'
              }`}
            />
            <span className="font-bold">{streak}</span>
          </div>

          {/* Timer Display */}
          {timeRemaining !== undefined ? (
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border font-bold ${
                timeRemaining <= 10
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                  : 'bg-zinc-900/90 border-zinc-800 text-amber-300'
              }`}
              title="Time Remaining"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timeRemaining}s</span>
            </div>
          ) : timeElapsed !== undefined ? (
            <div className="hidden sm:flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-xl text-zinc-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          ) : null}
        </div>

        {/* Right: Sound & Bookmark Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {onToggleBookmark && (
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-400/20 border-amber-400/40 text-amber-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
              title={isBookmarked ? 'Remove from bookmarks' : 'Bookmark this item for review'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
          )}

          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition active:scale-95 cursor-pointer"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-600" />}
          </button>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="w-full bg-zinc-900 h-1 mt-2 rounded-full overflow-hidden">
        <div
          className="bg-amber-400 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
