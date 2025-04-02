import { Server } from 'socket.io';

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected:', socket.id);
    });
  });
};

export const emitUpdate = (type: string, data: any) => {
  if (io) {
    io.emit(type, data);
  }
};
