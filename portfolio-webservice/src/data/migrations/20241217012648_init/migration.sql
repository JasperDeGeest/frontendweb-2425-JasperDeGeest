/*
  Warnings:

  - You are about to alter the column `rijksregisterNummer` on the `account` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `rijksregisterNummer` VARCHAR(11) NOT NULL;
