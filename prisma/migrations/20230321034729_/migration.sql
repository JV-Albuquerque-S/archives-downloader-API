/*
  Warnings:

  - You are about to drop the column `extension` on the `document` table. All the data in the column will be lost.
  - Added the required column `ext` to the `document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document" DROP COLUMN "extension",
ADD COLUMN     "ext" TEXT NOT NULL;
