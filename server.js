const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
let roles;
let departments;
let managers;
let employees;

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
};


currentRoles = () => {
    db.query("SELECT id, title FROM role", (err, result) => {
        if (err) throw err;
        roles = result;
    })
}

currentDepartments = () => {
    db.query("SELECT id, name FROM department", (err, result) => {
        if (err) throw err;
        departments = result;
    })
}

currentManagers = () => {
    db.query("SELECT id, first_name, last_name, CONCAT_WS(' ', first_name, last_name) AS managers FROM employee", (err, result) => {
        if (err) throw err;
        managers = result;
    })
}

currentEmployees = () => {
    db.query("SELECT id, CONCAT_WS(' ', first_name, last_name) AS Employee_Name FROM employee", (err, result) => {
        if (err) throw err;
        employees = result;
    })

}


// Add employee
function addEmployee(){
    currentManagers();
    currentRoles();

    let roleOptions = [];
    for (i = 0; i < managers.length; i++) {
        managerOptions.push(Object(managers[i]));
    }


    inquirer
        .prompt([
            { 
                type: "input",
                message: "What is the employee's first name?",
                name: 'first_name',
            },
            { 
                type: "input",
                message: "What is the employee's last name?",
                name: 'last_name',
            },
            { 
                type: "list",
                message: "What is the employee's role?",
                name: 'role_id',
                choices: function() {
                    let choiceArray = [];
                    for (let i = 0; i < roleOptions.length; i++) {
                        choiceArray.push(roleOptions[i].title)
                    }
                    return choiceArray;
                }
            },
            { 
                type: "list",
                message: "Who is the employee's manager",
                name: 'manager_id',
                choices: function() {
                    let choiceArray = [];
                    for (let i = 0; i < managerOptions.length; i++) {
                        choiceArray.push(managerOptions[i].managers)
                    }
                    return choiceArray;
                }
            }
        ])
        .then((res) => {
            for (i = 0; i < roleOptions.length; i++) {
                if (roleOptions[i].title === res.role_id) {
                    role_id = roleOptions[i].id
                }
            }

            for (i = 0; i < managerOptions.length; i++) {
                if (managerOptions[i].managers === res.manager_id) {
                    manager_id = managerOptions[i].id
                }
            }

            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${res.first_name}", "${res.last_name}", "${res.role_id}", "${res.manager_id}");`, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    // allCurrentEmployees.push(results);
                    console.log('New employee added!');
                }
            });
            getEmployees();
            initialQuestions();
    });
};

// Add a role
function addRole() {
    let departmentOptions = [];
    for (i = 0; i < departments.length; i++) {
        departmentOptions.push(Object(departments[i]));
    };

    inquirer
        .prompt([
            { 
                type: "input",
                message: "What is name of the role?",
                name: 'title',
            },
            { 
                type: "input",
                message: "What is the salary of the role?",
                name: 'salary',
            },
            { 
                type: "input",
                message: "What department does the role belong to?",
                name: 'department_id',
                choices: departmentOptions
            }
        ]
           )
        .then((res) => {
            for (i = 0; i < departmentOptions.length; i++) {
                if (departmentOptions[i].name === answer.department_id) {
                    department_id = departmentOptions[i].id
                }
            }

            db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${res.title}", "${res.salary}", "${res.department_id}")`, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    // employeeRoles.push(results);
                    console.log("New role added!");
                }
            });
            currentRoles();
            initialQuestions();
        });
};



// Add a department 
function addDepartment() {
    inquirer
    .prompt(
        { 
        type: "input",
        message: "What is the name of the department?",
        name: 'newDepartment',
    })
    .then((res) => {
        db.query(`INSERT INTO department (name) VALUES ("${res.newDepartment}")`, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                // employeeDepartments.push(results);
                console.log("New role added!");
            }
        });
        currentDepartments();
        initialQuestions();
    });
};


// View all employees
function viewEmployees() {
    db.query(`SELECT x.id, x.first_name "First Name", x.last_name "Last Name", title Title, salary Salary, name Position, y.first_name "Manager First Name", y.last_name "Manager Last Name" from employee as x join role on x.role_id = role.id join department on role.department_id = department.id join employee as y on x.manager_id = y.id`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
        }
    });
    initialQuestions();
};

// View all roles
function viewRoles() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
        }
    });
    initialQuestions();
};

// View all departments
function viewDepartments() {
    db.query('SELECT * FROM departmeent', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.table(results);
        }
    });
    initialQuestions();
};

// Update employee role
function updateEmployeeRole(){

    let employeeOptions = [];

    for (let i = 0; i < allCurrentEmployees.length; i++) {
        employeeOptions.push(Object(allCurrentEmployees[i]));
    };

    inquirer
        .prompt(
            { 
                type: "list",
                message: "Which employee's role do you want to update?",
                name: 'updateEmployee',
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < employeeOptions.length; i++) {
                        choiceArray.push(employeeOptions[i].Employee_Name);
                    }
                    return choiceArray;
                }
            }
        )
        .then((res) => {
            let roleOptions = [];

            for (i = 0; i < roles.length; i++) {
                roleOptions.push(Object(roles[i]));
            };

            for (i = 0; i < employeeOptions.length; i++) {
                if (employeeOptions[i].Employee_Name === res.updateRole) {
                    employeeSelected = employeeOptions[i].id
                }
            }
            inquirer.prompt([           
                {
                    type: "list",
                    message: "Which role do you want to assign the selected employee?",
                    name: 'roleReassignment',
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < roleOptions.length; i++) {
                            choiceArray.push(roleOptions[i].title)
                        }
                        return choiceArray;
                    }
                }
            ]).then(res => {
                for (i = 0; i < roleOptions.length; i++) {
                    if (res.roleReassignment === roleOptions[i].title) {
                        newChoice = roleOptions[i].id
                        db.query(`UPDATE employee SET role_id = ${newChoice} WHERE id = ${employeeSelected}`, (err, result) => {
                            if (err) throw err;
                        })
                    }
                }
            })
            currentEmployees();
            currentRoles();
            initialQuestions();
        });
};



init();
