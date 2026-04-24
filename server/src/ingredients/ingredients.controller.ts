import { Controller, Get } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientDto } from './dtos';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  @ApiOkResponse({ type: [IngredientDto] })
  async getAll() {
    return this.ingredientsService.getAll();
  }
}
