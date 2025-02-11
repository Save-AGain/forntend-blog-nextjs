"use client";
import { useState } from "react";
import MobileNav from "./MobileNav";
import Link from "next/link";
import headerNavLinks from "./headerNavLinks";
import SearchResults from "./SearchResults";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/">
          <div className="flex items-center justify-between">
            <div className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 hover:text-blue-800"
              >
                <path d="M12 2L2 10h3v10h6V14h2v6h6V10h3L12 2z" />
              </svg>

            </div>
            <div className="hidden h-6 text-2xl font-semibold sm:block hover:text-blue-800">
              Home
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium sm:block hover:text-blue-800"
            >
              {link.title}
            </Link>
          ))}
        <div className="relative z-50">
          <button onClick={toggleSearch} className="p-2 hover:text-blue-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-900"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6M9 16a7 7 0 110-14 7 7 0 010 14z"
              />
            </svg>
          </button>

          {/* กล่องค้นหา (แสดงเมื่อ showSearch === true) */}
          {showSearch && (
            <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-lg shadow-lg" style={{ background: 'var(--color-card)' }}>
              <input
                type="text"
                placeholder="ค้นหา..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                style={{ background: 'var(--color-card-muted)' }}
              />

              {/* แสดงผลลัพธ์ค้นหา */}
              {query && <SearchResults query={query} />}

              <button className="mt-2 w-full text-gray-300 p-2 rounded-md" style={{ background: 'var(--color-card)' }} onClick={() => console.log("ค้นหา:", query)}>
                ค้นหา
              </button>
            </div>
          )}
        </div>
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
