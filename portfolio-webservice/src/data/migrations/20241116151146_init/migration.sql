/*
  Warnings:

  - You are about to drop the column `aakoopPrijs` on the `accountaandeel` table. All the data in the column will be lost.
  - Added the required column `aankoopPrijs` to the `AccountAandeel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accountaandeel` DROP COLUMN `aakoopPrijs`,
    ADD COLUMN `aankoopPrijs` FLOAT NOT NULL;
