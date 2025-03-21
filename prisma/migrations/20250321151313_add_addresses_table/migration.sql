/*
  Warnings:

  - You are about to drop the column `ineOne` on the `address` table. All the data in the column will be lost.
  - Added the required column `lineOne` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `ineOne`,
    ADD COLUMN `lineOne` VARCHAR(191) NOT NULL;
