import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kkduusesxsgiaksbezmmd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZHVzZXN4c2dpYWtzYmV6bW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzQyNzgsImV4cCI6MjA5NjUxMDI3OH0.ZXgJOJzcelsSW48jDeXhd9TySndW8EJxppb1K86PMQU';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As credenciais do Supabase não foram encontradas. Verifique seu arquivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);