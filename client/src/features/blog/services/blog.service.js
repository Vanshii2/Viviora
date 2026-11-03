/** Blog API (GET /api/v1/blog/…). */
import { apiClient, getOrNull } from '../../../services/apiClient';

export const blogService = {
  listCategories: () => apiClient.get('/blog/categories'),
  listPosts: ({ category } = {}) =>
    apiClient.get('/blog/posts', { params: category ? { category } : {} }),
  getPost: (slug) => getOrNull(`/blog/posts/${encodeURIComponent(slug)}`),
};
