/*
  Warnings:

  - Added the required column `extension` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" ADD COLUMN     "extension" TEXT NOT NULL;
