import { Router } from 'express';
import { blogController } from '../controllers/blog.controller.js';
import { validate } from '../middleware/validate.js';
import { listPostsQuery } from '../validators/blog.validator.js';
import { slugParams } from '../validators/common.validator.js';

const router = Router();

router.get('/categories', blogController.listCategories);
router.get('/posts', validate({ query: listPostsQuery }), blogController.listPosts);
router.get('/posts/:slug', validate({ params: slugParams }), blogController.getPost);

export default router;
