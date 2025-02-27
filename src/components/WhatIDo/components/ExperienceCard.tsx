import React from 'react';
import { useMouseContext } from '../../../context/MouseContext';

export interface ExperienceCardProps {
  year: string;
  role: string;
  company: string;
  description: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  year,
  role,
  company,
  description
}) => {
  const { cursorChangeHandler } = useMouseContext();

  return (
    <div 
      className="experience-card"
      onMouseEnter={() => cursorChangeHandler('hover')}
      onMouseLeave={() => cursorChangeHandler('')}
    >
      <div className="experience-year">{year}</div>
      <div className="experience-content">
        <div className="experience-header">
          <h4 className="experience-role">{role}</h4>
          <span className="experience-company">{company}</span>
        </div>
        <p className="experience-description">{description}</p>
      </div>
      <div className="experience-dot" />
      <div className="experience-line" />
    </div>
  );
};

export default ExperienceCard;
