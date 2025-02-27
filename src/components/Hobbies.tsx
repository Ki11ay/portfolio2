import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useMouseContext } from '../context/MouseContext';
import WritingsList from './Writings/WritingsList';
import type { ProcessedWriting, RawWriting } from '../types/writings';
import { supabase } from '../utils/supabase';
import './styles/Hobbies.css';

interface Hobby {
  title: string;
  description: string;
  icon: string;
}

const Hobbies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cursorChangeHandler } = useMouseContext();
  const [writings, setWritings] = useState<ProcessedWriting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hobbies: Hobby[] = [
    {
      title: 'Robotics',
      description: 'Building and programming robots, exploring automation and AI integration',
      icon: '🤖'
    },
    {
      title: 'Photography',
      description: 'Capturing moments and experimenting with different photography styles',
      icon: '📸'
    },
    {
      title: '3D Modeling',
      description: 'Creating 3D models and exploring digital sculpting',
      icon: '💡'
    },
    {
      title: 'Music Production',
      description: 'Composing electronic music and sound design',
      icon: '🎵'
    }
  ];

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('writings')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) throw supabaseError;

        const processedWritings = (data || []).map((writing: RawWriting): ProcessedWriting => ({
          id: writing.id,
          title: writing.title,
          content: writing.content,
          excerpt: writing.content.substring(0, 150) + '...',
          created_at: writing.created_at,
          date: new Date(writing.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          readTime: `${Math.ceil(writing.content.split(' ').length / 200)} min read`,
          published: writing.published,
          tags: writing.tags || []
        }));

        setWritings(processedWritings);
      } catch (error) {
        console.error('Error fetching writings:', error);
        setError('Failed to load writings');
      } finally {
        setLoading(false);
      }
    };

    fetchWritings();

    // GSAP Animations
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(
      '.hobby-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      }
    ).fromTo(
      '.writings-section',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="hobbies" ref={containerRef}>
      <div className="content-container">
        <div className="hobbies-header">
          <h2 className="section-title">Hobbies & Writings</h2>
          <p className="section-subtitle">What I do in my free time</p>
        </div>

        <div className="hobbies-grid">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="hobby-card"
              onMouseEnter={() => cursorChangeHandler('hover')}
              onMouseLeave={() => cursorChangeHandler('')}
            >
              <div className="hobby-icon">{hobby.icon}</div>
              <h3 className="hobby-title">{hobby.title}</h3>
              <p className="hobby-description">{hobby.description}</p>
            </div>
          ))}
        </div>

        <div className="writings-section">
          <h3 className="writings-title">Latest Writings</h3>
          {error ? (
            <div className="writings-error">
              {error}
              <p>Please try again later.</p>
            </div>
          ) : loading ? (
            <div className="writings-loading">Loading writings...</div>
          ) : (
            <WritingsList 
              writings={writings}
              onWritingClick={() => cursorChangeHandler('')}
            />
          )}
        </div>
      </div>

      <div className="hobbies-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </section>
  );
};

export default Hobbies;
