"use client";
import "../../app/index.css";
import React, { useState, useEffect } from "react";
import { auth } from "../../app/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";

function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [userName, setUsername] = useState("");

  ///UseEffect
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

  // SingUp Progress
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
