import app from './app';
import { dbConnection } from './db/config';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';

const PORT = process.env.PORT || 3000;

let io: SocketIOServer;

async function startServer() {
  try {
    await dbConnection;
    console.log('Connected to the database');

    const server = createServer(app);
    io = new SocketIOServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });

      socket.on('joinEventRoom', (eventID) => {
        socket.join(eventID);
        console.log(`Vendor joined room for event ${eventID}`);
      });
    });

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();

export { io };