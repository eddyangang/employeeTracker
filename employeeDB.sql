DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE  employee_DB;

CREATE TABLE departments
(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4),
    department_id INT NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
); 