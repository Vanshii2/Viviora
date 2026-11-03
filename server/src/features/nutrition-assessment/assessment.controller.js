import { assessmentService } from './assessment.service.js';

export const assessmentController = {
  async submit(req, res) {
    const data = await assessmentService.submit(req.validated.body, { userId: req.user?.id });
    res.status(201).json({ success: true, data });
  },
};
