'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-[#231e52] dark:bg-[#231e52] text-white dark:text-gray-100 h-12 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto px-4 max-w-4xl flex justify-between items-center h-full">
          {/* Logo/Name - Responsive sizing */}
          <Link 
            href="/" 
            className="text-base sm:text-lg md:text-xl font-bold truncate max-w-[150px] sm:max-w-none hover:text-yellow-300 transition-colors"
            onClick={closeMenu}
          >
            DLab
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link href="/people" className="hover:text-yellow-300">
              People
            </Link>
            <Link href="/publications" className="hover:text-yellow-300">
              Publications
            </Link>
            <Link href="/gallery" className="hover:text-yellow-300">
              Gallery
            </Link>
            <Link href="/blog" className="hover:text-yellow-300">
              Blog
            </Link>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="sm:hidden p-2 hover:bg-[#312a73] dark:hover:bg-[#312a73] rounded-md transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`sm:hidden absolute top-12 left-0 right-0 bg-[#231e52] dark:bg-[#231e52] text-white shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/people"
              className="block py-2 hover:text-yellow-300"
              onClick={closeMenu}
            >
              People
            </Link>
            <Link
              href="/gallery"
              className="block py-2 hover:text-yellow-300"
              onClick={closeMenu}
            >
              Gallery
            </Link>
            <Link
              href="/publications"
              className="block py-2 hover:text-yellow-300"
              onClick={closeMenu}
            >
              Publications
            </Link>
            <Link
              href="/blog"
              className="block py-2 hover:text-yellow-300"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <div className="pt-2 border-t border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/80">Theme</span>
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-12 w-full"></div>
    </>
  );
}
