import { z } from 'zod';

export const listFaqsQuery = z.object({ scope: z.enum(['home']).default('home') });
