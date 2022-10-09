const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'employee_tracker'
    },
    console.log('Connected to employee_tracker database.')
);

db.query('SELECT * FROM role', (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.table(results);
    }
})




function initialQuestions() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                'View all departments', 
                'View all roles', 
                'View all employees', 
                'Add a department', 
                'Add a role', 
                'Add an employee',
                'Update an employee role',
                'Quit',
            ]
        }
    ]).then((res) => {

    })
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
