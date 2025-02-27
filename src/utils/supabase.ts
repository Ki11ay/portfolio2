import { createClient } from '@supabase/supabase-js';

interface Writing {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  created_at: string;
  published: boolean;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  date?: string;
  readTime?: string;
}

interface Database {
  public: {
    Tables: {
      writings: {
        Row: Writing;
        Insert: Omit<Writing, 'id' | 'created_at'>;
        Update: Partial<Omit<Writing, 'id' | 'created_at'>>;
      };
    };
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const getWritings = async (): Promise<Writing[]> => {
  try {
    const { data, error } = await supabase
      .from('writings')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching writings:', error);
    return [];
  }
};

export const getWritingById = async (id: string): Promise<Writing | null> => {
  try {
    const { data, error } = await supabase
      .from('writings')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching writing:', error);
    return null;
  }
};

export const createWriting = async (writing: Database['public']['Tables']['writings']['Insert']): Promise<Writing | null> => {
  try {
    const { data, error } = await supabase
      .from('writings')
      .insert([writing])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating writing:', error);
    return null;
  }
};

export const updateWriting = async (
  id: string,
  updates: Database['public']['Tables']['writings']['Update']
): Promise<Writing | null> => {
  try {
    const { data, error } = await supabase
      .from('writings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating writing:', error);
    return null;
  }
};

export const deleteWriting = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('writings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting writing:', error);
    return false;
  }
};

export type { Writing };
