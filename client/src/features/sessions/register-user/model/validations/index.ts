import z from 'zod';

export const registerSchema = z
  .object({
    firstname: z.string().min(1, 'First name is required').trim(),
    secondname: z.string().min(1, 'First name is required').trim(),
    email: z.email('Invalid email').trim(),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string().min(8, 'Password must contain at least 8 characters'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormFields = z.infer<typeof registerSchema>;
