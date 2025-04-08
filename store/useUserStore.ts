"use client";

import { create } from "zustand";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface LoginResult {
  success: boolean;
  error?: Error;
}

interface UserState {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<LoginResult>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => {
  onAuthStateChanged(auth, (user) => {
    set({ user, loading: false });
  });

  return {
    user: null,
    loading: true,

    loginWithGoogle: async () => {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        if (!user?.email || !user.uid) {
          throw new Error("User email or UID not found.");
        }

        set({ user });
        console.log("Logged in successfully!");

        return { success: true };
      } catch (error) {
        console.error("Login error:", error);
        await signOut(auth);
        return {
          success: false,
          error: error instanceof Error ? error : new Error("Unknown error"),
        };
      }
    },

    logout: async () => {
      await signOut(auth);
      set({ user: null });
      console.log("Logged out successfully.");
    },
  };
});
