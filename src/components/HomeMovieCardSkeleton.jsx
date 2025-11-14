/* File: src/components/HomeMovieCardSkeleton.jsx
  Description: Matched responsive layout of the real card.
*/
import { Zap } from 'lucide-react';

const HomeMovieCardSkeleton = () => {
  return (
    <div className="h-screen w-screen snap-start relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-10 bg-gray-900" />

      {/* Reduced padding on mobile */}
      <div className="relative z-20 container mx-auto p-6 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex flex-col gap-4 text-white animate-pulse">
          
          <div className="h-4 bg-gray-800 rounded w-1/3"></div>
          
          {/* Responsive title placeholder */}
          <div className="h-12 sm:h-16 bg-gray-800 rounded w-full"></div>
          
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>

          {/* Stacks vertically on mobile */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 mt-6">
            {/* Responsive button placeholder */}
            <div
              className="relative flex items-center justify-center gap-2 px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-full
                 bg-gray-800 text-transparent"
            >
              <Zap />
              <span>Hype This!</span>
            </div>
            
            <div className="flex flex-col border-l-2 border-gray-700 pl-6">
              <div className="h-7 w-12 bg-gray-800 rounded"></div>
              <div className="h-3 w-16 bg-gray-800 rounded mt-2"></div>
            </div>
          </div>
        </div>
        
        <div className="relative w-full h-[70vh] hidden md:block animate-pulse bg-gray-800 rounded-lg">
        </div>
      </div>
    </div>
  );
};

export default HomeMovieCardSkeleton;