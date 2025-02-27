const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src');
const directory = {
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
    }
  }
};

// Create directories if they don't exist
function createDirectories() {
  Object.keys(directory.components).forEach(component => {
    const componentPath = path.join(srcPath, 'components', component);
    const stylesPath = path.join(componentPath, 'styles');
    
    if (!fs.existsSync(componentPath)) {
      fs.mkdirSync(componentPath, { recursive: true });
    }
    
    if (!fs.existsSync(stylesPath)) {
      fs.mkdirSync(stylesPath);
    }

    if (directory.components[component].components) {
      const subComponentsPath = path.join(componentPath, 'components');
      if (!fs.existsSync(subComponentsPath)) {
        fs.mkdirSync(subComponentsPath);
      }
    }
  });
}

// Move files to their correct locations
function moveFiles() {
  Object.entries(directory.components).forEach(([component, structure]) => {
    const componentPath = path.join(srcPath, 'components', component);
    
    // Move component files
    structure.files.forEach(file => {
      const oldPath = path.join(srcPath, 'components', file);
      const newPath = path.join(componentPath, file);
      
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Moved ${file} to ${component}/`);
      }
    });
    
    // Move style files
    structure.styles.forEach(style => {
      const oldPath = path.join(srcPath, 'components', 'styles', style);
      const newPath = path.join(componentPath, 'styles', style);
      
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Moved ${style} to ${component}/styles/`);
      }
    });
    
    // Move sub-component files
    if (structure.components) {
      structure.components.forEach(file => {
        const oldPath = path.join(srcPath, 'components', file);
        const newPath = path.join(componentPath, 'components', file);
        
        if (fs.existsSync(oldPath)) {
          fs.renameSync(oldPath, newPath);
          console.log(`Moved ${file} to ${component}/components/`);
        }
      });
    }
  });
}

// Run the organization
try {
  console.log('Creating directories...');
  createDirectories();
  
  console.log('Moving files...');
  moveFiles();
  
  console.log('File organization completed successfully!');
} catch (error) {
  console.error('Error organizing files:', error);
}