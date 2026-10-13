import React, { useState } from 'react';
import { Item } from '../../types';
import { Search, Volume2, Copy, Check, Printer, Sparkles, Filter, BookOpen } from 'lucide-react';
import { toast } from '../ui/Toast';
import { sound } from '../../core/sound';
import { LockBadge } from '../ui/LockBadge';

interface CheatSheetModeProps {
  items: Item[];
  isPro?: boolean;
  onOpenUpgrade?: () => void;
}

export const CheatSheetMode: React.FC<CheatSheetModeProps> = ({ 
  items,
  isPro = false,
  onOpenUpgrade,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const categories = ['all', 'General Education', 'Professional Education', 'Majorship English'];

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.rationalization.toLowerCase().includes(q) ||
      item.topic.toLowerCase().includes(q) ||
      item.subtopic.toLowerCase().includes(q)
    );
  });

  const handleCopy = (item: Item) => {
    sound.playClick();
    const text = `${item.term}\nMeaning: ${item.definition}\nRationale: ${item.rationalization}`;
    navigator.clipboard.writeText(text);
    setCopiedTerm(item.term);
    toast.success(`Copied "${item.term}" to clipboard`);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  const handleSpeak = (text: string) => {
    sound.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.info('Speech synthesis not supported on this browser.');
    }
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>High-Yield LET Cheat Sheet</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              {filteredItems.length} items
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Quick reference tables and key points for Philippine Licensure Exam for Teachers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-semibold transition active:scale-95 cursor-pointer"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Control */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, laws, philosophies, sentence rules..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <select
            value={selectedCategory}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'Majorship English' && !isPro) {
                if (onOpenUpgrade) onOpenUpgrade();
                return;
              }
              setSelectedCategory(val);
            }}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-9 pr-8 py-2.5 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-400 transition appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all'
                  ? 'All 3 Categories'
                  : cat === 'Majorship English'
                  ? `Majorship English ${!isPro ? '(₱99 Pro Locked)' : ''}`
                  : `${cat} (Free)`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Column Responsive Card/Table Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 text-sm">
          No terms matched your search "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, index) => {
            const isCopied = copiedTerm === item.term;
            const isItemLocked = !isPro && (item.category === 'Majorship English' || item.isPro);

            return (
              <div
                key={index}
                className="rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 shadow-lg flex flex-col justify-between hover:border-zinc-700 transition"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-950 text-amber-400 border border-zinc-800">
                        {item.subtopic}
                      </span>
                      {isItemLocked && (
                        <LockBadge isPro={isPro} label="PRO" size="sm" onClick={onOpenUpgrade} />
                      )}
                      {item.highYield && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                          ⭐ High Yield
                        </span>
                      )}
                      {item.bloomsTaxonomy && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/20">
                          {item.bloomsTaxonomy}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {item.difficulty}
                    </span>
                  </div>

                  {item.tosCompetency && (
                    <div className="text-[10px] font-mono text-indigo-300 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-400/20 mb-2">
                      <span className="text-indigo-400 font-bold">TOS: </span>{item.tosCompetency}
                    </div>
                  )}

                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {item.term}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                    {item.definition}
                  </p>

                  <div className="text-[11px] text-zinc-400 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80 mb-3">
                    <strong className="text-amber-400">LET Rationale: </strong>
                    {item.rationalization}
                    {item.source && (
                      <div className="mt-2 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-400 flex items-start gap-1.5">
                        <BookOpen className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                        <span><strong className="text-zinc-300">Verified Source:</strong> {item.source}</span>
                      </div>
                    )}
                  </div>

                  {item.mnemonic && (
                    <div className="text-[11px] text-amber-300/90 bg-amber-400/10 p-2.5 rounded-xl border border-amber-400/20 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                      <span>Mnemonic: "{item.mnemonic.phrase}"</span>
                    </div>
                  )}
                </div>

                {/* Footer Utility Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs">
                  <span className="text-[10px] text-zinc-500">{item.category}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSpeak(`${item.term}. ${item.definition}`)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
                      title="Listen aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleCopy(item)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition"
                      title="Copy item definition"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
