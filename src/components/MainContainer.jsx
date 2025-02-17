import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import WhatIDo from './WhatIDo';
import Career from './Career';
import Work from './Work';
import TechStack from './TechStack';
import Hobbies from './Hobbies';
import Contact from './Contact';
import WritingsList from './Writings/WritingsList';

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
  useEffect(() => {
    // Set up section animations
    const sections = document.querySelectorAll('section:not(#work)');
    
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Landing />
      <About />
      <WhatIDo />
      <Career />
      <Work />
      <TechStack />
      <Hobbies />
      <Contact />
    </>
  );
};

const MainContainer = () => {
  const location = useLocation();

  return (
    <div className="container-main">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/writings" element={<WritingsList />} />
      </Routes>
    </div>
  );
};

export default MainContainer;
