
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://woumnidrxvcievydosww.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyNjY0ODc1LCJleHAiOjE5NTgyNDA4NzV9.36y16KqNHyVGHRhDYrFCZqemlYKdxnHxzb84VwJDhnU'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
