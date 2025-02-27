import { useState, useEffect } from 'react';
import { getWritings } from '../utils/supabase';
import type { Writing as ListWriting } from '../components/Writings/WritingsList';

const useWritings = () => {
  const [writings, setWritings] = useState<ListWriting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWritings = async () => {
      try {
        const data = await getWritings();
        const transformedWritings = data.map(writing => ({
          id: writing.id,
          title: writing.title,
          content: writing.content,
          excerpt: writing.content.slice(0, 150) + '...',
          date: new Date(writing.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          created_at: writing.created_at,
          readTime: `${Math.ceil(writing.content.length / 1000)} min read`,
          image: writing.image || '/images/default.jpg',
          views: 0,
          likes: 0,
          tags: writing.tags || []
        }));
        setWritings(transformedWritings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch writings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWritings();
  }, []);

  return { writings, isLoading, error };
};

export default useWritings;