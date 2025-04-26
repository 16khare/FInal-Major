const mysql = require('mysql2');
require('dotenv').config();

// Create the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // AWS RDS endpoint
  user: process.env.DB_USER,     // MySQL username
  password: process.env.DB_PASS, // MySQL password
  database: process.env.DB_NAME, // Database name
  port: process.env.DB_PORT || 3306,
  connectTimeout: 10000,
  ssl: {
    // Optional: For encrypted connections to RDS (enable if needed)
    rejectUnauthorized: false
  }
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to the database:');
    console.error(`Host: ${db.config.host}`);
    console.error(`User: ${db.config.user}`);
    console.error(`Error: ${err.message}`);
    process.exit(1);
  } else {
    console.log('✅ Successfully connected to the database!');
  }
});

module.exports = db;
