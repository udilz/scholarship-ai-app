import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  educational_background: z.string(),
  major: z.string(),
  funding_need: z.string(),
  preference: z.string(),
});

export type TLogin = z.infer<typeof loginSchema>;