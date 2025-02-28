export interface RawWriting {
    id: string;
    title: string;
    content: string;
    created_at: string;
    published: boolean;
    tags?: string[];
}
export interface ProcessedWriting extends RawWriting {
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
}
export interface WritingCardProps {
    title: string;
    excerpt?: string;
    date: string;
    readTime: string;
    onClick: () => void;
}
export interface WritingViewerProps {
    title: string;
    content: string;
    date: string;
    readTime: string;
    onClose: () => void;
}
export interface WritingsListProps {
    writings: ProcessedWriting[];
    onWritingClick: (writing: ProcessedWriting) => void;
}
export interface WritingError {
    message: string;
    code?: string;
}
export interface WritingState {
    writings: ProcessedWriting[];
    selectedWriting: ProcessedWriting | null;
    loading: boolean;
    error: WritingError | null;
}
//# sourceMappingURL=writings.d.ts.map