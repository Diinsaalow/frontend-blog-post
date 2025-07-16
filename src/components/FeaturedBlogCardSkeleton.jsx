

const FeaturedBlogCardSkeleton = () => {
  return (
    <article className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden bg-gray-200 animate-pulse">
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gray-300"></div>

      {/* Content skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 bg-gray-400 rounded-full" />
          ))}
        </div>

        {/* Title skeleton */}
        <div className="h-12 w-3/4 bg-gray-400 rounded-lg mb-4" />

        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-gray-400 rounded" />
          <div className="h-4 w-5/6 bg-gray-400 rounded" />
          <div className="h-4 w-4/6 bg-gray-400 rounded" />
        </div>

        {/* Author and date skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="h-4 w-24 bg-gray-400 rounded" />
            <div className="h-4 w-32 bg-gray-400 rounded" />
          </div>

          {/* Button skeleton */}
          <div className="h-10 w-32 bg-gray-400 rounded" />
        </div>
      </div>
    </article>
  );
};

export default FeaturedBlogCardSkeleton;
