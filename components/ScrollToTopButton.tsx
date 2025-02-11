'use client'
import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"} 
        z-50 pointer-events-auto`}
      aria-label="Scroll to top"
    >
      {/* SVG ไอคอนลูกศรขึ้น */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M11.293 3.293a1 1 0 011.414 0l7 7a1 1 0 01-1.414 1.414L13 6.414V20a1 1 0 11-2 0V6.414L5.707 11.707a1 1 0 01-1.414-1.414l7-7z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
