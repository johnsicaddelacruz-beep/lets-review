import fs from 'node:fs';
import path from 'node:path';
import JSZip from 'jszip';

async function zipDirectory(sourceDir, zipInstance, rootPrefix = '') {
  const items = fs.readdirSync(sourceDir);
  for (const item of items) {
    const fullPath = path.join(sourceDir, item);
    const stat = fs.statSync(fullPath);
    const zipPath = rootPrefix ? `${rootPrefix}/${item}` : item;

    if (stat.isDirectory()) {
      await zipDirectory(fullPath, zipInstance, zipPath);
    } else {
      const content = fs.readFileSync(fullPath);
      zipInstance.file(zipPath, content);
    }
  }
}

async function main() {
  console.log('Generating Deployable GitHub Pages ZIP...');

  // 1. Package the built 'dist' folder for direct GitHub Pages deployment
  const distDir = path.resolve('dist');
  if (fs.existsSync(distDir)) {
    const pagesZip = new JSZip();
    await zipDirectory(distDir, pagesZip);

    const pagesZipBuffer = await pagesZip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });

    const rootZipPath = path.resolve('lets-review-github-pages.zip');
    const publicZipPath = path.resolve('public/lets-review-github-pages.zip');
    const distZipPath = path.resolve('dist/lets-review-github-pages.zip');

    fs.writeFileSync(rootZipPath, pagesZipBuffer);
    fs.writeFileSync(publicZipPath, pagesZipBuffer);
    fs.writeFileSync(distZipPath, pagesZipBuffer);

    console.log(`Created ${rootZipPath} (${(pagesZipBuffer.length / 1024).toFixed(1)} KB)`);
  } else {
    console.warn('dist/ folder not found. Please run npm run build first.');
  }

  // 2. Package the Full Source Code repository for GitHub
  const repoZip = new JSZip();
  const repoRoot = path.resolve('.');
  const ignoreList = new Set([
    'node_modules',
    'dist',
    'dev-dist',
    '.git',
    '.aistudio',
    'lets-review-github-pages.zip',
    'lets-review-full-repo.zip',
  ]);

  function addRepoFiles(dir, zipNode, prefix = '') {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      if (ignoreList.has(item)) continue;
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      const zipPath = prefix ? `${prefix}/${item}` : item;

      if (stat.isDirectory()) {
        addRepoFiles(fullPath, zipNode, zipPath);
      } else {
        const content = fs.readFileSync(fullPath);
        zipNode.file(zipPath, content);
      }
    }
  }

  addRepoFiles(repoRoot, repoZip);
  const repoZipBuffer = await repoZip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  const fullRepoZipPath = path.resolve('lets-review-full-repo.zip');
  const publicRepoZipPath = path.resolve('public/lets-review-full-repo.zip');
  const distRepoZipPath = path.resolve('dist/lets-review-full-repo.zip');
  fs.writeFileSync(fullRepoZipPath, repoZipBuffer);
  fs.writeFileSync(publicRepoZipPath, repoZipBuffer);
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(distRepoZipPath, repoZipBuffer);
  }
  console.log(`Created ${fullRepoZipPath} (${(repoZipBuffer.length / 1024).toFixed(1)} KB)`);

  console.log('ZIP creation complete!');
}

main().catch(console.error);
