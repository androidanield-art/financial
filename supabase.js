import { createClient } from '@supabase/supabase-js';

// Credenciais Hardcoded para garantir funcionamento imediato na Vercel
// CERTIFIQUE-SE DE QUE A URL ESTÁ CORRETA NO PAINEL DO SUPABASE (EX: https://xyz.supabase.co)
const supabaseUrl = 'https://kkdusesxsgiaksbezmmd.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZHVzZXN4c2dpYWtzYmV6bW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzQyNzgsImV4cCI6MjA5NjUxMDI3OH0.ZXgJOJzcelsSW48jDeXhd9TySndW8EJxppb1K86PMQU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);