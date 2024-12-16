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
    `rijksregisterNummer` VARCHAR(20) NOT NULL,
    `voornaam` VARCHAR(100) NOT NULL,
    `achternaam` VARCHAR(100) NOT NULL,
    `adresId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aandeel` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `ISIN` VARCHAR(20) NOT NULL,
    `afkorting` VARCHAR(20) NOT NULL,
    `uitgever` VARCHAR(100) NOT NULL,
    `Kosten` FLOAT NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `Rating` TINYINT UNSIGNED NOT NULL,
    `Sustainability` TINYINT UNSIGNED NOT NULL,

    UNIQUE INDEX `Aandeel_ISIN_key`(`ISIN`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountAandeel` (
    `accountId` INTEGER UNSIGNED NOT NULL,
    `aandeelId` INTEGER UNSIGNED NOT NULL,
    `aantal` INTEGER UNSIGNED NOT NULL,
    `aakoopPrijs` FLOAT NOT NULL,
    `reden` VARCHAR(255) NOT NULL,
    `geschatteDuur` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`accountId`, `aandeelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_adresId_fkey` FOREIGN KEY (`adresId`) REFERENCES `Adres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountAandeel` ADD CONSTRAINT `AccountAandeel_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountAandeel` ADD CONSTRAINT `AccountAandeel_aandeelId_fkey` FOREIGN KEY (`aandeelId`) REFERENCES `Aandeel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
