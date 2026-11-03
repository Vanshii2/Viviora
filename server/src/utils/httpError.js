/** Error carrying an HTTP status and machine-readable code; rendered by the central error handler. */
export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const notFoundError = (what = 'Resource') =>
  new HttpError(404, 'NOT_FOUND', `${what} not found`);
