import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { contactController } from '../controllers/contact.controller.js';
import { validate } from '../middleware/validate.js';
import { contactBody } from '../validators/contact.validator.js';

const router = Router();

// Stricter limit for the public form: 5 submissions per IP per 15 minutes.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, res) =>
    res.status(429).json({
      success: false,
      error: { code: 'RATE_LIMITED', message: 'Too many messages. Please try again later.' },
    }),
});

router.post('/', contactLimiter, validate({ body: contactBody }), contactController.create);

export default router;
