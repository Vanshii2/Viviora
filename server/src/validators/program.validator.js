import { z } from 'zod';

export const listProgramsQuery = z.object({
  featured: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === 'true')),
});
