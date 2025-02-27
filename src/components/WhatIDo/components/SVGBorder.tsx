import React from 'react';

export interface SVGBorderProps {
  pathColor?: string;
  strokeWidth?: number;
}

const SVGBorder: React.FC<SVGBorderProps> = ({ 
  pathColor = 'var(--accentColor)',
  strokeWidth = 2 
}) => {
  return (
    <div className="svg-border">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,10 L390,10 L390,390 L10,390 L10,10"
          stroke={pathColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0,20"
          pathLength="100"
          className="svg-border-path"
        />
      </svg>
    </div>
  );
};

export default SVGBorder;
