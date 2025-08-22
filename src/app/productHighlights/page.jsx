"use client";

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { useRouter } from "next/navigation";
import Spinner from "../components/spinner/Spinner";
import { ThemeContext } from "@/contexts/ThemeContext";


export default function ProductHighlights() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products?limit=4")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div
      className={`max-w-7xl mx-auto min-h-[60vh] py-10 px-6 transition-colors
        ${theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-white to-blue-50 text-gray-900"
        }`}
    >
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2
          className={`text-2xl md:text-3xl font-extrabold
            ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
        >
          Featured Highlights
        </h2>
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-2`}>
          A quick glance at our top products 🚀
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-center text-lg`}>
          No highlighted products available.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="transform hover:scale-105 transition duration-300"
            >
              <ProductCard
                product={product}
                onDetailsClick={() =>
                  router.push(`/products/${product._id}`)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
