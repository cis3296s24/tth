import React from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { getDatabase, get, onValue, ref, update } from 'firebase/database';

interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
  email:string;
}

function MessageButton({
  projectID,
  currentUserID,
}: {
  projectID: Items;
  currentUserID: string;
}) {
  const db =getDatabase();
  const fireDB = getFirestore();
  const router = useRouter();

  const messagehandel = async () => {
    try {
      if (projectID.user_id && currentUserID) {
        const messageRef = ref(db, `Messages/${currentUserID}${projectID.user_id}`);
        // Check if the message room already exists
        const snapshot = await get(messageRef);
        if (snapshot.exists()) {
          // Redirect to existing message room
          router.push(`message/${snapshot.val().ID}`);
        } else {
          // Create a new message room
          await update(messageRef, {
            ID: `${currentUserID}${projectID.user_id}`,
            User_to: currentUserID,
            User_from: projectID.user_id,
            Status: true,
            Email_from: projectID.email
          });
          router.push(`message/${currentUserID}${projectID.user_id}`);
        }
      } else {
        console.log("Invalid Message");
      }
    } catch (error) {
      console.error("Error handling message:", error);
    }
  };
  

  return (
    <>
      {projectID.user_id!==currentUserID && (
       <button onClick={messagehandel}
       className="bg-transparent border border-gray-500 text-gray-500 hover:text-gray-600 hover:border-gray-600 mt-2 py-2 px-4 rounded w-80">
        contact</button>
      )}
    </>
  );
}

export default MessageButton;
