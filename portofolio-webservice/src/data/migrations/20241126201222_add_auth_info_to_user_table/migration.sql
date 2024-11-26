/*
  Warnings:

  - Added the required column `roles` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `roles` JSON NOT NULL;

-- RenameIndex
ALTER TABLE `account` RENAME INDEX `Account_email_key` TO `idx_user_email_unique`;
