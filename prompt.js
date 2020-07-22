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
        choices: ["Add Department", "Add roles", "Add employees", "View Department", "View Roles", "View Employees", "Update Employees", "Exit"]
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
            case "Update Employees":
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
        connection.query("INSERT INTO department SET ?", {
            name: newDepartment
        }, (err) => {
            if (err) throw err

            else console.log(`${newDeparment} has been added as a new deparment in the database!`);
        })
    })
}

function addRoles() {
    let allDepartmentNames = [];
    let allDepartmentID = [];
    connection.query("SELECT DISTINCT id, name FROM department", (err, res) => {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            allDepartmentNames.push(res[i].name)
            allDepartmentID.push(res[i].id)
        }

    })

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
                choices: allDepartmentNames
            }
        ])
        .then(({
            title,
            salary,
            departmentName
        }) => {

            const departmentIndex = allDepartmentNames.findIndex(department => department === departmentName)

            const departmentID = allDepartmentID[departmentIndex];

            connection.query("INSERT INTO role SET ?", {
                title: title,
                salary: salary,
                department_id: departmentID

            }, (err) => {
                if (err) throw err
                else console.log(`${title} has been added as a new role in the database!`);
            })
        })
}

function addEmployees() {
    inquirer.prompt([{
        message: "What is the new employee's first name?",
        type: "input",
        name: "first_name",

    }, {
        message: "What is the employee's last name?",
        type: "input",
        name: "last_name"
    }, {
        message: "What is the employee's "
    }])
}

function viewDepartment() {
    connection.query("SELECT DISTINCT name FROM department", (err, res) => {
        if (err) throw err;
        console.table(res)
        init();
    })

}

function viewRoles() {
    connection.query("SELECT  * FROM role", (err, res) => {
        if (err) throw err
        console.table(res)
        init();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err
        console.table(res)
        init();
    })
}

function updateEmployees() {

}


init();