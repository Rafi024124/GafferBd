"use client";

import { useState, useContext } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { ThemeContext } from "@/contexts/ThemeContext";


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

 

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg transition-colors ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Login
      </h2>

     

      <div className="mt-4 text-center">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full p-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Sign in with Google
        </button>
      </div>

      
    </div>
  );
}
