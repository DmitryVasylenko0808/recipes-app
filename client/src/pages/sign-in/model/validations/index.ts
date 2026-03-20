import z from 'zod';

export const signInSchema = z.object({
  email: z.email('Invalid email').trim(),
  password: z.string().min(1, 'Password in required'),
});

export type SignInFormFields = z.infer<typeof signInSchema>;
