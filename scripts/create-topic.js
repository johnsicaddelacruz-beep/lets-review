import fs from 'node:fs';
import path from 'node:path';

/**
 * LET Reviewer — Topic JSON Maker Tool
 *
 * Usage:
 *   node scripts/create-topic.js "General Education" "Science and Technology" "medium"
 *   node scripts/create-topic.js "Professional Education" "Curriculum Development" "medium"
 *   node scripts/create-topic.js "Majorship English" "Linguistics" "hard"
 *
 * Or with an optional distinct subtopic:
 *   node scripts/create-topic.js "General Education" "Science" "Cell Biology" "easy"
 *
 * If run with no arguments:
 *   node scripts/create-topic.js
 *   Creates a sample topic file and registers it in topics.json.
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
  
  // If 4 arguments are provided, 3rd is subtopic and 4th is difficulty
  // If 3 arguments or fewer, 3rd is difficulty (or defaults to medium)
  let subtopic = topic;
  let difficulty = 'medium';

  if (args.length >= 4) {
    subtopic = args[2] || topic;
    difficulty = args[3] || 'medium';
  } else if (args.length === 3) {
    const diffArg = args[2].toLowerCase();
    if (['easy', 'medium', 'hard', 'advanced'].includes(diffArg)) {
      difficulty = diffArg === 'hard' ? 'advanced' : diffArg;
    } else {
      subtopic = args[2];
    }
  }

  const catFolder = getCategoryFolder(category);
  const topicFolder = sanitizeSlug(topic);
  const fileName = `${topicFolder}.json`;

  // Standard path: data/<subject>/<topic>/<topic>.json
  const relativeDataDir = path.join('data', catFolder, topicFolder);
  const relativePublicDir = path.join('public', 'data', catFolder, topicFolder);

  const targetPath = path.resolve(relativeDataDir, fileName);
  const publicPath = path.resolve(relativePublicDir, fileName);

  // Template Dataset Structure
  const templateDataset = {
    category: category,
    topic: topic,
    subtopic: subtopic,
    difficulty: difficulty === 'hard' ? 'advanced' : difficulty,
    items: [
      {
        term: "Sample LET Board Exam Question / Concept 1",
        definition: "The exact correct answer or concise concept definition.",
        rationalization: "Comprehensive rationalization explaining why this is the correct answer according to the PRC BLEPT Table of Specifications, and why other distractors are incorrect.",
        mnemonic: {
          title: "Memory Formula Title (Optional)",
          phrase: "Short memorable phrase or acronym (e.g. SMART, PEMDAS)",
          items: [
            "S - Specific",
            "M - Measurable",
            "A - Attainable"
          ]
        },
        source: "PRC BLEPT Board Exam Reviewer",
        tosCompetency: "PRC Competency Indicator (Optional)",
        bloomsTaxonomy: "Understanding",
        highYield: true
      },
      {
        term: "Sample LET Board Exam Question / Concept 2",
        definition: "The exact correct answer or concise concept definition.",
        rationalization: "Comprehensive rationalization and analysis of key principles for this item.",
        mnemonic: null,
        source: "PRC BLEPT Board Exam Reviewer",
        tosCompetency: "Analyze and evaluate classroom teaching principles",
        bloomsTaxonomy: "Applying",
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

  console.log('✅ Topic JSON successfully created:');
  console.log(`   - ${relativeDataDir}/${fileName}`);
  console.log(`   - ${relativePublicDir}/${fileName}`);

  // Register in topics.json and public/topics.json
  const registryRelativePath = path.join('data', catFolder, topicFolder, fileName).replace(/\\/g, '/');

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

  console.log('\n🎉 Done! The new topic is now loaded into the LET Reviewer.');
}

main();
