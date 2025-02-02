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
  const [liked, setLiked] = useState({});
  const [touchStart, setTouchStart] = useState(0);
  const containerRef = useRef(null);
  const playerRefs = useRef([]);

  const toggleLike = (reelId) => {
    setLiked((prev) => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const toggleMute = () => setIsMuted((prev) => !prev);

  // Handle wheel scroll for desktop
  const handleWheel = (e) => {
    
    const { deltaY } = e;
    if (deltaY > 0 && currentReel < posts.length - 1) {
      setCurrentReel((prev) => prev + 1);
    } else if (deltaY < 0 && currentReel > 0) {
      setCurrentReel((prev) => prev - 1);
    }
  };

  // Handle touch start for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  // Handle touch move for mobile swipe
  const handleTouchMove = (e) => {
    e.preventDefault();
    const touchEnd = e.touches[0].clientY;
    if (touchStart - touchEnd > 50 && currentReel < posts.length - 1) {
      setCurrentReel((prev) => prev + 1);
    } else if (touchStart - touchEnd < -50 && currentReel > 0) {
      setCurrentReel((prev) => prev - 1);
    }
  };

  // Reset video on reel change
  useEffect(() => {
    if (playerRefs.current[currentReel]) {
      playerRefs.current[currentReel].seekTo(0);
      setIsPlaying(true);
    }
  }, [currentReel]);

  // Attach touch event listeners for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
  
      return () => {
        container.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [touchStart, currentReel]);
  

  return (
    <div
      className="reels-container"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
    >
      {posts.length > 0 ? (
        posts.map((reel, index) => {
          const videoMedia = reel.media.find((m) => m.mediaType.startsWith("video"));

          return (
            <div
              key={reel.id}
              className={`reel ${index === currentReel ? "active" : ""}`}
              style={{ display: index === currentReel ? "block" : "none" }}
            >
              {/* <ReactPlayer
                ref={(el) => (playerRefs.current[index] = el)}
                url={videoMedia?.mediaUrl}
                playing={index === currentReel && isPlaying}
                muted={isMuted}
                controls={false}
                width="100%"
                height="100%"
                loop
                playsinline
                config={{
                  file: {
                    attributes: {
                      playsInline: true,
                      webkitPlaysinline: true,
                    },
                  },
                }}
              /> */}
   <ReactPlayer
              ref={(el) => (playerRefs.current[index] = el)}
              url={videoMedia?.mediaUrl}
              playing={index === currentReel && isPlaying}
              muted={isMuted}
              loop
              width="100%"
              height="100%"
              playsinline
              pip={false} // Disable Picture-in-Picture
              config={{
                file: {
                  attributes: {
                    playsInline: true,
                    webkitPlaysInline: true,
                    disablePictureInPicture: true, // Prevent PiP on mobile
                  },
                },
              }}
            />
              {/* Overlay for info and controls */}
              <div className="overlay">
                {/* Top-left: User info and description */}
                <div className="reel-info">
                  <div className="user-info">
                    <img
                      src={reel.user?.profileImage || "https://via.placeholder.com/40"}
                      alt="User"
                      className="user-avatar"
                    />
                    <span className="username">{reel.user?.username || "User"}</span>
                  </div>
                  <div className="reel-description">
                    {reel.description || "No description provided."}
                  </div>
                </div>

                {/* Right side: Action buttons */}
                <div className="reel-actions">
                  <button onClick={() => toggleLike(reel.id)} className="action-button">
                    <FaHeart size={28} color={liked[reel.id] ? "red" : "white"} />
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
          );
        })
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
          <div className="mobile-reels-container">
            <Reels posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;