import React, { useState, useRef, useEffect } from "react";
import LoggedInSideBar from "./LoggedInSideBar";
import ReactPlayer from "react-player";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import "./Reels.css"; // Ensure you have this CSS file for styling

// Reels Component
const Reels = ({ posts = [] }) => {
  const [currentReel, setCurrentReel] = useState(0); // Track the currently active reel
  const [isPlaying, setIsPlaying] = useState(true); // Play/pause state
  const [isMuted, setIsMuted] = useState(true); // Mute/unmute state
  const playerRef = useRef(null); // Reference to the ReactPlayer instance

  // Handle scroll to switch between reels
  const handleScroll = (e) => {
    const { deltaY } = e;
    if (deltaY > 0 && currentReel < posts.length - 1) {
      // Scroll down: move to the next reel
      setCurrentReel(currentReel + 1);
    } else if (deltaY < 0 && currentReel > 0) {
      // Scroll up: move to the previous reel
      setCurrentReel(currentReel - 1);
    }
  };

  // Toggle play/pause for the current reel
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle mute/unmute for the current reel
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Reset video when switching reels
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0); // Start the video from the beginning
      setIsPlaying(true); // Autoplay the new reel
    }
  }, [currentReel]);

  return (
    <div className="flex min-h-screen">
    <LoggedInSideBar />
    <div className="reels-container" onWheel={handleScroll}>
      {posts.length > 0 ? (
        posts.map((reel, index) => (
          <div
            key={reel.id}
            className={`reel ${index === currentReel ? "active" : ""}`}
            style={{ display: index === currentReel ? "flex" : "none" }}
          >
            {/* Video Player */}
            <ReactPlayer
              ref={playerRef}
              url={reel.media.find((media) => media.mediaType.startsWith("video")).mediaUrl}
              playing={index === currentReel && isPlaying}
              muted={isMuted}
              controls={false}
              width="100%"
              height="100%"
              loop
            />

            {/* Overlay with user info and actions */}
            <div className="overlay">
              {/* User Info */}
              <div className="user-info">
                <img
                  src={reel.user?.profileImage || "https://via.placeholder.com/40"}
                  alt="User"
                  className="user-avatar"
                />
                <span className="username">{reel.user?.username || "User"}</span>
              </div>

              {/* Actions (Like, Comment, Share, Play/Pause, Mute/Unmute) */}
              <div className="actions">
                <button onClick={togglePlay}>
                  {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                </button>
                <button onClick={toggleMute}>
                  {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                </button>
                <button>
                  <FaHeart size={24} /> {reel.likes || 0}
                </button>
                <button>
                  <FaComment size={24} /> {reel.comments || 0}
                </button>
                <button>
                  <FaShare size={24} /> {reel.shares || 0}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No video posts available.</p>
      )}
    </div>
    </div>
  );
};

// Parent Component (App)
const App = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch posts from the API
  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/getOtherPosts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Filter posts to include only those with video media
        const videoPosts = data.posts.filter((post) =>
          post.media.some((media) => media.mediaType.startsWith("video"))
        );
        setPosts(videoPosts); // Set only video posts to the state
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

  return (
    <div className="flex flex-1 ml-20">
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto h-screen scrollbar-hide">
        <div className="flex gap-4 mb-4">
          {/* Add content here if needed */}
        </div>
        <div>
          {errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <Reels posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;