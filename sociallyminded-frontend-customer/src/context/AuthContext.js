import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  getAuth
} from 'firebase/auth'

import { auth } from '../firebase.js';
const UserContext = createContext();
const provider = new GoogleAuthProvider();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const setCurrentUserDetail = (username) => {
    return updateProfile(auth.currentUser, { displayName: username })
  }

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }

  const signInWithGmailPopup = () => {
    return signInWithPopup(auth, provider)
  }

  const sendPasswordResetEmailToUser = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{
        user, createUser, 
        setCurrentUserDetail, logout, 
        signIn, signInWithGmailPopup, 
        sendPasswordResetEmailToUser
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};