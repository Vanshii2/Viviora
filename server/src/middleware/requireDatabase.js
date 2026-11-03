import mongoose from 'mongoose';
import { HttpError } from '../utils/httpError.js';

/** Fails fast with 503 instead of letting queries hang when MongoDB is not connected. */
export function requireDatabase(_req, _res, next) {
  if (mongoose.connection.readyState !== 1) {
    return next(
      new HttpError(
        503,
        'DATABASE_UNAVAILABLE',
        'Service temporarily unavailable. Please try again shortly.',
      ),
    );
  }
  return next();
}
