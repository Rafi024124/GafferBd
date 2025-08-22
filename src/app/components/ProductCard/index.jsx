"use client";

import { ThemeContext } from "@/contexts/ThemeContext";
import Image from "next/image";
import React, { useContext } from "react";


export default function ProductCard({ product, onDetailsClick }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`group border rounded-xl shadow-md transition duration-300 cursor-pointer flex flex-col
        ${theme === "dark"
          ? "bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-blue-400/30"
          : "bg-white border-blue-100 hover:shadow-xl hover:shadow-blue-200"
        }`}
    >
      {/* Product Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className={`${theme === "dark" ? "text-gray-200" : "text-gray-800"} font-bold text-lg mb-1 line-clamp-1`}>
          {product.title}
        </h3>
        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm mb-2`}>
          {product.clubOrCountry}
        </p>

        <p className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"} text-xl font-semibold mb-4`}>
          ${product.price}
        </p>

        {/* CTA Button */}
        <button
          className="mt-auto bg-gradient-to-r from-blue-500 to-blue-600 
                     hover:from-blue-600 hover:to-blue-700 
                     text-white font-semibold py-2 px-4 rounded-lg shadow-md 
                     hover:shadow-lg transition duration-300"
          onClick={onDetailsClick}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
