"use client";
import React, { useContext } from "react";
import Link from "next/link";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`w-full py-10 transition-colors mt-4 ${
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
            <li>
              <Link  className="hover:text-blue-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link  className="hover:text-blue-500 transition">
                Products
              </Link>
            </li>
            <li>
              <Link  className="hover:text-blue-500 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link  className="hover:text-blue-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link  className="hover:text-blue-500 transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link  className="hover:text-blue-500 transition">
                Shipping
              </Link>
            </li>
            <li>
              <Link  className="hover:text-blue-500 transition">
                Returns
              </Link>
            </li>
            <li>
              <Link  className="hover:text-blue-500 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a  className="hover:text-blue-500 transition">
              <FaFacebookF />
            </a>
            <a  className="hover:text-blue-500 transition">
              <FaTwitter />
            </a>
            <a  className="hover:text-blue-500 transition">
              <FaInstagram />
            </a>
            <a className="hover:text-blue-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
          <p className="text-sm mt-4">
            &copy; {new Date().getFullYear()} Gaffer Sports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
