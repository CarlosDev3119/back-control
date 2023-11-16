users: id_user, name_user, apellido_p, apellido_m, email, password, register_number, id_degree, role, status_user;

degree: id_degree, name_degree;

payments: id_payment, payment;

register_payments: id_register_payment, id_user, id_payment, date_register, date_approval;

register_user: id_register_user, id_register_payment, id_document;

documents: id_document, document;


Users:
    id_user (PK)
    name_user
    apellido_p
    apellido_m
    email
    password
    register_number
    id_degree (FK)
    role
    status_user

Degrees:
    id_degree (PK)
    name_degree

Documents:
    id_document (PK)
    document_name
    document_type 

UserDocuments:
    id_user_document (PK)
    id_user (FK)
    id_document (FK)
    document_status 

RegisterUser:
    id_register_user (PK)
    id_register_type (FK)
    id_user (FK)
    date_register
    date_approval

registerType:
    id_register_type
    register_type(ej: inscripcion , reinscripcion)

-- Creación de la tabla Users
-- CREATE TABLE Users (
--     id_user INT AUTO_INCREMENT PRIMARY KEY,
--     name_user VARCHAR(255) NOT NULL,
--     apellido_p VARCHAR(255) NOT NULL,
--     apellido_m VARCHAR(255) NOT NULL,
--     email VARCHAR(100) UNIQUE,
--     password VARCHAR(255) NOT NULL,
--     register_number VARCHAR(255) UNIQUE NOT NULL,
--     id_degree INT,
--     role VARCHAR(20) DEFAULT 'USER_ROLE',
--     status_user VARCHAR(10) DEFAULT 'true',
--     FOREIGN KEY (id_degree) REFERENCES Degrees(id_degree)
-- ) ENGINE=InnoDB;

-- -- Creación de la tabla Degrees
-- CREATE TABLE Degrees (
--     id_degree INT AUTO_INCREMENT PRIMARY KEY,
--     name_degree VARCHAR(255)
-- ) ENGINE=InnoDB;

-- -- Creación de la tabla Documents
-- CREATE TABLE Documents (
--     id_document INT AUTO_INCREMENT PRIMARY KEY,
--     document_name VARCHAR(255),
--     id_document_type INT,
--     document_status VARCHAR(10),
--     FOREIGN KEY (id_document_type) REFERENCES documents_type(id_document_type)
-- ) ENGINE=InnoDB;

-- CREATE TABLE documents_type (
--     id_document_type INT AUTO_INCREMENT PRIMARY KEY,
--     document_type VARCHAR(100)
-- ) ENGINE=InnoDB;

-- -- Creación de la tabla UserDocuments
-- CREATE TABLE UserDocuments (
--     id_user_document INT AUTO_INCREMENT PRIMARY KEY,llave compuesta 
--     id_user INT,
--     id_document INT,
--     date_approval DATE,
--     date_register DATE,
--     FOREIGN KEY (id_user) REFERENCES Users(id_user),
--     FOREIGN KEY (id_document) REFERENCES Documents(id_document),
--     FOREIGN KEY (id_period) REFERENCES periods(id_period)
-- ) ENGINE=InnoDB;

-- -- Creación de la tabla RegisterUser
-- CREATE TABLE RegisterUser (
--     id_register_user INT AUTO_INCREMENT PRIMARY KEY,
--     id_register_type INT,
--     id_user INT,
--     date_register DATE,
--     id_period INT,
--     id_semestre INT,
--     FOREIGN KEY (id_register_type) REFERENCES RegisterType(id_register_type),
--     FOREIGN KEY (id_semestre) REFERENCES semesters(id_semestre),
--     FOREIGN KEY (id_period) REFERENCES periods(id_period),
--     FOREIGN KEY (id_user) REFERENCES Users(id_user)
-- ) ENGINE=InnoDB;

-- -- Creación de la tabla RegisterType
-- CREATE TABLE RegisterType (
--     id_register_type INT AUTO_INCREMENT PRIMARY KEY,
--     register_type VARCHAR(100)
-- ) ENGINE=InnoDB;

-- CREATE TABLE semesters {
--     id_semestre INT AUTO_INCREMENT PRIMARY KEY,
--     semester VARCHAR(100) NOT NULL
-- }

-- CREATE TABLE periods {
--     id_period INT AUTO_INCREMENT PRIMARY KEY,
--     period_name VARCHAR(100) NOT NULL
-- }


-- Creación de la tabla Users
CREATE TABLE Users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name_user VARCHAR(100) NOT NULL,
    apellido_p VARCHAR(100) NOT NULL,
    apellido_m VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    register_number VARCHAR(50) UNIQUE NOT NULL,
    id_degree INT,
    role VARCHAR(20) DEFAULT 'USER_ROLE',
    status_user ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (id_degree) REFERENCES Degrees(id_degree)
) ENGINE=InnoDB;

-- Creación de la tabla Documents
CREATE TABLE Documents (
    id_document INT AUTO_INCREMENT PRIMARY KEY,
    document_name VARCHAR(255),
    id_document_type INT,
    document_status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (id_document_type) REFERENCES DocumentTypes(id_document_type)
) ENGINE=InnoDB;

-- Creación de la tabla DocumentTypes
CREATE TABLE DocumentTypes (
    id_document_type INT AUTO_INCREMENT PRIMARY KEY,
    document_type VARCHAR(100)
) ENGINE=InnoDB;

-- Creación de la tabla UserDocuments
CREATE TABLE UserDocuments (
    id_user_document INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_document INT,
    date_approval DATE,
    date_register DATE,
    PRIMARY KEY (id_user_document),
    FOREIGN KEY (id_user) REFERENCES Users(id_user),
    FOREIGN KEY (id_document) REFERENCES Documents(id_document)
) ENGINE=InnoDB;

-- Creación de la tabla RegisterUser
CREATE TABLE RegisterUser (
    id_register_user INT AUTO_INCREMENT PRIMARY KEY,
    id_register_type INT,
    id_user INT,
    date_register DATE,
    PRIMARY KEY (id_register_user),
    FOREIGN KEY (id_register_type) REFERENCES RegisterTypes(id_register_type),
    FOREIGN KEY (id_user) REFERENCES Users(id_user)
) ENGINE=InnoDB;

-- Creación de la tabla RegisterTypes
CREATE TABLE RegisterTypes (
    id_register_type INT AUTO_INCREMENT PRIMARY KEY,
    register_type VARCHAR(100)
) ENGINE=InnoDB;

-- Creación de la tabla semesters
CREATE TABLE Semesters (
    id_semester INT AUTO_INCREMENT PRIMARY KEY,
    semester_name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- Creación de la tabla periods
CREATE TABLE Periods (
    id_period INT AUTO_INCREMENT PRIMARY KEY,
    period_name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;
