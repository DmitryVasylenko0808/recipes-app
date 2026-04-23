import {
  useGetRecipes,
  type Difficulty,
  RecipesGridSkeleton,
  RecipesGrid,
  RecipeCard,
} from '@/entities/recipes';
import { usePagination, Pagination } from '@/features/pagination';
import { useGetCategories } from '@/entities/categories';
import { useGetTags } from '@/entities/tags';
import { useGetIngredients } from '@/entities/ingredients';
import {
  type CookingTimeFilterItem,
  RecipeFilters,
  useFilterRecipes,
} from '@/features/recipe/filter';
import { Typograpghy, useDebounce } from '@/shared';
import { ToggleFavoriteRecipeButton } from '@/features/favorites/toggle';
import { Clock } from 'lucide-react';

const COOKING_TIMES: CookingTimeFilterItem[] = [
  { label: 'Any time' },
  {
    value: ['0', '15'],
    label: 'Quick (0-15 min)',
  },
  {
    value: ['16', '30'],
    label: 'Medium (16-30 min)',
  },
  {
    value: ['31', '60'],
    label: 'Long (31-60 min)',
  },
  {
    value: ['61'],
    label: 'Very long (61+ min)',
  },
];
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];
const INITIAL_LIMIT = 9;

export const RecentRecipes = () => {
  const { data: categories } = useGetCategories();
  const { data: tags } = useGetTags();
  const { data: ingredients } = useGetIngredients();

  const {
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
  } = useFilterRecipes();
  const debouncedSearch = useDebounce(search, 300);

  const { page, limit, onPageChange } = usePagination({
    initialLimit: INITIAL_LIMIT,
    resetDependecies: [
      search,
      selectedCookingTime,
      selectedDifficulties,
      selectedCategories,
      selectedTags,
      selectedIngredients,
    ],
  });

  const { data, isPending, isFetching } = useGetRecipes({
    page,
    limit,
    search: debouncedSearch,
    cookingTime: selectedCookingTime,
    difficulties: selectedDifficulties,
    categories: selectedCategories,
    tags: selectedTags,
    ingredients: selectedIngredients,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Clock className="text-primary" />
        <Typograpghy tagVariant="h2">Recent Recipes</Typograpghy>
      </div>
      <div className="flex gap-8">
        <aside>
          <RecipeFilters
            search={search}
            onSearch={handleSearch}
            cookingTimes={COOKING_TIMES}
            selectedCookingTime={selectedCookingTime}
            onSelectCookingTime={handleSelectCookingTime}
            difficulties={DIFFICULTIES}
            selectedDifficulties={selectedDifficulties}
            onSelectDifficulty={handleSelectDifficulty}
            avialableCategories={categories}
            selectedCategories={selectedCategories}
            onSelectCategory={handleSelectCategory}
            avialableTags={tags}
            selectedTags={selectedTags}
            onSelectTag={handleSelectTag}
            avialableIngredients={ingredients}
            selectedIngredients={selectedIngredients}
            onSelectIngredient={handleSelectIngredient}
            onResetFilters={handleResetFilters}
          />
        </aside>
        <div className="flex-1">
          {isPending ? (
            <RecipesGridSkeleton />
          ) : (
            <RecipesGrid
              isFetching={isFetching}
              recipes={data?.data}
              renderItems={(r) => (
                <RecipeCard
                  recipe={r}
                  key={r.id}
                  actionsSlot={<ToggleFavoriteRecipeButton recipe={r} />}
                />
              )}
            />
          )}
          <Pagination
            totalPages={data?.totalPages}
            currentPage={page}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};
