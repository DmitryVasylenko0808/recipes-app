import z from 'zod';

export const updateCommentSchema = z.object({
  content: z.string().min(1, 'Content is required').trim().optional(),
});
export type UpdateCommentFormFields = z.infer<typeof updateCommentSchema>;
