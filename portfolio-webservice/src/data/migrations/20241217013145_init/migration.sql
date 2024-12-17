/*
  Warnings:

  - You are about to alter the column `rijksregisterNummer` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Decimal(11,0)` to `Float`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `rijksregisterNummer` FLOAT NOT NULL;
