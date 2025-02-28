export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'what-i-do', label: 'What I Do' },
  { id: 'work', label: 'Work' },
  { id: 'tech-stack', label: 'Skills' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'contact', label: 'Contact' }
] as const;

export type SectionId = typeof NAV_ITEMS[number]['id'];

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface ScrollState {
  currentSection: SectionId;
  progress: number;
}