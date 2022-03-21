INSERT INTO department (id, name)
VALUES
('1','Engineering'),
('2','Finance'),
('3','Sales'),
('4','Legal')

INSERT INTO role (id, title, salary, department_id)
VALUES
('1','Software Engineer','120000','1'),
('2','Accountant','125000','2'),
('3','Salesperson','80000','3'),
('4','Lawyer','190000','4')

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
('1','Winnie','Wu','1','1'),
('2','Nancy','X','2','2'),
('3','Mike','T','3','3'),
('4','Erika','R','4','4')