import { formatReleaseDate } from '../services/utils.js';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : 'https://placehold.co/500x750/1a202c/e53e3e?text=No+Image';

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg group transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        {/* Poster Image */}
        <img 
          src={posterUrl} 
          alt={movie.title} 
          className="w-full h-96 object-cover transition-transform duration-300 group-hover:blur-[2px]" 
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        {/* Content overlaid on the bottom of the image */}
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="flex justify-between items-center mb-2">
            {/* 1. Hype Count near title */}
            <div 
              className="flex-shrink-0 bg-red-600/90 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm border border-red-500"
              title={`${movie.rawHypeScore} raw hype score`}
            >
              🔥 {movie.hypeCount}
            </div>
            
            {/* 2. Formatted Release Date */}
            <span className="text-gray-200 text-xs font-semibold bg-black/50 px-2 py-1 rounded">
              {formatReleaseDate(movie.releaseDate)}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white truncate" title={movie.title}>
            {movie.title}
          </h3>
        </div>
      </div>
      
      {/* Hype Button */}
      <div className="p-4 bg-gray-800">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">
          HYPE THIS!
        </button>
      </div>
    </div>
  );
};

export default MovieCard;