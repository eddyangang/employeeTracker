const mysql = require("mysql")


class Database {
    constructor(host, port, user, database) {
        this.connection = mysql.createConnection({
            host: host,
            port: port,
            user: user,
            password: "password",
            database: database

        })
    }

    query(sql, args) {

        this.connection.query(sql, args, (err, res) => {

            if (err) throw err
            else return res

        })

    }
}

module.exports = Database;