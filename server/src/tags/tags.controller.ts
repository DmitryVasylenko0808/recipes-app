import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagDto } from './dtos';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOkResponse({ type: [TagDto] })
  async getAll() {
    const tags = await this.tagsService.getAll();
    return tags.map((tag) => new TagDto(tag));
  }
}
