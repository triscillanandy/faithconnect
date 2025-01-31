import NodeMediaServer from 'node-media-server';

const config = {
  rtmp: {
    port: 1935, // RTMP port
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000, // HTTP port for HLS
    allow_origin: '*',
  },
};

const nms = new NodeMediaServer(config);
nms.run();

console.log('RTMP server running on port 1935');
console.log('HTTP server running on port 8000');