-- DropForeignKey
ALTER TABLE "recipe_tags" DROP CONSTRAINT "recipe_tags_recipe_version_id_fkey";

-- AddForeignKey
ALTER TABLE "recipe_tags" ADD CONSTRAINT "recipe_tags_recipe_version_id_fkey" FOREIGN KEY ("recipe_version_id") REFERENCES "recipe_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
