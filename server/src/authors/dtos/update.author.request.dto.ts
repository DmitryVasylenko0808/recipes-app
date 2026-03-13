import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthorRequestDto {
  @IsOptional()
  @IsString({ message: 'Invalid firstname' })
  @MinLength(1, { message: 'Firstname must contain at least $contraint1 characters' })
  readonly firstname?: string;

  @IsOptional()
  @IsString({ message: 'Invalid secondname' })
  @MinLength(1, { message: 'Secondname must contain at least $contraint1 characters' })
  readonly secondname?: string;

  @IsOptional()
  readonly description?: string;
}
