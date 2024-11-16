-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_adresId_fkey`;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `fk_account_adres` FOREIGN KEY (`adresId`) REFERENCES `Adres`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
