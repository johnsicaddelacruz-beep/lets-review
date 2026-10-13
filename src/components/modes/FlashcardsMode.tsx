import React, { useState } from 'react';
import { Item, SessionStats } from '../../types';
import { sound } from '../../core/sound';
import { Storage } from '../../core/storage';
import { shuffle } from '../../core/utils';
import { Rotate3d, CheckCircle2, Bookmark, ArrowLeft, ArrowRight, Shuffle, Sparkles, BookOpen } from 'lucide-react';

interface FlashcardsModeProps {
  items: Item[];
  onFinish: (stats: SessionStats) => void;
  onUpdateHUD: (data: { currentIndex: number; score: number; streak: number }) => void;
}

export const FlashcardsMode: React.FC<FlashcardsModeProps> = ({
  items: initialItems,
  onFinish,
  onUpdateHUD,
}) => {
  const [deck, setDeck] = useState<Item[]>(initialItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const [reviewLaterCount, setReviewLaterCount] = useState(0);
  const [startTime] = useState<number>(Date.now());

  const currentItem = deck[currentIndex];

  const handleFlip = () => {
    sound.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playCorrect();
    Storage.toggleMastered(currentItem.term);
    setMasteredCount((c) => c + 1);
    handleNext();
  };

  const handleReviewLater = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setReviewLaterCount((c) => c + 1);
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((prev) => prev + 1);
      onUpdateHUD({
        currentIndex: currentIndex + 1,
        score: masteredCount + 1,
        streak: masteredCount + 1,
      });
    } else {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      onFinish({
        modeId: 'flashcards',
        totalQuestions: deck.length,
        correctCount: masteredCount,
        wrongCount: reviewLaterCount,
        maxStreak: masteredCount,
        timeSpentSeconds: timeSpent,
        records: deck.map((item) => ({
          item,
          userAnswer: 'Reviewed',
          correctAnswer: item.definition,
          isCorrect: Storage.isMastered(item.term),
          rationalization: item.rationalization,
        })),
      });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleShuffleDeck = () => {
    sound.playClick();
    setIsFlipped(false);
    setDeck(shuffle(deck));
    setCurrentIndex(0);
  };

  if (!currentItem) {
    return <div className="text-center p-8 text-zinc-400">No cards in deck.</div>;
  }

  const isItemMastered = Storage.isMastered(currentItem.term);

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4">
      {/* Deck Controls Header */}
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-4 font-mono">
        <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 font-semibold">
          {currentItem.category} &bull; {currentItem.subtopic}
        </span>

        <button
          onClick={handleShuffleDeck}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition active:scale-95 cursor-pointer"
          title="Shuffle card order"
        >
          <Shuffle className="w-3.5 h-3.5 text-amber-400" />
          <span>Shuffle Deck</span>
        </button>
      </div>

      {/* 3D Interactive Flip Card Container */}
      <div
        className="w-full min-h-[380px] sm:min-h-[420px] perspective-1000 cursor-pointer select-none mb-6"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full min-h-[380px] sm:min-h-[420px] transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-400 border border-zinc-800">
                  {currentItem.difficulty}
                </span>
                {currentItem.highYield && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    ⭐ High Yield
                  </span>
                )}
                {currentItem.bloomsTaxonomy && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-400/10 text-sky-300 border border-sky-400/20">
                    {currentItem.bloomsTaxonomy}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1 text-[11px] text-amber-400/80 font-medium">
                <Rotate3d className="w-3.5 h-3.5" />
                Tap to Flip
              </span>
            </div>

            <div className="text-center my-auto py-4">
              <div className="inline-block p-3 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mb-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                {currentItem.term}
              </h2>
              <p className="text-xs text-zinc-400 mt-2">
                What does this concept signify in the Philippine LET examination?
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-3 border-t border-zinc-800/80">
              <span>Card {currentIndex + 1} of {deck.length}</span>
              {isItemMastered && (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
                </span>
              )}
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-zinc-900 border border-amber-400/40 p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Answer & Rationalization
                </span>
                <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Rotate3d className="w-3.5 h-3.5" />
                  Flip Back
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-2">{currentItem.term}</h3>

              {currentItem.tosCompetency && (
                <div className="text-[10px] font-mono text-indigo-300 bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-400/20 mb-2">
                  <span className="text-indigo-400 font-bold">TOS: </span>{currentItem.tosCompetency}
                </div>
              )}

              <div className="bg-zinc-950/70 p-3.5 rounded-2xl border border-zinc-800/80 text-xs sm:text-sm text-zinc-200 leading-relaxed mb-3">
                {currentItem.definition}
              </div>

              <div className="bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/60 text-xs text-zinc-400 leading-relaxed mb-3">
                <strong className="text-amber-400">Board Exam Rationale: </strong>
                {currentItem.rationalization}
                {currentItem.source && (
                  <div className="mt-2 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 flex items-start gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-300">Verified Source:</strong> {currentItem.source}</span>
                  </div>
                )}
              </div>

              {currentItem.mnemonic && (
                <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-2.5 text-xs">
                  <div className="flex items-center gap-1 text-amber-300 font-bold mb-0.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Memory Aid: {currentItem.mnemonic.title}</span>
                  </div>
                  <p className="text-zinc-200 italic">"{currentItem.mnemonic.phrase}"</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex justify-between items-center">
              <span>Card {currentIndex + 1} of {deck.length}</span>
              <span className="text-amber-400">Click buttons below to rate recall</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Rating Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={handleReviewLater}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer"
        >
          <Bookmark className="w-4 h-4 text-orange-400" />
          <span>Review Later</span>
        </button>

        <button
          onClick={handleMastered}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold transition active:scale-95 cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Mastered</span>
        </button>
      </div>

      {/* Prev / Next Bottom Nav */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        <span className="text-zinc-500 font-mono">
          {currentIndex + 1} / {deck.length}
        </span>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
        >
          <span>{currentIndex + 1 < deck.length ? 'Next' : 'Finish'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
