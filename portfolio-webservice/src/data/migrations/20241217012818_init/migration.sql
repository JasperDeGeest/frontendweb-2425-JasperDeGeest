/*
  Warnings:

  - You are about to alter the column `rijksregisterNummer` on the `account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(11)` to `Decimal(11,0)`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `rijksregisterNummer` DECIMAL(11, 0) NOT NULL;
