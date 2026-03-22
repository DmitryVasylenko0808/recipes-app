import { useGetRecipes, RecipeCard, type Difficulty, RecipesSkeleton } from '@/entities/recipes';
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

  const { data, isFetching } = useGetRecipes({
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
    <div className="mx-auto flex max-w-7xl gap-5 px-4 py-8">
      <aside>
        <RecipeFilters
          search={search}
          onSearch={handleSearch}
          cookingTimes={COOKING_TIMES}
          difficulties={DIFFICULTIES}
          avialableCategories={categories}
          avialableTags={tags}
          avialableIngredients={ingredients}
          selectedCookingTime={selectedCookingTime}
          onSelectCookingTime={handleSelectCookingTime}
          selectedDifficulties={selectedDifficulties}
          onSelectDifficulty={handleSelectDifficulty}
          selectedCategories={selectedCategories}
          onSelectCategory={handleSelectCategory}
          selectedTags={selectedTags}
          onSelectTag={handleSelectTag}
          selectedIngredients={selectedIngredients}
          onSelectIngredient={handleSelectIngredient}
          onResetFilters={handleResetFilters}
        />
      </aside>
      <div className="flex-auto">
        {isFetching ? (
          <RecipesSkeleton />
        ) : (
          <div className="flex flex-wrap gap-3">
            {data?.data.map((r) => (
              <RecipeCard recipe={r} key={r.id} />
            ))}
          </div>
        )}
        <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={onPageChange} />
      </div>
    </div>
  );
};
