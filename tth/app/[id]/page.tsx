"use client"; // Import necessary modules
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
  getDoc,
  addDoc,
  query,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Item } from "@radix-ui/react-select";
import DeleteButton from "@/components/ui/DeleteButton";
import { onAuthStateChanged, User } from "firebase/auth";
import EditButton from "@/components/ui/EditButton";
import MessageButton from "@/components/ui/MessageButton";

interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  sold: boolean;
  buyer: string;
  user_id: string;
  email: string;
}

export default function Page({ params }: any) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");
  const [users, setUsers] = useState<Items[]>([]);
  const itemId = params.id;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // setCurrentUserEmail();
    });
    return () => unsubscribe(); // Unsubscribe from the auth state listener on unmount
  }, []);

  console.log(currentUser?.email);
  async function handleTrading(itemId: string) {
    if (!currentUser || !itemId) {
      console.log(itemId);
      console.log(currentUser);
      return;
    }

    try {
      const docRef = doc(db, "Transaction", itemId);
      const transactionSnap = await getDoc(docRef);

      if (!transactionSnap.exists()) {
        // If no transaction document exists, create a new one
        const itemDocRef = doc(db, "Item", itemId);
        const itemSnap = await getDoc(itemDocRef);

        if (itemSnap.exists()) {
          const itemData = itemSnap.data();

          const newTransactionRef = await setDoc(
            doc(db, "Transaction", itemId),
            {
              ItemId: itemId,
              SellerId: itemData.user_id,
              BuyerIds: [currentUser.uid], // Include the current user ID in the array
              buyer: "",
            }
          );
          // Alert the user that the item has been successfully added
          alert("Item successfully added to the transaction list!");
        } else {
          console.log("Item not found:", itemId);
          // Handle the case where the item document doesn't exist
        }
      } else {
        // If a transaction document exists, update it to add the item ID
        await updateDoc(docRef, {
          BuyerIds: arrayUnion(currentUser.uid),
        });
        console.log("Transaction updated:", itemId);
        // Alert the user that the item has been successfully added
        alert("Item successfully added to the transaction list!");
      }

      console.log("Item added to transaction successfully!");
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  }

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
      <BackgroundGradientDemo
        project={item}
        currentUser={currentUser}
        onTradeItem={handleTrading}
        itemId={itemId}
      />
    </div>
  );
}

function BackgroundGradientDemo({
  project,
  currentUser,
  onTradeItem,
  itemId,
}: {
  project: Items;
  currentUser: User | null;

  onTradeItem: (itemId: string) => void;
  itemId: string;
}) {
  return (
    <div className="max-w-sm rounded-[22px] overflow-hidden">
      <BackgroundGradient className="p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="flex justify-center items-center">
          {project.link.includes(".mp4") ||
          project.link.includes(".webm") ||
          project.link.includes(".ogg") ||
          project.link.includes(".mov") ? (
            <video className="object-scale-down h-64 w-96c" controls autoPlay muted loop>
              <source src={project.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={project.link}
              alt="NOT FOUND"
              height="300"
              width="300"
              className="object-scale-down h-64 w-96"
            />
          )}
        </div>
        <div className="flex justify-between items-center text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {project.title}
          {currentUser && project.user_id === currentUser.uid ? (
            <>
              <EditButton projectID={project} currentUserID={currentUser.uid} />
              <DeleteButton
                projectID={project}
                currentUserID={currentUser.uid}
              />
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {project.description}
        </div>
        <br></br>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {/* <h1>contact me: {project.user_id}</h1> */}
        </div>
        <div className="flex justify-center items-center text-sm text-neutral-600 dark:text-neutral-400">
          {currentUser && (
            <div>
              <button onClick={() => onTradeItem(itemId)}>
                <MessageButton
                  projectID={project}
                  currentUserID={currentUser.uid}
                  currentUserEmail={currentUser.email || ""}
                />
              </button>
            </div>
          )}
        </div>
      </BackgroundGradient>
    </div>
  );
}
