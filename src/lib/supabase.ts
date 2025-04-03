
import { createClient } from '@supabase/supabase-js';

// Use hardcoded values from your Supabase project
const supabaseUrl = "https://jkgvjfxiyaqqbniasppz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZ3ZqZnhpeWFxcWJuaWFzcHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MDA2MjQsImV4cCI6MjA1OTE3NjYyNH0.adxmGOHysvDyQ9hxYVqPIZySHuIviue7E9Ud_h38PdY";

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for auth with proper error handling
export const signUp = async (email: string, password: string) => {
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
