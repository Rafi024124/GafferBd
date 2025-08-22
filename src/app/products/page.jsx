"use client";

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { useRouter } from "next/navigation";
import Spinner from "../components/spinner/Spinner";
import { ThemeContext } from "@/contexts/ThemeContext";


export default function AllProducts() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products")
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
      className={`min-h-screen py-10 px-6 max-w-7xl mx-auto transition-colors
        ${theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 to-white text-gray-900"
        }`}
    >
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1
          className={`text-3xl md:text-4xl font-extrabold drop-shadow-sm
            ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`
          }
        >
          Explore Our Products
        </h1>
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-2`}>
          Find the perfect items tailored just for you ✨
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-center text-lg`}>
          No products available yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="transform hover:scale-105 transition duration-300"
            >
              <ProductCard
                product={product}
                onDetailsClick={() => router.push(`/products/${product._id}`)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
