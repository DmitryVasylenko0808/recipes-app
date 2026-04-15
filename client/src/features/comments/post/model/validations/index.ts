import z from 'zod';

export const postCommentSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

export type PostCommentFormFields = z.infer<typeof postCommentSchema>;
