import { Injectable } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { TagDto } from './dtos';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  async getAll() {
    const tags = await this.tagsRepository.findMany();
    return tags.map((tag) => new TagDto(tag));
  }
}
