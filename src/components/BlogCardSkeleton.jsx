import { cn } from "../lib/utils";

const BlogCardSkeleton = ({ featured = false }) => {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border bg-card text-card-foreground",
        featured ? "md:flex md:h-[380px]" : "flex flex-col h-full"
      )}
    >
      {/* Image skeleton */}
      <div
        className={cn(
          "overflow-hidden relative bg-gray-200 animate-pulse",
          featured ? "md:w-1/2" : "h-48"
        )}
      />

      {/* Content skeleton */}
      <div
        className={cn(
          "flex flex-col p-6",
          featured ? "md:w-1/2 justify-center" : "flex-1"
        )}
      >
        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Title skeleton */}
        <div
          className={cn(
            "h-8 bg-gray-200 rounded animate-pulse mb-3",
            featured ? "w-3/4" : "w-5/6"
          )}
        />

        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Author and date skeleton */}
        <div className="mt-auto">
          <div className="flex items-center text-sm space-x-4 mb-4">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Button skeleton */}
          <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </article>
  );
};

export default BlogCardSkeleton;
