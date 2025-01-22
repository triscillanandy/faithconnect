import React, { useState, useEffect } from "react";
import profileMenu from "./Profile-Images/menu.png";
import reels from "./Profile-Images/reels.png";
import tag from "./Profile-Images/tags.png";
import LoggedInSideBar from "./LoggedInSideBar";
import {FaImages,FaPlayCircle} from "react-icons/fa"; 
import PostDetailModal from "./PostDetailModal"; 
const EditProfileModal = ({ isOpen, onClose, userProfile, onSave }) => {
  const [formData, setFormData] = useState({
    username: userProfile?.username || "",
    email: userProfile?.email || "",
    dateOfBirth: userProfile?.dateOfBirth || "",
    preferences: userProfile?.preferences || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    window.location.href = "/user-profile";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Preferences</label>
            <textarea
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



const UpdateProfileImageModal = ({ isOpen, onClose, onSave }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile/image`, {
          method: "POST",
          headers: {
        Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload profile image.");
        }

        const data = await response.json();
        onSave(data.profileImage); // Update the profile image in the parent component
        onClose();
        window.location.href = "/user-profile"; // Redirect to the user profile page
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Profile Image</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Choose Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // State for selected post

  useEffect(() => {
    // Fetch the user profile details
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          console.error("Error fetching user profile:", response.statusText);
          return;
        }

        const data = await response.json();
        if (data.user) {
          setUserProfile(data.user);
        } else {
          console.error("User data not found:", data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/my-posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts); // Assuming the response contains a "posts" array
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setErrorMessage("An error occurred while fetching posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSaveProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }

      const data = await response.json();
      setUserProfile(data.user); // Update the user profile in the state
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(error.message);
    }
  };

  // if (!userProfile) {
  //   return <p>Loading...</p>;
  // }

  const handleSaveProfileImage = (newImageUrl) => {
    setUserProfile((prev) => ({ ...prev, profileImage: newImageUrl }));
  };
  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the selected post
  };

  const handleClosePostModal = () => {
    setSelectedPost(null); // Close the modal
  };

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <LoggedInSideBar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow items-center justify-center">
        <div className="text-center">
          {/* User Info */}
          <div className="flex gap-6 justify-center items-center mb-4">
            <p>@{userProfile.username}</p>
            <button
              className="w-[170px] rounded-[6px] h-[30px] bg-[#EFEFEF]"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </button>
            <button className="w-[170px] rounded-[6px] h-[30px] bg-[#EFEFEF]">
              Share profile
            </button>
          </div>

          {/* Profile Image and Stats */}
          <div className="flex items-center justify-center gap-10 mt-5">
            <div className="text-center">
              <img
                src={userProfile.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              />
              <p className="text-[10px]">{userProfile.username}</p>
            </div>
            <div className="text-center">
              <p className="text-[16px]">65</p>
              <p className="text-[12px]">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-[16px]">600</p>
              <p className="text-[12px]">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-[16px]">210</p>
              <p className="text-[12px]">Following</p>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-5">
            <p className="text-[11px] text-[#ADADAD]"></p>
            <p className="text-[11px]">Believe in Christ</p>
          </div>

          {/* Menu Icons */}
          <div className="flex gap-10 items-center mt-8 justify-center">
            <img className="cursor-pointer" src={profileMenu} alt="" />
            <img className="cursor-pointer" src={reels} alt="" />
            <img className="cursor-pointer" src={tag} alt="" />
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative w-full aspect-square overflow-hidden cursor-pointer"
                onClick={() => handlePostClick(post)} // Pass the post to the modal
              >
                {post.media && post.media.length > 0 && (
                  <>
                    <img
                      src={post.media[0].mediaUrl}
                      alt="Post media"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {post.media.length > 1 && (
                      <div className="absolute top-2 right-2 text-white">
                        <FaImages size={20} />
                      </div>
                    )}
                    {post.media.some((media) => media.mediaType.startsWith("video")) && (
                      <div className="absolute bottom-2 right-2 text-white">
                        <FaPlayCircle size={20} />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userProfile={userProfile}
        onSave={handleSaveProfile}
      />
      <UpdateProfileImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSave={handleSaveProfileImage}
      />

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal post={selectedPost} onClose={handleClosePostModal} />
      )}
    </div>
  );
};

export default UserProfile;