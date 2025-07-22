import { CalendarDays, Edit, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useFetch } from "../hooks/UseFetch";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "../context/UserContext";
import { toast } from "react-hot-toast";
import CommentSection from "../components/CommentSection";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, getAuthHeaders } = useUser();
  const isAdmin = user.role?.toLowerCase() === "admin";

  const { data: post, loading, error, fetchData } = useFetch([]);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/v1/posts/${id}`);
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
  if (!post || post.length === 0) {
    return <div>No post found</div>;
  }

  console.log("post", post);
  return (
    <main className="pt-16">
      {/* Blog title and cover image */}
      <div className="relative h-[50vh] sm:h-[60vh] bg-gray-100">
        <div className="absolute top-0 left-0 right-0 p-6 md:p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              variant="outline"
              className="z-10"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>

            {isAdmin && (
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="z-10 bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  onClick={() => navigate(`/blogs/${id}/edit`)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="z-10 bg-red-600 text-white border-red-600 hover:bg-red-700"
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this blog post?"
                      )
                    ) {
                      try {
                        const response = await fetch(
                          `${import.meta.env.VITE_API_URL}/api/v1/posts/${id}`,
                          {
                            method: "DELETE",
                            headers: getAuthHeaders(),
                          }
                        );

                        if (!response.ok) {
                          throw new Error("Failed to delete blog post");
                        }

                        toast.success("Blog post deleted successfully");
                        navigate("/blogs");
                      } catch (error) {
                        toast.error("Failed to delete blog post");
                        console.error(error);
                      }
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        <img
          src={
            post.thumbnailUrl ||
            "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80"
          }
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center flex-wrap gap-4 text-white">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                <img
                  src={
                    post.author.profileImageUrl ||
                    "https://randomuser.me/api/portraits/women/44.jpg"
                  }
                  alt={post.author.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{post.author.fullName}</span>
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className="blog-content prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Comments section */}
      <CommentSection postId={id} />
    </main>
  );
};

export default BlogDetails;
