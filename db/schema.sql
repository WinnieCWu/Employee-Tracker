DROP TABLE IF EXISTS employeeTracker;

CREATE TABLE department(
    id: INTEGER,
    name: VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id: INTEGER PRIMARY KEY,
    title: VARCHAR(30),
    salary: DECIMAL,
    department_id: INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE SET NULL 
);

CREATE TABLE employee(
    id: INTEGER PRIMARY KEY,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INTEGER,
    manager_id: INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id)
    ON DELETE SET NULL 
)