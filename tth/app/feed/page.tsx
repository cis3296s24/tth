"use client";

import React, { useState, useEffect } from "react";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { db } from "../firebase";
import { getDocs, query, collection, orderBy, where, DocumentData, Timestamp } from "firebase/firestore";

interface Items {
  createdAt: Timestamp;
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

const items = ["Books", "Electronics"];

export default function Home() {
  const [projects, setProjects] = useState<Items[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>("Default");

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "Item"));
        const usersData: Items[] = [];
        querySnapshot.forEach((doc: DocumentData) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });

        let filteredItems = usersData.filter((item) => !item.sold);

        if (selectedItem && selectedItem !== "Default") {
          filteredItems = filteredItems.filter((item) => item.tag === selectedItem);
        }

        // Order the filtered items by createdAt in descending order
        filteredItems.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

        setProjects(filteredItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [selectedItem]);

  const handleSelectChange = (value: string) => {
    setSelectedItem(value === selectedItem ? null : value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <label htmlFor="item" className="text-white">
        <br />
        <select
          id="item"
          value={selectedItem || ""}
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
          <CardHoverEffectDemo projects={projects} />
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
