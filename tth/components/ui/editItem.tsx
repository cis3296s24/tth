import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

interface Items {
  id: string;
  title: string;
  link: string;
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
  const [newLink, setNewLink] = useState(projectID.link);
  const [newTag, setNewTag] = useState(projectID.tag);
  const [newDescription, setNewDescription] = useState(projectID.description);

  const fireDB = getFirestore();
  const router = useRouter();

  const handleEdit = async () => {
    try {
      if (projectID.user_id === currentUserID) {
        const docRef = doc(fireDB, "Item", projectID.id);
        await updateDoc(docRef, {
          title: newTitle,
          link: newLink,
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
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-2 rounded"
          >
            Update Post
          </button>
        </div>
      )}
    </>
  );
}

export default EditButton;
