/*
  Warnings:

  - Added the required column `value` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "value" INTEGER NOT NULL;
