import { Item, Category, Difficulty, BloomsTaxonomy, SubjectMeta, TopicMeta, SubtopicMeta } from '../types';
import { Storage } from './storage';

interface RawItem {
  term: string;
  definition: string;
  rationalization: string;
  mnemonic: {
    title: string;
    phrase: string;
    items: string[];
  } | null;
  source?: string;
  tosCompetency?: string;
  tos_competency?: string;
  bloomsTaxonomy?: BloomsTaxonomy;
  blooms?: BloomsTaxonomy;
  highYield?: boolean;
  high_yield?: boolean;
}

interface RawDataset {
  category: string;
  topic: string;
  subtopic: string;
  difficulty: string;
  items: RawItem[];
}

function normalizeDataset(dataset: RawDataset): Item[] {
  if (!dataset || !Array.isArray(dataset.items)) return [];
  const isMajorship = dataset.category === 'Majorship English' || Boolean(dataset.category?.toLowerCase().includes('majorship'));
  return dataset.items.map((item) => ({
    term: item.term,
    definition: item.definition,
    rationalization: item.rationalization,
    mnemonic: item.mnemonic || null,
    category: dataset.category as Category,
    topic: dataset.topic,
    subtopic: dataset.subtopic || dataset.topic,
    difficulty: (dataset.difficulty || 'medium') as Difficulty,
    isPro: isMajorship,
    source: item.source || undefined,
    tosCompetency: item.tosCompetency || item.tos_competency || undefined,
    bloomsTaxonomy: (item.bloomsTaxonomy || item.blooms) || undefined,
    highYield: typeof item.highYield === 'boolean' ? item.highYield : (typeof item.high_yield === 'boolean' ? item.high_yield : undefined),
  }));
}

// Automatically discovers any JSON file added anywhere inside /data/**/*.json
const jsonModules = import.meta.glob<{ default: RawDataset }>('../../data/**/*.json', { eager: true });

const bundledItems: Item[] = [];
for (const path in jsonModules) {
  const mod = jsonModules[path];
  const data = (mod && mod.default ? mod.default : mod) as unknown as RawDataset;
  if (data && data.items) {
    bundledItems.push(...normalizeDataset(data));
  }
}

// Custom user-loaded items in session (from UI import if added)
const userAddedItems: Item[] = [];

/**
 * Helper function to verify if a user has access to a given subject, topic, and subtopic.
 * Returns false for non-pro users accessing 'Majorship English' subjects, topics, or subtopics.
 * Returns true for free items ('General Education', 'Professional Education') or when the user is Pro.
 */
export function checkProAccess(
  subject?: string | null,
  topic?: string | null,
  subtopic?: string | null,
  userIsPro?: boolean
): boolean {
  // If userIsPro boolean is explicitly provided, use it; otherwise check storage status
  const isPro = typeof userIsPro === 'boolean' ? userIsPro : Storage.getProStatus().isPro;
  if (isPro) return true;

  // Non-pro users: check if any part of the requested content belongs to Pro (Majorship English)
  if (subject && DataLoader.isCategoryPro(subject)) {
    return false;
  }
  if (topic && DataLoader.isTopicPro(topic, subject)) {
    return false;
  }
  if (subtopic && DataLoader.isSubtopicPro(subtopic, topic)) {
    return false;
  }

  return true;
}

export const DataLoader = {
  getAllItems(): Item[] {
    return [...bundledItems, ...userAddedItems];
  },

  getCategories(): Category[] {
    const all = this.getAllItems();
    const set = new Set(all.map((i) => i.category));
    const defaults: Category[] = ['General Education', 'Professional Education', 'Majorship English'];
    defaults.forEach((c) => set.add(c));
    return Array.from(set);
  },

  /**
   * Returns subjects with explicit isPro flag.
   * 'Majorship English' is marked as isPro: true.
   * 'General Education' and 'Professional Education' are free (isPro: false).
   */
  getSubjectsWithPro(): SubjectMeta[] {
    const all = this.getAllItems();
    const categories = this.getCategories();

    return categories.map((cat) => {
      const isPro = this.isCategoryPro(cat);
      const count = all.filter((i) => i.category === cat).length;
      const label = cat === 'Majorship English' 
        ? 'Majorship English (₱99 Lifetime • Pro)' 
        : `${cat} (100% Free)`;

      return {
        name: cat,
        label,
        isPro,
        itemCount: count,
      };
    });
  },

  getTopics(category?: Category): string[] {
    const all = this.getAllItems();
    const items = category ? all.filter((i) => i.category === category) : all;
    return Array.from(new Set(items.map((i) => i.topic)));
  },

  /**
   * Returns topics with explicit isPro flag.
   * Topics under 'Majorship English' have isPro: true.
   * Topics under 'General Education' or 'Professional Education' have isPro: false.
   */
  getTopicsWithPro(category?: Category): TopicMeta[] {
    const all = this.getAllItems();
    const topics = this.getTopics(category);

    return topics.map((topicName) => {
      const sampleItem = all.find((i) => i.topic === topicName);
      const itemCategory = category || (sampleItem?.category as Category) || 'General Education';
      const isPro = this.isTopicPro(topicName, itemCategory);
      const count = all.filter((i) => i.topic === topicName).length;

      return {
        name: topicName,
        category: itemCategory,
        isPro,
        itemCount: count,
      };
    });
  },

  getSubtopics(topic?: string): string[] {
    const all = this.getAllItems();
    const items = topic ? all.filter((i) => i.topic === topic) : all;
    return Array.from(new Set(items.map((i) => i.subtopic)));
  },

  /**
   * Returns subtopics with explicit isPro flag.
   * Subtopics belonging to 'Majorship English' have isPro: true.
   */
  getSubtopicsWithPro(topic?: string): SubtopicMeta[] {
    const all = this.getAllItems();
    const subtopics = this.getSubtopics(topic);

    return subtopics.map((subtopicName) => {
      const sampleItem = all.find((i) => i.subtopic === subtopicName);
      const itemCategory = (sampleItem?.category as Category) || 'General Education';
      const itemTopic = topic || sampleItem?.topic || '';
      const isPro = this.isSubtopicPro(subtopicName, itemTopic);
      const count = all.filter((i) => i.subtopic === subtopicName).length;

      return {
        name: subtopicName,
        topic: itemTopic,
        category: itemCategory,
        isPro,
        itemCount: count,
      };
    });
  },

  filterItems(params: {
    category?: Category | 'all';
    topic?: string | 'all';
    subtopic?: string | 'all';
    difficulty?: Difficulty | 'all';
  }): Item[] {
    const all = this.getAllItems();
    return all.filter((item) => {
      if (params.category && params.category !== 'all' && item.category !== params.category) {
        return false;
      }
      if (params.topic && params.topic !== 'all' && item.topic !== params.topic) {
        return false;
      }
      if (params.subtopic && params.subtopic !== 'all' && item.subtopic !== params.subtopic) {
        return false;
      }
      if (params.difficulty && params.difficulty !== 'all' && item.difficulty !== params.difficulty) {
        return false;
      }
      return true;
    });
  },

  getItemByTerm(term: string): Item | undefined {
    return this.getAllItems().find((i) => i.term.toLowerCase() === term.toLowerCase());
  },

  isDifficultyPro(_difficulty: Difficulty | 'all'): boolean {
    // Free tier includes all difficulties for General Education and Professional Education
    return false;
  },

  isCategoryPro(category?: Category | string | 'all' | null): boolean {
    if (!category || category === 'all') return false;
    return category === 'Majorship English' || category.toLowerCase().includes('majorship');
  },

  isTopicPro(topic?: string | 'all' | null, category?: Category | string | 'all' | null): boolean {
    if (!topic || topic === 'all') return false;
    if (category && this.isCategoryPro(category)) return true;
    const items = this.getAllItems().filter((i) => i.topic.toLowerCase() === topic.toLowerCase());
    if (items.length > 0) {
      return items.some((i) => this.isCategoryPro(i.category) || i.isPro === true);
    }
    const majorshipTopics = ['structure of english', 'syntax patterns', 'morphology', 'literary criticism', 'applied linguistics'];
    return majorshipTopics.some((mt) => topic.toLowerCase().includes(mt));
  },

  isSubtopicPro(subtopic?: string | 'all' | null, topic?: string | 'all' | null): boolean {
    if (!subtopic || subtopic === 'all') return false;
    if (topic && this.isTopicPro(topic)) return true;
    const items = this.getAllItems().filter((i) => i.subtopic.toLowerCase() === subtopic.toLowerCase());
    if (items.length > 0) {
      return items.some((i) => this.isCategoryPro(i.category) || i.isPro === true);
    }
    const majorshipSubtopics = ['basic sentence pattern', 'syntax patterns', 'grammatical structures'];
    return majorshipSubtopics.some((ms) => subtopic.toLowerCase().includes(ms));
  },

  isItemPro(item: Item): boolean {
    return Boolean(item.isPro || this.isCategoryPro(item.category));
  },

  isSelectionLocked(params: {
    category?: Category | string | 'all' | null;
    topic?: string | 'all' | null;
    subtopic?: string | 'all' | null;
  }): boolean {
    if (params.category && this.isCategoryPro(params.category)) return true;
    if (params.topic && this.isTopicPro(params.topic, params.category)) return true;
    if (params.subtopic && this.isSubtopicPro(params.subtopic, params.topic)) return true;
    return false;
  },

  checkProAccess(
    subject?: string | null,
    topic?: string | null,
    subtopic?: string | null,
    userIsPro: boolean = false
  ): boolean {
    return checkProAccess(subject, topic, subtopic, userIsPro);
  },

  getTopicDifficulty(topic: string): Difficulty {
    const items = this.getAllItems().filter((i) => i.topic === topic);
    if (items.some((i) => i.difficulty === 'advanced')) return 'advanced';
    if (items.some((i) => i.difficulty === 'medium')) return 'medium';
    return 'easy';
  },

  getSubtopicDifficulty(subtopic: string): Difficulty {
    const items = this.getAllItems().filter((i) => i.subtopic === subtopic);
    if (items.some((i) => i.difficulty === 'advanced')) return 'advanced';
    if (items.some((i) => i.difficulty === 'medium')) return 'medium';
    return 'easy';
  },

  /**
   * Allows adding items dynamically at runtime
   */
  addCustomDataset(dataset: RawDataset): number {
    const normalized = normalizeDataset(dataset);
    userAddedItems.push(...normalized);
    return normalized.length;
  },
};
