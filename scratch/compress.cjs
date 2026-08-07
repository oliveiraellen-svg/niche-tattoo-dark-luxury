const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  path.join(__dirname, '../src/assets/insta_tattoo'),
  path.join(__dirname, '../src/assets')
];

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;
    // Skip if it's already an optimized file
    if (file.startsWith('opt_')) continue;
    if (!file.startsWith('imgi_') && !file.startsWith('murales')) continue;

    const filePath = path.join(dir, file);
    const optimizedPath = path.join(dir, 'opt_' + file);

    try {
      console.log(`Optimizing: ${file}`);

      await sharp(filePath)
        .resize(800, 1000, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 60 })
        .toFile(optimizedPath);
      
      console.log(`Successfully created: opt_${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

async function run() {
  console.log("Starting safe image optimization...");
  for (const dir of directories) {
    await processDirectory(dir);
  }
  console.log("Finished!");
}

run();
