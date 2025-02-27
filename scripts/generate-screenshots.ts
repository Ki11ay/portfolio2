import puppeteer from 'puppeteer';
import { mkdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '../public/screenshots');

interface ScreenshotConfig {
  name: string;
  width: number;
  height: number;
  deviceScaleFactor: number;
  isMobile: boolean;
  hasTouch?: boolean;
  isLandscape?: boolean;
  path: string;
}

const screenshots: ScreenshotConfig[] = [
  // Desktop Screenshots
  {
    name: 'desktop-1',
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1.5,
    isMobile: false,
    path: 'desktop-1.png'
  },
  {
    name: 'desktop-2',
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    isMobile: false,
    path: 'desktop-2.png'
  },
  // Tablet Screenshots
  {
    name: 'tablet-portrait',
    width: 1024,
    height: 1366,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    path: 'tablet-portrait.png'
  },
  {
    name: 'tablet-landscape',
    width: 1366,
    height: 1024,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    isLandscape: true,
    path: 'tablet-landscape.png'
  },
  // Mobile Screenshots
  {
    name: 'mobile-1',
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    path: 'mobile-1.png'
  },
  {
    name: 'mobile-2',
    width: 428,
    height: 926,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    path: 'mobile-2.png'
  }
];

interface ScreenshotOptions {
  url: string;
  outDir: string;
  waitForSelector?: string;
  waitForTimeout?: number;
  beforeScreenshot?: (page: puppeteer.Page) => Promise<void>;
}

async function captureScreenshot(
  browser: puppeteer.Browser,
  config: ScreenshotConfig,
  options: ScreenshotOptions
): Promise<void> {
  const page = await browser.newPage();

  try {
    // Set viewport
    await page.setViewport({
      width: config.width,
      height: config.height,
      deviceScaleFactor: config.deviceScaleFactor,
      isMobile: config.isMobile,
      hasTouch: config.hasTouch || false,
      isLandscape: config.isLandscape || false
    });

    // Navigate to URL
    await page.goto(options.url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for specific selector if provided
    if (options.waitForSelector) {
      await page.waitForSelector(options.waitForSelector);
    }

    // Wait additional time if specified
    if (options.waitForTimeout) {
      await page.waitForTimeout(options.waitForTimeout);
    }

    // Run custom actions before screenshot
    if (options.beforeScreenshot) {
      await options.beforeScreenshot(page);
    }

    // Ensure the output directory exists
    await mkdir(options.outDir, { recursive: true });

    // Take screenshot
    await page.screenshot({
      path: join(options.outDir, config.path),
      fullPage: false,
      type: 'png',
      quality: 100
    });

    console.log(`Generated screenshot: ${config.name}`);
  } catch (error) {
    console.error(`Error capturing ${config.name}:`, error);
  } finally {
    await page.close();
  }
}

async function generateScreenshots() {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const baseUrl = process.env.WEBSITE_URL || 'http://localhost:3000';
    
    // Generate PWA screenshots
    for (const config of screenshots) {
      await captureScreenshot(browser, config, {
        url: baseUrl,
        outDir: screenshotsDir,
        waitForSelector: '#root',
        waitForTimeout: 2000,
        beforeScreenshot: async (page) => {
          // Example: Wait for animations to complete
          await page.evaluate(() => {
            return new Promise(resolve => {
              const interval = setInterval(() => {
                const animations = document.getAnimations();
                if (!animations.some(a => a.playState === 'running')) {
                  clearInterval(interval);
                  resolve(true);
                }
              }, 100);
            });
          });
        }
      });
    }

    // Generate JSON metadata
    const metadata = {
      screenshots: screenshots.map(s => ({
        src: `/screenshots/${s.path}`,
        sizes: `${s.width}x${s.height}`,
        type: 'image/png',
        form_factor: s.isMobile ? 'narrow' : 'wide',
        label: s.name
      }))
    };

    await writeFile(
      join(screenshotsDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );

    console.log('Screenshots generated successfully!');
  } catch (error) {
    console.error('Error generating screenshots:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generateScreenshots();
