import React, { useEffect, useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const LiveStream = () => {
  const videoRef = useRef(null);
  const [streamKey, setStreamKey] = useState('');
  const [mediaStream, setMediaStream] = useState(null);

  // Access the camera and microphone
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera and microphone:', error);
    }
  };

  // Start the live stream
  const handleStartStream = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/streams/start`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start stream');
      }

      const data = await response.json();
      setStreamKey(data.streamKey);

      // Start streaming the media stream to the RTMP server
      if (mediaStream) {
        startRTMPStream(mediaStream, data.streamKey);
      }
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  // Stream to RTMP server using FFmpeg
  const startRTMPStream = async (mediaStream, streamKey) => {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load();

    const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });
    mediaRecorder.start();

    mediaRecorder.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        const blob = new Blob([event.data], { type: 'video/webm' });
        const arrayBuffer = await blob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        await ffmpeg.writeFile('input.webm', uint8Array);

        await ffmpeg.exec([
          '-i', 'input.webm',
          '-c:v', 'libx264',
          '-preset', 'ultrafast',
          '-tune', 'zerolatency',
          '-c:a', 'aac',
          '-f', 'flv',
          `rtmp://localhost/live/${streamKey}`,
        ]);
      }
    };
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>Start Live Stream</h1>
      <video ref={videoRef} autoPlay muted />
      <button onClick={handleStartStream}>Start Stream</button>
      {streamKey && (
        <div>
          <p>Your Stream Key: {streamKey}</p>
          <p>Streaming to: rtmp://localhost/live/{streamKey}</p>
        </div>
      )}
    </div>
  );
};

export default LiveStream;