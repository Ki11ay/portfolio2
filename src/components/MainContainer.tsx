import React from 'react';
import Landing from './Landing';
import WhatIDo from './WhatIDo/WhatIDo';
import Career from './Career';
import Work from './Work';
import Contact from './Contact';
import TechStack from './TechStack';
import Hobbies from './Hobbies';
import './styles/MainContainer.css';

const MainContainer: React.FC = () => {
  return (
    <main className="main-container">
      <section id="home" className="section landing-section">
        <Landing />
      </section>

      <section id="what-i-do" className="section whatido-section">
        <WhatIDo />
      </section>

      <section id="career" className="section career-section">
        <Career />
      </section>

      <section id="work" className="section work-section">
        <Work />
      </section>

      <section id="tech-stack" className="section techstack-section">
        <TechStack />
      </section>

      <section id="hobbies" className="section hobbies-section">
        <Hobbies />
      </section>

      <section id="contact" className="section contact-section">
        <Contact />
      </section>
    </main>
  );
};

export default MainContainer;
