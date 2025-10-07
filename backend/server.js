const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { pool, initDatabase } = require('./database');
const roiCalculator = require('./roiCalculator');
const pdfGenerator = require('./pdfGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/reports', express.static(path.join(__dirname, 'reports')));

// Initialize database
initDatabase().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// ==================== ROUTES ====================

/**
 * POST /simulate
 * Run ROI simulation based on user inputs
 */
app.post('/simulate', async (req, res) => {
  try {
    const { initial_investment, annual_costs, annual_savings, time_period } = req.body;

    // Validate required fields
    if (!initial_investment || !annual_costs || !annual_savings || !time_period) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['initial_investment', 'annual_costs', 'annual_savings', 'time_period']
      });
    }

    // Calculate ROI
    const results = roiCalculator.calculate({
      initial_investment: parseFloat(initial_investment),
      annual_costs: parseFloat(annual_costs),
      annual_savings: parseFloat(annual_savings),
      time_period: parseInt(time_period)
    });

    res.json({
      success: true,
      results
    });
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(400).json({
      error: error.message || 'Failed to calculate ROI'
    });
  }
});

/**
 * POST /scenarios
 * Save scenario to database
 */
app.post('/scenarios', async (req, res) => {
  try {
    const {
      scenario_name,
      initial_investment,
      annual_costs,
      annual_savings,
      time_period
    } = req.body;

    // Validate required fields
    if (!scenario_name || !initial_investment || !annual_costs || !annual_savings || !time_period) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['scenario_name', 'initial_investment', 'annual_costs', 'annual_savings', 'time_period']
      });
    }

    // Calculate ROI
    const results = roiCalculator.calculate({
      initial_investment: parseFloat(initial_investment),
      annual_costs: parseFloat(annual_costs),
      annual_savings: parseFloat(annual_savings),
      time_period: parseInt(time_period)
    });

    // Save to database
    const query = `
      INSERT INTO scenarios 
      (scenario_name, initial_investment, annual_costs, annual_savings, time_period, 
       roi_percentage, payback_period, net_benefit, total_savings, total_costs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [
      scenario_name,
      parseFloat(initial_investment),
      parseFloat(annual_costs),
      parseFloat(annual_savings),
      parseInt(time_period),
      results.roi_percentage,
      results.payback_period,
      results.net_benefit,
      results.total_savings,
      results.total_costs
    ]);

    res.json({
      success: true,
      message: 'Scenario saved successfully',
      scenario_id: result.insertId,
      results
    });
  } catch (error) {
    console.error('Save scenario error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: 'A scenario with this name already exists'
      });
    }

    res.status(500).json({
      error: error.message || 'Failed to save scenario'
    });
  }
});

/**
 * GET /scenarios
 * List all saved scenarios
 */
app.get('/scenarios', async (req, res) => {
  try {
    const query = `
      SELECT id, scenario_name, initial_investment, annual_costs, annual_savings, 
             time_period, roi_percentage, payback_period, net_benefit, 
             total_savings, total_costs, created_at, updated_at
      FROM scenarios
      ORDER BY created_at DESC
    `;

    const [scenarios] = await pool.query(query);

    res.json({
      success: true,
      count: scenarios.length,
      scenarios
    });
  } catch (error) {
    console.error('Get scenarios error:', error);
    res.status(500).json({
      error: 'Failed to retrieve scenarios'
    });
  }
});

/**
 * GET /scenarios/:id
 * Get specific scenario details
 */
app.get('/scenarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT id, scenario_name, initial_investment, annual_costs, annual_savings, 
             time_period, roi_percentage, payback_period, net_benefit, 
             total_savings, total_costs, created_at, updated_at
      FROM scenarios
      WHERE id = ?
    `;

    const [scenarios] = await pool.query(query, [id]);

    if (scenarios.length === 0) {
      return res.status(404).json({
        error: 'Scenario not found'
      });
    }

    // Recalculate with full details including yearly breakdown
    const scenario = scenarios[0];
    const fullResults = roiCalculator.calculate({
      initial_investment: parseFloat(scenario.initial_investment),
      annual_costs: parseFloat(scenario.annual_costs),
      annual_savings: parseFloat(scenario.annual_savings),
      time_period: parseInt(scenario.time_period)
    });

    res.json({
      success: true,
      scenario: {
        ...scenario,
        ...fullResults
      }
    });
  } catch (error) {
    console.error('Get scenario error:', error);
    res.status(500).json({
      error: 'Failed to retrieve scenario'
    });
  }
});

/**
 * DELETE /scenarios/:id
 * Delete a scenario
 */
app.delete('/scenarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM scenarios WHERE id = ?';
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Scenario not found'
      });
    }

    res.json({
      success: true,
      message: 'Scenario deleted successfully'
    });
  } catch (error) {
    console.error('Delete scenario error:', error);
    res.status(500).json({
      error: 'Failed to delete scenario'
    });
  }
});

/**
 * POST /report/generate
 * Generate PDF report for a scenario
 */
app.post('/report/generate', async (req, res) => {
  try {
    const { scenario_id, email } = req.body;

    // Validate inputs
    if (!scenario_id || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['scenario_id', 'email']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Get scenario from database
    const query = `
      SELECT id, scenario_name, initial_investment, annual_costs, annual_savings, 
             time_period, roi_percentage, payback_period, net_benefit, 
             total_savings, total_costs
      FROM scenarios
      WHERE id = ?
    `;

    const [scenarios] = await pool.query(query, [scenario_id]);

    if (scenarios.length === 0) {
      return res.status(404).json({
        error: 'Scenario not found'
      });
    }

    const scenario = scenarios[0];

    // Get full calculation results including yearly breakdown
    const fullResults = roiCalculator.calculate({
      initial_investment: parseFloat(scenario.initial_investment),
      annual_costs: parseFloat(scenario.annual_costs),
      annual_savings: parseFloat(scenario.annual_savings),
      time_period: parseInt(scenario.time_period)
    });

    // Merge scenario with full results
    const completeScenario = {
      ...scenario,
      ...fullResults
    };

    // Generate PDF
    const pdfPath = await pdfGenerator.generateReport(completeScenario, email);
    const filename = path.basename(pdfPath);

    res.json({
      success: true,
      message: 'Report generated successfully',
      download_url: `/reports/${filename}`,
      filename
    });
  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate report'
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});