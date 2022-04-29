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
    console.log(results);
    mainMenu();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.log(results);
    mainMenu();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.log(results);
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: `name`,
        type: `input`,
        message: `What is the name of the department`,
        validate: (name) => {
          if (name) {
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
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = [answers.name];
        db.query(sql, params, function (err, results) {
          if (err) throw err;
          console.log(results);
          mainMenu();
        });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        //prompt to add role
        name: `title`,
        type: `input`,
        message: `What is the name of the job title?`,
        validate: (jobTitleInput) => {
          if (jobTitleInput) {
            return true;
          } else {
            console.log("You need to enter the job title!");
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
        name: `department_id`,
        type: `input`,
        message: `Which is the id of the department?`,
        validate: (deptId) => {
          if (deptId) {
            return true;
          } else {
            console.log("You need to enter the department name!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
        const sql = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)"
        const params =  [answers.title, answers.salary, answers.department_id]
        
        db.query(sql, params, function (err, results) {
         if (err) throw err;
          console.log(results);
          mainMenu();
        });
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
      db.query("INSERT INTO * FROM employee", function (err, results) {
        if (err) throw err;
        console.log(results);
        mainMenu();
      });
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
        db.query("INSERT INTO * FROM employee", function (err, results) {
          if (err) throw err;
          console.log(results);
          mainMenu();
        });
    });
};

mainMenu();
