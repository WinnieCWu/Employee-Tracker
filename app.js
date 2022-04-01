const db = require("./db/connection");
const inquirer = require("inquirer");
require("console.table");

const employees = [];

//Upon start, present a list of options for user
const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.userChoice === "View all departments") {
        viewDepartments();
        //presented with a formatted table showing department names and department ids
      }
      if (answers.userChoice === "View all roles") {
        viewRoles();
        //presented with the job title, role id, the department that role belongs to, and the salary for that role
      }
      if (answers.userChoice === "View all employees") {
        viewEmployees();
        //presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
      }
      if (answers.userChoice === "Add a department") {
        addDepartment();
      }
      if (answers.userChoice === "Add a role") {
        addRole();
      }
      if (answers.userChoice === "Add an employee") {
        addEmployee();
      }
      if (answers.userChoice === "Update an employee role") {
        updateEmployeeRole();
      }
    });
};

const viewDepartments = () => {
  // Query database
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: `deptName`,
        type: `input`,
        message: `What is the name of the department`,
        validate: (deptNameInput) => {
          if (deptNameInput) {
            return true;
          } else {
            console.log("You need to enter the name of the department!");
            return false;
          }
        },
      },
    ])
    //the dept will be added to employeeTracker db
    .then((answers) => {
      console.log(answers);
      const dept = new Department(answers.dept);
      employees.push(dept);
      mainMenu();
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        //prompt to add role
        name: `roleName`,
        type: `input`,
        message: `Please provide your role.`,
        validate: (roleNameInput) => {
          if (roleNameInput) {
            return true;
          } else {
            console.log("You need to enter your role!");
            return false;
          }
        },
      },
      {
        //enter name
        name: `jobTitle`,
        type: `input`,
        message: `What is the name of the role?`,
        validate: (jobTitleInput) => {
          if (jobTitleInput) {
            return true;
          } else {
            console.log("You need to enter your job title!");
            return false;
          }
        },
      },
      {
        //enter salary
        name: `salary`,
        type: `input`,
        message: `What is the annual salary of the role?`,
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log("You need to enter your salary!");
            return false;
          }
        },
      },
      {
        //enter dept for the role
        name: `deptOfRole`,
        type: `input`,
        message: `Which department does your role belong to?`,
        validate: (deptOfRoleInput) => {
          if (deptOfRoleInput) {
            return true;
          } else {
            console.log("You need to enter your department name!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const role = new Role(
        answers.roleName,
        answers.jobTitle,
        answers.salary,
        answers.deptOfRole
      );
      employees.push(role);
      mainMenu();
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        //enter first name
        name: `firstName`,
        type: `input`,
        message: `What is the employee's first name?`,
        validate: (firstNameInput) => {
          if (firstNameInput) {
            return true;
          } else {
            console.log("You need to enter the employee's first name!");
            return false;
          }
        },
      },
      {
        //enter last name
        name: `lastName`,
        type: `input`,
        message: `What is the employee's last name?`,
        validate: (lastNameInput) => {
          if (lastNameInput) {
            return true;
          } else {
            console.log("You need to enter the employee's last name!");
            return false;
          }
        },
      },
      {
        //enter role
        name: `employeeRole`,
        type: `input`,
        message: `What is the employee's role?`,
        validate: (employeeRoleInput) => {
          if (employeeRoleInput) {
            return true;
          } else {
            console.log("You need to the employee's role!");
            return false;
          }
        },
      },
      {
        //enter manager name
        name: `managerName`,
        type: `input`,
        message: `Who is the employee's manager`,
        validate: (managerNameInput) => {
          if (managerNameInput) {
            return true;
          } else {
            console.log("You need the employee's manager!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const role = new Role(
        answers.firstName,
        answers.lastName,
        answers.employeeRole,
        answers.managerName
      );
      employees.push(role);
      mainMenu();
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        //prompt to select employee to update
        name: `updateRole`,
        type: `input`,
        message: `Which employee's role do you want to update?`,
        validate: (updateRoleInput) => {
          if (updateRoleInput) {
            return true;
          } else {
            console.log("You need to select which employee's role to update!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      const updatedRole = new Update(answers.updateRole);
      employees.push(updatedRole);
      mainMenu();
    });
};

mainMenu();
