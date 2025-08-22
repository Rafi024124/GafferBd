"use client";
import React, { useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`mt-4 w-full py-10 transition-colors ${
        theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-500">Gaffer Sports</h3>
          <p className="text-sm">
            Official merchandise store for football enthusiasts. Stay stylish and sporty with our
            premium kits and accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>FAQ</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-gray-500">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
          <p className="text-sm mt-4">
            &copy; {new Date().getFullYear()} Gaffer Sports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
