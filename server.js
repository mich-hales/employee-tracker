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

function init() {
    initialQuestions();
};

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
    
};

// Arrays for current data
const employeeRoles = [
    'Sales Lead',
    'Salesperson',
    'Lead Engineer',
    'Software Engineer',
    'Account Manager',
    'Accountant',
    'Legal Team Lead',
];

const employeeDepartments = [
    'Engineering',
    'Finance',
    'Legal',
    'Sales',
];

const allCurrentEmployees = [
    'John Doe',
    'Ashley Rodriquez',
    'Kunal Singh',
    'Sarah Lourd',
    'Mike Chan',
    'Kevin Tupik',
    'Malia, Brown',
    'Johnny Flicker',
];

const currentManagers = [
    'None',
    'John Doe',
    'Ashley Rodriquez',
    'Kunal Singh',
    'Sarah Lourd',
];

// Prompts to add data to the current data
const addNewEmployeePrompts = [
    { 
        type: "input",
        message: "What is the employee's first name?",
        name: 'newFirst',
    },
    { 
        type: "input",
        message: "What is the employee's last name?",
        name: 'newLast',
    },
    { 
        type: "list",
        message: "What is the employee's role?",
        name: 'newRole',
        choices: [employeeRoles]
    },
    { 
        type: "list",
        message: "Who is the employee's manager",
        name: 'newManager',
        choices: [currentManagers]
    }
];

const updateEmployeeRolePrompts =[
    { 
        type: "list",
        message: "Which employee's role do you want to update?",
        name: 'updateEmployee',
        choices: [allCurrentEmployees]
    },
    {
        type: "list",
        message: "Which role do you want to assign the selected employee?",
        name: 'roleReassignment',
        choices: [employeeRoles]
    }
];

const addNewRolePrompt = [
    { 
        type: "input",
        message: "What is name of the role?",
        name: 'newRole',
    },
    { 
        type: "input",
        message: "What is the salary of the role?",
        name: 'newRoleSalary',
    },
    { 
        type: "input",
        message: "What department does the role belong to?",
        name: 'newRoleDepartment',
        choices: [employeeDepartments]
    },
];

const addDepartmentPrompt = [
    { 
        type: "input",
        message: "What is the name of the department?",
        name: 'newDepartment',
    }
];


// Add employee
function addEmployee(){
    inquirer
        .prompt(addNewEmployeePrompts)
        .then((res) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${}", "${}", "${}", "${}");`, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('New employee added!');
                }
            });
            reset();
    });
};

// Update employee role
function updateEmployeeRole(){

};

// View all roles
function viewRoles() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
        }
    })
};


// Add a role
function addRole() {

};

// View all departments
function viewDepartments() {
    db.query('SELECT * FROM departmeent', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
        }
    })
};

// Add a department 
function addDepartment() {

};



function reset() {
    inquirer.prompt([
        {
            type: "input",
            mesage: "",
            name: "*"
        }
    ]).then(() => {
        initialQuestions();
    })
}

init();