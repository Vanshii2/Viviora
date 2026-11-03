import { blogService } from '../services/blog.service.js';
import { notFoundError } from '../utils/httpError.js';

export const blogController = {
  async listCategories(_req, res) {
    res.json({ success: true, data: await blogService.listCategories() });
  },
  async listPosts(req, res) {
    res.json({ success: true, data: await blogService.listPosts(req.validated.query) });
  },
  async getPost(req, res) {
    const data = await blogService.getBySlug(req.validated.params.slug);
    if (!data) throw notFoundError('Article');
    res.json({ success: true, data });
  },
};
