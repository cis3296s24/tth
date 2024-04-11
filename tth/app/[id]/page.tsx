"use client";
// Import necessary modules
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import Image from "next/image";

import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  DocumentData,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Item } from "@radix-ui/react-select";
import DeleteButton from "@/components/ui/DeleteButton";
import { onAuthStateChanged, User } from "firebase/auth";
import EditButton from "@/components/ui/EditButton";

interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  sold: boolean;
  buyer: string;
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

      //Current User
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

function BackgroundGradientDemo({
  project,
  currentUser,
}: {
  project: Items;
  currentUser: User | null;
}) {

  return (
    <div className="max-w-sm rounded-[22px] overflow-hidden">
      <BackgroundGradient className="p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="flex justify-center items-center">
          {project.link.includes(".mp4") ||
          project.link.includes(".webm") ||
          project.link.includes(".ogg") ||
          project.link.includes(".mov") ? (
            <video width="300" height="300" controls autoPlay muted loop>
              <source src={project.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={project.link}
              alt="NOT FOUND"
              height="300"
              width="300"
              className="object-cover"
            />
          )}
        </div>
        <div className="flex justify-between items-center text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {project.title} 
          {currentUser&&
          <>
          <EditButton projectID={project} currentUserID={currentUser.uid}/>
          <DeleteButton projectID={project} currentUserID={currentUser.uid}/>
          </>
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