"use client";
import React, { useState, useEffect } from "react";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { initializeApp } from "firebase/app";
import { getFirestore, orderBy } from "firebase/firestore";
import { collection, getDocs, DocumentData, query } from "firebase/firestore";
import { db } from "../firebase";

interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
  sold: boolean;
}

interface Props {
  projects: Items[];
}

const items = ["Electronics", "Books", "Clothes", "Animals", "Accessories", "Vehicles", "Games", "Assignments", "Food"];

export default function Home() {
  const [projects, setProjects] = useState<Items[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>("Default");

  const [users, setUsers] = useState<Items[]>([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        // Query Firestore collection "Item" and order by createdAt in descending order
        const q = query(collection(db, "Item"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data: Items[] = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Items)
        );

        const filteredItems = data.filter((item) => item.sold === false);

        setUsers(filteredItems);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "Item"));
        const usersData: Items[] = [];
        querySnapshot.forEach((doc: DocumentData) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        console.log(usersData);

        const filteredItems = selectedItem
          ? usersData.filter((item) => item.tag === selectedItem)
          : usersData;

        const updated = filteredItems;
        setUsers(filteredItems);

        const filteredItems2 = selectedItem
          ? updated.filter((item) => item.sold === false)
          : updated;

        setUsers(filteredItems2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (selectedItem === "Default") {
      fetchItems();
    } else {
      fetchData();
    }
  }, [selectedItem]);

  const handleSelectChange = (value: string) => {
    setSelectedItem(value === selectedItem ? null : value); // Toggle selection if the same item is clicked again
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <label htmlFor="item" className="text-white">
        <br />
        <select
          id="item"
          value={selectedItem || ""} // Set the value to selectedItem or an empty string
          onChange={(e) => {
            handleSelectChange(e.target.value);
          }}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <option value="Default">Default</option>
          {items.map((selectedItem) => (
            <option key={selectedItem} value={selectedItem}>
              {selectedItem}
            </option>
          ))}
        </select>
      </label>
      <div className="text-center">
        <div>
          <CardHoverEffectDemo projects={users} />
        </div>
      </div>
    </div>
  );
}

function CardHoverEffectDemo({ projects }: Props) {
  return (
    <div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
