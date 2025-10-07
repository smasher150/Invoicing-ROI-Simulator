# 🗄️ Database Setup Guide

## Quick Setup (3 Steps)

### Step 1: Ensure MySQL is Running
Double-click: **`check-mysql.bat`**
- This will check if MySQL is installed and running
- If not running, it will offer to start it

### Step 2: Setup Database
Double-click: **`setup-database.bat`**
- Creates the `roi_calculator` database
- Creates the `scenarios` table
- Verifies the connection

### Step 3: Start Application
Double-click: **`start-app.bat`**
- Starts both backend and frontend servers
- Opens browser automatically

---

## Current Database Configuration

Located in: `backend\.env`

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456789
DB_NAME=roi_calculator
DB_PORT=3306
```

---

## Troubleshooting

### ❌ Problem: "MySQL service not found"

**Solution:**
1. Check if MySQL is installed:
   - Open Command Prompt
   - Run: `mysql --version`
   
2. If not installed, download from: https://dev.mysql.com/downloads/mysql/

3. Check service name:
   - Press `Win + R`, type `services.msc`
   - Look for MySQL service (might be MySQL80, MySQL57, or MySQL)

### ❌ Problem: "Access denied for user 'root'"

**Solution:**
1. Your MySQL root password might be different
2. Update the password in `backend\.env`:
   ```
   DB_PASSWORD=your_actual_password
   ```

3. If you don't know the password, reset it:
   ```cmd
   mysql -u root -p
   ALTER USER 'root'@'localhost' IDENTIFIED BY '123456789';
   FLUSH PRIVILEGES;
   ```

### ❌ Problem: "Can't connect to MySQL server"

**Solution:**
1. Start MySQL service:
   ```cmd
   net start MySQL80
   ```
   Or use `services.msc` to start it manually

2. Check if port 3306 is in use:
   ```cmd
   netstat -an | find "3306"
   ```

### ❌ Problem: "Database setup failed"

**Solution:**
1. Run the diagnostic tool: **`check-mysql.bat`**
2. Check the error message carefully
3. Verify MySQL is running
4. Test connection manually:
   ```cmd
   mysql -u root -p -h localhost -P 3306
   ```

---

## Manual Setup (Alternative)

If the automated scripts don't work, you can set up manually:

### 1. Open MySQL Command Line
```cmd
mysql -u root -p
```
Enter password: `123456789`

### 2. Create Database
```sql
CREATE DATABASE IF NOT EXISTS roi_calculator;
USE roi_calculator;
```

### 3. Create Table
```sql
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
);
```

### 4. Verify Setup
```sql
SHOW TABLES;
DESCRIBE scenarios;
```

---

## Database Schema

### Table: `scenarios`

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Auto-increment primary key |
| scenario_name | VARCHAR(255) | Unique scenario identifier |
| initial_investment | DECIMAL(15,2) | Initial investment amount |
| annual_costs | DECIMAL(15,2) | Annual operational costs |
| annual_savings | DECIMAL(15,2) | Annual savings (before bias) |
| time_period | INT | Time period in years |
| roi_percentage | DECIMAL(10,2) | Calculated ROI percentage |
| payback_period | DECIMAL(10,2) | Years to break even |
| net_benefit | DECIMAL(15,2) | Total net benefit |
| total_savings | DECIMAL(15,2) | Total savings over period |
| total_costs | DECIMAL(15,2) | Total costs over period |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

---

## Useful MySQL Commands

### Check Database Exists
```sql
SHOW DATABASES LIKE 'roi_calculator';
```

### View All Scenarios
```sql
SELECT * FROM scenarios;
```

### Count Scenarios
```sql
SELECT COUNT(*) FROM scenarios;
```

### Delete All Scenarios
```sql
TRUNCATE TABLE scenarios;
```

### Drop Database (Start Fresh)
```sql
DROP DATABASE roi_calculator;
```

---

## Need Help?

1. **Run Diagnostics**: `check-mysql.bat`
2. **Check Logs**: Look at the error messages in the command window
3. **Verify Configuration**: Check `backend\.env` file
4. **Test Connection**: Use MySQL Workbench or command line

---

## Next Steps After Setup

Once database is running:
1. ✅ Run `start-app.bat` to start the application
2. ✅ Open browser to http://localhost:3000
3. ✅ Create your first ROI scenario
4. ✅ Generate PDF reports

---

**Last Updated:** 2024
**MySQL Version Required:** 5.7 or higher
**Default Port:** 3306