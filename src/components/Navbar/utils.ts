interface Section {
  id: string;
  label: string;
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'what-i-do', label: 'What I Do' },
  { id: 'tech-stack', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'contact', label: 'Contact' }
] as const;

export type SectionId = typeof navItems[number]['id'];

export const getSectionOffset = (sectionId: string): number => {
  const section = document.getElementById(sectionId);
  return section?.offsetTop ?? 0;
};

export const findActiveSection = (
  sections: ReadonlyArray<Section>,
  scrollPosition: number
): SectionId => {
  // Ensure we have a valid default section
  if (!sections.length || !sections[0]) {
    return 'home';
  }

  const defaultSection = sections[0].id as SectionId;
  
  // Iterate through sections in reverse order
  for (const section of [...sections].reverse()) {
    if (!section) continue;
    
    const offset = getSectionOffset(section.id);
    if (offset <= scrollPosition) {
      return section.id as SectionId;
    }
  }

  return defaultSection;
};

export const getScrollProgress = (): number => {
  if (typeof window === 'undefined') return 0;

  const documentHeight = document.documentElement?.scrollHeight ?? 0;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;

  // Guard against invalid values
  if (documentHeight <= windowHeight) {
    return 0;
  }

  const totalHeight = documentHeight - windowHeight;
  return Math.max(0, Math.min((scrollY / totalHeight) * 100, 100));
};

// Utility function to check if an element is in viewport
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};