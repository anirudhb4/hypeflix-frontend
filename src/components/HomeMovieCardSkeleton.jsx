/* File: src/components/HomeMovieCardSkeleton.jsx (NEW FILE)
  Description: A skeleton loader component that mimics the HomeMovieCard layout.
*/
import { Zap } from 'lucide-react';

const HomeMovieCardSkeleton = () => {
  return (
    <div className="h-screen w-screen snap-start relative flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-10 bg-gray-900" />

      <div className="relative z-20 container mx-auto p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side (text content) */}
        <div className="flex flex-col gap-4 text-white animate-pulse">
          {/* Release Date */}
          <div className="h-4 bg-gray-800 rounded w-1/3"></div>
          
          {/* Title */}
          <div className="h-16 bg-gray-800 rounded w-full"></div>
          
          {/* Overview */}
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>

          {/* Buttons and Stats */}
          <div className="flex items-end gap-6 mt-6">
            <div
              className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-bold
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
        
        {/* Right side (poster) */}
        <div className="relative w-full h-[70vh] hidden md:block animate-pulse bg-gray-800 rounded-lg">
           {/* Empty div, just needs the bg color and shape */}
        </div>
      </div>
    </div>
  );
};

export default HomeMovieCardSkeleton;