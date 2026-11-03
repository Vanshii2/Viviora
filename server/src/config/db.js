import mongoose from 'mongoose';
import { env } from './env.js';

const STATES = ['disconnected', 'connected', 'connecting', 'disconnecting'];

export async function connectDatabase() {
  if (!env.MONGO_URI) {
    console.warn('MONGO_URI is not set — starting without a database connection.');
    return;
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.MONGO_URI);
  console.log('MongoDB connected');
}

export function getDatabaseStatus() {
  return STATES[mongoose.connection.readyState] ?? 'unknown';
}

export function disconnectDatabase() {
  return mongoose.connection.close();
}
