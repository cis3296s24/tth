"use client";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { auth, Realtimedb } from "@/app/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

interface Message {
  user_id: User | null;
  text: string;
  ID: string;
  User_from: string;
  User_to: string;
  Email_from: string;
}
interface ChatItem {
  ID: string;
  Status: boolean;
  User_from: string;
  User_to: string;
  chat: Record<string, { ID: number; text: string; user_id: string }>;
}
export default function SettingsAccountPage() {
  const [currentUserID, setCurrentUserID] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserID(user.uid);
        const messageRef = ref(Realtimedb, `Messages`);
        onValue(messageRef, (snapshot) => {
          if (snapshot.exists()) {
            const MessageData = snapshot.val();
            const AllMessages: Message[] = MessageData
              ? Object.values(MessageData)
              : [];
            const filteredItems = AllMessages.filter(
              (item) => item.User_from === user.uid || item.User_to === user.uid
            );
            setMessages(filteredItems);
          } else {
          }
        });
      }
    });

    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, [auth, setCurrentUserID]);

  const messagehandel = (id: string) => {
    router.push(`/message/${id}`);
  };
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Messaging</h3>
      </div>
      <Separator />
      <div>
        <h1>Chat List</h1>
        {messages &&
          messages
            .sort((a, b) => parseInt(a.ID) - parseInt(b.ID))
            .map((message, index) => (
              <div
                key={index}
                className={
                  "flex justify-between items-center bg-gray-300 text-black rounded-lg p-2 my-1 mr-auto"
                }
              >
                <span>
                  {message.Email_from}
                  {/* {message.User_from} */}
                  {/* {message?.ID.substring(0, 4)}...$ */}
                  {/* {message?.ID.substr(message?.ID.length - 4)} */}
                </span>

                <button
                  onClick={(e) => messagehandel(message?.ID)}
                  className="bg-transparent border border-gray-500 text-gray-500 hover:text-gray-600 hover:border-gray-600 mt-2 py-2 px-4 rounded"
                >
                  contact
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}
