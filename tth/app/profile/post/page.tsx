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

interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
}

interface Props {
  projects: Items[];
}

export default function Home() {
  const [currentUserProjects, setCurrentUserProjects] = useState<Items[]>([]);

  useEffect(() => {
    // Check if there's a current user
    const user = auth.currentUser;
    if (user) {
      fetchCurrentUserProjects(user.uid);
    }
  }, []);

  async function fetchCurrentUserProjects(userId: string) {
    try {
      const q = query(
        collection(db, "Item"),
        where("user_id", "==", userId),
        where("sold", "==", false)
      );
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
      <div className="text-center flex-grow">
        <CardHoverEffectDemo projects={currentUserProjects} />
      </div>
    </div>
  );
}

function CardHoverEffectDemo({ projects }: Props) {
  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">My Posts</h3>
      </div>
      <div className="">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
