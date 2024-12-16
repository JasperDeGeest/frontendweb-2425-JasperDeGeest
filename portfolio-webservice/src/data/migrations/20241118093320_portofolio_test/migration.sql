-- DropForeignKey
ALTER TABLE `accountaandeel` DROP FOREIGN KEY `AccountAandeel_aandeelId_fkey`;

-- DropForeignKey
ALTER TABLE `accountaandeel` DROP FOREIGN KEY `AccountAandeel_accountId_fkey`;

-- AddForeignKey
ALTER TABLE `AccountAandeel` ADD CONSTRAINT `fk_accountAandeel_account` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AccountAandeel` ADD CONSTRAINT `fk_accountAandeel_aandeel` FOREIGN KEY (`aandeelId`) REFERENCES `Aandeel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
