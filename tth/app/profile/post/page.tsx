"use client"
import React, { useState, useEffect } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { getFirestore, collection, getDocs, DocumentData, where, query } from "firebase/firestore";
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
      const q = query(collection(db, "Item"), where("user_id", "==", userId));
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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <CardHoverEffectDemo projects={currentUserProjects} />
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

