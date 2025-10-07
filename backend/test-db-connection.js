const db = require('./database.js');

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
    // Test basic query
    const [rows] = await db.pool.query('SELECT 1 + 1 AS result');
    console.log('✅ Database connection successful!');
    console.log('Test query result:', rows[0].result);
    
    // Check if scenarios table exists
    const [tables] = await db.pool.query('SHOW TABLES LIKE "scenarios"');
    if (tables.length > 0) {
      console.log('✅ Table "scenarios" exists');
      
      // Count scenarios
      const [count] = await db.pool.query('SELECT COUNT(*) as total FROM scenarios');
      console.log(`📊 Current scenarios in database: ${count[0].total}`);
    } else {
      console.log('❌ Table "scenarios" not found');
    }
    
    console.log('\n🎉 Database is ready to use!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();