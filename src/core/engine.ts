import { Item } from '../types';
import { shuffle } from './utils';

export interface MCQQuestion {
  id: string;
  item: Item;
  prompt: string;
  options: string[];
  correctAnswer: string;
  rationalization: string;
}

export interface FactOrBluffQuestion {
  id: string;
  item: Item;
  statement: string;
  isFact: boolean;
  rationalization: string;
}

export interface MixMatchSet {
  id: string;
  terms: { id: string; text: string }[];
  definitions: { id: string; text: string }[];
  pairs: Map<string, string>; // termId -> definitionId
}

export interface CompleteWordQuestion {
  id: string;
  item: Item;
  clue: string;
  word: string;
  maskedWord: string;
  rationalization: string;
}

export const Engine = {
  buildPracticeTest(items: Item[], allItems: Item[]): MCQQuestion[] {
    return items.map((item, idx) => {
      // Pick 3 distractors
      const pool = allItems.filter((i) => i.term !== item.term);
      const sameCategoryPool = pool.filter((i) => i.category === item.category);
      const distractorPool = sameCategoryPool.length >= 3 ? sameCategoryPool : pool;
      const shuffledDistractors = shuffle(distractorPool).slice(0, 3);

      const options = shuffle([item.term, ...shuffledDistractors.map((d) => d.term)]);

      return {
        id: `mcq-${idx}-${item.term}`,
        item,
        prompt: item.definition,
        options,
        correctAnswer: item.term,
        rationalization: item.rationalization,
      };
    });
  },

  buildFactOrBluff(items: Item[], allItems: Item[]): FactOrBluffQuestion[] {
    return items.map((item, idx) => {
      // 50% true, 50% bluff
      const isFact = Math.random() >= 0.5;

      if (isFact) {
        return {
          id: `fob-${idx}`,
          item,
          statement: `True fact about ${item.term}: ${item.definition}`,
          isFact: true,
          rationalization: item.rationalization,
        };
      } else {
        // Bluff: substitute with definition from another item
        const otherItems = allItems.filter((i) => i.term !== item.term);
        const randomOther = otherItems[Math.floor(Math.random() * otherItems.length)];
        return {
          id: `fob-${idx}`,
          item,
          statement: `${item.term} refers to: ${randomOther ? randomOther.definition : 'an unrelated educational statute.'}`,
          isFact: false,
          rationalization: `BLUFF! That describes "${randomOther?.term || 'another concept'}". ${item.term} actually refers to: ${item.definition}. ${item.rationalization}`,
        };
      }
    });
  },

  buildMixMatch(items: Item[]): MixMatchSet[] {
    const shuffledItems = shuffle(items);
    const sets: MixMatchSet[] = [];
    const chunkSize = 5;

    for (let i = 0; i < shuffledItems.length; i += chunkSize) {
      const chunk = shuffledItems.slice(i, i + chunkSize);
      if (chunk.length < 3) continue; // Skip tiny remainder

      const pairs = new Map<string, string>();
      const terms: { id: string; text: string }[] = [];
      const definitions: { id: string; text: string }[] = [];

      chunk.forEach((item, index) => {
        const id = `item-${i + index}`;
        pairs.set(id, id);
        terms.push({ id, text: item.term });
        definitions.push({ id, text: item.definition });
      });

      sets.push({
        id: `set-${Math.floor(i / chunkSize)}`,
        terms: shuffle(terms),
        definitions: shuffle(definitions),
        pairs,
      });
    }

    return sets;
  },

  buildCompleteWord(items: Item[]): CompleteWordQuestion[] {
    return items.map((item, idx) => {
      const cleanWord = item.term.toUpperCase();
      // Mask consonants or non-space characters
      let revealedCount = 0;
      const letters = cleanWord.split('');

      // Reveal ~20% letters
      const totalChars = letters.filter((c) => /[A-Z0-9]/.test(c)).length;
      const revealTarget = Math.max(1, Math.floor(totalChars * 0.25));

      const maskIndices = new Set<number>();
      for (let i = 0; i < letters.length; i++) {
        if (/[A-Z0-9]/.test(letters[i])) {
          maskIndices.add(i);
        }
      }

      // Pick random indices to reveal
      const revealedIndices = new Set<number>();
      const indicesArr = Array.from(maskIndices);
      const shuffledIndices = shuffle(indicesArr);
      for (let r = 0; r < revealTarget && r < shuffledIndices.length; r++) {
        revealedIndices.add(shuffledIndices[r]);
      }

      const masked = letters
        .map((char, index) => {
          if (!/[A-Z0-9]/.test(char)) return char;
          if (revealedIndices.has(index)) return char;
          return '_';
        })
        .join('');

      return {
        id: `cw-${idx}`,
        item,
        clue: item.definition,
        word: cleanWord,
        maskedWord: masked,
        rationalization: item.rationalization,
      };
    });
  },
};
