"use client";
import "../../app/index.css";
import React, { useState, useEffect } from "react";
import { auth } from "../../app/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [avater, setAvater] = useState("");

  /////UseEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setEmail(user.email || "");
        setUserID(uid);
        const hash = user.email?.charAt(0).toUpperCase() || "";
        setAvater(hash);
        sessionStorage.setItem("accessToken", uid);
      } else {
        // User is signed out
        sessionStorage.clear();
        router.push("/login");
        // ...
      }
    });
  },[]);

  return (
    <div className="profiles">
      <img
        src={`https://dummyimage.com/80x80/555555/ffffff&text=${avater}`}
        alt=""
      />
      <p>Welcome</p>
      <p>Email: {email}</p>
      <p>UserID: {userID}</p>
    </div>
  );
}

import { Separator } from "@/components/ui/separator";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      <Separator />
      <div className="space-y-6">
        <div>
          <Profile />
        </div>
      </div>
    </div>
  );
}
