import type { Category } from '@/entities/categories';
import type { Ingredient } from '@/entities/ingredients';
import type { Difficulty } from '@/entities/recipes';
import type { Tag } from '@/entities/tags';
import { useState } from 'react';

export const useFilterRecipes = () => {
  const [search, setSearch] = useState('');
  const [selectedCookingTime, setSelectedCookingTime] = useState<string | undefined>('');
  const [selectedDifficulties, setSelectedDifficuties] = useState<Difficulty[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

  const handleSearch = (search: string) => setSearch(search);

  const handleSelectCookingTime = (value?: string) => setSelectedCookingTime(value);

  const handleSelectDifficulty = (difficulty: Difficulty | null) => {
    if (!difficulty) return setSelectedDifficuties([]);

    setSelectedDifficuties((prev) =>
      prev.find((diff) => diff === difficulty)
        ? prev.filter((diff) => diff !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleSelectCategory = (category: Category | null) => {
    if (!category) return setSelectedCategories([]);

    setSelectedCategories((prev) =>
      prev.find((sc) => sc.name === category.name)
        ? prev.filter((sc) => sc.name !== category.name)
        : [...prev, category]
    );
  };

  const handleSelectTag = (tag: Tag | null) => {
    if (!tag) return setSelectedTags([]);

    setSelectedTags((prev) =>
      prev.find((st) => st.name === tag.name)
        ? prev.filter((st) => st.name !== tag.name)
        : [...prev, tag]
    );
  };

  const handleSelectIngredient = (ingredient: Ingredient | null) => {
    if (!ingredient) return setSelectedIngredients([]);

    setSelectedIngredients((prev) =>
      prev.find((si) => si.name === ingredient.name)
        ? prev.filter((si) => si.name !== ingredient.name)
        : [...prev, ingredient]
    );
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCookingTime('');
    setSelectedDifficuties([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedIngredients([]);
  };

  return {
    search,
    selectedCookingTime,
    selectedDifficulties,
    selectedCategories,
    selectedTags,
    selectedIngredients,
    handleSearch,
    handleSelectCookingTime,
    handleSelectDifficulty,
    handleSelectCategory,
    handleSelectTag,
    handleSelectIngredient,
    handleResetFilters,
  };
};
