/* File: src/components/MovieCardGridSkeleton.jsx (NEW FILE)
  Description: A skeleton loader for a grid of 8 movie cards.
*/
import { memo } from 'react';

// This is a single skeleton card
const SkeletonCard = () => (
  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-900 animate-pulse">
    {/* Image Placeholder */}
    <div className="w-full h-96 bg-gray-800" />
    <div className="p-4">
      {/* Title Placeholder */}
      <div className="h-5 bg-gray-800 rounded w-3/4 mb-2" />
      {/* Release Date Placeholder */}
      <div className="h-4 bg-gray-800 rounded w-1/2 mb-4" />
      {/* Button Placeholder */}
      <div className="h-10 bg-gray-800 rounded w-full" />
    </div>
  </div>
);

// This component renders a grid of 8 skeleton cards
const MovieCardGridSkeleton = memo(() => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {/* Create an array of 8 items to map over */}
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
});

export default MovieCardGridSkeleton;