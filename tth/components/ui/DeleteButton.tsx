import React from "react";
import { useRouter } from "next/navigation";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
}

function DeleteButton({
  projectID,
  currentUserID,
}: {
  projectID: Items;
  currentUserID: string;
}) {
  const fireDB = getFirestore();
  const router = useRouter();

  const deleteItemes = async () => {
    try {
      console.log(projectID);
      if (projectID.user_id === currentUserID) {
        // Display a confirmation dialog
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this item?"
        );
        if (confirmDelete) {
          // Get reference to the document
          const docRef = doc(fireDB, "Item", projectID.id);
          // Delete the document
          await deleteDoc(docRef);

          console.log("Document successfully deleted!");
          router.push("/feed");
        }
      } else {
        console.log("You do not have permission to delete it");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <>
      {projectID.user_id === currentUserID && (
        <button
          onClick={deleteItemes}
          className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2 rounded"
        >
          Delete
        </button>
      )}
    </>
  );
}

export default DeleteButton;
