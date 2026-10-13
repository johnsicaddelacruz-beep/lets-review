import { Storage } from './storage';
import { DataLoader as TsDataLoader, checkProAccess as tsCheckProAccess } from './dataLoader.ts';

/**
 * Standard Subject Definitions with isPro boolean flags.
 * 'Majorship English' is marked with isPro: true.
 * 'General Education' and 'Professional Education' are free (isPro: false).
 */
export const subjects = [
  { name: 'General Education', label: 'General Education (100% Free)', isPro: false },
  { name: 'Professional Education', label: 'Professional Education (100% Free)', isPro: false },
  { name: 'Majorship English', label: 'Majorship English (₱99 Lifetime • Pro)', isPro: true },
];

/**
 * Standard Topic Definitions with isPro boolean flags.
 * Topics under 'Majorship English' have isPro: true.
 */
export const topics = [
  // General Education Topics (Free)
  { name: 'Rizal Law', category: 'General Education', isPro: false },
  { name: 'Purposive Communication', category: 'General Education', isPro: false },
  { name: 'Readings in Philippine History', category: 'General Education', isPro: false },
  { name: 'Ethics', category: 'General Education', isPro: false },
  { name: 'Mathematics in the Modern World', category: 'General Education', isPro: false },
  { name: 'Science, Technology, and Society', category: 'General Education', isPro: false },
  
  // Professional Education Topics (Free)
  { name: 'Philosophical Heritage', category: 'Professional Education', isPro: false },
  { name: 'Facilitating Learner-Centered Teaching', category: 'Professional Education', isPro: false },
  { name: 'Assessment of Learning', category: 'Professional Education', isPro: false },
  { name: 'The Teaching Profession', category: 'Professional Education', isPro: false },
  { name: 'Child and Adolescent Learners', category: 'Professional Education', isPro: false },
  { name: 'Curriculum Development', category: 'Professional Education', isPro: false },

  // Majorship English Topics (Pro - Paid ₱99)
  { name: 'Structure of English', category: 'Majorship English', isPro: true },
  { name: 'Syntax Patterns', category: 'Majorship English', isPro: true },
  { name: 'Morphology', category: 'Majorship English', isPro: true },
  { name: 'Literary Criticism', category: 'Majorship English', isPro: true },
  { name: 'Applied Linguistics', category: 'Majorship English', isPro: true },
];

/**
 * Standard Subtopic Definitions with isPro boolean flags.
 * Subtopics under 'Majorship English' have isPro: true.
 */
export const subtopics = [
  // General Education Subtopics (Free)
  { name: 'Historical Background & Mandate', topic: 'Rizal Law', category: 'General Education', isPro: false },
  { name: 'Key Provisions & Penalties', topic: 'Rizal Law', category: 'General Education', isPro: false },
  { name: 'Communication Processes & Models', topic: 'Purposive Communication', category: 'General Education', isPro: false },
  
  // Professional Education Subtopics (Free)
  { name: 'Classical Philosophies', topic: 'Philosophical Heritage', category: 'Professional Education', isPro: false },
  { name: 'Educational Philosophies', topic: 'Philosophical Heritage', category: 'Professional Education', isPro: false },
  { name: 'Cognitive & Constructivist Learning', topic: 'Facilitating Learner-Centered Teaching', category: 'Professional Education', isPro: false },
  
  // Majorship English Subtopics (Pro - Paid ₱99)
  { name: 'Basic Sentence Pattern', topic: 'Structure of English', category: 'Majorship English', isPro: true },
  { name: 'Grammatical Structures', topic: 'Structure of English', category: 'Majorship English', isPro: true },
  { name: 'Constituency & Phrase Structure', topic: 'Syntax Patterns', category: 'Majorship English', isPro: true },
];

/**
 * Helper function to validate whether content is accessible based on the user's isPro status.
 * Returns false for non-pro users accessing 'Majorship English' subjects, topics, or subtopics.
 * Returns true for free items ('General Education', 'Professional Education') or when the user has Pro access.
 *
 * @param {string} [subject] - Category/Subject name
 * @param {string} [topic] - Topic name
 * @param {string} [subtopic] - Subtopic name
 * @param {boolean} [userIsPro] - Optional override; if omitted, checks localStorage pro status
 * @returns {boolean} Whether access is allowed
 */
export function checkProAccess(subject, topic, subtopic, userIsPro) {
  // Validate against user's isPro status (checked from storage if not explicitly provided)
  const isPro = typeof userIsPro === 'boolean' ? userIsPro : Storage.getProStatus().isPro;
  if (isPro) return true;

  // Check if subject is Pro
  if (subject) {
    const isSubjectPro = subject === 'Majorship English' || subject.toLowerCase().includes('majorship');
    if (isSubjectPro) return false;
  }

  // Check if topic is Pro
  if (topic) {
    const topicEntry = topics.find((t) => t.name.toLowerCase() === topic.toLowerCase());
    if (topicEntry?.isPro) return false;

    const majorshipKeywords = ['structure of english', 'syntax', 'morphology', 'literary criticism', 'applied linguistics'];
    if (majorshipKeywords.some((k) => topic.toLowerCase().includes(k))) return false;
  }

  // Check if subtopic is Pro
  if (subtopic) {
    const subtopicEntry = subtopics.find((s) => s.name.toLowerCase() === subtopic.toLowerCase());
    if (subtopicEntry?.isPro) return false;

    const majorshipSubKeywords = ['basic sentence pattern', 'syntax pattern', 'grammatical structure'];
    if (majorshipSubKeywords.some((k) => subtopic.toLowerCase().includes(k))) return false;
  }

  // Free subjects (General Education, Professional Education)
  return true;
}

export const DataLoader = TsDataLoader;
export default DataLoader;
