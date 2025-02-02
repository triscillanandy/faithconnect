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
import "./Reels.css";

// Reels Component
const Reels = ({ posts = [] }) => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);
  const [liked, setLiked] = useState({});
  const [touchStart, setTouchStart] = useState(0); // Track the touch start position

  const toggleLike = (reelId) => {
    setLiked((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  // Switch reels on scroll (mouse wheel or swipe)
  const handleScroll = (e) => {
    const { deltaY } = e;
    if (deltaY > 0 && currentReel < posts.length - 1) {
      setCurrentReel(currentReel + 1);
    } else if (deltaY < 0 && currentReel > 0) {
      setCurrentReel(currentReel - 1);
    }
  };

  // Handle touch start for mobile swipe
  const handleTouchStart = (e) => {
    const touchStartPosition = e.touches[0].clientY;
    setTouchStart(touchStartPosition);
  };

  // Handle touch move for mobile swipe
  const handleTouchMove = (e) => {
    const touchEnd = e.touches[0].clientY;
    if (touchStart - touchEnd > 50 && currentReel < posts.length - 1) {
      setCurrentReel(currentReel + 1); // Swipe down to go to next reel
    } else if (touchStart - touchEnd < -50 && currentReel > 0) {
      setCurrentReel(currentReel - 1); // Swipe up to go to previous reel
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // Reset video on reel change
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setIsPlaying(true);
    }
  }, [currentReel]);

  return (
    <div
      className="reels-container"
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {posts.length > 0 ? (
        posts.map((reel, index) => (
          <div
            key={reel.id}
            className={`reel ${index === currentReel ? "active" : ""}`}
            style={{ display: index === currentReel ? "block" : "none" }}
          >
            <ReactPlayer
              ref={playerRef}
              url={
                reel.media.find((media) =>
                  media.mediaType.startsWith("video")
                ).mediaUrl
              }
              playing={index === currentReel && isPlaying}
              muted={isMuted}
              controls={false}
              width="100%"
              height="100%"
              loop
            />

            {/* Overlay for info and controls */}
            <div className="overlay">
              {/* Top-left: User info and description */}
              <div className="reel-info">
                <div className="user-info">
                  <img
                    src={
                      reel.user?.profileImage ||
                      "https://via.placeholder.com/40"
                    }
                    alt="User"
                    className="user-avatar"
                  />
                  <span className="username">
                    {reel.user?.username || "User"}
                  </span>
                </div>
                <div className="reel-description">
                  {reel.description || "No description provided."}
                </div>
              </div>

              {/* Right side: Action buttons */}
              <div className="reel-actions">
                <button
                  onClick={() => toggleLike(reel.id)}
                  className="action-button"
                >
                  <FaHeart
                    size={28}
                    color={liked[reel.id] ? "red" : "white"}
                  />
                  <span>{reel.likes + (liked[reel.id] ? 1 : 0)}</span>
                </button>
                <button className="action-button">
                  <FaComment size={28} color="white" />
                  <span>{reel.comments || 0}</span>
                </button>
                <button className="action-button">
                  <FaShare size={28} color="white" />
                  <span>{reel.shares || 0}</span>
                </button>
              </div>

              {/* Bottom controls: Play/Pause and Mute/Unmute */}
              <div className="bottom-controls">
                <button onClick={togglePlay} className="control-button">
                  {isPlaying ? (
                    <FaPause size={24} color="white" />
                  ) : (
                    <FaPlay size={24} color="white" />
                  )}
                </button>
                <button onClick={toggleMute} className="control-button">
                  {isMuted ? (
                    <FaVolumeMute size={24} color="white" />
                  ) : (
                    <FaVolumeUp size={24} color="white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-posts-message">No video posts available.</p>
      )}
    </div>
  );
};



// Parent Component (App)
const App = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token provided. Please log in.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/getOtherPosts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const videoPosts = data.posts.filter((post) =>
          post.media.some((media) => media.mediaType.startsWith("video"))
        );
        setPosts(videoPosts);
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
    <div className="app-container">
      <LoggedInSideBar />
      <div className="main-content">
        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          // Wrap the reels inside a mobile-style container
          <div className="mobile-reels-container">
            <Reels posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
