# Quick Start Guide

## ✅ Setup Complete!

Your ROI Calculator application is now ready to use!

## 🚀 Running the Application

### Backend Server (Already Running)
The backend API is running on: **http://localhost:5000**

To restart it later:
```bash
cd backend
node server.js
```

### Frontend Application (Already Starting)
The React app will open automatically at: **http://localhost:3000**

To restart it later:
```bash
cd frontend
npm start
```

## 📋 How to Use

1. **Open your browser** to http://localhost:3000

2. **Enter Investment Parameters:**
   - Initial Investment: One-time upfront cost
   - Annual Operating Costs: Yearly recurring costs
   - Annual Savings: Expected yearly savings
   - Time Period: Number of years to evaluate

3. **Calculate ROI:**
   - Click "Calculate ROI" to see instant results
   - View ROI percentage, payback period, and net benefit
   - See year-by-year breakdown

4. **Save Scenarios:**
   - Enter a scenario name
   - Click "Save Scenario" to store in database
   - View all saved scenarios below

5. **Generate Reports:**
   - Click "Generate Report" on any saved scenario
   - Enter your email address
   - Download the PDF report

## 🎯 Example Scenario

Try these values to test the calculator:

- **Scenario Name:** Q1 2024 Automation
- **Initial Investment:** $50,000
- **Annual Costs:** $10,000
- **Annual Savings:** $75,000
- **Time Period:** 5 years

Expected Results:
- ROI: ~198%
- Payback Period: ~0.77 years
- Net Benefit: ~$397,500

## 🔧 API Endpoints

Test the API directly:

### Health Check
```bash
curl http://localhost:5000/health
```

### Calculate ROI
```bash
curl -X POST http://localhost:5000/simulate \
  -H "Content-Type: application/json" \
  -d "{\"initial_investment\":50000,\"annual_costs\":10000,\"annual_savings\":75000,\"time_period\":5}"
```

### List Scenarios
```bash
curl http://localhost:5000/scenarios
```

## 📊 Database

Your MySQL database is set up with:
- **Database Name:** roi_calculator
- **Table:** scenarios
- **Connection:** localhost:3306

View in MySQL Workbench:
1. Open MySQL Workbench
2. Connect to localhost
3. Select `roi_calculator` database
4. Browse `scenarios` table

## 🎨 Features

✅ Real-time ROI calculations
✅ Hidden benefits multiplier (33% boost)
✅ Year-by-year projections
✅ Save/Load/Delete scenarios
✅ PDF report generation
✅ Responsive design
✅ Input validation
✅ Error handling

## 🔍 Hidden Benefits Applied

The calculator automatically applies these factors to ensure realistic ROI:

- **Quality Improvement:** 15%
- **Error Reduction:** 10%
- **Productivity Boost:** 8%
- **Total Multiplier:** 1.33x (33% increase)

These are applied to your annual savings to reflect real-world automation benefits.

## 🛠️ Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify credentials in `backend/.env`
- Run `node setup-database.js` again

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Check port 3000 is not in use

### Database connection error
- Verify MySQL service is running
- Check username/password in `.env`
- Ensure database `roi_calculator` exists

## 📁 Project Structure

```
roi-calculator/
├── backend/              # Node.js + Express API
│   ├── server.js        # Main server file
│   ├── database.js      # MySQL connection
│   ├── roiCalculator.js # Calculation logic
│   ├── pdfGenerator.js  # PDF reports
│   └── reports/         # Generated PDFs
├── frontend/            # React application
│   └── src/
│       ├── App.js       # Main component
│       └── components/  # UI components
└── README.md           # Full documentation
```

## 🎉 Next Steps

1. Test the calculator with different scenarios
2. Save multiple scenarios to compare
3. Generate PDF reports
4. Customize the hidden benefits multipliers in `backend/roiCalculator.js`
5. Adjust styling in `frontend/src/App.css`

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify both servers are running
3. Check MySQL connection
4. Review the README.md for detailed documentation

---

**Enjoy your ROI Calculator! 🚀**