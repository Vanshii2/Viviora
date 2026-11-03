import { programService } from '../services/program.service.js';
import { notFoundError } from '../utils/httpError.js';

export const programController = {
  async list(req, res) {
    const data = await programService.list(req.validated.query);
    res.json({ success: true, data });
  },
  async getBySlug(req, res) {
    const data = await programService.getBySlug(req.validated.params.slug);
    if (!data) throw notFoundError('Program');
    res.json({ success: true, data });
  },
};
