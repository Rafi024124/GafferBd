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

  const [loading, setLoading] = useState(false);
  

 const handleGoogleSignIn = async () => {
  setLoading(true);
  try {
    const callbackUrlParam = searchParams.get("callbackUrl") || "/products";
    const fullCallbackUrl = `${window.location.origin}${callbackUrlParam}`;
    await signIn("google", { callbackUrl: fullCallbackUrl });
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className={`mb-4 flex items-center justify-center min-h-screen p-4 bg-gray-100 transition-colors ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-sm p-8 rounded-2xl shadow-2xl transition-colors ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-gray-400 mb-6">
          Sign in with your Google account to continue
        </p>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition-colors ${
            loading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
