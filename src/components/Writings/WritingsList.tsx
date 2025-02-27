import React, { useState } from 'react';
import { gsap } from 'gsap';
import { useMouseContext } from '../../context/MouseContext';
import type { WritingsListProps, ProcessedWriting } from '../../types/writings';
import WritingCard from './WritingCard';
import WritingViewer from './WritingViewer';
import '../styles/WritingsList.css';

const WritingsList: React.FC<WritingsListProps> = ({ writings }) => {
  const [selectedWriting, setSelectedWriting] = useState<ProcessedWriting | null>(null);
  const { cursorChangeHandler } = useMouseContext();

  const handleWritingClick = (writing: ProcessedWriting) => {
    setSelectedWriting(writing);
    cursorChangeHandler('');
  };

  return (
    <div className="writings-container">
      <div className="writings-grid">
        {writings.map((writing) => (
          <WritingCard
            key={writing.id}
            title={writing.title}
            excerpt={writing.excerpt}
            date={writing.date}
            readTime={writing.readTime}
            onClick={() => handleWritingClick(writing)}
          />
        ))}
      </div>

      {selectedWriting && (
        <WritingViewer
          title={selectedWriting.title}
          content={selectedWriting.content}
          date={selectedWriting.date}
          readTime={selectedWriting.readTime}
          onClose={() => {
            setSelectedWriting(null);
            cursorChangeHandler('');
          }}
        />
      )}
    </div>
  );
};

export default WritingsList;
