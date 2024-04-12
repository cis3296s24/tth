"use client";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage, firestore, db } from "../firebase";
import { auth } from "../../app/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import Image from "next/image";

const EditListing: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [sucessUpdate, setSucessUpdate] = useState(false);
  const [lodingthumbnail, setLodingThumbnail] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const postid = searchParams.get("postid");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (postid) {
          try {
            const docRef = doc(db, "Item", postid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const itemData = docSnap.data();
              // Handle itemData as needed
              if (itemData.user_id === user.uid) {
                setImageUrl(itemData.link);
                setTitle(itemData.title);
                setDescription(itemData.description);
              } else {
                router.push("/feed");
              }
            } else {
              router.push("/feed");
              console.log("No such document!");
            }
          } catch (error) {
            console.error("Error getting document:", error);
          }
        } else {
          console.error("postid is null or undefined");
        }
        setCurrentUser(user);
      } else {
        // If user is not logged in
        setCurrentUser(null);
        window.location.href = "/login";
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser || !title || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    const files = e.target.files;
    if (!files || files.length === 0) {
      setError("No file selected.");
      return;
    }
    const file = files[0];
    setLodingThumbnail(true);

    const imageRef: StorageReference = ref(
      storage,
      `images/${file.name + uuidv4()}`
    );

    try {
      // Upload image to storage
      await uploadBytes(imageRef, file);

      // Get download URL of the uploaded image
      const downloadUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully. Download URL:", downloadUrl);

      // Set the download URL in the state
      setImageUrl(downloadUrl);
      setLodingThumbnail(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };

  //////Item Updates
  const updatetemes = () => {
    try {
      if (!currentUser) {
        console.error("No user is currently logged in.");
        return; // Exit function early if no user is logged in
      }
      // Update data to Firestore
      if (postid) {
        const docRefs = doc(db, "Item", postid);
        updateDoc(docRefs, {
          title: title,
          description: description,
          link: imageUrl,
          user_id: currentUser.uid,
          createdAt: new Date(),
        })
          .then(() => {
            setSucessUpdate(true);
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
            setError(error);
          });
      } else {
        console.error("postid is null or undefined");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const isImage =
    imageUrl &&
    (imageUrl.includes(".jpg") ||
      imageUrl.includes(".jpeg") ||
      imageUrl.includes(".PNG") ||
      imageUrl.includes(".png") ||
      imageUrl.includes(".gif") ||
      imageUrl.includes(".pdf"));
  const isVideo =
    imageUrl &&
    (imageUrl.includes(".mp4") ||
      imageUrl.includes(".webm") ||
      imageUrl.includes(".ogg") ||
      imageUrl.includes(".mov"));

  return (
    <div className="flex justify-center items-center h-screen">
      {imageUrl && (
        <div className="max-w-sm rounded-[22px] overflow-hidden">
          {error && <p style={{ color: "red", margin: "5px" }}> ⓘ {error}</p>}
          {sucessUpdate && (
            <p style={{ color: "green", margin: "5px" }}>
              {" "}
              ⓘ The post has been successfully updated
            </p>
          )}
          <BackgroundGradient className="p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <div className="flex justify-center items-center">
              <input
                type="file"
                accept="image/*"
                id="imageInput"
                hidden
                onChange={handleImageChange}
              />
              <label htmlFor="imageInput" className="image-button">
                <Image
                  src={isImage ? imageUrl : "/puse.svg"}
                  alt="NOT FOUND"
                  width={200}
                  height={200}
                  className="object-cover group-hover:opacity-50 transition-opacity"
                />
              </label>
            </div>
            <div className="flex justify-between items-center text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="bg-black outline-none text-white py-2 px-3 text-sm font-medium w-full"
              />
            </div>

            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="bg-black outline-none text-white py-2 px-3 text-sm font-medium h-60 w-full"
              />
            </div>
            <br></br>
            <div className="flex justify-center items-center text-sm text-neutral-600 dark:text-neutral-400">
              <button
                onClick={updatetemes}
                disabled={lodingthumbnail}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-2 rounded"
              >
                Update Post
              </button>
            </div>
          </BackgroundGradient>
        </div>
      )}
    </div>
  );
};

export default EditListing;
