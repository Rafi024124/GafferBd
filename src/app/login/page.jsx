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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl, // use callbackUrl from searchParams or fallback to "/"
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      Swal.fire({
        icon: "success",
        title: "Logged in successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push(res.url || callbackUrl);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

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
      className={`max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg transition-colors ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Login
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
          required
          disabled={loading}
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
          required
          disabled={loading}
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 transition ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:ring-blue-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

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

      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a
          href="/register"
          className={`underline ${
            theme === "dark" ? "text-blue-400" : "text-blue-500"
          }`}
        >
          Register
        </a>
      </p>
    </div>
  );
}
