/*
  Warnings:

  - You are about to alter the column `rijksregisterNummer` on the `account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `rijksregisterNummer` INTEGER UNSIGNED NOT NULL;
