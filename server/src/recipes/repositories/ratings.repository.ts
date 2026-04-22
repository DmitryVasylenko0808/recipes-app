import { Injectable } from '@nestjs/common';
import { IRatingsRepository } from '../interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { Rating } from 'src/generated/prisma/client';

@Injectable()
export class RatingsRepository implements IRatingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: string, recipeId: string): Promise<Rating | null> {
    return await this.prisma.rating.findUnique({
      where: {
        userId_recipeId: { userId, recipeId },
      },
    });
  }

  async upsert(userId: string, recipeId: string, value: number): Promise<Rating> {
    return await this.prisma.rating.upsert({
      create: {
        userId,
        recipeId,
        value,
      },
      update: {
        value,
      },
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
  }
}
