import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceIcon = join(__dirname, '../src/assets/logo.png');
const iconsDir = join(__dirname, '../public/icons');

interface IconSizes {
  favicon: number[];
  pwa: number[];
  apple: number[];
  maskable: number[];
}

interface SplashScreen {
  width: number;
  height: number;
}

interface IconOptions {
  width?: number;
  height?: number;
}

// Icon sizes for PWA
const sizes: IconSizes = {
  favicon: [16, 32],
  pwa: [72, 96, 128, 144, 152, 192, 384, 512],
  apple: [180],
  maskable: [512]
};

// Apple splash screen sizes
const splashScreens: SplashScreen[] = [
  { width: 2048, height: 2732 }, // 12.9" iPad Pro
  { width: 1668, height: 2388 }, // 11" iPad Pro
  { width: 1536, height: 2048 }, // 10.5" iPad Pro
  { width: 1290, height: 2796 }, // iPhone 14 Pro Max
  { width: 1179, height: 2556 }, // iPhone 14 Pro
  { width: 1170, height: 2532 }, // iPhone 13 Pro
];

async function ensureDir(dir: string): Promise<void> {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function generateIcon(size: number | null, outputPath: string, options: IconOptions = {}): Promise<void> {
  try {
    const image = sharp(await readFile(sourceIcon));
    const { width, height } = options;
    
    if (width && height) {
      // For splash screens with specific dimensions
      await image
        .resize({
          width,
          height,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .toFile(outputPath);
    } else if (size) {
      // For square icons
      await image
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFile(outputPath);
    }
    
    console.log(`Generated: ${outputPath}`);
  } catch (error) {
    console.error(`Error generating ${outputPath}:`, error);
  }
}

async function generateMaskableIcon(size: number, outputPath: string): Promise<void> {
  try {
    const image = sharp(await readFile(sourceIcon));
    const padding = Math.floor(size * 0.1); // 10% padding
    const innerSize = size - (padding * 2);

    await image
      .resize(innerSize, innerSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 31, g: 41, b: 55, alpha: 1 } // #1f2937
      })
      .toFile(outputPath);
    
    console.log(`Generated maskable icon: ${outputPath}`);
  } catch (error) {
    console.error(`Error generating maskable icon ${outputPath}:`, error);
  }
}

async function generateFavicon(sizes: number[]): Promise<void> {
  try {
    const faviconPath = join(iconsDir, 'favicon.ico');
    const images = await Promise.all(
      sizes.map(size => 
        sharp(sourceIcon)
          .resize(size, size)
          .toBuffer()
      )
    );
    
    await writeFile(faviconPath, Buffer.concat(images));
    console.log('Generated favicon.ico');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

async function main(): Promise<void> {
  try {
    await ensureDir(iconsDir);

    // Generate standard PWA icons
    for (const size of sizes.pwa) {
      await generateIcon(size, join(iconsDir, `icon-${size}x${size}.png`));
    }

    // Generate Apple touch icon
    for (const size of sizes.apple) {
      await generateIcon(size, join(iconsDir, 'apple-touch-icon.png'));
    }

    // Generate maskable icons
    for (const size of sizes.maskable) {
      await generateMaskableIcon(size, join(iconsDir, `maskable-icon-${size}x${size}.png`));
    }

    // Generate favicon
    await generateFavicon(sizes.favicon);

    // Generate splash screens
    for (const { width, height } of splashScreens) {
      await generateIcon(
        null,
        join(iconsDir, `apple-splash-${width}-${height}.png`),
        { width, height }
      );
    }

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error during icon generation:', error);
    process.exit(1);
  }
}

main();
