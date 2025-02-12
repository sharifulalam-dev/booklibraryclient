import axios from "axios";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
export const Authentication = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (user && currentUser) {
        const userEmail = currentUser.email;
        axios
          .post(
            "https://booklibraryserver.vercel.app/auth",
            { email: userEmail },
            { withCredentials: true }
          )
          .then((response) => {});
      } else {
        axios.post(
          "https://booklibraryserver.vercel.app/logout",
          {},
          { withCredentials: true }
        );
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const createNewUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const manageUser = async (name, imageUrl) => {
    if (auth.currentUser) {
      setLoading(true);
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: imageUrl,
        });

        setUser({ ...auth.currentUser, displayName: name, photoURL: imageUrl });
      } finally {
        setLoading(false);
      }
    }
  };

  const updateUserProfile = async (updates) => {
    if (auth.currentUser) {
      setLoading(true);
      try {
        await updateProfile(auth.currentUser, updates);
        setUser({ ...auth.currentUser, ...updates });
        return "Profile updated successfully!";
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    } else {
      throw new Error("No user is currently logged in.");
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent successfully!";
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    setUser,
    loading,
    createNewUser,
    login,
    googleLogin,
    manageUser,
    updateUserProfile,
    logOut,
    forgetPassword,
  };

  return (
    <Authentication.Provider value={authInfo}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        children
      )}
    </Authentication.Provider>
  );
}
