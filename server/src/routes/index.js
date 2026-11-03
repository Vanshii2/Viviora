import { Router } from 'express';
import { requireDatabase } from '../middleware/requireDatabase.js';
import healthRoutes from './health.routes.js';
import programRoutes from './program.routes.js';
import blogRoutes from './blog.routes.js';
import faqRoutes from './faq.routes.js';
import contactRoutes from './contact.routes.js';
import assessmentRoutes from '../features/nutrition-assessment/assessment.routes.js';

const router = Router();

router.use('/health', healthRoutes);

// Everything below needs MongoDB.
router.use(requireDatabase);
router.use('/programs', programRoutes);
router.use('/blog', blogRoutes);
router.use('/faqs', faqRoutes);
router.use('/contact', contactRoutes);
router.use('/assessments', assessmentRoutes);

export default router;
