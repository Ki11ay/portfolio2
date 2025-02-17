import React, { useState, useEffect } from 'react';
import { getWritings, supabase } from '../../utils/supabase';
import WritingCard from './WritingCard';
import WritingViewer from './WritingViewer';
import '../styles/WritingsList.css';

const WritingsList = () => {
  const [writings, setWritings] = useState([]);
  const [selectedWriting, setSelectedWriting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWritings = async () => {
      try {
        console.log('Fetching writings...');
        const { data, error } = await supabase
          .from('writings')
          .select('id, title, content, created_at')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching writings:', error);
          setError('Failed to load writings');
          return;
        }

        console.log('Writings loaded successfully:', data);
        setWritings(data);
      } catch (err) {
        console.error('Error in loadWritings:', err);
        setError('Failed to load writings');
      } finally {
        setLoading(false);
      }
    };

    loadWritings();
  }, []);

  if (error) {
    return (
      <div className="writings-container">
        <h2>My Writings</h2>
        <div className="writings-error">
          {error}
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="writings-loading">Loading writings...</div>;
  }

  return (
    <div className="writings-container">
      <h2>My Writings</h2>
      <div className="writings-grid">
        {writings.map((writing) => (
          <WritingCard
            key={writing.id}
            title={writing.title}
            onClick={() => setSelectedWriting(writing)}
          />
        ))}
      </div>
      
      {selectedWriting && (
        <WritingViewer
          title={selectedWriting.title}
          content={selectedWriting.content}
          onClose={() => setSelectedWriting(null)}
        />
      )}
    </div>
  );
};

export default WritingsList;
