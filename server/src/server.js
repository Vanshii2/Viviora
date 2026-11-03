import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { createApp } from './app.js';

async function start() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }

  const server = createApp().listen(env.PORT, () => {
    console.log(`Viviora API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${env.PORT} is already in use. Set a different PORT in server/.env.`);
    } else {
      console.error('Server error:', error);
    }
    process.exit(1);
  });

  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down…`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start();
