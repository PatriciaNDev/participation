const mysql = require("mysql2");

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true, // Whether to wait for connections when the pool is exhausted
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0 // Maximum number of connection requests the queue will hold
});

module.exports = pool.promise(); // Export the connection pool with promise support

