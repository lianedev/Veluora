"use client";

import { Bodoni_Moda_SC, GFS_Didot } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";


const bodoni = Bodoni_Moda_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const didot = GFS_Didot({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collection" },
    { name: "Products", href: "/products" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-transparent backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 px-4 sm:px-6 lg:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="shrink-0">
          <Link
            href="/"
            className={`${bodoni.className} text-3xl font-bold tracking-widest text-[#2e2720]`}
          >
            VELOURA
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
            <Link
                key={link.name}
                href={link.href}
                className={`${didot.className}  font-medium tracking-wide transition-colors duration-200 relative pb-1 ${
                isActive ? "text-[#2e2720]" : "text-gray-600 hover:text-[#2e2720]"
                }`}
            >
                {link.name}

                {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                )}
            </Link>
            );
        })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">

          {/* Search */}
          <div className="relative w-48 lg:w-64">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full py-2 pl-4 pr-10 outline-none focus:border-gray-400 text-[#2e2720] placeholder:text-[#2e2720] transition-all"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>

          {/* Cart */}
          <button className="relative p-1 text-gray-700 hover:text-[#2e2720] transition-colors">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </button>

          
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center space-x-4">

          <button className="relative p-1 text-gray-700">
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-gray-700 hover:text-black"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 px-4 py-6 space-y-4 shadow-lg">

          {/* Search */}
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full py-2 pl-4 pr-10 outline-none"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base font-medium ${
                  pathname === link.href
                    ? "text-black underline underline-offset-4"
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <hr className="border-gray-100 my-4" />

          
        </div>
      )}
    </nav>
  );
}