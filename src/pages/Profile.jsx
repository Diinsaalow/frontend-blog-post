import { useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { ImageIcon, User, Mail } from "lucide-react";
import { toast } from "react-hot-toast";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user, getAuthHeaders } = useUser();
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
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

    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    startTransition(async () => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);

        if (selectedImage) {
          formDataToSend.append("profileImage", selectedImage);
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/users/profile`,
          {
            method: "PUT",
            headers: {
              Authorization: getAuthHeaders().Authorization,
            },
            body: formDataToSend,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update profile");
        }

        const updatedUser = await response.json();
        toast.success("Profile updated successfully");

        // Update local storage with new user data
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...user,
            fullName: updatedUser.fullName,
            profileImageUrl: updatedUser.profileImageUrl,
          })
        );

        // Reload the page to reflect changes
        window.location.reload();
      } catch (error) {
        toast.error(
          error.message || "Failed to update profile. Please try again."
        );
        console.error(error);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Section */}
        <div className="space-y-4">
          <label className="text-sm font-medium">Profile Image</label>

          <div className="flex items-center space-x-6">
            {/* Current Profile Image */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              <img
                src={
                  imagePreview ||
                  user.profileImageUrl ||
                  "https://randomuser.me/api/portraits/men/1.jpg"
                }
                alt={user.fullName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Upload Button */}
            <div className="flex flex-col space-y-2">
              <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-10 px-4 hover:border-gray-400 transition-colors">
                <ImageIcon className="h-4 w-4 mr-2" />
                <span>
                  {selectedImage ? selectedImage.name : "Upload New Image"}
                </span>
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
          </div>
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <User className="h-4 w-4 mr-2" />
              Full Name
            </label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Email Address
            </label>
            <Input value={user.email} disabled className="bg-gray-50" />
            <p className="text-xs text-gray-500">
              Email address cannot be changed
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <Input value={user.role} disabled className="bg-gray-50" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
