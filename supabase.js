import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kkduusesxsgiaksbezmmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZHVzZXN4c2dpYWtzYmV6bW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MzQyNzgsImV4cCI6MjA5NjUxMDI3OH0.ZXgJOJzcelsSW48jDeXhd9TySndW8EJxppb1K86PMQU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);