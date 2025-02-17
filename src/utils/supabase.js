import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log connection details (without sensitive data)
console.log('Supabase URL configured:', !!supabaseUrl);
console.log('Supabase Anon Key configured:', !!supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getWritings = async () => {
  try {
    console.log('Fetching writings...');
    const { data, error } = await supabase
      .from('writings')
      .select('id, title, content, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    console.log('Writings fetched successfully:', data.length, 'items');
    return data;
  } catch (error) {
    console.error('Error fetching writings:', error);
    throw error;
  }
};
