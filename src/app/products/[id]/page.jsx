"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/app/components/ProtectedRoutes";
import Spinner from "@/app/components/spinner/Spinner";


export default function ProductDetailsPage() {
  const { theme } = useContext(ThemeContext);

  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.response?.data?.error || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Spinner></Spinner>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-500">{error}</p>
    );
  if (!product)
    return (
      <p className="text-center mt-20 text-gray-400">Product not found.</p>
    );

  return (
    <div
      className={`max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 rounded-2xl transition
        ${theme === "dark"
          ? "bg-gray-900 shadow-xl shadow-blue-500/40 text-white"
          : "bg-white shadow-xl shadow-blue-500/20 text-gray-900"
        }
      `}
    >
      {/* Image */}
      <div className="relative w-full h-96 rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1
            className={`text-4xl font-bold mb-2 ${
              theme === "dark" ? "text-blue-400" : "text-blue-500"
            }`}
          >
            {product.title}
          </h1>
          <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {product.clubOrCountry}
          </p>
          <p
            className={`text-2xl font-semibold mb-4 ${
              theme === "dark" ? "text-blue-300" : "text-blue-400"
            }`}
          >
            ${product.price}
          </p>
          <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {product.description || "No description available."}
          </p>
          <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Available Sizes: {product.sizes?.length ? product.sizes.join(", ") : "Not specified"}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className={`py-3 rounded-xl font-semibold shadow-md transition
              ${theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-400/30"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30"
              }`}
          >
            Add to Cart
          </button>
          <Link
            href="/"
            className={`text-center py-3 rounded-xl font-semibold transition border
              ${theme === "dark"
                ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
