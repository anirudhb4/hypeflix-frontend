/* File: src/components/LanguageFilter.jsx
  Description: Added 'flex-wrap' to allow buttons to wrap on small screens.
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

const LanguageFilter = ({ isStatic = false }) => {
  const { languageFilter, setLanguageFilter } = useMovies();

  const baseStyle = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-200";
  const activeStyle = "bg-white text-black";
  const inactiveStyle = "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white";

  const layoutClasses = isStatic
    ? "relative flex justify-start py-3" 
    // Added responsive padding for mobile
    : "fixed top-20 left-0 w-full flex justify-start py-3 z-50 px-4 sm:px-8 md:px-12"; 

  return (
    <div className={layoutClasses}>
      {/* Added flex-wrap to allow buttons to stack on small screens */}
      <div className="flex flex-wrap justify-start items-center gap-2 p-1 rounded-full">
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