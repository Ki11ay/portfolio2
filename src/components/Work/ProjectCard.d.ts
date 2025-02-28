import React from 'react';
import './styles/ProjectCard.css';
interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    features: string[];
    improvements: string[];
}
declare const ProjectCard: React.FC<ProjectCardProps>;
export default ProjectCard;
//# sourceMappingURL=ProjectCard.d.ts.map