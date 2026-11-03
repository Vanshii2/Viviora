import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5050),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  MONGO_URI: z.string().optional().default(''),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:', z.flattenError(parsed.error).fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === 'production',
  allowedOrigins: parsed.data.CLIENT_URL.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
