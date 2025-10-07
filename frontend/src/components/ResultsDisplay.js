import React from 'react';

function ResultsDisplay({ results, loading }) {
  if (loading) {
    return (
      <div className="card">
        <h2>📈 Results</h2>
        <div className="loading">Calculating...</div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="card">
        <h2>📈 Results</h2>
        <div className="empty-state">
          <p>Enter your parameters and click "Calculate ROI" to see results</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const formatYears = (value) => {
    return `${value.toFixed(2)} years`;
  };

  return (
    <div className="card">
      <h2>📈 Results</h2>

      <div className="results-grid">
        <div className={`result-item ${results.roi_percentage > 0 ? 'positive' : 'negative'}`}>
          <label>ROI</label>
          <div className="value">{formatPercent(results.roi_percentage)}</div>
        </div>

        <div className="result-item">
          <label>Payback Period</label>
          <div className="value">{formatYears(results.payback_period)}</div>
        </div>

        <div className={`result-item ${results.net_benefit > 0 ? 'positive' : 'negative'}`}>
          <label>Net Benefit</label>
          <div className="value">{formatCurrency(results.net_benefit)}</div>
        </div>

        <div className="result-item positive">
          <label>Total Savings</label>
          <div className="value">{formatCurrency(results.total_savings)}</div>
        </div>
      </div>

      {results.hidden_benefits && (
        <div className="hidden-benefits">
          <h3>✨ Hidden Benefits Included</h3>
          <ul>
            <li>Quality Improvement: {results.hidden_benefits.quality_improvement}</li>
            <li>Error Reduction: {results.hidden_benefits.error_reduction}</li>
            <li>Productivity Boost: {results.hidden_benefits.productivity_boost}</li>
            <li>Total Benefit Multiplier: {results.hidden_benefits.total_multiplier}</li>
          </ul>
        </div>
      )}

      {results.yearly_breakdown && results.yearly_breakdown.length > 0 && (
        <div className="yearly-breakdown">
          <h3>📅 Year-by-Year Projection</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="yearly-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Annual Costs</th>
                  <th>Annual Savings</th>
                  <th>Net Position</th>
                </tr>
              </thead>
              <tbody>
                {results.yearly_breakdown.map((year) => (
                  <tr key={year.year}>
                    <td>{year.year}</td>
                    <td>{formatCurrency(year.annual_costs)}</td>
                    <td>{formatCurrency(year.annual_savings)}</td>
                    <td style={{ 
                      color: year.net_position >= 0 ? '#27ae60' : '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      {formatCurrency(year.net_position)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsDisplay;