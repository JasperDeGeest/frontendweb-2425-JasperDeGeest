/*
  Warnings:

  - A unique constraint covering the columns `[afkorting]` on the table `Aandeel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `idx_aandeel_afkorting_unique` ON `Aandeel`(`afkorting`);

-- RenameIndex
ALTER TABLE `aandeel` RENAME INDEX `Aandeel_isin_key` TO `idx_aandeel_isin_unique`;

-- RenameIndex
ALTER TABLE `account` RENAME INDEX `idx_user_email_unique` TO `idx_account_email_unique`;
