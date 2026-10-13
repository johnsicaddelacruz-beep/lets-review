import React, { useState } from 'react';
import { Item, StudyModeId } from '../../types';
import { Storage } from '../../core/storage';
import { sound } from '../../core/sound';
import { ArrowLeft, Bookmark, Trash2, Play, Search, HelpCircle, Lock } from 'lucide-react';
import { toast } from '../ui/Toast';
import { LockBadge } from '../ui/LockBadge';

interface BookmarksViewProps {
  items: Item[];
  onBack: () => void;
  onStartWithItems: (items: Item[], mode: StudyModeId) => void;
  isPro?: boolean;
  onOpenUpgrade?: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  items,
  onBack,
  onStartWithItems,
  isPro = false,
  onOpenUpgrade,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedTerms, setBookmarkedTerms] = useState<string[]>(() => Storage.getBookmarks());

  const bookmarkedItems = items.filter((i) => bookmarkedTerms.includes(i.term));

  const filteredItems = bookmarkedItems.filter((i) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      i.term.toLowerCase().includes(q) ||
      i.definition.toLowerCase().includes(q) ||
      i.rationalization.toLowerCase().includes(q)
    );
  });

  const handleRemove = (term: string) => {
    sound.playClick();
    Storage.toggleBookmark(term);
    setBookmarkedTerms(Storage.getBookmarks());
    toast.info(`Removed "${term}" from bookmarks`);
  };

  const handlePractice = () => {
    if (bookmarkedItems.length === 0) return;
    sound.playClick();
    const hasOnlyProItems = !isPro && bookmarkedItems.every((i) => i.category === 'Majorship English' || i.isPro);
    if (hasOnlyProItems) {
      if (onOpenUpgrade) onOpenUpgrade();
      return;
    }
    onStartWithItems(bookmarkedItems, 'practiceTest');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Saved Review Items</span>
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-zinc-800 text-amber-300 border border-zinc-700">
                {bookmarkedItems.length}
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Tricky questions and key definitions marked for focused review.
            </p>
          </div>
        </div>

        {bookmarkedItems.length > 0 && (
          <button
            onClick={handlePractice}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs sm:text-sm font-bold shadow-md shadow-amber-400/20 transition active:scale-95 cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-zinc-950" />
            <span>Practice These ({bookmarkedItems.length})</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      {bookmarkedItems.length > 0 && (
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within saved items..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      )}

      {/* Bookmarks List */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-900/60 border border-zinc-800 text-zinc-400">
          <Bookmark className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-zinc-300 mb-1">
            {bookmarkedItems.length === 0 ? 'No Saved Items Yet' : 'No matching items'}
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {bookmarkedItems.length === 0
              ? 'Click the bookmark icon in the HUD or in Mnemonics/Cheat Sheet during any session to save items here for dedicated drilling.'
              : 'Try a different search query.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-lg flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-bold uppercase">
                    {item.category}
                  </span>
                  {(!isPro && (item.category === 'Majorship English' || item.isPro)) && (
                    <LockBadge isPro={isPro} label="PRO" size="sm" onClick={onOpenUpgrade} />
                  )}
                  <span className="text-xs text-zinc-400 font-mono">
                    {item.subtopic}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white">{item.term}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.definition}</p>

                <div className="text-[11px] text-zinc-400 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 flex items-start gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-400">Rationale: </strong>
                    {item.rationalization}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.term)}
                className="self-end sm:self-start p-2 rounded-xl bg-zinc-950 hover:bg-rose-950/40 border border-zinc-800 hover:border-rose-500/40 text-zinc-400 hover:text-rose-400 transition"
                title="Remove from saved items"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
