"use client";
import "../../app/index.css";
import React, { useState, useEffect } from "react";
import { auth } from "../../app/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";

/**
 * Signup component for user registration.
 * @returns JSX.Element representing the Signup page.
 */
function Signup() {
  // Data fields
  const router = useRouter();

  /**
   * Stores the user's email.
   * @type {string}
   */
  const [email, setEmail] = useState(""); // Stores the user's email

  /**
   * Stores the user's password.
   * @type {string}
   */
  const [passWord, setPassWord] = useState(""); // Stores the user's password

  /**
   * Stores the user's name.
   * @type {string}
   */
  const [userName, setUsername] = useState(""); // Stores the user's name

  /**
   * useEffect hook to check authentication state.
   */
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        sessionStorage.setItem("accessToken", uid);
        router.push("/profile");
      } else {
        // User is signed out
        sessionStorage.clear();
        // ...
      }
    });
  }, []);

  /**
   * Handles user signup.
   */
  const signupHandel = () => {
    if (email && passWord && userName) {
      createUserWithEmailAndPassword(auth, email, passWord)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          //const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          alert(errorMessage);
        });
    } else {
      alert("fill all Info");
    }
  };

  return (
    <div className="loginpages">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        type="name"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter name"
      />
      <input
        type="password"
        value={passWord}
        onChange={(e) => setPassWord(e.target.value)}
        placeholder="Enter Password"
      />{" "}
      <br />
      <button onClick={signupHandel}>Sign up</button>
    </div>
  );
}

export default Signup;
