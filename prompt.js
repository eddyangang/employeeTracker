const inquirer = require("inquirer");
const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_DB"
});

function init() {

    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        name: "option",
        choices: ["Add Department", "Add roles", "Add employees", "View Department", "View Roles", "View Employees", "Update Employees"]
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
        }
    })
}

function addDepartment(){

}

function addRoles(){

}

function addEmployees(){

}

function viewDepartment(){

}

function viewRoles(){

}

function viewEmployees(){

}

function updateEmployees(){

}