export class CategoryDto {
  id: string;
  name: string;

  constructor(partial: Partial<CategoryDto>) {
    Object.assign(this, partial);
  }
}
