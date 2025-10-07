# ROI Calculator

A full-stack web application for calculating Return on Investment (ROI) for automation projects with built-in bias logic to ensure positive outcomes.

## Features

- **Interactive Calculator**: Simple form UI for entering investment parameters
- **Live Results**: Real-time ROI calculations with visual displays
- **Scenario Management**: Save, load, and delete multiple scenarios
- **PDF Reports**: Generate detailed PDF reports with charts and recommendations
- **Hidden Benefits**: Automatically applies quality improvement, error reduction, and productivity boost factors
- **Year-by-Year Breakdown**: Detailed projections showing cumulative costs and savings

## Technology Stack

### Frontend
- React 18
- Axios for API calls
- Chart.js for visualizations
- Responsive CSS design

### Backend
- Node.js with Express
- MySQL database
- PDFKit for report generation
- RESTful API architecture

### Database
- MySQL 8.0+
- Single `scenarios` table with full CRUD support

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- MySQL Workbench (optional, for database management)

## Installation

### 1. Database Setup

First, create the database in MySQL:

```sql
CREATE DATABASE roi_calculator;
```

The application will automatically create the required table on first run.

### 2. Backend Setup

```bash
cd backend
npm install
```

Configure your database credentials in `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=host
DB_PASSWORD=123456789
DB_NAME=roi_calculator
DB_PORT=3306
```

Start the backend server:

```bash
npm start
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### POST /simulate
Calculate ROI without saving to database.

**Request Body:**
```json
{
  "initial_investment": 50000,
  "annual_costs": 10000,
  "annual_savings": 75000,
  "time_period": 5
}
```

**Response:**
```json
{
  "success": true,
  "results": {
    "roi_percentage": 198.33,
    "payback_period": 0.77,
    "net_benefit": 397500,
    "total_savings": 497500,
    "total_costs": 100000,
    "yearly_breakdown": [...],
    "hidden_benefits": {...}
  }
}
```

### POST /scenarios
Save a scenario to the database.

**Request Body:**
```json
{
  "scenario_name": "Q1 2024 Automation",
  "initial_investment": 50000,
  "annual_costs": 10000,
  "annual_savings": 75000,
  "time_period": 5
}
```

### GET /scenarios
List all saved scenarios.

### GET /scenarios/:id
Get details of a specific scenario.

### DELETE /scenarios/:id
Delete a scenario.

### POST /report/generate
Generate a PDF report.

**Request Body:**
```json
{
  "scenario_id": 1,
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "download_url": "/reports/roi_report_Q1_2024_Automation_1234567890.pdf",
  "filename": "roi_report_Q1_2024_Automation_1234567890.pdf"
}
```

## Internal Constants (Bias Logic)

The calculator applies the following hidden benefits to ensure positive ROI:

- **Quality Improvement Factor**: 15% additional savings
- **Error Reduction Factor**: 10% savings from reduced errors
- **Productivity Boost**: 8% productivity improvement
- **Total Multiplier**: 1.33x (33% total hidden benefits)

These factors are automatically applied to the annual savings to reflect real-world automation benefits.

## Database Schema

```sql
CREATE TABLE scenarios (
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

## Usage

1. **Enter Parameters**: Fill in the investment details in the calculator form
2. **Calculate**: Click "Calculate ROI" to see instant results
3. **Save Scenario**: Give your scenario a name and click "Save Scenario"
4. **View Saved Scenarios**: Browse all saved scenarios in the list below
5. **Load Scenario**: Click "Load" to populate the form with saved data
6. **Generate Report**: Click "Generate Report" and enter your email to download a PDF

## Project Structure

```
roi-calculator/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── database.js         # MySQL connection and schema
│   ├── roiCalculator.js    # ROI calculation logic with bias
│   ├── pdfGenerator.js     # PDF report generation
│   ├── package.json
│   ├── .env
│   └── reports/            # Generated PDF reports
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── CalculatorForm.js
│   │   │   ├── ResultsDisplay.js
│   │   │   ├── ScenariosList.js
│   │   │   └── EmailModal.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # React hot-reload enabled
```

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `roi_calculator` exists
- Check firewall settings for port 3306

### Port Conflicts
- Backend default: 5000 (change in `.env`)
- Frontend default: 3000 (React will prompt for alternative)

### CORS Issues
- Ensure backend CORS is enabled (already configured)
- Check API_BASE_URL in `frontend/src/App.js`

## License

MIT License

## Author

ROI Calculator Team"# Invoicing-ROI-Simulator" 
