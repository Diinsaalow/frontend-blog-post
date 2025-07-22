import React from "react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import BlogCard from "./BlogCard";
import { useFetch } from "../hooks/UseFetch";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const RecentPosts = () => {
  const { data: posts, loading, error, fetchData } = useFetch([]);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts`);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="text-center text-2xl font-bold">No posts found</div>;
  }

  const recentPosts = posts?.slice(0, 3);
  console.log("recentPosts", recentPosts);
  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold mb-10">Recent Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPosts.map((blog, index) => (
          <div
            key={blog.id}
            className={cn(
              "opacity translate-y-4 transition-all duration-500",

              { "transition-delay-100": index === 0 },
              { "transition-delay-200": index === 1 },
              { "transition-delay-300": index === 2 }
            )}
          >
            <BlogCard {...blog} />
          </div>
        ))}
      </div>

      {posts.length > 3 && (
        <div className="flex justify-center mt-10">
          <Link to="/blogs">
            <Button variant="outline" size="lg">
              View All Posts
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentPosts;
