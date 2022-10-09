const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Database conneection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'employee_tracker'
    },
    console.log('Connected to employee_tracker database.')
);


// Initial questions to prompt all options
function initialQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                'View All Employees', 
                'Add Employee',
                'Update Employee Role',
                'View All Roles', 
                'Add Role', 
                'View All Departments', 
                'Add Department', 
                'Quit',
            ]
        }
    ]).then((res) => {
        switch (res.choice) {
            case 'View All Employees': viewEmployees();
                break;
            case 'Add Employee': addEmployee();
                break;
            case 'Update Employee Role': updateEmployeeRole();
                break;
            case 'View All Roles': viewRoles();
                break;
            case 'Add Role': addRole();
                break;
            case 'View All Departments': viewDepartments();
                break;
            case 'Add Department': addDepartment();
                break;
            case 'Quit': process.exit(0);
                break;
            default:
                break;
        }
    })
}

// View all employees
function viewEmployees() {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
        }
    })
    
}

// Add employee
function addEmployee(){

}

// Update employee role
function updateEmployeeRole(){

}

// View all roles
function viewRoles() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
        }
    })
}


// Add a role
function addRole() {

}

// View all departments
function viewDepartments() {
    db.query('SELECT * FROM departmeent', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
        }
    })
}

// Add a department 
function addDepartment() {

}





const addRoleQuestions = [
    'What is the name of the role?',
    'What is the salary for the role?',
    'What is the department for the role?'
];

const addEmployeeQuestions = [
   "What is the employee's first name?",
   "What is the employee's last name?",
   "What is the employee's role?",
   "What is the employee's manager?",
];





// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
