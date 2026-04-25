import { Injectable } from '@nestjs/common';
import { TagsRepository } from './tags.repository';
import { TagsMapper } from './mappers/tags.mapper';

@Injectable()
export class TagsService {
  constructor(
    private readonly tagsRepository: TagsRepository,
    private readonly tagsMapper: TagsMapper
  ) {}

  async getAll() {
    const tags = await this.tagsRepository.findMany();

    return tags.map((t) => this.tagsMapper.toDto(t));
  }
}
