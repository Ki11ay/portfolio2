import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from '../../plugins/gsap-register';
import { getWritingById } from '../../utils/supabase';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import './styles/WritingViewer.css';

interface Writing {
  id: string;
  title: string;
  content: string;
  created_at: string;
  tags: string[];
  read_time?: number;
}

const WritingViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [writing, setWriting] = useState<Writing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useScrollAnimation({
    y: 30,
    opacity: 0,
    duration: 0.8
  });

  useEffect(() => {
    let isMounted = true;

    const loadWriting = async () => {
      if (!id) {
        navigate('/writings');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await getWritingById(id);
        if (isMounted) {
          setWriting(data);
        }
      } catch (err) {
        console.error('Error loading writing:', err);
        if (isMounted) {
          setError('Failed to load the article. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadWriting().catch(console.error);

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleClose = () => {
    const navigateToWritings = () => navigate('/writings');

    if (containerRef.current) {
      gsap.to(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        onComplete: navigateToWritings
      });
    } else {
      navigateToWritings();
    }
  };

  if (isLoading) {
    return (
      <main className="writing-viewer">
        <div className="content-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !writing) {
    return (
      <main className="writing-viewer">
        <div className="content-container">
          <div className="error-state">
            <p>{error || 'Article not found'}</p>
            <button onClick={() => navigate('/writings')}>
              Back to Writings
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="writing-viewer" ref={containerRef}>
      <div className="content-container">
        <button className="back-button" onClick={handleClose}>
          ← Back to Writings
        </button>

        <article className="writing-content">
          <header className="writing-header">
            <h1>{writing.title}</h1>
            <div className="writing-meta">
              <time dateTime={writing.created_at}>
                {new Date(writing.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {writing.read_time && (
                <span className="read-time">
                  {writing.read_time} min read
                </span>
              )}
            </div>
            <div className="tags">
              {writing.tags?.map((tag, index) => (
                <span key={`${tag}-${index}`} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div 
            className="writing-body"
            dangerouslySetInnerHTML={{ __html: writing.content }}
          />
        </article>
      </div>
    </main>
  );
};

export default WritingViewer;
