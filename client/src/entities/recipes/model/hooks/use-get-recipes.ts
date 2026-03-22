import { useQuery } from '@tanstack/react-query';
import { getRecipes, type GetRecipesArgs } from '../../api';
import type { Difficulty } from '../types/recipe-preview';
import type { Category } from '@/entities/categories';
import type { Tag } from '@/entities/tags';
import type { Ingredient } from '@/entities/ingredients';

type UseGetRecipesArgs = Pick<GetRecipesArgs, 'page' | 'limit' | 'search'> & {
  categories?: Category[];
  cookingTime?: string;
  tags?: Tag[];
  ingredients?: Ingredient[];
  difficulties?: Difficulty[];
};

export const useGetRecipes = (args: UseGetRecipesArgs) => {
  const { categories, cookingTime, tags, ingredients, difficulties, ...restArgs } = args;

  const apiArgs: GetRecipesArgs = restArgs;

  if (cookingTime) {
    const [min, max] = cookingTime.split(',');

    if (Number(min)) apiArgs.min_cooking_time = Number(min);
    if (Number(max)) apiArgs.max_cooking_time = Number(max);
  }
  if (categories?.length) apiArgs.category_names = categories?.map((c) => c.name).join(',');
  if (tags?.length) apiArgs.tag_names = tags.map((t) => t.name).join(',');
  if (ingredients?.length) apiArgs.ingredient_names = ingredients.map((ing) => ing.name).join(',');
  if (difficulties?.length) apiArgs.difficulties = difficulties.join(',');

  return useQuery({
    queryKey: ['recipes', { ...args }],
    queryFn: () => getRecipes(apiArgs),
  });
};
