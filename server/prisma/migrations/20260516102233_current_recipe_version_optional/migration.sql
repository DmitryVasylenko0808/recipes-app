-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_current_version_id_fkey";

-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "current_version_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_current_version_id_fkey" FOREIGN KEY ("current_version_id") REFERENCES "recipe_versions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
