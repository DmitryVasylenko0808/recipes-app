import { Exclude, Transform } from 'class-transformer';
import { Difficulty, Recipe, RecipeTag, Tag } from 'src/generated/prisma/client';
import { RecipeDetails, RecipeTagDetails } from '../interfaces';
import { AuthorPreviewDto } from 'src/authors/dtos';

export class RecipeTagDto implements RecipeTag {
  @Exclude()
  recipeId: string;

  @Exclude()
  tagId: string;

  id: string;

  name: string;

  constructor(partial: RecipeTagDetails) {
    const { tag, ...data } = partial;
    Object.assign(this, data);
    this.id = tag.id;
    this.name = tag.name;
  }
}

export class RecipeResponseDto implements Recipe {
  id: string;

  title: string;

  description: string;

  //   @Transform((value) => `${process.env.SERVER_UPLOADS_URL}/${value}`)
  previewImage: string;

  content: string;

  cookingTime: number;

  difficulty: Difficulty;

  createdAt: Date;

  authorId: string;

  author: AuthorPreviewDto;

  recipeTags: RecipeTagDto[];

  constructor(partial: RecipeDetails) {
    const { recipeTags, author, ...data } = partial;

    Object.assign(this, data);
    this.author = new AuthorPreviewDto(author);
    this.recipeTags = recipeTags.map((rt) => new RecipeTagDto(rt));
  }
}
