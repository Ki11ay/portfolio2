export const DIRECTORY_STRUCTURE = {
  components: {
    Writings: {
      files: ['WritingCard.tsx', 'WritingsList.tsx', 'WritingViewer.tsx'],
      styles: ['WritingCard.css', 'WritingsList.css', 'WritingViewer.css']
    },
    Work: {
      files: ['Work.tsx', 'ProjectCard.tsx'],
      styles: ['Work.css', 'ProjectCard.css']
    },
    WhatIDo: {
      files: ['WhatIDo.tsx'],
      components: ['SVGBorder.tsx'],
      styles: ['WhatIDo.css']
    },
    Hobbies: {
      files: ['Hobbies.tsx'],
      styles: ['Hobbies.css']
    },
    Loader: {
      files: ['LoadingScreen.tsx'],
      styles: ['Loader.css']
    },
    Cursor: {
      files: ['CustomCursor.tsx'],
      styles: ['CustomCursor.css']
    }
  },
  pages: {
    files: ['WritingsPage.tsx'],
    styles: ['WritingsPage.css']
  },
  utils: {
    files: [
      'supabase.ts',
      'networkUtils.ts',
      'pwaUtils.ts'
    ]
  },
  context: {
    files: [
      'NetworkContext.tsx',
      'PWAContext.tsx'
    ]
  },
  hooks: {
    files: [
      'usePWA.ts',
      'useWritings.ts'
    ]
  },
  types: {
    files: [
      'writings.ts',
      'network.d.ts',
      'pwa.d.ts'
    ]
  }
};

// Ensure all components are properly organized and located in their respective directories
export const validateDirectoryStructure = (): boolean => {
  // This function could be implemented to validate the actual file structure
  return true;
};