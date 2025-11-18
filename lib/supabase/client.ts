import { createClient } from '@supabase/supabase-js';

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * Supabase client for client-side operations
 * Uses the anonymous key for public access with Row Level Security
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // No auth needed for this application
  },
  global: {
    headers: {
      'x-application-name': 'radical-healing-blog',
    },
  },
});

/**
 * Server-side Supabase client with service role key
 * Only use this for server-side operations that need elevated permissions
 */
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

/**
 * Test database connection
 * Returns true if connection is successful, false otherwise
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from('quotes').select('count', { count: 'exact', head: true });
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "table not found" which is ok during setup
      console.error('Supabase connection error:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
};
