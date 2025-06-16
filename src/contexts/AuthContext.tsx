import React, { createContext, useContext, useEffect, useState } from "react";
import { mockAuth, MockUser } from "@/lib/mockAuth";

interface AuthContextType {
  user: MockUser | null;
  profile: MockUser | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    companyName?: string,
  ) => Promise<{ error: { message: string } | null }>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{ error: { message: string } | null }>;
  signOut: () => Promise<{ error: { message: string } | null }>;
  updateProfile: (
    updates: Partial<MockUser>,
  ) => Promise<{ error: { message: string } | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [profile, setProfile] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    const currentUser = mockAuth.getCurrentUser();
    setUser(currentUser);
    setProfile(currentUser);
    setLoading(false);

    // Listen for auth changes
    const subscription = mockAuth.onAuthStateChange((user) => {
      setUser(user);
      setProfile(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    companyName?: string,
  ) => {
    try {
      setLoading(true);
      const { error } = await mockAuth.signUp(
        email,
        password,
        fullName,
        companyName,
      );
      return { error };
    } catch (error) {
      return { error: { message: "An unexpected error occurred" } };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await mockAuth.signIn(email, password);
      return { error };
    } catch (error) {
      return { error: { message: "An unexpected error occurred" } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await mockAuth.signOut();
      return { error };
    } catch (error) {
      return { error: { message: "An unexpected error occurred" } };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<MockUser>) => {
    try {
      if (!user) {
        return { error: { message: "No user logged in" } };
      }

      const { error } = await mockAuth.updateProfile(updates);
      return { error };
    } catch (error) {
      return { error: { message: "An unexpected error occurred" } };
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
