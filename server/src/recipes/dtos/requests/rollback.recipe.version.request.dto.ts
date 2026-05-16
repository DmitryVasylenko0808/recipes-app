import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class RollbackRecipeVersionRequestDto {
  @ApiProperty({ description: 'Version number of recipe, must be positive', example: 1 })
  @IsInt({ message: 'Invalid version' })
  @IsPositive({ message: 'Version number must be positive' })
  version: number;
}
