"use client";
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false); // track client mount

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme); // persist theme
      }
      return newTheme;
    });
  };

  // Only run on client
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) setTheme(storedTheme);
    }
  }, []);

  // Update body class whenever theme changes
  useEffect(() => {
    if (!mounted) return; // skip during SSR
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme, mounted]);

  // Prevent rendering children until mounted to avoid hydration issues
  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
