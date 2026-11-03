import { z } from 'zod';
import { slugSchema } from './common.validator.js';

export const listPostsQuery = z.object({ category: slugSchema.optional() });
