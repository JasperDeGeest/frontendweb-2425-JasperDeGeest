-- CreateTable
CREATE TABLE `Adres` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `straat` VARCHAR(255) NOT NULL,
    `huisNummer` VARCHAR(50) NOT NULL,
    `stad` VARCHAR(100) NOT NULL,
    `land` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `hashedPassword` VARCHAR(255) NOT NULL,
    `onbelegdVermogen` FLOAT NOT NULL,
    `rijksregisterNummer` VARCHAR(11) NOT NULL,
    `voornaam` VARCHAR(100) NOT NULL,
    `achternaam` VARCHAR(100) NOT NULL,
    `adresId` INTEGER UNSIGNED NOT NULL,
    `roles` JSON NOT NULL,

    UNIQUE INDEX `idx_account_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aandeel` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `isin` VARCHAR(20) NOT NULL,
    `afkorting` VARCHAR(20) NOT NULL,
    `uitgever` VARCHAR(100) NOT NULL,
    `kosten` FLOAT NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `rating` TINYINT UNSIGNED NOT NULL,
    `sustainability` TINYINT UNSIGNED NOT NULL,

    UNIQUE INDEX `idx_aandeel_isin_unique`(`isin`),
    UNIQUE INDEX `idx_aandeel_afkorting_unique`(`afkorting`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountAandeel` (
    `accountId` INTEGER UNSIGNED NOT NULL,
    `aandeelId` INTEGER UNSIGNED NOT NULL,
    `aantal` INTEGER UNSIGNED NOT NULL,
    `aankoopPrijs` FLOAT NOT NULL,
    `reden` VARCHAR(255) NOT NULL,
    `geschatteDuur` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`accountId`, `aandeelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `fk_account_adres` FOREIGN KEY (`adresId`) REFERENCES `Adres`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AccountAandeel` ADD CONSTRAINT `fk_accountAandeel_account` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AccountAandeel` ADD CONSTRAINT `fk_accountAandeel_aandeel` FOREIGN KEY (`aandeelId`) REFERENCES `Aandeel`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
