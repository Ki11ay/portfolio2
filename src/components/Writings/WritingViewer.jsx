import React from 'react';
import '../styles/WritingViewer.css';

const WritingViewer = ({ content, title, onClose }) => {
  return (
    <div className="writing-viewer-overlay">
      <div className="writing-viewer-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{title}</h2>
        <div className="writing-content">
          {content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WritingViewer;
