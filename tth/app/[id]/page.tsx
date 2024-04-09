"use client";
// Import necessary modules
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import Image from "next/image";

import { initializeApp } from "firebase/app";
import { collection, getDocs, DocumentData, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Item } from "@radix-ui/react-select";
import DeleteButton from "@/components/ui/DeleteButton";
import { onAuthStateChanged, User } from "firebase/auth";


interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
}

export default function Page({ params }: any) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Items[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const querySnapshot = await getDocs(collection(db, "Item"));
      const usersData: Items[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersData);

//////Current User
onAuthStateChanged(auth, (user) => {
  if (user) {
    setCurrentUser(user);
  } else {
    //if user not log in 
    setCurrentUser(null);
  }
});

    }

    fetchItems();
  }, []);
  const id = `${params.id}`;
  const filteredItems = users.filter((item) => item.id === id);

  if (filteredItems.length === 0) {
    return <div>Loading...</div>;
  }

  const item = filteredItems[0];

  return (
    <div className="flex justify-center items-center h-screen">
      <BackgroundGradientDemo project={item} currentUser={currentUser} />
    </div>
  );
}

function BackgroundGradientDemo({ project, currentUser }: { project: Items; currentUser: User | null }) {
  // Check if the link contains an image or video extension
  const isImage = project.link.includes(".jpg") || project.link.includes(".jpeg") ||project.link.includes(".PNG") || project.link.includes(".png") || project.link.includes(".gif") || project.link.includes(".pdf");
  const isVideo = project.link.includes(".mp4") || project.link.includes(".webm") || project.link.includes(".ogg") || project.link.includes(".mov");

  return (
    <div className="max-w-sm rounded-[22px] overflow-hidden">
      <BackgroundGradient className="p-4 sm:p-10 bg-white dark:bg-zinc-900">
      <div className="flex justify-center items-center">
        {isImage && (
          <Image
            src={project.link}
            alt="NOT FOUND"
            width={200}
            height={200}
            className="object-cover"
          />
        )}

        {isVideo && (
          <video width="320" height="240" controls preload="none" autoPlay>
            <source src={project.link} type="video/mp4" />
            <track
              src="/path/to/captions.vtt"
              kind="subtitles"
              srcLang="en"
              label="English"
            />
            Your browser does not support the video tag.
          </video>
        )}
</div>
        <div className="flex justify-between items-center text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {project.title} 
          {currentUser&&
          <DeleteButton projectID={project} currentUserID={currentUser.uid}/>
}
        </div>

        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {project.description}
        </div>
        <br></br>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <h1>contact me: {project.user_id}</h1>
        </div>
      </BackgroundGradient>
    </div>
  );
}

