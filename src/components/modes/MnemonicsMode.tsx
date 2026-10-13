import React, { useState } from 'react';
import { Item } from '../../types';
import { Sparkles, Eye, EyeOff, Brain, CheckCircle2, Bookmark, Search } from 'lucide-react';
import { Storage } from '../../core/storage';
import { sound } from '../../core/sound';

interface MnemonicsModeProps {
  items: Item[];
}

export const MnemonicsMode: React.FC<MnemonicsModeProps> = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());

  // Filter items that have a mnemonic object
  const mnemonicItems = items.filter((i) => i.mnemonic !== null);

  const filteredMnemonicItems = mnemonicItems.filter((i) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      i.term.toLowerCase().includes(q) ||
      i.mnemonic!.title.toLowerCase().includes(q) ||
      i.mnemonic!.phrase.toLowerCase().includes(q) ||
      i.mnemonic!.items.some((bullet) => bullet.toLowerCase().includes(q))
    );
  });

  const toggleHide = (term: string) => {
    sound.playClick();
    const next = new Set(hiddenItems);
    if (next.has(term)) {
      next.delete(term);
    } else {
      next.add(term);
    }
    setHiddenItems(next);
  };

  const handleBookmark = (term: string) => {
    sound.playClick();
    Storage.toggleBookmark(term);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
              <Brain className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              LET Memory Mnemonics & Acronyms
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            Memorize high-yield Philippine Board Exam facts effortlessly with proven mental shortcuts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mnemonics..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      </div>

      {/* Grid of Mnemonics */}
      {filteredMnemonicItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 text-sm">
          No mnemonics found matching "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMnemonicItems.map((item, index) => {
            const m = item.mnemonic!;
            const isHidden = hiddenItems.has(item.term);
            const isBookmarked = Storage.isBookmarked(item.term);

            return (
              <div
                key={index}
                className="rounded-3xl bg-zinc-900/95 border border-zinc-800 p-6 shadow-xl flex flex-col justify-between hover:border-amber-400/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-bold">
                      {m.title}
                    </span>

                    <button
                      onClick={() => handleBookmark(item.term)}
                      className={`p-1.5 rounded-lg border transition ${
                        isBookmarked
                          ? 'bg-amber-400/20 border-amber-400/40 text-amber-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white'
                      }`}
                      title="Bookmark mnemonic"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2">
                    {item.term}
                  </h3>

                  {/* Catchy Mnemonic Phrase */}
                  <div className="bg-gradient-to-r from-amber-500/20 to-amber-400/10 border border-amber-400/40 rounded-2xl p-4 mb-4">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Memory Formula</span>
                    </div>
                    <p className="text-base font-extrabold text-amber-200 tracking-wide">
                      "{m.phrase}"
                    </p>
                  </div>

                  {/* Bullet breakdown items */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-zinc-400">
                        Concept Associations
                      </span>
                      <button
                        onClick={() => toggleHide(item.term)}
                        className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-amber-400 font-medium transition cursor-pointer"
                      >
                        {isHidden ? (
                          <>
                            <Eye className="w-3 h-3" /> <span>Reveal Items</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> <span>Test Recall</span>
                          </>
                        )}
                      </button>
                    </div>

                    {isHidden ? (
                      <div
                        onClick={() => toggleHide(item.term)}
                        className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-center text-xs text-zinc-500 italic cursor-pointer hover:border-zinc-700"
                      >
                        [Items masked for active recall test. Click to reveal]
                      </div>
                    ) : (
                      <ul className="space-y-1.5">
                        {m.items.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2 text-xs text-zinc-200 bg-zinc-950/60 px-3 py-2 rounded-xl border border-zinc-800/60"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>{item.category} &bull; {item.subtopic}</span>
                  <span className="text-amber-400 font-mono">{item.difficulty}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
