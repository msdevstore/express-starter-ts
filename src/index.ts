import mongoose from 'mongoose';
import server from './app';
import { CONFIG } from './constants/config';

process.on('uncaughtException', async (err) => {
  console.log(err.message);
  process.exit(1);
});

mongoose.connect(CONFIG.MONGODB_URL).then(() => {
  console.log('Connected to MongoDB');

  server.listen(CONFIG.PORT, () => {
    console.log(`Listening to port: ${CONFIG.PORT}`);
    console.log(`NODE_ENV: ${CONFIG.ENV}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
