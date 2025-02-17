import React from 'react';
import '../styles/WritingCard.css';

const WritingCard = ({ title, onClick }) => {
  return (
    <div className="writing-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>Click to read</p>
    </div>
  );
};

export default WritingCard;
