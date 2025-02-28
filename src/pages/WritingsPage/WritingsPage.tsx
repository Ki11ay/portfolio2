import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWritings } from '../../utils/supabase';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './styles/WritingsPage.css';

interface Writing {
  id: string;
  title: string;
  description: string;
  content: string;
  created_at: string;
  tags: string[];
}

const WritingsPage: React.FC = () => {
  const [writings, setWritings] = useState<Writing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const containerRef = useScrollAnimation({
    y: 30,
    opacity: 0,
    duration: 0.8
  });

  useEffect(() => {
    const loadWritings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getWritings();
        console.log('Fetched writings:', data); // Debug log
        setWritings(data);
      } catch (err) {
        console.error('Error in loadWritings:', err);
        setError('Failed to load writings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadWritings();
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleReadMore = (writingId: string) => {
    navigate(`/writings/${writingId}`);
  };

  const WritingCard: React.FC<{ writing: Writing }> = ({ writing }) => {
    const cardRef = useScrollAnimation({
      y: 20,
      opacity: 0,
      duration: 0.6
    });

    return (
      <article className="writing-card" ref={cardRef}>
        <header className="writing-header">
          <h2 className="writing-title">{writing.title}</h2>
          <time className="writing-date">
            {new Date(writing.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>

        <p className="writing-description">{writing.description}</p>

        <div className="writing-tags">
          {writing.tags?.map((tag, index) => (
            <span key={`${tag}-${index}`} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <button 
          className="read-more-btn"
          onClick={() => handleReadMore(writing.id)}
        >
          Read More
        </button>
      </article>
    );
  };

  if (isLoading) {
    return (
      <main className="writings-page">
        <div className="content-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading writings...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="writings-page">
        <div className="content-container">
          <div className="error-state">
            <p>{error}</p>
            <button onClick={handleRetry}>Try Again</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="writings-page" ref={containerRef}>
      <div className="content-container">
        <header className="page-header">
          <h1>Writings</h1>
          <p>Thoughts, tutorials, and technical articles about software development.</p>
        </header>

        {writings.length === 0 ? (
          <div className="empty-state">
            <p>No writings found.</p>
          </div>
        ) : (
          <div className="writings-grid">
            {writings.map(writing => (
              <WritingCard key={writing.id} writing={writing} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default WritingsPage;