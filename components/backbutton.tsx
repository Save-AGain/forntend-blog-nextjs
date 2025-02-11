'use client'

const BackButton = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className={`fixed bottom-6 left-6 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 } 
        z-50 pointer-events-auto`}
      aria-label="BackButton"
    >
      {/* SVG ไอคอนลูกศรขึ้น */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M10.828 12l4.95-4.95a1 1 0 10-1.414-1.414l-5.657 5.657a1 1 0 000 1.414l5.657 5.657a1 1 0 101.414-1.414L10.828 12z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default BackButton;
