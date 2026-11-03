import { faqService } from '../services/faq.service.js';

export const faqController = {
  async list(req, res) {
    res.json({ success: true, data: await faqService.list(req.validated.query) });
  },
};
