import { Card, Typograpghy, TextField, Badge, Button, Selector } from '@/shared';

type CookingTimeFilterItem = {
  readonly value?: string[];
  label: string;
};
export const cookingTimes: CookingTimeFilterItem[] = [
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
export const recipeCategories: string[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Snack',
  'Appetizer',
  'Main Course',
  'Side Dish',
  'Soup',
  'Salad',
  'Beverage',
  'Sauce',
  'Grill',
  'Baking',
  'Vegan',
  'Vegetarian',
  'Seafood',
  'Pasta',
  'Fast Food',
  'Healthy',
];
export const recipeTags: string[] = [
  'Quick',
  'Easy',
  'Under 30 Minutes',
  'High Protein',
  'Low Carb',
  'Gluten Free',
  'Dairy Free',
  'Sugar Free',
  'Keto',
  'Paleo',
  'Comfort Food',
  'Spicy',
  'Sweet',
  'Savory',
  'Crispy',
  'Creamy',
  'Fresh',
  'Kids Friendly',
  'Meal Prep',
  'Budget Friendly',
];
export const ingredients: string[] = [
  'Chicken',
  'Beef',
  'Pork',
  'Salmon',
  'Tuna',
  'Eggs',
  'Milk',
  'Butter',
  'Cheese',
  'Flour',
  'Sugar',
  'Salt',
  'Black Pepper',
  'Garlic',
  'Onion',
  'Tomato',
  'Potato',
  'Carrot',
  'Bell Pepper',
  'Mushroom',
  'Spinach',
  'Broccoli',
  'Rice',
  'Pasta',
  'Olive Oil',
  'Lemon',
  'Honey',
  'Soy Sauce',
  'Cream',
  'Basil',
];

export const RecipeFilters = () => {
  return (
    <Card>
      <div className="w-xs p-6">
        <Typograpghy tagVariant="h2" className="mb-6">
          Filters
        </Typograpghy>
        <TextField label="Search" placeholder="Search recipes..." className="mb-6" />
        <Selector options={cookingTimes} className="mb-6" />
        <div className="mb-6">
          <label className="mb-3 block font-medium">Categories</label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary" className="cursor-pointer">
              All
            </Badge>
            {recipeCategories.map((c) => (
              <Badge variant="terciary" className="cursor-pointer">
                {c}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="mb-3 block font-medium">Tags</label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary" className="cursor-pointer">
              All
            </Badge>
            {recipeTags.map((t) => (
              <Badge variant="terciary" className="cursor-pointer">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="mb-3 block font-medium">Ingredients</label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary" className="cursor-pointer">
              All
            </Badge>
            {ingredients.map((ing) => (
              <Badge variant="terciary" className="cursor-pointer">
                {ing}
              </Badge>
            ))}
          </div>
        </div>
        <Button as="button" variant="secondary" fullWidth>
          Clear all filters
        </Button>
      </div>
    </Card>
  );
};
