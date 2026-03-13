import { Tag } from 'src/generated/prisma/client';

export class TagDto implements Tag {
  id: string;
  name: string;

  constructor(partial: Partial<TagDto>) {
    Object.assign(this, partial);
  }
}
