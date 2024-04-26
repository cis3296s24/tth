"use client";
import React, { useState, useEffect } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  where,
  query,
} from "firebase/firestore";
import { db, auth } from "@/app/firebase";

/**
 * Represents an item in the profile bought page.
 */
interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
  buyer: string; // Assuming there's a field named "buyer"
}

/**
 * Represents the props for the ProfileBoughtPage component.
 */
interface Props {
  projects: Items[];
}

/**
 * Represents the profile bought page.
 * @returns JSX.Element representing the profile bought page.
 */
export default function Home() {
  const [currentUserProjects, setCurrentUserProjects] = useState<Items[]>([]);

  useEffect(() => {
    // Check if there's a current user
    const user = auth.currentUser;
    if (user) {
      fetchCurrentUserProjects(user.uid);
    }
  }, []);

  /**
   * fetch user items
   */
  async function fetchCurrentUserProjects(userId: string) {
    try {
      const q = query(collection(db, "Item"), where("buyer", "==", userId)); // Modify query to check the "buyer" field
      const querySnapshot = await getDocs(q);
      const projects: Items[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
        projects.push({ id: doc.id, ...doc.data() });
      });
      setCurrentUserProjects(projects);
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
  }

  return (
    <div className="">
      <div className="">
        <CardHoverEffectDemo projects={currentUserProjects} />
      </div>
    </div>
  );
}

/**
 * Represents the cards ui.
 * @returns JSX.Element representing the item cards.
 */
function CardHoverEffectDemo({ projects }: Props) {
  return (
    <div>
      <div className="">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
