import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const startRTMPStream = async (mediaStream, streamKey) => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  // Create a MediaRecorder to capture the media stream
  const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });

  // Start recording
  mediaRecorder.start();

  // Handle data available event
  mediaRecorder.ondataavailable = async (event) => {
    if (event.data.size > 0) {
      const blob = new Blob([event.data], { type: 'video/webm' });
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Write the video data to FFmpeg
      ffmpeg.FS('writeFile', 'input.webm', uint8Array);

      // Convert the video to FLV and stream to RTMP
      await ffmpeg.run(
        '-i', 'input.webm', // Input file
        '-c:v', 'libx264', // Video codec
        '-preset', 'ultrafast', // Encoding speed
        '-tune', 'zerolatency', // Low latency
        '-c:a', 'aac', // Audio codec
        '-f', 'flv', // Output format
        `rtmp://localhost/live/${streamKey}` // RTMP server URL
      );
    }
  };
};