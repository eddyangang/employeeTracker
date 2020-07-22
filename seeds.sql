USE employee_db;

INSERT INTO department (name)
VALUES ("software"), ("hardwre"), ("design");

INSERT INTO role (title, salary, department_id)
VALUES ("software manager", 120000, 1), ("hardware manager", 100000, 2), ("design manager", 80000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jerome", "Jerome's last name", 1, NULL), ("Eddy", "Yang", 2, 1); 