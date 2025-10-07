import React from 'react';

function CalculatorForm({ formData, onInputChange, onCalculate, onSave, onReset, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate();
  };

  const isFormValid = () => {
    return (
      formData.initial_investment &&
      formData.annual_costs !== '' &&
      formData.annual_savings &&
      formData.time_period
    );
  };

  return (
    <div className="card">
      <h2>📊 Input Parameters</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="scenario_name">Scenario Name (Optional)</label>
          <input
            type="text"
            id="scenario_name"
            name="scenario_name"
            value={formData.scenario_name}
            onChange={onInputChange}
            placeholder="e.g., Q1 2024 Automation Project"
          />
          <small>Give your scenario a memorable name to save it</small>
        </div>

        <div className="form-group">
          <label htmlFor="initial_investment">Initial Investment ($) *</label>
          <input
            type="number"
            id="initial_investment"
            name="initial_investment"
            value={formData.initial_investment}
            onChange={onInputChange}
            placeholder="50000"
            min="0"
            step="0.01"
            required
          />
          <small>One-time upfront cost for automation implementation</small>
        </div>

        <div className="form-group">
          <label htmlFor="annual_costs">Annual Operating Costs ($) *</label>
          <input
            type="number"
            id="annual_costs"
            name="annual_costs"
            value={formData.annual_costs}
            onChange={onInputChange}
            placeholder="10000"
            min="0"
            step="0.01"
            required
          />
          <small>Recurring yearly costs (maintenance, licenses, etc.)</small>
        </div>

        <div className="form-group">
          <label htmlFor="annual_savings">Annual Savings ($) *</label>
          <input
            type="number"
            id="annual_savings"
            name="annual_savings"
            value={formData.annual_savings}
            onChange={onInputChange}
            placeholder="75000"
            min="0"
            step="0.01"
            required
          />
          <small>Expected yearly savings from automation</small>
        </div>

        <div className="form-group">
          <label htmlFor="time_period">Time Period (Years) *</label>
          <input
            type="number"
            id="time_period"
            name="time_period"
            value={formData.time_period}
            onChange={onInputChange}
            placeholder="5"
            min="1"
            max="50"
            required
          />
          <small>Investment evaluation period (1-50 years)</small>
        </div>

        <div className="button-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid() || loading}
          >
            {loading ? 'Calculating...' : '🔢 Calculate ROI'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onSave}
            disabled={!isFormValid() || loading}
          >
            💾 Save Scenario
          </button>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onReset}
            disabled={loading}
          >
            🔄 Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default CalculatorForm;