import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import type { ProcessedWriting } from '../types/writings';
import { getWritings } from '../utils/supabase';
import WritingsList from '../components/Writings/WritingsList';
import './styles/WritingsPage.css';

const WritingsPage: React.FC = () => {
  const [writings, setWritings] = useState<ProcessedWriting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const data = await getWritings();
        const processedWritings = data.map((writing): ProcessedWriting => ({
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
      } catch (err) {
        setError('Failed to load writings');
        console.error('Error fetching writings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWritings();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <div className="writings-page" ref={containerRef}>
      <div className="content-container">
        <div className="writings-header">
          <Link to="/#hobbies" className="back-link">
            ← Back to Hobbies
          </Link>
          <h1 className="page-title">My Writings</h1>
          <p className="page-subtitle">
            Thoughts and experiences on technology, development, and innovation
          </p>
        </div>

        {error ? (
          <div className="error-message">
            {error}
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : isLoading ? (
          <div className="loading-indicator">Loading writings...</div>
        ) : (
          <WritingsList
            writings={writings}
            onWritingClick={() => {}} // Empty handler since we're using modal in WritingsList
          />
        )}
      </div>

      <div className="writings-background">
        <div className="gradient-sphere"></div>
        <div className="dots-pattern"></div>
      </div>
    </div>
  );
};

export default WritingsPage;