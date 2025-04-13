
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'sale' | 'rent';
  images: string[];
  features: string[];
  created_at: string;
  user_id: string;
  status: 'available' | 'pending' | 'sold';
};

export type PropertyInsert = Omit<Property, 'id' | 'created_at'>;
