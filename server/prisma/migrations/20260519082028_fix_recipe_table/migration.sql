-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_current_version_id_fkey";

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_current_version_id_fkey" FOREIGN KEY ("current_version_id") REFERENCES "recipe_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
