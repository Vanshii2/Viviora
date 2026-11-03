import { z } from 'zod';

/**
 * Mirrors client/src/features/contact/contact.schema.js.
 * `website` is a hidden honeypot: humans leave it empty; the controller silently drops filled ones.
 */
export const contactBody = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.'),
  email: z.string().trim().toLowerCase().email('Please enter a valid email address.').max(254),
  subject: z.string().trim().min(3, 'Please add a subject.').max(120, 'Subject is too long.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please write a message of at least 10 characters.')
    .max(2000, 'Message is too long (2000 characters max).'),
  website: z.string().max(200).optional(),
});
