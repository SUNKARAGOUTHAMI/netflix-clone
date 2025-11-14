'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <Image
            src="/vercel.svg"
            alt="Logo"
            width={32}
            height={32}
            priority
            className="mr-2"
          />
          <span className="font-semibold text-lg tracking-wide text-white select-none">
            Streaming
          </span>
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Home"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/movie/popular"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Popular Movies"
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              href="/movie/top-rated"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Top Rated Movies"
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              href="/movie/upcoming"
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label="Upcoming Movies"
            >
              Upcoming
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
