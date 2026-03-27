import type { Category } from '@/entities/categories';
import type { Ingredient } from '@/entities/ingredients';
import type { Difficulty } from '@/entities/recipes';
import type { Tag } from '@/entities/tags';
import { Card, Typograpghy, TextField, Selector, Badge, Button } from '@/shared';
import { Search, X } from 'lucide-react';
import { SelectableList } from './selectable-list';

const INITIAL_COUNT_CATEGORIES = 9;
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
  selectedCookingTime?: string;
  onSelectCookingTime?: (v?: string) => void;
  difficulties?: Difficulty[];
  selectedDifficulties?: Difficulty[];
  onSelectDifficulty?: (difficulty: Difficulty | null) => void;
  avialableCategories?: Category[];
  selectedCategories?: Category[];
  onSelectCategory?: (category: Category | null) => void;
  avialableTags?: Tag[];
  selectedTags?: Tag[];
  onSelectTag?: (tag: Tag | null) => void;
  avialableIngredients?: Ingredient[];
  selectedIngredients?: Ingredient[];
  onSelectIngredient?: (ingredient: Ingredient | null) => void;
  onResetFilters?: () => void;
};

export const RecipeFilters = ({
  search,
  onSearch,
  cookingTimes = [],
  onSelectCookingTime,
  selectedCookingTime,
  difficulties = [],
  selectedDifficulties = [],
  onSelectDifficulty,
  avialableCategories = [],
  selectedCategories = [],
  onSelectCategory,
  avialableTags = [],
  selectedTags = [],
  onSelectTag,
  avialableIngredients = [],
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

      <SelectableList
        type="default"
        title="Difficulty"
        avialableItems={difficulties}
        selectedItems={selectedDifficulties}
        onSelectItem={onSelectDifficulty}
        renderItem={(diff) => (
          <Badge
            variant={selectedDifficulties.includes(diff) ? 'primary' : 'terciary'}
            onClick={() => onSelectDifficulty?.(diff)}
            className="cursor-pointer"
            key={diff}
          >
            {diff}
          </Badge>
        )}
      />

      <SelectableList
        type="collapsible"
        initialPreviewCount={INITIAL_COUNT_CATEGORIES}
        title="Categories"
        avialableItems={avialableCategories}
        selectedItems={selectedCategories}
        onSelectItem={onSelectCategory}
        renderItem={(category) => (
          <Badge
            variant={
              selectedCategories.find((c) => c.name === category.name) ? 'primary' : 'terciary'
            }
            onClick={() => onSelectCategory?.(category)}
            className="cursor-pointer"
            key={category.id}
          >
            {category.name}
          </Badge>
        )}
      />

      <SelectableList
        type="collapsible"
        initialPreviewCount={INITIAL_COUNT_TAGS}
        title="Tags"
        avialableItems={avialableTags}
        selectedItems={selectedTags}
        onSelectItem={onSelectTag}
        renderItem={(tag) => (
          <Badge
            variant={selectedTags.find((t) => t.name === tag.name) ? 'primary' : 'terciary'}
            onClick={() => onSelectTag?.(tag)}
            className="cursor-pointer"
            key={tag.id}
          >
            {tag.name}
          </Badge>
        )}
      />

      <SelectableList
        type="collapsible"
        initialPreviewCount={INITIAL_COUNT_INGREDIENTS}
        title="Ingredients"
        avialableItems={avialableIngredients}
        selectedItems={selectedIngredients}
        onSelectItem={onSelectIngredient}
        renderItem={(ing) => (
          <Badge
            variant={
              selectedIngredients.find((si) => si.name === ing.name) ? 'primary' : 'terciary'
            }
            onClick={() => onSelectIngredient?.(ing)}
            className="cursor-pointer"
            key={ing.id}
          >
            {ing.name}
          </Badge>
        )}
      />

      <Button as="button" variant="secondary" icon={X} onClick={() => onResetFilters?.()} fullWidth>
        Clear all filters
      </Button>
    </Card>
  );
};
