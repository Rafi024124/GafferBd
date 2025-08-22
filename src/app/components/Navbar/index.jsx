"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiOutlineMenu } from "react-icons/hi";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    // Only show Add Products if user is logged in
    { href: "/admin/add-products", label: "Add Product" }
  ];

  const navItems = navLinks.map(({ href, label }) => {
    const isActive = mounted && pathname === href;
    return (
      <li key={href}>
        <Link
          href={href}
          className={`relative px-2 py-1 transition ${
            isActive ? "text-blue-500 font-bold" : "text-blue-500"
          }`}
        >
          {label}
        </Link>
      </li>
    );
  });

  return (
    <div
      className={`navbar px-6 max-w-7xl mx-auto rounded-full sticky top-0 z-10 mb-4 ${
        theme === "dark" ? "bg-gray-900 text-white shadow-lg" : "bg-white text-gray-900 shadow-md"
      }`}
    >
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown relative">
          <div
            className="lg:hidden text-blue-500 p-2 cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <HiOutlineMenu className="text-2xl" />
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <Motion.ul
                key="dropdown"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
                className="absolute left-0 mt-3 p-2 w-48 shadow rounded-box z-[999] bg-black/80 backdrop-blur-md"
              >
                {mounted && session?.user && (
                  <div className="mt-3 flex gap-2 mb-2 items-center bg-black p-1 rounded-t-2xl">
                    <img
                      src={session.user.image || "/default-profile.png"}
                      alt="profile"
                      className="w-10 h-10 rounded-full border-2 border-blue-500"
                    />
                    <span className="text-white text-sm">{session.user.name}</span>
                  </div>
                )}
                {navItems}
              </Motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 cursor-pointer">
            <Link href="/">
              <Image src="/football.png" alt="Logo" fill className="rounded-full object-cover" />
            </Link>
          </div>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
      </div>

      <div className="navbar-end flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300
            ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg hover:from-blue-500 hover:to-blue-700"
                : "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg hover:from-gray-600 hover:to-gray-800"
            }`}
        >
          {theme === "light" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="yellow"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm5.657 3.343a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414L17.657 6.757a1 1 0 010-1.414zM22 11a1 1 0 110 2h-2a1 1 0 110-2h2zm-3.343 5.657a1 1 0 010 1.414l-1.414 1.414a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM12 20a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-5.657-3.343a1 1 0 011.414 0L9.172 18.07a1 1 0 01-1.414 1.414L5.929 18.07a1 1 0 010-1.414zM2 11a1 1 0 110 2H0a1 1 0 110-2h2zm3.343-5.657a1 1 0 010 1.414L3.93 8.172a1 1 0 11-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM12 6a6 6 0 100 12 6 6 0 000-12z" />
              </svg>
              Dark Mode
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="white"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path d="M21.752 15.002A9 9 0 1112 3a7 7 0 009.752 12.002z" />
              </svg>
              Light Mode
            </>
          )}
        </button>
        {mounted && (session?.user ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white">
                Register
              </button>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}
