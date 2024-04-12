"use client";
import React, { useState, useEffect } from "react";
import { auth, firestore, db } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";

export default function ItemDetails({ params }: any) {
  const itemId = params.id;
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); // Unsubscribe from the auth state listener on unmount
  }, []);

  async function handleTrading() {
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
        const newTransactionRef = await addDoc(
          collection(firestore, "Transaction"),
          {
            title: "Title", // Sample title
            description: "Description", // Sample description
            link: "Image URL", // Sample image URL
            user_id: currentUser.uid,
            createdAt: new Date(),
            ItemIds: [itemId], // Include the item ID in the array
          }
        );
        console.log("New transaction created:", newTransactionRef.id);
        // Alert the user that the item has been successfully added
        alert("Item successfully added to the transaction list!");
      } else {
        // If a transaction document exists, update it to add the item ID
        await updateDoc(docRef, {
          ItemIds: arrayUnion(itemId),
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

  return (
    <div className="">
      <button
        onClick={handleTrading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Trade Item
      </button>
    </div>
  );
}
