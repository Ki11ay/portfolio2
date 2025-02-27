// Raw writing type from Supabase
export interface RawWriting {
  id: string;
  title: string;
  content: string;
  created_at: string;
  published: boolean;
  tags?: string[];
}

// Writing type with processed fields
export interface ProcessedWriting extends RawWriting {
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[]; // Make tags required in processed writing
}

// Props for WritingCard component
export interface WritingCardProps {
  title: string;
  excerpt?: string;
  date: string;
  readTime: string;
  onClick: () => void;
}

// Props for WritingViewer component
export interface WritingViewerProps {
  title: string;
  content: string;
  date: string;
  readTime: string;
  onClose: () => void;
}

// Props for WritingsList component
export interface WritingsListProps {
  writings: ProcessedWriting[];
  onWritingClick: (writing: ProcessedWriting) => void;
}

// Error state type
export interface WritingError {
  message: string;
  code?: string;
}

// Writing state type
export interface WritingState {
  writings: ProcessedWriting[];
  selectedWriting: ProcessedWriting | null;
  loading: boolean;
  error: WritingError | null;
}