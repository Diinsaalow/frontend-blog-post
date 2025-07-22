import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";

import { ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useUser } from "../context/UserContext";

const BlogEditor = ({ initialData, isEdit = false, id }) => {
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    initialData?.thumbnailUrl || null
  );
  const { getAuthHeaders } = useUser();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    coverImage: initialData?.coverImage || "",
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }
    if (!isEdit && !selectedImage) {
      toast.error("Thumbnail image is required for new posts");
      return;
    }

    startTransition(async () => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("isFeatured", formData.isFeatured.toString());

        if (selectedImage) {
          formDataToSend.append("thumbnailImage", selectedImage);
        }

        let response;
        const headers = {
          Authorization: getAuthHeaders().Authorization,
        };

        if (isEdit) {
          response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/posts/${id}`,
            {
              method: "PUT",
              headers,
              body: formDataToSend,
            }
          );
        } else {
          response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/posts`,
            {
              method: "POST",
              headers,
              body: formDataToSend,
            }
          );
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to save blog post");
        }

        toast.success(
          isEdit
            ? "Blog post updated successfully"
            : "Blog post created successfully"
        );
        navigate("/blogs");
      } catch (error) {
        toast.error(
          error.message || "Failed to save blog post. Please try again."
        );
        console.error(error);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter your blog title"
            className="text-xl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Thumbnail Image {!isEdit && <span className="text-red-500">*</span>}
          </label>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-12 px-4 hover:border-gray-400 transition-colors">
              <ImageIcon className="h-5 w-5 mr-2" />
              <span>{selectedImage ? selectedImage.name : "Upload Image"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {(imagePreview || selectedImage) && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setImagePreview(null);
                  setSelectedImage(null);
                }}
              >
                Remove Image
              </Button>
            )}
          </div>

          {imagePreview && (
            <div className="mt-4 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-md max-h-64 object-cover"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="rounded border-gray-300"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium">
              Mark as Featured Post
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Write your blog content here..."
            rows={15}
            className="font-serif resize-none min-h-[150px] text-lg leading-relaxed"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : isEdit ? "Update Post" : "Publish Post"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
