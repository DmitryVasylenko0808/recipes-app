import { useGetCategories } from '@/entities/categories';
import { useGetIngredients } from '@/entities/ingredients';
import { useGetTags, type Tag } from '@/entities/tags';
import {
  Card,
  Typograpghy,
  TextField,
  TextArea,
  FileUploader,
  Selector,
  Badge,
  Button,
} from '@/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { type CreateRecipeFormFields, createRecipeSchema } from '../model/validations';
import { useCreateRecipe } from '../model/hooks/use-create-recipe';
import type { RecipePreview } from '@/entities/recipes';

const INSTRUCTIONS_PLACEHOLDER = `Write your recipe instructions here. You can use Markdown formatting:

## Step 1
Start by preparing...

## Step 2
Next, combine...`;

type CreateRecipeFormProps = { onSubmit?: (data: RecipePreview) => void };

export const CreateRecipeForm = ({ onSubmit }: CreateRecipeFormProps) => {
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories();
  const { data: tags, isLoading: isLoadingTags } = useGetTags();
  const { data: ingredients, isLoading: isLoadingIngredients } = useGetIngredients();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateRecipeFormFields>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      recipeTagIds: [],
      recipeIngredients: [{ ingredientId: '', amount: 0, unit: '' }],
    },
  });
  const { fields, append } = useFieldArray({ name: 'recipeIngredients', control });
  const { mutateAsync, isPending } = useCreateRecipe();

  const selectedTagIds = watch('recipeTagIds');

  const handleClickTag = (tag: Tag) => {
    if (selectedTagIds.includes(tag.id))
      return setValue(
        'recipeTagIds',
        selectedTagIds.filter((t) => t !== tag.id)
      );

    setValue('recipeTagIds', [...selectedTagIds, tag.id], { shouldValidate: true });
  };

  const handleClickAddIngredient = () => append({ ingredientId: '', amount: 0, unit: '' });

  const submitHandler = (fields: CreateRecipeFormFields) => {
    mutateAsync(fields)
      .then(onSubmit)
      .catch((err) => alert(err.message));
  };

  const isDisableSubmitBtn =
    isLoadingCategories || isLoadingTags || isLoadingIngredients || isPending;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Card className="mb-6 p-6">
        <Typograpghy tagVariant="h4" className="mb-6">
          Basic information
        </Typograpghy>
        <TextField
          label="Recipe title"
          placeholder="e.g., Creamy Mushroom Pasta"
          className="mb-2"
          error={errors.title?.message}
          {...register('title')}
        />
        <TextArea
          label="Short description"
          placeholder="Brief description of your recipe..."
          rows={3}
          className="mb-2"
          error={errors.description?.message}
          {...register('description')}
        />
        <Controller
          name="previewImage"
          control={control}
          render={({ field, fieldState }) => (
            <FileUploader
              label="Preview image file"
              ref={field.ref}
              name={field.name}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.target.files?.[0])}
              error={fieldState.error?.message}
              caption="Only supports image formats (.jpg, .jpeg, .png)"
              accept="image/*"
              className="mb-4"
            />
          )}
        />
        <div className="mb-2 flex gap-4">
          <Selector
            label="Category"
            options={categories?.map((c) => ({ label: c.name, value: c.id }))}
            error={errors.categoryId?.message}
            {...register('categoryId')}
          />
          <Selector
            label="Difficulty"
            options={[
              {
                label: 'Easy',
                value: 'easy',
              },
              {
                label: 'Medium',
                value: 'medium',
              },
              {
                label: 'Hard',
                value: 'hard',
              },
            ]}
            error={errors.difficulty?.message}
            {...register('difficulty')}
          />
          <TextField
            type="number"
            label="Cooking time"
            error={errors.cookingTime?.message}
            {...register('cookingTime', { valueAsNumber: true })}
          />
        </div>
      </Card>
      <Card className="mb-6 p-6">
        <Typograpghy tagVariant="h4" className="mb-6">
          Tags
        </Typograpghy>
        <Typograpghy tagVariant="p" className="mb-3 text-sm">
          Select tags that describe your recipe
        </Typograpghy>
        <div className="flex flex-wrap gap-2">
          {tags?.map((t) => (
            <Badge
              variant="terciary"
              className="cursor-pointer"
              key={t.id}
              onClick={() => handleClickTag(t)}
            >
              {t.name}
            </Badge>
          ))}
        </div>
        {!!selectedTagIds.length && (
          <div className="mt-3">
            <Typograpghy tagVariant="label" className="mb-2">
              Selected tags:
            </Typograpghy>
            <div className="flex flex-wrap gap-2">
              {tags
                ?.filter((t) => selectedTagIds.includes(t.id))
                .map((t) => (
                  <Badge
                    variant="primary"
                    className="cursor-pointer"
                    key={t.id}
                    onClick={() => handleClickTag(t)}
                  >
                    {t.name}
                  </Badge>
                ))}
            </div>
          </div>
        )}
        {errors.recipeTagIds && (
          <Typograpghy tagVariant="span" className="text-destructive mt-2 text-xs">
            {errors.recipeTagIds?.message}
          </Typograpghy>
        )}
      </Card>
      <Card className="mb-6 p-6">
        <Typograpghy tagVariant="h4" className="mb-6">
          Ingredients
        </Typograpghy>
        {fields.map((field, index) => (
          <div className="mb-3 flex gap-4" key={field.id}>
            <Selector
              options={ingredients?.map((ing) => ({ label: ing.name, value: ing.id }))}
              error={errors.recipeIngredients?.[index]?.ingredientId?.message}
              {...register(`recipeIngredients.${index}.ingredientId`)}
            />
            <TextField
              type="number"
              placeholder="5"
              error={errors.recipeIngredients?.[index]?.amount?.message}
              {...register(`recipeIngredients.${index}.amount`, { valueAsNumber: true })}
            />
            <TextField
              placeholder="Unit"
              error={errors.recipeIngredients?.[index]?.unit?.message}
              {...register(`recipeIngredients.${index}.unit`)}
            />
          </div>
        ))}
        <Button
          as="button"
          type="button"
          variant="secondary"
          onClick={handleClickAddIngredient}
          fullWidth
        >
          Add ingredient
        </Button>
      </Card>
      <Card className="mb-6 p-6">
        <Typograpghy tagVariant="h4" className="mb-6">
          Instructions
        </Typograpghy>
        <TextArea
          rows={7}
          placeholder={INSTRUCTIONS_PLACEHOLDER}
          error={errors.content?.message}
          {...register('content')}
        />
      </Card>
      <Button
        as="button"
        type="submit"
        variant="primary"
        disabled={isDisableSubmitBtn}
        isLoading={isPending}
        fullWidth
      >
        Create recipe
      </Button>
    </form>
  );
};
