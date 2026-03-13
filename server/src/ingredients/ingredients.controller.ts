import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientDto } from './dtos';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async getAll() {
    const ingredients = await this.ingredientsService.getAll();
    return ingredients.map((ingredient) => new IngredientDto(ingredient));
  }
}
