/*
  Warnings:

  - Added the required column `name` to the `Entrepreneurship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrepreneurship" ADD COLUMN     "name" TEXT NOT NULL;
