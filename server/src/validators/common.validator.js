import { z } from 'zod';

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9-]{1,80}$/, 'Invalid slug');
export const slugParams = z.object({ slug: slugSchema });
