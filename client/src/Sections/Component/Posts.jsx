import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInSideBar from "./LoggedInSideBar";

const Posts = () => {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return alert("Please select files to upload!");
    if (!description) return alert("Please enter a description!");

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
        throw new Error("File upload failed!");
      }

      const responseData = await response.json();
      alert("Post created successfully!");
      console.log("Upload Response:", responseData);

      setUploadProgress(0);
      setSelectedFiles([]);
      setDescription("");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files.");
    } finally {
      setUploading(false);
    }
  };

  const handleProgress = (event) => {
    if (event.lengthComputable) {
      const progress = Math.round((event.loaded / event.total) * 100);
      setUploadProgress(progress);
    }
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
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`border ${
                uploading ? "bg-gray-300" : "border-mainTheme"
              } px-8 py-1 rounded-2xl text-[24px] mt-4`}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        )}

        {uploading && (
          <div className="flex flex-col items-center mt-4 w-3/4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-mainTheme h-4 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="ml-4">{uploadProgress}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
