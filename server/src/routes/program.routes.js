import { Router } from 'express';
import { programController } from '../controllers/program.controller.js';
import { validate } from '../middleware/validate.js';
import { listProgramsQuery } from '../validators/program.validator.js';
import { slugParams } from '../validators/common.validator.js';

const router = Router();

router.get('/', validate({ query: listProgramsQuery }), programController.list);
router.get('/:slug', validate({ params: slugParams }), programController.getBySlug);

export default router;
