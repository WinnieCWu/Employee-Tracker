const mysql = require('mysql2');

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your MySQL username,
        user: 'root',
        //Your MySQL pw
        password: 'password',
        database: 'employeeTracker'
    },
    console.log('Connected to the Employee Tracker database.')
);

//since it's an independent module now, must export it
module.exports = db;