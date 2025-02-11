import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BACKGROUND_COLOR = '#0b080c';
const ACCENT_COLOR = '#2196f3';

async function generateScreenshots() {
  try {
    // Ensure screenshots directory exists
    await fs.mkdir(__dirname, { recursive: true });

    // Generate desktop screenshot placeholder
    const desktopSvg = `
      <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <rect width="1920" height="1080" fill="${BACKGROUND_COLOR}"/>
        <text 
          x="960" 
          y="540" 
          font-family="Arial" 
          font-size="80" 
          fill="${ACCENT_COLOR}"
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          Desktop Screenshot Placeholder
        </text>
      </svg>
    `;

    // Generate mobile screenshot placeholder
    const mobileSvg = `
      <svg width="390" height="844" xmlns="http://www.w3.org/2000/svg">
        <rect width="390" height="844" fill="${BACKGROUND_COLOR}"/>
        <text 
          x="195" 
          y="422" 
          font-family="Arial" 
          font-size="40" 
          fill="${ACCENT_COLOR}"
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          Mobile Screenshot Placeholder
        </text>
      </svg>
    `;

    // Create desktop screenshot
    await sharp(Buffer.from(desktopSvg))
      .toFile(join(__dirname, 'desktop.png'));
    console.log('Generated desktop screenshot');

    // Create mobile screenshot
    await sharp(Buffer.from(mobileSvg))
      .toFile(join(__dirname, 'mobile.png'));
    console.log('Generated mobile screenshot');

    console.log('All screenshots generated successfully!');
  } catch (error) {
    console.error('Error generating screenshots:', error);
    process.exit(1);
  }
}

// Execute screenshot generation
generateScreenshots();
