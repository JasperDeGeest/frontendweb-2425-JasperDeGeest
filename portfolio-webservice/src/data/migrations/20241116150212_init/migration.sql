/*
  Warnings:

  - You are about to drop the column `ISIN` on the `aandeel` table. All the data in the column will be lost.
  - You are about to drop the column `Kosten` on the `aandeel` table. All the data in the column will be lost.
  - You are about to drop the column `Rating` on the `aandeel` table. All the data in the column will be lost.
  - You are about to drop the column `Sustainability` on the `aandeel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isin]` on the table `Aandeel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isin` to the `Aandeel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kosten` to the `Aandeel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Aandeel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sustainability` to the `Aandeel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Aandeel_ISIN_key` ON `aandeel`;

-- AlterTable
ALTER TABLE `aandeel` DROP COLUMN `ISIN`,
    DROP COLUMN `Kosten`,
    DROP COLUMN `Rating`,
    DROP COLUMN `Sustainability`,
    ADD COLUMN `isin` VARCHAR(20) NOT NULL,
    ADD COLUMN `kosten` FLOAT NOT NULL,
    ADD COLUMN `rating` TINYINT UNSIGNED NOT NULL,
    ADD COLUMN `sustainability` TINYINT UNSIGNED NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Aandeel_isin_key` ON `Aandeel`(`isin`);
