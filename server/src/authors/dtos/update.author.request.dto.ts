import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthorRequestDto {
  @ApiPropertyOptional({
    description: "Author's firstname",
    example: 'Michael',
  })
  @IsOptional()
  @IsString({ message: 'Invalid firstname' })
  @MinLength(1, { message: 'Firstname must contain at least $contraint1 characters' })
  readonly firstname?: string;

  @ApiPropertyOptional({
    description: "Author's secondname",
    example: 'Collins',
  })
  @IsOptional()
  @IsString({ message: 'Invalid secondname' })
  @MinLength(1, { message: 'Secondname must contain at least $contraint1 characters' })
  readonly secondname?: string;

  @ApiPropertyOptional({
    description: 'About author',
    example:
      'Passionate Italian chef with over 15 years of experience in traditional Italian cuisine. Specializes in pasta dishes and authentic recipes passed down through generations.',
    type: 'string',
  })
  @IsOptional()
  readonly bio?: string;
}
