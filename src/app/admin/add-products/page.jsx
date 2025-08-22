"use client";
import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { ThemeContext } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/app/components/ProtectedRoutes";


// Dynamically import react-select (SSR disabled)
const Select = dynamic(() => import("react-select"), { ssr: false });

export default function AddProducts() {
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [clubOrCountry, setClubOrCountry] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [stockCount, setStockCount] = useState("");
  const [loading, setLoading] = useState(false);

  const sizeOptions = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "XXXL", label: "XXXL" },
  ];

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "white", label: "White" },
    { value: "black", label: "Black" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const productData = {
      title,
      clubOrCountry,
      price: parseFloat(price),
      sizes: sizes.map((s) => s.value),
      colors: colors.map((c) => c.value),
      image,
      description,
      stockCount: parseInt(stockCount),
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "✅ Product Added!",
          text: `${title} has been successfully added.`,
          confirmButtonColor: "#2563eb",
        });

        // Reset form
        setTitle("");
        setClubOrCountry("");
        setPrice("");
        setSizes([]);
        setColors([]);
        setImage("");
        setDescription("");
        setStockCount("");
      } else {
        await Swal.fire({
          icon: "error",
          title: "❌ Failed to Add Product",
          text: "Something went wrong while adding the product.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "⚠️ Error",
        text: err.message,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
   <ProtectedRoute>
     <div
      className={`max-w-2xl mx-auto shadow-xl rounded-2xl overflow-hidden mt-10 transition-colors
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Header */}
      <div className={`p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gradient-to-r from-blue-500 to-blue-700"}`}>
        <h2 className="text-white text-xl font-bold text-center">
          Add New Product
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Title */}
        <div>
          <label className={`block mb-1 font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            Product Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:border-blue-500 transition
              ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
            placeholder="Enter product title"
            required
          />
        </div>

        {/* Club or Country */}
        <div>
          <label className={`block mb-1 font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            Club / Country
          </label>
          <input
            type="text"
            value={clubOrCountry}
            onChange={(e) => setClubOrCountry(e.target.value)}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:border-blue-500 transition
              ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
            placeholder="e.g. Manchester United"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className={`block mb-1 font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:border-blue-500 transition
              ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Sizes */}
        <div>
          <label className={`block mb-1 font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            Available Sizes
          </label>
          <Select
            isMulti
            options={sizeOptions}
            value={sizes}
            onChange={setSizes}
            placeholder="Select sizes..."
            classNamePrefix="react-select"
            theme={(selectTheme) => ({
              ...selectTheme,
              colors: {
                ...selectTheme.colors,
                primary25: theme === "dark" ? "#1f2937" : "#e0f2fe",
                primary: theme === "dark" ? "#3b82f6" : "#2563eb",
              },
            })}
          />
        </div>

        {/* Colors */}
        <div>
          <label className={`block mb-1 font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            Available Colors
          </label>
          <Select
            isMulti
            options={colorOptions}
            value={colors}
            onChange={setColors}
            placeholder="Select colors..."
            classNamePrefix="react-select"
            theme={(selectTheme) => ({
              ...selectTheme,
              colors: {
                ...selectTheme.colors,
                primary25: theme === "dark" ? "#1f2937" : "#e0f2fe",
                primary: theme === "dark" ? "#3b82f6" : "#2563eb",
              },
            })}
          />
        </div>

        {/* Image */}
        <div>
          <label className={`block mb-1 font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            Image URL
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:border-blue-500 transition
              ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
            placeholder="/images/munited-home.png"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className={`block mb-1 font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:border-blue-500 transition
              ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
            rows={3}
            placeholder="Enter product description"
            required
          ></textarea>
        </div>

        {/* Stock Count */}
        <div>
          <label className={`block mb-1 font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>
            Stock Count
          </label>
          <input
            type="number"
            value={stockCount}
            onChange={(e) => setStockCount(e.target.value)}
            className={`w-full border rounded-lg p-2 focus:ring-2 focus:border-blue-500 transition
              ${theme === "dark" ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
            placeholder="Enter available stock"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-2 rounded-lg flex justify-center items-center font-semibold shadow-md transition
            ${theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
            }`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          ) : (
            "Add Product"
          )}
        </button>
      </form>
    </div>
   </ProtectedRoute>
  );
}
