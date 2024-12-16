/*
  Warnings:

  - You are about to alter the column `geschatteDuur` on the `accountaandeel` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE `accountaandeel` MODIFY `geschatteDuur` VARCHAR(255) NOT NULL;
