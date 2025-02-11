'use client'
import { useState, useEffect } from "react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 right-0 w-2 h-screen bg-gray-900 rounded-full overflow-hidden shadow-md">
      <div
        className="bg-blue-900 w-full transition-all duration-500 ease-out"
        style={{ height: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
