import { Injectable } from '@nestjs/common';
import { Tag } from 'src/generated/prisma/client';
import { TagDto } from '../dtos';

@Injectable()
export class TagsMapper {
  toDto(tag: Tag): TagDto {
    return {
      id: tag.id,
      name: tag.name,
    };
  }
}
