import 'dotenv/config';
import app from './app.js';
import { connectDB, disconnectDB } from './db/index.js';

const PORT = process.env.PORT || 3001;

let server;

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const shutdown = async () => {
  // eslint-disable-next-line no-console
  console.log('\nShutting down server...');

  server.close(async () => {
    try {
      await disconnectDB();
      // eslint-disable-next-line no-console
      console.log('Server closed');
      process.exit(0);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.error('Forcing shutdown');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();

export default server;
