"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { auth, Realtimedb, db } from "@/app/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  collection,
  getDocs,
  DocumentData,
  deleteDoc,
  doc,
  getFirestore,
  getDoc,
  addDoc,
  query,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

interface Message {
  user_id: User | null;
  text: string;
  ID: string;
}
const Message: React.FC = ({ params }: any) => {
  const [currentUserID, setCurrentUserID] = useState<string | null>(null);

  const [chatUserID, setChatUserID] = useState<string | null>(null);
  const [chatOtherID, setOtherID] = useState<string | null>(null);
  const [itemID, setItemID] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const router = useRouter();
  const msgitemId = params.id;

  async function handleConfirm() {
    try {
      if (!itemID || !chatOtherID) {
        console.log(itemID);
        console.log(chatOtherID);
        console.error("itemID or chatOtherID is null");

        return;
      }

      // Display a confirmation dialog before proceeding
      const confirmed = window.confirm(
        "Are you sure you want to confirm this transaction?"
      );

      // If the user cancels the confirmation, exit the function
      if (!confirmed) return;

      const docRef = doc(db, "Transaction", itemID);
      const transactionSnap = await getDoc(docRef);

      await updateDoc(docRef, {
        buyer: chatOtherID,
      });

      const itemDocRef = doc(db, "Item", itemID);
      const itemSnap = await getDoc(itemDocRef);

      await updateDoc(itemDocRef, {
        buyer: chatOtherID,
        sold: true,
      });
      alert("done");

      //const itemData = itemSnap.data();
    } catch (error) {
      console.error("Error confirming transaction:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
        setCurrentUserID(user.uid);
        const messageRef = ref(Realtimedb, `Messages/${msgitemId}`);
        onValue(messageRef, (snapshot) => {
          if (snapshot.exists()) {
            const chatData = snapshot.val();
            setChatUserID(chatData.User_from);
            setOtherID(chatData.User_to);
            setItemID(chatData.itemId);
            if (
              chatData.User_to === user.uid ||
              chatData.User_from === user.uid
            ) {
              const chatMessages: Message[] = chatData.chat
                ? Object.values(chatData.chat)
                : [];
              setMessages(chatMessages);
              console.log(chatMessages);
            } else {
              router.push("/");
            }
          } else {
            router.push("/");
          }
        });
      } else {
        router.push("/");
      }
    });

    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, [router, setCurrentUserID, msgitemId]);

  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      const chatID = Date.now();
      await update(ref(Realtimedb, `Messages/${msgitemId}/chat/${chatID}`), {
        ID: chatID,
        user_id: currentUserID,
        text: inputText,
      });
      setInputText("");
      // Send message to backend or update Firebase Realtime Database here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mt-12">
      <div className="flex flex-col h-screen justify-between w-80 mt-12">
        <div className="p-4">
          <div className="flex flex-col space-y-2">
            {messages &&
              messages
                .sort((a, b) => parseInt(a.ID) - parseInt(b.ID))
                .map((message, index) => (
                  <div
                    key={index}
                    className={
                      message?.user_id === currentUserID
                        ? "bg-blue-500 text-white rounded-lg p-2 my-1 ml-auto"
                        : "bg-gray-300 text-black rounded-lg p-2 my-1 mr-auto"
                    }
                  >
                    <p>{message?.text}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="p-4 fixed bottom-0 left-0 right-0">
        <div className="flex justify-center items-center">
          {currentUserID === chatUserID ? (
            <div>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="border rounded-full py-2 px-4 mr-2 bg-black text-white w-30"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full"
              >
                Send
              </button>{" "}
              <Link href={"/profile/sold"}>
                <button
                  onClick={handleConfirm}
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full"
                >
                  Confirm
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="border rounded-full py-2 px-4 mr-2 bg-black text-white w-30"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-full"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
