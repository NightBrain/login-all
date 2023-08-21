import React, { useState, useContext } from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config";
import { AuthContext } from "../context/AuthContext";
import { createUserDocment } from "../createUserDocument";
// Github Login
export const useLogin = () => {
  const [error, setError] = useState(false);
  const [isPending, setISPending] = useState(false);
  const provider = new GithubAuthProvider();

  const { dispatch } = useContext(AuthContext);

  const login = async () => {
    setError(null);
    setISPending(true);

    try {
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      await createUserDocment(user);
      dispatch({type: "LOGIN", payload: user})
      console.log(user);
      setISPending(false);

    } catch(error) {
        console.log(error);
        setError(error.message);
        setISPending(false);
    }
  }

  return { login, error, isPending };
}