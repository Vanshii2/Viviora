import { Router } from 'express';
import { faqController } from '../controllers/faq.controller.js';
import { validate } from '../middleware/validate.js';
import { listFaqsQuery } from '../validators/faq.validator.js';

const router = Router();

router.get('/', validate({ query: listFaqsQuery }), faqController.list);

export default router;
