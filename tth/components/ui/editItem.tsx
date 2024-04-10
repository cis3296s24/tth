"use client"
import "../../app/index.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

interface Items {
  id: string;
  title: string;
  tag: string;
  description: string;
  user_id: string;
}

function EditButton({
  projectID,
  currentUserID,
}: {
  projectID: Items;
  currentUserID: string;
}) {
  const [newTitle, setNewTitle] = useState(projectID.title);
  const [newTag, setNewTag] = useState(projectID.tag);
  const [newDescription, setNewDescription] = useState(projectID.description);
  const [showEditModal, setShowEditModal] = useState(false);

  const fireDB = getFirestore();
  const router = useRouter();

  const handleEdit = async () => {
    try {
      if (projectID.user_id === currentUserID) {
        const docRef = doc(fireDB, "Item", projectID.id);
        await updateDoc(docRef, {
          title: newTitle,
          tag: newTag,
          description: newDescription
        });

        console.log("Document successfully updated!");
        router.push("/feed");
      } else {
        console.log("You do not have permission to edit this item.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <>
      {projectID.user_id === currentUserID && (
        <>
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-2 rounded"
          >
            Edit Post
          </button>

          {/* Popup modal for editing */}
          {showEditModal && (
            <div className="modal-popup">
              <div className="modal-popup-content">
                <span
                  className="close"
                  onClick={() => setShowEditModal(false)}
                >
                  &times;
                </span>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Tag"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Description"
                ></textarea>
                <button onClick={handleEdit}>Update Post</button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default EditButton;
