/* File: src/components/LanguageFilter.jsx
  Description: Added 'isStatic' prop to control positioning.
*/
import { useMovies } from '../contexts/MovieContext';

const LANGUAGES = [
  { code: 'all', name: 'All' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
];

// 1. Accept the new isStatic prop
const LanguageFilter = ({ isStatic = false }) => {
  const { languageFilter, setLanguageFilter } = useMovies();

  const baseStyle = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200";
  const activeStyle = "bg-white text-black";
  const inactiveStyle = "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white";

  // 2. Define layout classes based on the prop
  const layoutClasses = isStatic
    ? "relative flex justify-start py-3" // Static version (no 'fixed', 'z-index', or 'px')
    : "fixed top-20 left-0 w-full flex justify-start py-3 z-50 px-8 md:px-12"; // Original fixed version

  return (
    // 3. Apply the dynamic classes
    <div className={layoutClasses}>
      <div className="flex items-center gap-2 p-1 rounded-full">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            onClick={() => setLanguageFilter(lang.code)}
            className={`${baseStyle} ${
              languageFilter === lang.code ? activeStyle : inactiveStyle
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageFilter;