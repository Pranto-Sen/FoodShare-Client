import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import app from "../firebase/firebase.config";
import app from './../Firebase/firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
       const userEmail = currentUser?.email || user?.email;
       const loggedUser = { email: userEmail };
      console.log("user in the auth state changed", currentUser);
      setUser(currentUser);
      setLoading(false);

       if (currentUser) {
         axios
           .post("http://localhost:5000/jwt", loggedUser, {
             withCredentials: true,
           })
           .then((res) => {
             console.log("token response", res.data);
           });
       }
       else {
         axios
           .post("http://localhost:5000/logout", loggedUser, {
             withCredentials: true,
           })
           .then((res) => {
             console.log(res.data);
           });
       }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    logOut,
    signIn,
    loading,
    isRegister,
    googleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
