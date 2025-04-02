
import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in your Lovable project's environment settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Lovable project settings.');
}

// Create the Supabase client if credentials are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper functions for auth with proper error handling
export const signUp = async (email: string, password: string) => {
  if (!supabase) {
    return { 
      data: null, 
      error: new Error('Supabase client not initialized. Please set the required environment variables.') 
    };
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    console.error('Error during sign up:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('An unknown error occurred during sign up') 
    };
  }
};

export const signIn = async (email: string, password: string) => {
  if (!supabase) {
    return { 
      data: null, 
      error: new Error('Supabase client not initialized. Please set the required environment variables.') 
    };
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  } catch (error) {
    console.error('Error during sign in:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('An unknown error occurred during sign in') 
    };
  }
};

export const signOut = async () => {
  if (!supabase) {
    return { error: new Error('Supabase client not initialized. Please set the required environment variables.') };
  }
  
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('Error during sign out:', error);
    return { 
      error: error instanceof Error ? error : new Error('An unknown error occurred during sign out') 
    };
  }
};

export const getCurrentUser = async () => {
  if (!supabase) {
    return { 
      user: null, 
      error: new Error('Supabase client not initialized. Please set the required environment variables.') 
    };
  }
  
  try {
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user || null, error };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { 
      user: null, 
      error: error instanceof Error ? error : new Error('An unknown error occurred getting the current user') 
    };
  }
};
