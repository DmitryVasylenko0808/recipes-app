/*
  Warnings:

  - You are about to drop the column `recipe_id` on the `recipe_ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_id` on the `recipe_steps` table. All the data in the column will be lost.
  - The primary key for the `recipe_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recipe_id` on the `recipe_tags` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `cooking_time` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `preview_image` on the `recipes` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `recipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[current_version_id]` on the table `recipes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipe_version_id` to the `recipe_ingredients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_version_id` to the `recipe_steps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipe_version_id` to the `recipe_tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "recipe_ingredients_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_steps" DROP CONSTRAINT "recipe_steps_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_tags" DROP CONSTRAINT "recipe_tags_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_category_id_fkey";

-- AlterTable
ALTER TABLE "recipe_ingredients" DROP COLUMN "recipe_id",
ADD COLUMN     "recipe_version_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipe_steps" DROP COLUMN "recipe_id",
ADD COLUMN     "recipe_version_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipe_tags" DROP CONSTRAINT "recipe_tags_pkey",
DROP COLUMN "recipe_id",
ADD COLUMN     "recipe_version_id" TEXT NOT NULL,
ADD CONSTRAINT "recipe_tags_pkey" PRIMARY KEY ("recipe_version_id", "tag_id");

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "category_id",
DROP COLUMN "cooking_time",
DROP COLUMN "description",
DROP COLUMN "difficulty",
DROP COLUMN "preview_image",
DROP COLUMN "title",
ADD COLUMN     "current_version_id" TEXT;

-- CreateTable
CREATE TABLE "recipe_versions" (
    "id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "preview_image" TEXT NOT NULL,
    "cooking_time" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "category_id" TEXT NOT NULL,
    "change_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipe_versions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe_versions_recipe_id_version_key" ON "recipe_versions"("recipe_id", "version");

-- CreateIndex
CREATE UNIQUE INDEX "recipes_current_version_id_key" ON "recipes"("current_version_id");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_current_version_id_fkey" FOREIGN KEY ("current_version_id") REFERENCES "recipe_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_versions" ADD CONSTRAINT "recipe_versions_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_versions" ADD CONSTRAINT "recipe_versions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_steps" ADD CONSTRAINT "recipe_steps_recipe_version_id_fkey" FOREIGN KEY ("recipe_version_id") REFERENCES "recipe_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_tags" ADD CONSTRAINT "recipe_tags_recipe_version_id_fkey" FOREIGN KEY ("recipe_version_id") REFERENCES "recipe_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_version_id_fkey" FOREIGN KEY ("recipe_version_id") REFERENCES "recipe_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
