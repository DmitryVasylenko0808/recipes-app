import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorsModule } from './authors/authors.module';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthorsModule, AuthModule, RecipesModule],
})
export class AppModule {}
