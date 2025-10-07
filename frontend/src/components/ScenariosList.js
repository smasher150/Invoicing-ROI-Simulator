import React from 'react';

function ScenariosList({ scenarios, onLoad, onDelete, onGenerateReport, loading }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (scenarios.length === 0) {
    return (
      <div className="card">
        <h2>💾 Saved Scenarios</h2>
        <div className="empty-state">
          <p>No saved scenarios yet. Save your first scenario to see it here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>💾 Saved Scenarios ({scenarios.length})</h2>
      <div className="scenarios-list">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="scenario-item">
            <h3>{scenario.scenario_name}</h3>
            
            <div className="scenario-stats">
              <div>
                <strong>ROI:</strong>{' '}
                <span style={{ 
                  color: scenario.roi_percentage > 0 ? '#27ae60' : '#e74c3c',
                  fontWeight: 'bold'
                }}>
                  {scenario.roi_percentage}%
                </span>
              </div>
              <div>
                <strong>Payback:</strong> {scenario.payback_period} years
              </div>
              <div>
                <strong>Net Benefit:</strong> {formatCurrency(scenario.net_benefit)}
              </div>
              <div>
                <strong>Period:</strong> {scenario.time_period} years
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '8px' }}>
              Created: {formatDate(scenario.created_at)}
            </div>

            <div className="scenario-actions">
              <button
                className="btn-small btn-load"
                onClick={() => onLoad(scenario.id)}
                disabled={loading}
              >
                📂 Load
              </button>
              <button
                className="btn-small btn-report"
                onClick={() => onGenerateReport(scenario.id)}
                disabled={loading}
              >
                📄 Generate Report
              </button>
              <button
                className="btn-small btn-delete"
                onClick={() => onDelete(scenario.id)}
                disabled={loading}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScenariosList;