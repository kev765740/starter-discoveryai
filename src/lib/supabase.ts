import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables missing:", {
    VITE_SUPABASE_URL: supabaseUrl ? "Set" : "Missing",
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? "Set" : "Missing",
  });
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          company_name: string | null;
          subscription_tier: "free" | "pro" | "enterprise" | "business";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          company_name?: string | null;
          subscription_tier?: "free" | "pro" | "enterprise" | "business";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          company_name?: string | null;
          subscription_tier?: "free" | "pro" | "enterprise" | "business";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
