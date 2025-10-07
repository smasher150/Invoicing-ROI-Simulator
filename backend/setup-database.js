const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  
  try {
    // Connect to MySQL without specifying a database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });

    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database '${process.env.DB_NAME}' created or already exists`);

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME}`);

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

    await connection.query(createTableQuery);
    console.log('Table "scenarios" created or already exists');

    console.log('\n✅ Database setup completed successfully!');
    console.log('You can now start the server with: npm start');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();