import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaHeart, FaComment, FaShare, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./Reels.css";

const Reels = () => {
  const [reels, setReels] = useState([
    { id: 1, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", likes: 1200, comments: 45, shares: 30 },
    { id: 2, url: "https://www.youtube.com/watch?v=9bZkp7q19f0", likes: 2500, comments: 120, shares: 80 },
    { id: 3, url: "https://www.youtube.com/watch?v=JGwWNGJdvx8", likes: 3500, comments: 200, shares: 150 },
  ]);
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef(null);

  // Handle scroll to switch reels
  const handleScroll = (e) => {
    const { deltaY } = e;
    if (deltaY > 0 && currentReel < reels.length - 1) {
      setCurrentReel(currentReel + 1);
    } else if (deltaY < 0 && currentReel > 0) {
      setCurrentReel(currentReel - 1);
    }
  };

  // Play/pause video
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Mute/unmute video
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Reset video when switching reels
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setIsPlaying(true);
    }
  }, [currentReel]);

  return (
    <div className="reels-container" onWheel={handleScroll}>
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          className={`reel ${index === currentReel ? "active" : ""}`}
          style={{ display: index === currentReel ? "flex" : "none" }}
        >
          <ReactPlayer
            ref={playerRef}
            url={reel.url}
            playing={index === currentReel && isPlaying}
            muted={isMuted}
            controls={false}
            width="100%"
            height="100%"
            loop
          />
          <div className="overlay">
            <div className="user-info">
              <img src="https://via.placeholder.com/40" alt="User" className="user-avatar" />
              <span className="username">User{reel.id}</span>
            </div>
            <div className="actions">
              <button onClick={togglePlay}>
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>
              <button onClick={toggleMute}>
                {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
              </button>
              <button>
                <FaHeart size={24} /> {reel.likes}
              </button>
              <button>
                <FaComment size={24} /> {reel.comments}
              </button>
              <button>
                <FaShare size={24} /> {reel.shares}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;