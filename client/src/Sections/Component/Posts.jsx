import { useState } from "react";
import arrow from "./Posts-images/Arrow.png";
// import gallery from "./Posts-images/Gallery.png";
// import play from "./Posts-images/Play-icon.png";
import gallery from "./Posts-images/galle.png";
import { useNavigate } from "react-router-dom";
function Posts() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState([]);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFile(files);
  };
  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };
  return (
    <div>
      <div className="flex justify-center gap-16 mt-5 items-center">
        <img
          className="cursor-pointer"
          onClick={() => navigate("/user-profile")}
          src={arrow}
          alt=""
        />
        <h1 className="font-bold text-2xl">Create new post</h1>
      </div>
      <hr className="bg-mainTheme h-1 w-full mt-3" />

      <div className="flex justify-center mt-52">
        <img src={gallery} />
      </div>
      <p className="mt-28 -ml-8 flex flex-col items-center text-2xl font-semibold max-[364px]:items-start px-16 max-[364px]:text-xl">
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
      <div className="flex justify-center mt-8">
        <button
          onClick={handleButtonClick}
          className="border border-mainTheme px-8 py-1 rounded-2xl text-[24px]"
        >
          Select From Device
        </button>
      </div>
      {/* Display Selected Files */}
      <div style={{ marginTop: "20px" }}>
        {selectedFile.length > 0 ? (
          <ul>
            {selectedFile.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default Posts;
