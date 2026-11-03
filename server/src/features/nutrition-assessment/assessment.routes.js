import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../../middleware/validate.js';
import { assessmentController } from './assessment.controller.js';
import { submitAssessmentBody } from './assessment.validation.js';

/**
 * Submit-only: there is deliberately NO public endpoint to read assessments (health data).
 * Reading will be added behind authentication + role checks (client / dietitian / admin).
 */
const router = Router();

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  skipFailedRequests: true, // only successful submissions count; fixing validation errors is never blocked
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (_req, res) =>
    res.status(429).json({
      success: false,
      error: { code: 'RATE_LIMITED', message: 'Too many submissions. Please try again later.' },
    }),
});

router.post(
  '/',
  submitLimiter,
  validate({ body: submitAssessmentBody }),
  assessmentController.submit,
);

export default router;
