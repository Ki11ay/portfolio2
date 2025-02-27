# Portfolio Updates Implementation Plan

## 1. Mouse Animation & Landing Section

### Remove Mouse Animation
- Delete CustomCursor component
- Remove MouseContext


### Landing Section Scroll Animation
```css
.landing-section {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.landing-section.scrolling {
  opacity: 0;
}
```

- Add scroll listener to track position
- Update opacity based on scroll position
- Ensure smooth transition between sections

## 2. What I Do Section Animation

### Enhanced Animation Flow
```typescript
// Using GSAP timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top center+=100",
    end: "bottom center",
    scrub: 1
  }
});

tl.from(".section-title", { 
  y: 50, 
  opacity: 0, 
  duration: 0.8 
})
  .from(".experience-cards", { 
    y: 30, 
    opacity: 0, 
    stagger: 0.2,
    duration: 0.6
  }, "-=0.4");
```

## 3. Work/Projects Section

### Compact Cards Design
```typescript
interface ProjectCard {
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  images: string[];
  links: {
    demo?: string;
    github?: string;
  };
}
```

### Expanded View
- Create ProjectViewer component for detailed view
- Add smooth transition animations
- Include image gallery and full project details

## 4. Skills Section

### New Technology Categories
```typescript
interface TechCategory {
  name: string;
  skills: Skill[];
}

const categories = [
  {
    name: "Frontend",
    skills: ["React", "Vue", "TypeScript", "HTML/CSS"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "SQLite", "MongoDB"]
  }
  // Additional categories...
];
```

## 5. Hobbies & Writings Section

### Navigation Setup
```typescript
// Add routes
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/writings",
    component: WritingsPage
  }
];
```

### Writings Card Design
- Create consistent card style with other hobby cards
- Add transition animation to writings page
- Implement proper navigation handling

## 6. Contact Section

### Social Links
```typescript
interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

const socialLinks = [
  {
    platform: "LinkedIn",
    url: "your-linkedin-url",
    icon: "linkedin-icon"
  },
  {
    platform: "GitHub",
    url: "your-github-url",
    icon: "github-icon"
  }
];
```

## Implementation Steps

1. Mouse & Landing Section
   - Remove cursor customization
   - Implement scroll-based transitions
   - Test smooth scrolling behavior

2. What I Do Section
   - Update animation timings
   - Add new animation sequences
   - Ensure responsive behavior

3. Work/Projects Section
   - Create compact card component
   - Implement expandable functionality
   - Add smooth transitions

4. Skills Section
   - Add new technology cards
   - Organize into categories
   - Update styling

5. Hobbies & Writings
   - Create dedicated writings page
   - Update navigation
   - Implement card design

6. Contact Section
   - Remove form
   - Add social links
   - Style updates

## Next Steps
1. Switch to Code mode to implement these changes
2. Test each component individually
3. Ensure smooth transitions between sections
4. Verify responsive behavior
5. Test navigation and animations