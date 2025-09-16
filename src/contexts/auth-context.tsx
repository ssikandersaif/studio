
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';

import { User } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAuthDialogOpen: boolean;
  setAuthDialogOpen: (isOpen: boolean) => void;
  openAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const appUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Krishi User',
          email: firebaseUser.email || 'No email',
          avatarUrl: firebaseUser.photoURL || `https://avatar.vercel.sh/${firebaseUser.uid}.png`,
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    // No need to set loading here as the onAuthStateChanged will handle UI updates
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged will handle setting the user state
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error; // Re-throw to be caught by the calling component
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      router.push('/login'); // Redirect to login after sign out
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const openAuthDialog = () => setAuthDialogOpen(true);

  // No full-page loader needed for this progressive auth model
  // Loading state is still useful for components that need to wait for auth status
  // if (loading) {
  //    return (
  //      <div className="flex h-screen w-full items-center justify-center">
  //       <Loader2 className="h-12 w-12 animate-spin text-primary" />
  //      </div>
  //   );
  // }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, isAuthDialogOpen, setAuthDialogOpen, openAuthDialog }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
