import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoggedInSideBar from "./LoggedInSideBar";

const Posts = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [postType, setPostType] = useState("post");
  const [content, setContent] = useState("");
  const [readingPlan, setReadingPlan] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [preacher, setPreacher] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes

    for (const file of files) {
      if (file.type.startsWith("video") && file.size > maxSize) {
        toast.error("File is too big. Please select a video less than 4MB.");
        return;
      }
    }

    setSelectedFiles(files);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (!description) {
      toast.error("Please enter a description!");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("postType", postType);

    if (postType === "devotional") {
      formData.append("content", content);
      formData.append("readingPlan", readingPlan);
    } else if (postType === "sermon") {
      formData.append("content", content);
      formData.append("audioUrl", audioUrl);
      formData.append("preacher", preacher);
    }

    selectedFiles.forEach((file) => formData.append("media", file));

    setUploading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/posts`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "File upload failed!");
      }

      const responseData = await response.json();
      toast.success("Post created successfully!");
      console.log("Upload Response:", responseData);

      setUploadProgress(0);
      setSelectedFiles([]);
      setDescription("");
      setContent("");
      setReadingPlan("");
      setAudioUrl("");
      setPreacher("");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error(error.message || "An error occurred. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  const getProgressBarColor = () => {
    if (uploadProgress < 33) return "bg-red-500";
    if (uploadProgress < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="flex gap-8 max-[833px]:flex-col-reverse">
       <div className="w-6"> {/* Fixed width for sidebar */}
      <LoggedInSideBar />
    </div>
      <div className="flex flex-col items-center w-full p-4">
        {/* Header */}
        <div className="flex justify-center gap-4 mt-5 items-center">
          <img
            className="cursor-pointer w-10 h-10 rounded-full"
            onClick={() => navigate("/user-profile")}
            src="profile-icon.png"
            alt="Profile"
          />
          <h1 className="font-bold text-2xl">Create new post</h1>
        </div>
        <hr className="bg-mainTheme h-1 w-full mt-3" />

        {/* File Upload Section */}
        <div className="flex flex-col items-center mt-10 w-full max-w-2xl">
          <p className="text-2xl font-semibold max-[364px]:text-xl text-center">
            Drag photos and videos here
          </p>
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*, video/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            onClick={handleButtonClick}
            className="border border-mainTheme px-8 py-2 rounded-2xl text-lg mt-4 hover:bg-mainTheme hover:text-white transition-colors"
          >
            Select From Device
          </button>
        </div>

        {/* Post Type Selection */}
        <div className="flex flex-col items-center mt-8 w-full max-w-2xl">
          <label className="text-lg font-semibold mb-2">Select Post Type</label>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPostType("post")}
              className={`px-4 py-2 rounded-lg ${
                postType === "post" ? "bg-mainTheme text-white" : "border border-mainTheme"
              }`}
            >
              Normal Post
            </button>
            <button
              onClick={() => setPostType("devotional")}
              className={`px-4 py-2 rounded-lg ${
                postType === "devotional" ? "bg-mainTheme text-white" : "border border-mainTheme"
              }`}
            >
              Devotional
            </button>
            <button
              onClick={() => setPostType("sermon")}
              className={`px-4 py-2 rounded-lg ${
                postType === "sermon" ? "bg-mainTheme text-white" : "border border-mainTheme"
              }`}
            >
              Sermon
            </button>
          </div>
        </div>

        {/* Description and Additional Fields */}
        <div className="flex flex-col items-center mt-8 w-full max-w-2xl">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="border border-mainTheme px-4 py-2 rounded-lg w-full"
            rows={4}
          />

          {postType === "devotional" && (
            <>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter devotional content"
                className="border border-mainTheme px-4 py-2 rounded-lg w-full mt-4"
                rows={6}
              />
              <input
                type="text"
                value={readingPlan}
                onChange={(e) => setReadingPlan(e.target.value)}
                placeholder="Enter reading plan"
                className="border border-mainTheme px-4 py-2 rounded-lg w-full mt-4"
              />
            </>
          )}

          {postType === "sermon" && (
            <>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter sermon content"
                className="border border-mainTheme px-4 py-2 rounded-lg w-full mt-4"
                rows={6}
              />
              <input
                type="text"
                value={audioUrl}
                onChange={(e) => setAudioUrl(e.target.value)}
                placeholder="Enter audio URL"
                className="border border-mainTheme px-4 py-2 rounded-lg w-full mt-4"
              />
              <input
                type="text"
                value={preacher}
                onChange={(e) => setPreacher(e.target.value)}
                placeholder="Enter preacher's name"
                className="border border-mainTheme px-4 py-2 rounded-lg w-full mt-4"
              />
            </>
          )}
        </div>

        {/* File Previews */}
        {selectedFiles.length > 0 && (
          <div className="flex flex-col items-center mt-8 w-full max-w-2xl">
            <ul className="flex flex-wrap gap-4">
              {selectedFiles.map((file, index) => (
                <li key={index} className="w-24 h-24 relative">
                  {file.type.startsWith("image") && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                  {file.type.startsWith("video") && (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover rounded-md"
                      controls
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex flex-col items-center mt-8 w-full max-w-2xl">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`border ${
              uploading ? "bg-gray-300" : "border-mainTheme"
            } px-8 py-2 rounded-2xl text-lg mt-4 hover:bg-mainTheme hover:text-white transition-colors`}
          >
            {uploading ? "Uploading..." : "Post"}
          </button>
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="flex flex-col items-center mt-4 w-full max-w-2xl">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${getProgressBarColor()} h-2 rounded-full`}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="ml-4">{uploadProgress}%</span>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Posts;