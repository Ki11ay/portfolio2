import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ICON_SIZES = [192, 512];
const BACKGROUND_COLOR = '#0b080c';
const ACCENT_COLOR = '#2196f3';

async function generateIcons() {
  // Create base SVG icon
  const svgIcon = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="${BACKGROUND_COLOR}"/>
      <text 
        x="256" 
        y="256" 
        font-family="Arial" 
        font-size="280" 
        fill="${ACCENT_COLOR}"
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        MA
      </text>
    </svg>
  `;

  try {
    // Ensure icons directory exists
    await fs.mkdir(__dirname, { recursive: true });

    // Generate icons for each size
    for (const size of ICON_SIZES) {
      await sharp(Buffer.from(svgIcon))
        .resize(size, size)
        .toFile(join(__dirname, `icon-${size}x${size}.png`));
      
      console.log(`Generated ${size}x${size} icon`);
    }

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

// Execute the icon generation
generateIcons();
