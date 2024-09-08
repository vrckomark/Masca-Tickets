import app from './app';
import { dbConnection } from './db/config';

const PORT = 3000;

async function startServer() {
  try {
    await dbConnection;
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();