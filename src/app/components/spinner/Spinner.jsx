"use client";
import React from "react";

export default function Spinner({ size = 16, color = "blue" }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className={`animate-spin rounded-full border-t-4 border-b-4 border-${color}-500`}
        style={{ width: size * 4, height: size * 4 }}
      ></div>
    </div>
  );
}
