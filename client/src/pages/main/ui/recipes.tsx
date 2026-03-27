import {
  useGetRecipes,
  type Difficulty,
  RecipesGridSkeleton,
  RecipesGrid,
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

export const Recipes = () => {
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
    search,
    cookingTime: selectedCookingTime,
    difficulties: selectedDifficulties,
    categories: selectedCategories,
    tags: selectedTags,
    ingredients: selectedIngredients,
  });

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8">
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
          <RecipesGrid isFetching={isFetching} recipes={data?.data} />
        )}
        <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={onPageChange} />
      </div>
    </div>
  );
};
