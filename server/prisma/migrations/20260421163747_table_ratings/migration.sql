-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "ratings_avg" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ratings_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "ratings_sum" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ratings_user_id_recipe_id_key" ON "ratings"("user_id", "recipe_id");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
