import z from 'zod';

export const editProfileSchema = z.object({
  firstname: z.string().min(1, 'First name is required').trim().optional(),
  secondname: z.string().min(1, 'Second name is required').trim().optional(),
  bio: z
    .string()
    .max(500, 'Too many characters. Bio contains maximum 500 charactes')
    .trim()
    .optional(),
  avatar: z
    .instanceof(File)
    .refine(
      (file) => ['image/jpeg', 'image/png'].includes(file.type),
      'Only supported .jpeg and .png formats'
    )
    .optional(),
});
export type EditProfileFormFields = z.infer<typeof editProfileSchema>;
