-- CreateTable
CREATE TABLE `degrees` (
    `id_degree` INTEGER NOT NULL AUTO_INCREMENT,
    `degree` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_degree`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentTypes` (
    `id_document_type` INTEGER NOT NULL AUTO_INCREMENT,
    `document_type` VARCHAR(100) NULL,

    PRIMARY KEY (`id_document_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `id_document` INTEGER NOT NULL AUTO_INCREMENT,
    `document_name` VARCHAR(255) NULL,
    `path_document` VARCHAR(255) NULL,
    `id_document_type` INTEGER NULL,
    `document_status` ENUM('pending', 'approved', 'denied') NULL DEFAULT 'pending',

    INDEX `id_document_type`(`id_document_type`),
    PRIMARY KEY (`id_document`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periods` (
    `id_period` INTEGER NOT NULL AUTO_INCREMENT,
    `period_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_period`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registerTypes` (
    `id_register_type` INTEGER NOT NULL AUTO_INCREMENT,
    `register_type` VARCHAR(100) NULL,

    PRIMARY KEY (`id_register_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registerUser` (
    `id_register_user` INTEGER NOT NULL AUTO_INCREMENT,
    `id_register_type` INTEGER NULL,
    `id_user` INTEGER NULL,
    `id_semester` INTEGER NULL,
    `id_period` INTEGER NULL,
    `date_register` DATE NULL,

    INDEX `id_period`(`id_period`),
    INDEX `id_register_type`(`id_register_type`),
    INDEX `id_semester`(`id_semester`),
    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_register_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `semesters` (
    `id_semester` INTEGER NOT NULL AUTO_INCREMENT,
    `semester_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userDocuments` (
    `id_user_document` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NULL,
    `id_document` INTEGER NULL,
    `id_register_type` INTEGER NULL,
    `date_approval` DATE NULL,
    `date_register` DATE NULL,

    INDEX `id_document`(`id_document`),
    INDEX `id_register_type`(`id_register_type`),
    INDEX `id_user`(`id_user`),
    PRIMARY KEY (`id_user_document`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name_user` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `middle_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NULL,
    `password` VARCHAR(255) NOT NULL,
    `register_number` VARCHAR(50) NOT NULL,
    `id_degree` INTEGER NULL,
    `role` VARCHAR(20) NULL DEFAULT 'USER_ROLE',
    `status_user` ENUM('active', 'inactive') NULL DEFAULT 'active',

    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `register_number`(`register_number`),
    INDEX `id_degree`(`id_degree`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`id_document_type`) REFERENCES `documentTypes`(`id_document_type`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registerUser` ADD CONSTRAINT `registeruser_ibfk_1` FOREIGN KEY (`id_register_type`) REFERENCES `registerTypes`(`id_register_type`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registerUser` ADD CONSTRAINT `registeruser_ibfk_2` FOREIGN KEY (`id_semester`) REFERENCES `semesters`(`id_semester`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registerUser` ADD CONSTRAINT `registeruser_ibfk_3` FOREIGN KEY (`id_period`) REFERENCES `periods`(`id_period`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `registerUser` ADD CONSTRAINT `registeruser_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `userDocuments` ADD CONSTRAINT `userdocuments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users`(`id_user`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `userDocuments` ADD CONSTRAINT `userdocuments_ibfk_2` FOREIGN KEY (`id_register_type`) REFERENCES `registerTypes`(`id_register_type`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `userDocuments` ADD CONSTRAINT `userdocuments_ibfk_3` FOREIGN KEY (`id_document`) REFERENCES `documents`(`id_document`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_degree`) REFERENCES `degrees`(`id_degree`) ON DELETE RESTRICT ON UPDATE RESTRICT;
