const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '301510mel', 
    database: 'localemarket',
    connectionLimit: 10
});

// Attempt to connect to the database
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to database successfully');
        // Release the connection
        connection.release();
    }
});

// Handle errors
pool.on('error', err => {
    console.error('MySQL Pool Error:', err.message);
});

module.exports = pool.promise();