import type { Category } from '@/entities/categories';
import type { Ingredient } from '@/entities/ingredients';
import type { Difficulty } from '@/entities/recipes';
import type { Tag } from '@/entities/tags';
import { Card, Typograpghy, TextField, Selector, Badge, Button, Collapsible } from '@/shared';
import { Search, X } from 'lucide-react';

const INITIAL_COUNT_TAGS = 9;
const INITIAL_COUNT_INGREDIENTS = 9;

export type CookingTimeFilterItem = {
  readonly value?: string[];
  label: string;
};

type RecipeFiltersProps = {
  search?: string;
  onSearch?: (search: string) => void;
  cookingTimes?: CookingTimeFilterItem[];
  difficulties?: Difficulty[];
  avialableCategories?: Category[];
  avialableTags?: Tag[];
  avialableIngredients?: Ingredient[];
  selectedCookingTime?: string;
  onSelectCookingTime?: (v?: string) => void;
  selectedDifficulties?: Difficulty[];
  onSelectDifficulty?: (difficulty: Difficulty | null) => void;
  selectedCategories?: Category[];
  onSelectCategory?: (category: Category | null) => void;
  selectedTags?: Tag[];
  onSelectTag?: (tag: Tag | null) => void;
  selectedIngredients?: Ingredient[];
  onSelectIngredient?: (ingredient: Ingredient | null) => void;
  onResetFilters?: () => void;
};

export const RecipeFilters = ({
  search,
  onSearch,
  cookingTimes,
  difficulties,
  avialableCategories = [],
  avialableTags = [],
  avialableIngredients = [],
  selectedCookingTime,
  onSelectCookingTime,
  selectedDifficulties = [],
  onSelectDifficulty,
  selectedCategories = [],
  onSelectCategory,
  selectedTags = [],
  onSelectTag,
  selectedIngredients = [],
  onSelectIngredient,
  onResetFilters,
}: RecipeFiltersProps) => {
  return (
    <Card className="w-2xs p-6">
      <Typograpghy tagVariant="h2" className="mb-6">
        Filters
      </Typograpghy>

      <TextField
        label="Search"
        placeholder="Search recipes..."
        onChange={(e) => onSearch?.(e.target.value)}
        value={search}
        icon={Search}
        className="mb-6"
      />

      {cookingTimes && (
        <div className="mb-6">
          <Typograpghy tagVariant="label" className="mb-3">
            Cooking time
          </Typograpghy>
          <Selector
            options={cookingTimes}
            value={selectedCookingTime}
            onChange={(e) => onSelectCookingTime?.(e.target.value)}
          />
        </div>
      )}

      {difficulties && (
        <div className="mb-6">
          <Typograpghy tagVariant="label" className="mb-3">
            Difficulty
          </Typograpghy>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedDifficulties.length ? 'terciary' : 'primary'}
              onClick={() => onSelectDifficulty?.(null)}
              className="cursor-pointer"
            >
              All
            </Badge>
            {difficulties.map((diff) => (
              <Badge
                variant={selectedDifficulties.includes(diff) ? 'primary' : 'terciary'}
                onClick={() => onSelectDifficulty?.(diff)}
                className="cursor-pointer"
                key={diff}
              >
                {diff}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <Typograpghy tagVariant="label" className="mb-3">
          Categories
        </Typograpghy>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategories.length ? 'terciary' : 'primary'}
            className="cursor-pointer"
            onClick={() => onSelectCategory?.(null)}
          >
            All
          </Badge>
          {avialableCategories.map((c) => (
            <Badge
              variant={selectedCategories.find((sc) => c.name === sc.name) ? 'primary' : 'terciary'}
              onClick={() => onSelectCategory?.(c)}
              className="cursor-pointer"
              key={c.id}
            >
              {c.name}
            </Badge>
          ))}
        </div>
      </div>

      <Collapsible
        className="mb-6"
        preview={
          <div>
            <Typograpghy tagVariant="label" className="mb-3">
              Tags
            </Typograpghy>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedTags.length ? 'terciary' : 'primary'}
                className="cursor-pointer"
                onClick={() => onSelectTag?.(null)}
              >
                All
              </Badge>
              {avialableTags.slice(0, INITIAL_COUNT_TAGS).map((t) => (
                <Badge
                  variant={selectedTags.find((st) => t.name === st.name) ? 'primary' : 'terciary'}
                  onClick={() => onSelectTag?.(t)}
                  className="cursor-pointer"
                  key={t.id}
                >
                  {t.name}
                </Badge>
              ))}
            </div>
          </div>
        }
        full={
          <div className="mt-2 flex flex-wrap gap-2">
            {avialableTags.slice(INITIAL_COUNT_TAGS).map((t) => (
              <Badge
                variant={selectedTags.find((st) => t.name === st.name) ? 'primary' : 'terciary'}
                onClick={() => onSelectTag?.(t)}
                className="cursor-pointer"
                key={t.id}
              >
                {t.name}
              </Badge>
            ))}
          </div>
        }
      />

      <Collapsible
        className="mb-6"
        preview={
          <div>
            <Typograpghy tagVariant="label" className="mb-3">
              Ingredients
            </Typograpghy>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedIngredients.length ? 'terciary' : 'primary'}
                className="cursor-pointer"
                onClick={() => onSelectIngredient?.(null)}
              >
                All
              </Badge>
              {avialableIngredients.slice(0, INITIAL_COUNT_INGREDIENTS).map((ing) => (
                <Badge
                  variant={
                    selectedIngredients.find((si) => ing.name === si.name) ? 'primary' : 'terciary'
                  }
                  onClick={() => onSelectIngredient?.(ing)}
                  className="cursor-pointer"
                  key={ing.id}
                >
                  {ing.name}
                </Badge>
              ))}
            </div>
          </div>
        }
        full={
          <div className="mt-2 flex flex-wrap gap-2">
            {avialableIngredients.slice(INITIAL_COUNT_INGREDIENTS).map((ing) => (
              <Badge
                variant={
                  selectedIngredients.find((si) => ing.name === si.name) ? 'primary' : 'terciary'
                }
                onClick={() => onSelectIngredient?.(ing)}
                className="cursor-pointer"
                key={ing.id}
              >
                {ing.name}
              </Badge>
            ))}
          </div>
        }
      />

      <Button as="button" variant="secondary" icon={X} onClick={() => onResetFilters?.()} fullWidth>
        Clear all filters
      </Button>
    </Card>
  );
};
