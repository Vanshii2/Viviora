import { env } from '../config/env.js';

// Central error handler. Never leaks stack traces or internal messages in production.
export function errorHandler(err, _req, res, _next) {
  // Malformed JSON bodies from express.json()
  if (err.type === 'entity.parse.failed')
    err = Object.assign(err, { status: 400, code: 'INVALID_JSON', message: 'Invalid JSON body' });
  if (err.type === 'entity.too.large')
    err = Object.assign(err, {
      status: 413,
      code: 'PAYLOAD_TOO_LARGE',
      message: 'Request body too large',
    });

  const status = err.status || err.statusCode || 500;
  const isServerError = status >= 500;

  if (isServerError && status !== 503) console.error(err);

  res.status(status).json({
    success: false,
    error: {
      code: err.code || (isServerError ? 'INTERNAL_ERROR' : 'REQUEST_ERROR'),
      message: isServerError && env.isProduction ? 'Something went wrong' : err.message,
      ...(err.details && !isServerError ? { details: err.details } : {}),
    },
  });
}
