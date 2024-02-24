import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

// we'll sort out typing for this later lol

const userAuthContext = createContext();

export function useUserAuth() {
  return useContext(userAuthContext);
}

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setLoaded(true);
    setUser(currentUser);
  }), []);

  if (!loaded) {
    return <p>Loading</p>;
  }


  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}