import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getWritings() {
  const { data, error } = await supabase
    .from('writings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching writings:', error);
    throw error;
  }

  return data || [];
}

export async function getWritingById(id: string) {
  const { data, error } = await supabase
    .from('writings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching writing:', error);
    throw error;
  }

  return data;
}

export async function createWriting(writing: {
  title: string;
  description: string;
  content: string;
  tags: string[];
}) {
  const { data, error } = await supabase
    .from('writings')
    .insert([writing])
    .select()
    .single();

  if (error) {
    console.error('Error creating writing:', error);
    throw error;
  }

  return data;
}
