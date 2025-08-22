"use client"; // must be first line

import { useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // default home
  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Register user via API
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      // 2️⃣ Automatically log in after registration
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (loginRes?.error) throw new Error(loginRes.error);

      Swal.fire({
        icon: "success",
        title: "Registered & logged in!",
        showConfirmButton: false,
        timer: 1500,
      });

      router.push(loginRes.url || callbackUrl);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-md mx-auto mt-20 p-6 rounded-xl shadow-lg ${
      theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
    }`}>
      <h2 className="text-2xl font-bold mb-4 text-center">
        Register
      </h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={loading}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={loading}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white font-semibold transition ${
            loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </div>
  );
}
