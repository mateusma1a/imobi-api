CREATE TABLE company_type (
	id INT AUTO_INCREMENT,
	type_name VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO company_type (type_name) VALUES ("Imobiliária");

CREATE TABLE company (
	id INT AUTO_INCREMENT,
	company_type_id INT NOT NULL,
	company_name VARCHAR(350) UNIQUE NOT NULL,
	main_address VARCHAR(700) NULL,
	telephone VARCHAR(30) NOT NULL,
	email VARCHAR(200) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_company_type
	FOREIGN KEY (company_type_id) REFERENCES company_type (id)
);

INSERT INTO company (company_type_id, company_name, main_address, telephone, email) VALUES (1, "imobi", "", "9 9999-9999", "imobi@imobi.com.br");

CREATE TABLE users (
	id INT AUTO_INCREMENT,
	full_name  VARCHAR(200) UNIQUE NOT NULL,
	user_login VARCHAR(255) UNIQUE NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	nickname VARCHAR(100),
	telephone VARCHAR(30),
	email VARCHAR(200) NOT NULL,
	company_id INT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_users_company
	FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE clients_type (
	id INT AUTO_INCREMENT,
	type_name VARCHAR(100) UNIQUE NOT NULL,
	sigla VARCHAR(10)  UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO clients_type (type_name, sigla) 
	VALUES  ("Pessoa Física", "PF"),
		("Pessoa Jurídica", "PJ");

CREATE TABLE clients (
	id INT AUTO_INCREMENT,
	company_type_id INT NOT NULL,
	client_name VARCHAR(200) NOT NULL,
	cpf VARCHAR(20) UNIQUE NULL,
	cnpj VARCHAR(20) UNIQUE NULL,
	email VARCHAR(200) NULL,
	telephone VARCHAR(30) NULL,
	main_address VARCHAR(700) NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_clients_type
	FOREIGN KEY (company_type_id) REFERENCES clients_type (id)
);

CREATE TABLE building_status_type (
	id INT AUTO_INCREMENT,
	type_name VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO building_status_type (type_name)
	VALUES  ("Disponível"),
		("Vendido"),
		("Alugado");

CREATE TABLE building_type (
	id INT AUTO_INCREMENT,
	type_name VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO building_type (type_name)
	VALUES  ("Apartamento"),
		("Casa Urbana"),
		("Casa Rural");

CREATE TABLE building (
	id INT AUTO_INCREMENT,
	registration VARCHAR(20) UNIQUE NOT NULL,
	state VARCHAR(100) NOT NULL,
	city VARCHAR(100) NOT NULL,
	neighborhood VARCHAR(100) NOT NULL,
	street VARCHAR(200) NOT NULL,
	numberAddress VARCHAR(100) NOT NULL,
	address VARCHAR(700) NOT NULL,
	latitude DOUBLE NOT NULL,
	longitude DOUBLE NOT NULL,
	building_type_id INT NOT NULL DEFAULT 1,
	evaluation_report_value DOUBLE NULL,
	acquisition_value DOUBLE NULL,
	rent_value DOUBLE NULL,
	sale_value DOUBLE NULL,
	registered_user_id INT NOT NULL,
	registered_date_time DATETIME NOT NULL,
	last_updated_user_id INT NULL,
	last_updated_date_time DATETIME NULL,
	clients_id INT NULL,
	company_id INT NULL,
	building_status_type_id INT NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_building_registered_users
	FOREIGN KEY (registered_user_id) REFERENCES users (id),
	CONSTRAINT fk_building_last_updated_users
	FOREIGN KEY (last_updated_user_id) REFERENCES users (id),
	CONSTRAINT fk_building_type
	FOREIGN KEY (building_type_id) REFERENCES building_type (id),
	CONSTRAINT fk_building_clients
	FOREIGN KEY (clients_id) REFERENCES clients (id),
	CONSTRAINT fk_building_company
	FOREIGN KEY (company_id) REFERENCES company (id),
	CONSTRAINT fk_building_status_type
	FOREIGN KEY (building_status_type_id) REFERENCES building_status_type (id)
);

CREATE TABLE building_photos (
	id INT AUTO_INCREMENT,
	building_id INT NOT NULL,
	image_path VARCHAR (200) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_building_photos_building
	FOREIGN KEY (building_id) REFERENCES building (id)
);

ALTER TABLE building 
ADD COLUMN main_photo_id INT NULL,
ADD CONSTRAINT fk_building_photo
FOREIGN KEY (main_photo_id) REFERENCES building_photos (id);

CREATE TABLE charge_type (
	id INT AUTO_INCREMENT,
	name_charge VARCHAR(25) UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO charge_type (name_charge)
	VALUES  ("Limpeza"),
		("Terceirização"),
		("Vigilância"),
		("Água"),
		("Energia"),
		("Condominio");
		
CREATE TABLE charge (
	id INT AUTO_INCREMENT,
	building_id INT NOT NULL,
	charge_type_id INT NOT NULL,
	charge_value DOUBLE NOT NULL,
	date_time DATETIME NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_charge_type
	FOREIGN KEY (charge_type_id) REFERENCES charge_type (id),
	CONSTRAINT fk_charge_building
	FOREIGN KEY (building_id) REFERENCES building (id)
);

CREATE TABLE contract_type (
	id INT AUTO_INCREMENT,
	contract_type_name VARCHAR(20) UNIQUE NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO contract_type (contract_type_name)
	VALUES  ("Locação"),
		("Comodato"),
		("Arrendamento");

CREATE TABLE contract_history (
	id INT AUTO_INCREMENT,
	building_id INT NOT NULL,
	contract_type_id INT NOT NULL,
	charge_value DOUBLE NOT NULL,
	start_date_time DATETIME NOT NULL,
	end_date_time DATETIME NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_contract_type
	FOREIGN KEY (contract_type_id) REFERENCES contract_type (id),
	CONSTRAINT fk_contract_history_building
	FOREIGN KEY (building_id) REFERENCES building (id)
);

CREATE TABLE sales_history (
	id INT AUTO_INCREMENT,
	building_id INT NOT NULL,
	sale_value DOUBLE NOT NULL,
	sale_date_time DATETIME NOT NULL,
	sale_datails TEXT NULL,
	PRIMARY KEY (id),
	CONSTRAINT fk_sales_history_building
	FOREIGN KEY (building_id) REFERENCES building (id)
);
