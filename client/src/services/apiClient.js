import axios from 'axios';

/** Normalized API error used throughout the UI. */
export class ApiError extends Error {
  constructor({ status = 0, code = 'NETWORK_ERROR', message, details }) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/** True for the static GitHub Pages preview: data comes from bundled seed content, nothing is sent. */
export const IS_DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 10000,
  headers: { Accept: 'application/json' },
  ...(IS_DEMO && {
    adapter: async (config) => (await import('./demo/demoAdapter.js')).default(config),
  }),
});

// Unwrap `{ success, data }` responses and turn every failure into an ApiError.
apiClient.interceptors.response.use(
  (response) => response.data?.data,
  (error) => {
    const body = error.response?.data?.error;
    return Promise.reject(
      new ApiError({
        status: error.response?.status ?? 0,
        code: body?.code ?? (error.code === 'ECONNABORTED' ? 'TIMEOUT' : 'NETWORK_ERROR'),
        message:
          body?.message ??
          'We couldn’t reach the server. Please check your connection and try again.',
        details: body?.details,
      }),
    );
  },
);

/** Resolves to null on 404 so pages can show "not found" instead of an error. */
export async function getOrNull(url) {
  try {
    return await apiClient.get(url);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
