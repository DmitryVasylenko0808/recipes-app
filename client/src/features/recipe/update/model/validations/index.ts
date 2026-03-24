import z from 'zod';

export const recipeIngredientSchema = z.object({
  ingredientId: z.string().min(1, 'Ingredient is required'),
  amount: z.number({ error: 'Invalid value' }).min(1, 'Amount must be more than 0'),
  unit: z.string().min(1, 'Unit is required'),
});

export const updateRecipeSchema = z.object({
  title: z.string().min(1, 'Title is required').trim(),
  description: z.string().min(1, 'Description is required').trim(),
  previewImage: z
    .instanceof(File)
    .refine(
      (file) => ['image/jpeg', 'image/png'].includes(file.type),
      'Only supported .jpeg and .png formats'
    )
    .optional(),
  content: z.string().min(1, 'Instruction is required'),
  categoryId: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['easy', 'medium', 'hard'], { error: 'Invalid difficulty' }),
  cookingTime: z
    .number({ error: 'Invalid value' })
    .min(1, 'Cooking time must be more than 1 minutes'),
  recipeTagIds: z.array(z.string()).min(1, 'Recipe must containt at least 1 tag'),
  recipeIngredients: z
    .array(recipeIngredientSchema)
    .min(1, 'Recipe must containt at least 1 ingredient'),
});

export type UpdateRecipeFormFields = z.infer<typeof updateRecipeSchema>;
