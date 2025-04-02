import server from './server';
import { initSocket } from './socket'; // 👈 import socket setup
import http from 'http';

const port = process.env.PORT || 3030;

// Create HTTP server from Express app
const httpServer = http.createServer(server);

// Start server
httpServer.listen(port, () => {
  console.log(`🚀 Server is running on PORT: ${port}`);
  initSocket(httpServer);
});
