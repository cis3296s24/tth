"use client";
import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage, firestore } from "../firebase";
import { auth } from "../../app/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const CreateListing: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>(""); // State for selected tag
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setEmail(user.email);
      } else {
        //if user not log in
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

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  const uploadImage = async () => {
    if (
      !imageUpload ||
      !currentUser ||
      !title ||
      !description ||
      !selectedTag
    ) {
      setError("Please fill in all required fields.");
      return;
    }

  const imageRef: StorageReference = ref(
    storage,
    `images/${imageUpload.name + uuidv4()}`
  );
  

    try {
      // Upload image to storage
      await uploadBytes(imageRef, imageUpload);

      // Get download URL of the uploaded image
      const downloadUrl = await getDownloadURL(imageRef);
      console.log("Image uploaded successfully. Download URL:", downloadUrl);

      // Set the download URL in the state
      setImageUrl(downloadUrl);

      // Save data to Firestore
      const docRef = await addDoc(collection(firestore, "Item"), {
        title: title,
        description: description,
        sold: false,
        buyer: "",
        link: downloadUrl,
        tag: selectedTag, // Save the selected tag with the data
        user_id: currentUser.uid, // Save the current user's ID with the data
        createdAt: new Date(),
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);

      // Reset input fields after submission
      setTitle("");
      setDescription("");
      setSelectedTag("");
      setError("");
      setEmail("")

      setTimeout(function () {
        window.location.href = "/" + docRef.id;
      }, 1000);
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error
    }
  };

  return (
    <div className="App" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <br />
      <br />
      <br />
      <br />
      <h1 style={{ fontSize: '2em' }}>Create a Post</h1>
      {/* show the error msg */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          color: "black",
        }}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          color: "black",
        }}
      ></textarea>
      <br />
      {/* Tag dropdown */}
      <select
        value={selectedTag}
        onChange={handleTagChange}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          color: "black",
        }}
      >
        <option value="">Select Tag</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="Clothes">Clothes</option>
        <option value="Animals">Animals</option>
        <option value="Accessories">Accessories</option>
        <option value="Vehicles">Vehicles</option>
        <option value="Games">Games</option>
        <option value="Assignments">Assignments</option>
        <option value="Food">Food</option>

        {/* Add more options as needed */}
      </select>
      <br />
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files) {
            setImageUpload(event.target.files[0]);
          }
        }}
        style={{ marginLeft: "-260px", marginTop: "10px", marginBottom: "10px" }}
      />
      <br />
      <button
        type="button"
        onClick={uploadImage}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {" "}
        Upload{" "}
      </button>

      {/* Render the uploaded image */}
      {imageUrl && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            width: "200px",
            margin: "auto",
          }}
        >
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default CreateListing;
