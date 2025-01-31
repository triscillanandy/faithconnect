import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Hls from 'hls.js';
import { useParams } from 'react-router-dom';

const WatchStream = () => {
  const { streamKey } = useParams();
  const videoRef = useRef(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [streamError, setStreamError] = useState('');

  // Fetch the stream URL
  useEffect(() => {
    const fetchStreamUrl = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/streams/${streamKey}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stream URL');
        }

        const data = await response.json();
        setStreamUrl(data.streamUrl);
        setStreamError('');
      } catch (error) {
        console.error('Error fetching stream URL:', error);
        setStreamError('Stream is unavailable. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreamUrl();
  }, [streamKey]);

  // Initialize the video player
  useEffect(() => {
    if (!streamUrl) return;

    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
    });

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        player.play();
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (e.g., Safari)
      videoRef.current.src = streamUrl;
      videoRef.current.addEventListener('loadedmetadata', () => {
        player.play();
      });
    } else {
      console.error('HLS is not supported in this browser.');
    }

    return () => {
      player.dispose();
    };
  }, [streamUrl]);

  return (
    <div>
      <h1>Watch Live Stream</h1>
      {isLoading ? (
        <p>Loading stream...</p>
      ) : streamError ? (
        <p>{streamError}</p>
      ) : (
        <video ref={videoRef} className="video-js" />
      )}
    </div>
  );
};

export default WatchStream;