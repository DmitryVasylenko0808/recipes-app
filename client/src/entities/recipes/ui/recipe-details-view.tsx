import { Typograpghy, Acronym, Badge, Card, Markdown, pathKeys } from '@/shared';
import type { ReactNode, ComponentProps } from 'react';
import { Link } from 'react-router';
import type { Recipe } from '../model/types/recipe';
import { ChefHat, Clock, type LucideIcon } from 'lucide-react';

type RecipeDetailsViewProps = { recipe: Recipe; actionsSlot?: ReactNode };

export const RecipeDetailsView = ({ recipe, actionsSlot }: RecipeDetailsViewProps) => {
  return (
    <div>
      <div className="mb-8 h-126 w-full">
        <img src={recipe.previewImage} alt="recipe image" className="h-full w-full rounded-md" />
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <Typograpghy tagVariant="h1">{recipe.title}</Typograpghy>
          {actionsSlot}
        </div>
        <Typograpghy tagVariant="p">{recipe.description}</Typograpghy>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 pb-6">
          <Link to={pathKeys.authors.byId(recipe.authorId)}>
            {recipe.author.avatar ? (
              <img
                src={recipe.author.avatar}
                className="h-14 w-14 rounded-full"
                alt="author avatar"
              />
            ) : (
              <Acronym
                firstname={recipe.author.firstname}
                secondname={recipe.author.secondname}
                className="h-14 w-14"
              />
            )}
          </Link>
          <div className="flex flex-col gap-0.5">
            <Typograpghy tagVariant="span" className="text-sm">
              Recipe by
            </Typograpghy>
            <Link
              to={pathKeys.authors.byId(recipe.authorId)}
              className="text-foreground hover:text-primary font-medium duration-100"
            >
              {recipe.author.firstname} {recipe.author.secondname}
            </Link>
          </div>
        </div>
        <div className="bg-ring/30 h-px" />
      </div>

      <div className="mb-6">
        <div className="mb-6 flex gap-4">
          <MetaBlock>
            <Typograpghy tagVariant="span" className="text-sm">
              Category
            </Typograpghy>
            <Typograpghy tagVariant="p" className="font-medium">
              {recipe.category.name}
            </Typograpghy>
          </MetaBlock>
          <MetaBlock icon={ChefHat}>
            <Typograpghy tagVariant="span" className="text-sm">
              Difficulty
            </Typograpghy>
            <Typograpghy tagVariant="p" className="font-medium">
              {recipe.difficulty}
            </Typograpghy>
          </MetaBlock>
          <MetaBlock icon={Clock}>
            <Typograpghy tagVariant="span" className="text-sm">
              Cooking time
            </Typograpghy>
            <Typograpghy tagVariant="p" className="font-medium">
              {recipe.cookingTime} minutes
            </Typograpghy>
          </MetaBlock>
        </div>
        <div className="flex gap-2">
          {recipe.recipeTags.map((rt) => (
            <Badge variant="secondary" key={rt.id}>
              {rt.name}
            </Badge>
          ))}
        </div>
      </div>

      <Card className="mb-8 p-6">
        <Typograpghy tagVariant="h2" className="mb-4">
          Ingredients
        </Typograpghy>
        <ul className="marker:text-primary list-disc space-y-3 pl-4 marker:h-2 marker:w-2">
          {recipe.recipeIngredients.map((ing) => (
            <li key={`${ing.ingredientId}-${ing.unit}-${ing.name}`}>
              {ing.amount} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <Typograpghy tagVariant="h2" className="mb-4">
          Instructions
        </Typograpghy>
        <Markdown>{recipe.content}</Markdown>
      </Card>
    </div>
  );
};

type MetaBlockProps = ComponentProps<'div'> & { icon?: LucideIcon };
const MetaBlock = ({ children, icon: Icon, ...divProps }: MetaBlockProps) => (
  <div
    className="border-ring/30 bg-secondary inline-flex items-center gap-2 rounded-md px-4 py-2"
    {...divProps}
  >
    {Icon && <Icon size={20} className="text-primary" />}
    <div className="flex-col gap-0.5">{children}</div>
  </div>
);
