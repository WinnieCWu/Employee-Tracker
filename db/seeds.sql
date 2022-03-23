INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Sales'),
('Legal')

INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer Manager',120000,1),
('Software Engineer', 110000,2)
('Accountant',125000,3),
('Salesperson',80000,4),
('Lawyer',190000,5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Winnie','Wu',1,null),
('Sam', 'Fox', 2, 1)
('Nancy','Xi',3,2),
('Mike','Te',4,3),
('Erika','Ro',5,4)