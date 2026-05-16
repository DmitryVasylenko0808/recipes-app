/*
  Warnings:

  - Made the column `current_version_id` on table `recipes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_current_version_id_fkey";

-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "current_version_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_current_version_id_fkey" FOREIGN KEY ("current_version_id") REFERENCES "recipe_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
