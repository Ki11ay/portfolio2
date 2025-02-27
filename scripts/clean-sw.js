/**
 * This script helps clean up service worker registrations
 * Useful during development and when deploying major updates
 */

const fs = require('fs').promises;
const path = require('path');

async function cleanServiceWorker() {
  const distPath = path.join(process.cwd(), 'dist');
  const files = [
    'sw.js',
    'sw.js.map',
    'workbox-*.js',
    'workbox-*.js.map',
    'sw.d.ts'
  ];

  try {
    // Check if dist directory exists
    const distExists = await fs.access(distPath)
      .then(() => true)
      .catch(() => false);

    if (!distExists) {
      console.log('❌ No dist directory found. Skipping cleanup.');
      return;
    }

    // Get all files in dist directory
    const distFiles = await fs.readdir(distPath);

    // Filter and delete service worker files
    let deletedCount = 0;
    for (const file of distFiles) {
      if (files.some(pattern => {
        const regex = new RegExp(pattern.replace('*', '.*'));
        return regex.test(file);
      })) {
        await fs.unlink(path.join(distPath, file));
        console.log(`🗑️ Deleted: ${file}`);
        deletedCount++;
      }
    }

    if (deletedCount === 0) {
      console.log('✨ No service worker files found to clean.');
    } else {
      console.log(`\n🧹 Cleaned up ${deletedCount} service worker file(s).`);
    }

    // Try to clean browser caches if running in a browser context
    if (typeof window !== 'undefined' && 'caches' in window) {
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys.map(key => caches.delete(key))
      );
      console.log(`🔄 Cleared ${cacheKeys.length} cache entries.`);
    }

  } catch (error) {
    console.error('❌ Error cleaning service worker files:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanServiceWorker().then(() => {
  console.log('✅ Service worker cleanup complete!\n');
});

// Handle script interruption
process.on('SIGINT', () => {
  console.log('\n🛑 Cleanup interrupted. Some files may remain.');
  process.exit(0);
});

// Export for programmatic use
module.exports = cleanServiceWorker;
