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
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload!");
      return;
    }
    if (!description) {
      toast.error("Please enter a description!");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
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
    <div className="flex gap-24 max-[833px]:flex-col-reverse">
      <LoggedInSideBar />
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-center gap-16 mt-5 items-center">
          <img
            className="cursor-pointer"
            onClick={() => navigate("/user-profile")}
            alt=""
          />
          <h1 className="font-bold text-2xl">Create new post</h1>
        </div>
        <hr className="bg-mainTheme h-1 w-full mt-3" />

        <div className="flex flex-col items-center mt-10">
          <p className="text-2xl font-semibold max-[364px]:text-xl">
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
            className="border border-mainTheme px-8 py-1 rounded-2xl text-[24px] mt-4"
          >
            Select From Device
          </button>
        </div>

        <div className="flex flex-col items-center mt-8 w-3/4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="border border-mainTheme px-4 py-2 rounded-lg w-full"
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex flex-col items-center mt-8 w-3/4">
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
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`border ${
                uploading ? "bg-gray-300" : "border-mainTheme"
              } px-8 py-1 rounded-2xl text-[24px] mt-4`}
            >
              {uploading ? "Uploading..." : "Post"}
            </button>
          </div>
        )}

        {uploading && (
          <div className="flex flex-col items-center mt-4 w-3/4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`${getProgressBarColor()} h-4 rounded-full`}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="ml-4">{uploadProgress}%</span>
          </div>
        )}
      </div>

      {/* Toast Container */}
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
