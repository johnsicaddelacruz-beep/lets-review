import fs from 'node:fs';
import path from 'node:path';

/**
 * LET Reviewer — Topic & Subtopic JSON Maker Tool
 * 
 * Usage:
 *   node scripts/create-topic.js "General Education" "Science" "Cell Biology" "easy"
 *   node scripts/create-topic.js "Professional Education" "Child Development" "Piaget Stages" "medium"
 *   node scripts/create-topic.js "Majorship English" "Linguistics" "Phonetics" "hard"
 * 
 * If run without arguments, it generates a sample template ready to edit!
 */

function sanitizeSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
}

function getCategoryFolder(category) {
  const cat = category.toLowerCase();
  if (cat.includes('gened') || cat.includes('general')) return 'gened';
  if (cat.includes('profed') || cat.includes('professional')) return 'profed';
  if (cat.includes('major') || cat.includes('english')) return 'english_majorship';
  return sanitizeSlug(category);
}

function main() {
  const args = process.argv.slice(2);
  
  const category = args[0] || 'General Education';
  const topic = args[1] || 'Sample Topic';
  const subtopic = args[2] || 'Sample Subtopic';
  const difficulty = args[3] || 'medium';

  const catFolder = getCategoryFolder(category);
  const topicFolder = sanitizeSlug(topic);
  const subtopicFolder = sanitizeSlug(subtopic);
  const fileName = `${subtopicFolder}.json`;

  const relativeDataDir = path.join('data', catFolder, topicFolder, subtopicFolder);
  const relativePublicDir = path.join('public', 'data', catFolder, topicFolder, subtopicFolder);

  const targetPath = path.resolve(relativeDataDir, fileName);
  const publicPath = path.resolve(relativePublicDir, fileName);

  // Template Dataset Structure
  const templateDataset = {
    category: category,
    topic: topic,
    subtopic: subtopic,
    difficulty: difficulty,
    items: [
      {
        term: "Sample Question / Key Term Here",
        definition: "The exact correct answer or concise concept definition.",
        rationalization: "Detailed explanation of why this answer is correct according to the PRC Board Exam curriculum.",
        mnemonic: {
          title: "Memory Formula Title",
          phrase: "Short memorable phrase or acronym",
          items: [
            "A - First letter clue",
            "B - Second letter clue"
          ]
        },
        tosCompetency: "PRC Table of Specifications Competency (Optional)",
        bloomsTaxonomy: "Remembering",
        highYield: true
      },
      {
        term: "Second Concept or Board Exam Question",
        definition: "Clear definition or answer for the PRC LET exam.",
        rationalization: "Rationalization and key points of comparison with distractors.",
        mnemonic: null,
        tosCompetency: "Analyze and evaluate teaching principles",
        bloomsTaxonomy: "Understanding",
        highYield: false
      }
    ]
  };

  // Ensure directories exist
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.mkdirSync(path.dirname(publicPath), { recursive: true });

  // Write formatted JSON
  const jsonContent = JSON.stringify(templateDataset, null, 2);
  fs.writeFileSync(targetPath, jsonContent, 'utf-8');
  fs.writeFileSync(publicPath, jsonContent, 'utf-8');

  console.log('✅ Topic JSON successfully created at:');
  console.log(`   - ${relativeDataDir}/${fileName}`);
  console.log(`   - ${relativePublicDir}/${fileName}`);

  // Register in topics.json and public/topics.json
  const registryRelativePath = path.join('data', catFolder, topicFolder, subtopicFolder, fileName).replace(/\\/g, '/');
  
  ['topics.json', 'public/topics.json'].forEach((regPath) => {
    const fullReg = path.resolve(regPath);
    if (fs.existsSync(fullReg)) {
      try {
        const regData = JSON.parse(fs.readFileSync(fullReg, 'utf-8'));
        if (Array.isArray(regData.files) && !regData.files.includes(registryRelativePath)) {
          regData.files.push(registryRelativePath);
          fs.writeFileSync(fullReg, JSON.stringify(regData, null, 2), 'utf-8');
          console.log(`✅ Registered in ${regPath}`);
        }
      } catch (err) {
        console.warn(`Could not update ${regPath}:`, err.message);
      }
    }
  });

  console.log('\n🎉 Ready! Run "npm run build" to compile and include in the reviewer app.');
}

main();
