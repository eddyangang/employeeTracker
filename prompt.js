const inquirer = require("inquirer");
const mysql = require("mysql");

// const Database = require("./mysqlQuery.js")
// let db = new Database("localhost", 3306, "root", "employee_DB")

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
});

function init() {

    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        name: "option",
        choices: ["Add Department", "Add roles", "Add employees", "View Department", "View Roles", "View Employees", "Update Employees Role", "Exit"]
    }).then(({
        option
    }) => {

        switch (option) {
            case "Add Department":
                addDepartment();
                break;
            case "Add roles":
                addRoles();
                break;
            case "Add employees":
                addEmployees();
                break;
            case "View Department":
                viewDepartment();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Update Employees Role":
                updateEmployees();
                break;
            default:
                connection.end()
        }
    })
}

function addDepartment() {
    inquirer.prompt({
        message: "What department would you like to add?",
        type: "input",
        name: "newDepartment"
    }).
    then(({
        newDepartment
    }) => {
        connection.query("INSERT INTO departments SET ?", {
            name: newDepartment
        }, (err) => {
            if (err) throw err

            else console.log(`${newDepartment} has been added as a new deparment in the database!`);

            init();
        })
    })
}

function addRoles() {

    connection.query("SELECT DISTINCT id, name FROM departments", (err, res) => {
        if (err) throw err;

        let departmentMap = {};
        for (let i = 0; i < res.length; i++) {

            departmentMap[res[i].name] = res[i].id
        }
        inquirer.prompt([{
                    message: "What is the title of this role?",
                    type: "input",
                    name: "title"
                },
                {
                    message: "What is the annual salary for this position?",
                    type: "number",
                    name: "salary"
                },
                {
                    message: "What department is this role under?",
                    type: "list",
                    name: "departmentName",
                    choices: Object.keys(departmentMap)
                }
            ])
            .then(({
                title,
                salary,
                departmentName
            }) => {
                const departmentID = departmentMap[departmentName];

                connection.query("INSERT INTO roles SET ?", {
                    title: title,
                    salary: salary,
                    department_id: departmentID

                }, (err) => {
                    if (err) throw err
                    else console.log(`${title} has been added as a new role in the database!`);
                    init();
                })
            })
    })
}

function addEmployees() {

    connection.query("SELECT DISTINCT id, title, department_id FROM roles", (err, res) => {
        if (err) throw err;
        const rolesMap = {}
        for (let i = 0; i < res.length; i++) {

            rolesMap[res[i].title] = {
                id: res[i].id,
                departmentID: res[i].department_id
            }
        }
        inquirer.prompt([{
            message: "What is the new employee's first name?",
            type: "input",
            name: "first_name",

        }, {
            message: "What is the employee's last name?",
            type: "input",
            name: "last_name"
        }, {
            message: "What is the employee's job title?",
            type: "list",
            name: "title",
            choices: Object.keys(rolesMap)
        }]).then(({
            first_name,
            last_name,
            title
        }) => {


            connection.query("INSERT INTO employees SET ?", {
                first_name: first_name,
                last_name: last_name,
                role_id: rolesMap[title].id
            }, (err) => {
                if (err) throw err
                else console.log(`${first_name} ${last_name} has been added as a new employee in the database as a ${title}!`);
                init();
            })
        })
    })
}

function viewDepartment() {
    connection.query("SELECT DISTINCT name FROM departments", (err, res) => {
        if (err) throw err;
        console.table(res)
        init();
    })

}

function viewRoles() {
    connection.query("SELECT  * FROM roles", (err, res) => {
        if (err) throw err
        console.table(res)
        init();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err
        console.table(res)
        init();
    })
}

function updateEmployees() {
    connection.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err

        const employeeMap = {}
        for (let i = 0; i < res.length; i++) {
            employeeMap[res[i].id] = {
                first_name: res[i].first_name,
                last_name: res[i].last_name,
                role_id: res[i].role_id,
                manager_id: res[i].manager_id
            }

        }

        connection.query("SELECT DISTINCT id, title FROM roles", (err, res) => {
            if (err) throw err;
            const rolesMap = {}
            for (let i = 0; i < res.length; i++) {

                rolesMap[res[i].title] = {
                    id: res[i].id,
                    departmentID: res[i].department_id
                }
            }

            inquirer.prompt([{
                    message: "What is the employee's ID?",
                    type: "number",
                    name: "employeeID"

                },
                {
                    message: "What is the employee's new role?",
                    type: "list",
                    name: "roleName",
                    choices: Object.keys(rolesMap)
                }
            ]).then(({
                employeeID,
                roleName
            }) => {

                const roleID = rolesMap[roleName].id;
                connection.query("UPDATE employees SET role_id = ? WHERE (id = ?);", [roleID, employeeID], (err, res) => {
                    if (err) throw err

                    console.log("New role successfuly changed!");
                })

                init();
            })
        })


    })

}


init();