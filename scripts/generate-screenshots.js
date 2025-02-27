const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

const SCREENSHOTS_DIR = path.join(process.cwd(), 'public', 'screenshots');
const BASE_URL = process.env.VITE_SITE_URL || 'http://localhost:5173';

// Screenshot configurations
const SCREENSHOT_CONFIGS = [
  {
    name: 'desktop',
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    isMobile: false,
    routes: [
      { path: '/', name: 'home' },
      { path: '/#work', name: 'work' },
      { path: '/#about', name: 'about' },
      { path: '/#contact', name: 'contact' }
    ]
  },
  {
    name: 'mobile',
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    routes: [
      { path: '/', name: 'home' },
      { path: '/#work', name: 'work' },
      { path: '/#about', name: 'about' },
      { path: '/#contact', name: 'contact' }
    ]
  }
];

// Ensure screenshots directory exists
async function ensureScreenshotsDir() {
  try {
    await fs.access(SCREENSHOTS_DIR);
  } catch {
    await fs.mkdir(SCREENSHOTS_DIR, { recursive: true });
  }
}

// Take screenshots for all configurations
async function generateScreenshots() {
  console.log('📸 Generating PWA screenshots...');

  try {
    await ensureScreenshotsDir();

    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      defaultViewport: null,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Process each configuration
    for (const config of SCREENSHOT_CONFIGS) {
      console.log(`\n📱 Processing ${config.name} screenshots...`);

      const page = await browser.newPage();
      await page.setViewport({
        width: config.width,
        height: config.height,
        deviceScaleFactor: config.deviceScaleFactor,
        isMobile: config.isMobile
      });

      // Take screenshot for each route
      for (const route of config.routes) {
        const url = `${BASE_URL}${route.path}`;
        console.log(`🌐 Navigating to ${url}`);

        await page.goto(url, { waitUntil: 'networkidle0' });
        
        // Wait for animations to complete
        await page.waitForTimeout(2000);

        const fileName = `${config.name}-${route.name}.png`;
        const filePath = path.join(SCREENSHOTS_DIR, fileName);

        await page.screenshot({
          path: filePath,
          fullPage: false,
          type: 'png',
          quality: 90
        });

        console.log(`✅ Generated ${fileName}`);

        // Optimize the screenshot
        const sharp = require('sharp');
        await sharp(filePath)
          .resize(config.width, config.height, {
            fit: 'contain',
            background: { r: 11, g: 8, b: 12, alpha: 1 } // #0b080c
          })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(filePath.replace('.png', '-optimized.png'));

        console.log(`✨ Optimized ${fileName}`);
      }

      await page.close();
    }

    await browser.close();
    console.log('\n🎉 All screenshots generated successfully!\n');

  } catch (error) {
    console.error('❌ Error generating screenshots:', error);
    process.exit(1);
  }
}

// Generate metadata JSON for PWA manifest
async function generateMetadata() {
  console.log('📝 Generating screenshot metadata...');

  const metadata = SCREENSHOT_CONFIGS.map(config => {
    return config.routes.map(route => ({
      src: `screenshots/${config.name}-${route.name}-optimized.png`,
      sizes: `${config.width}x${config.height}`,
      type: 'image/png',
      platform: config.name === 'desktop' ? 'wide' : 'narrow',
      label: `${route.name.charAt(0).toUpperCase() + route.name.slice(1)} view - ${config.name}`
    }));
  }).flat();

  const metadataPath = path.join(SCREENSHOTS_DIR, 'metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  console.log('✅ Generated screenshots metadata.json');
}

// Run the generation
(async () => {
  await generateScreenshots();
  await generateMetadata();
})();
