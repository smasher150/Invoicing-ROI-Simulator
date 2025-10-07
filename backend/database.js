const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get promise-based pool
const promisePool = pool.promise();

// Initialize database schema
const initDatabase = async () => {
  try {
    // Create scenarios table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS scenarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        scenario_name VARCHAR(255) UNIQUE NOT NULL,
        initial_investment DECIMAL(15, 2) NOT NULL,
        annual_costs DECIMAL(15, 2) NOT NULL,
        annual_savings DECIMAL(15, 2) NOT NULL,
        time_period INT NOT NULL,
        roi_percentage DECIMAL(10, 2),
        payback_period DECIMAL(10, 2),
        net_benefit DECIMAL(15, 2),
        total_savings DECIMAL(15, 2),
        total_costs DECIMAL(15, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await promisePool.query(createTableQuery);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = {
  pool: promisePool,
  initDatabase
};