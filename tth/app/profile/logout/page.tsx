"use client";
import { Separator } from "@/components/ui/separator";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from 'next/navigation';
import router from "next/navigation";

export default function SettingsAccountPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the home page or any other page after logout
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Logout?</h3>
      </div>
      <Separator />
      <div>
        <button 
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent 
          text-white text-sm transition duration-300 ease-in-out hover:bg-white hover:text-black"
          onClick={handleLogout} // Call handleLogout function when the button is clicked
        >
          Yes
        </button>
      </div>
    </div>
  );
}



