/* File: src/components/LanguageFilter.jsx (NEW FILE)
  Description: A reusable component with language filter buttons.
*/
import { useMovies } from '../contexts/MovieContext';

// Define the languages as a constant
const LANGUAGES = [
  { code: 'all', name: 'All' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
];

const LanguageFilter = () => {
  // Get the current filter state and the setter function from the context
  const { languageFilter, setLanguageFilter } = useMovies();

  // Define styles for the buttons
  const baseStyle = "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200";
  const activeStyle = "bg-white text-black";
  const inactiveStyle = "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white";

  return (
    // This container places the filter bar fixed at the top,
    // just below the navbar, with a glass effect.
    <div className="fixed top-20 left-0 w-full flex justify-center py-4 z-40 backdrop-blur-md">
      <div className="flex items-center gap-2 bg-black/50 p-2 rounded-full border border-gray-800 shadow-lg">
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