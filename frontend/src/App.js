import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import ScenariosList from './components/ScenariosList';
import EmailModal from './components/EmailModal';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [formData, setFormData] = useState({
    scenario_name: '',
    initial_investment: '',
    annual_costs: '',
    annual_savings: '',
    time_period: ''
  });

  const [results, setResults] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);

  // Load scenarios on mount
  useEffect(() => {
    loadScenarios();
  }, []);

  // Auto-hide alerts after 5 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
  };

  const loadScenarios = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/scenarios`);
      setScenarios(response.data.scenarios);
    } catch (error) {
      console.error('Error loading scenarios:', error);
      showAlert('Failed to load scenarios', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/simulate`, {
        initial_investment: parseFloat(formData.initial_investment),
        annual_costs: parseFloat(formData.annual_costs),
        annual_savings: parseFloat(formData.annual_savings),
        time_period: parseInt(formData.time_period)
      });

      setResults(response.data.results);
      showAlert('ROI calculated successfully!', 'success');
    } catch (error) {
      console.error('Calculation error:', error);
      showAlert(error.response?.data?.error || 'Failed to calculate ROI', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveScenario = async () => {
    if (!formData.scenario_name.trim()) {
      showAlert('Please enter a scenario name', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/scenarios`, {
        scenario_name: formData.scenario_name,
        initial_investment: parseFloat(formData.initial_investment),
        annual_costs: parseFloat(formData.annual_costs),
        annual_savings: parseFloat(formData.annual_savings),
        time_period: parseInt(formData.time_period)
      });

      setResults(response.data.results);
      showAlert('Scenario saved successfully!', 'success');
      loadScenarios();
    } catch (error) {
      console.error('Save error:', error);
      showAlert(error.response?.data?.error || 'Failed to save scenario', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadScenario = async (scenarioId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/scenarios/${scenarioId}`);
      const scenario = response.data.scenario;

      setFormData({
        scenario_name: scenario.scenario_name,
        initial_investment: scenario.initial_investment,
        annual_costs: scenario.annual_costs,
        annual_savings: scenario.annual_savings,
        time_period: scenario.time_period
      });

      setResults(scenario);
      showAlert('Scenario loaded successfully!', 'success');
    } catch (error) {
      console.error('Load error:', error);
      showAlert('Failed to load scenario', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScenario = async (scenarioId) => {
    if (!window.confirm('Are you sure you want to delete this scenario?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/scenarios/${scenarioId}`);
      showAlert('Scenario deleted successfully!', 'success');
      loadScenarios();
    } catch (error) {
      console.error('Delete error:', error);
      showAlert('Failed to delete scenario', 'error');
    }
  };

  const handleGenerateReport = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (email) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/report/generate`, {
        scenario_id: selectedScenarioId,
        email: email
      });

      // Download the PDF
      const downloadUrl = `${API_BASE_URL}${response.data.download_url}`;
      window.open(downloadUrl, '_blank');

      showAlert('Report generated successfully!', 'success');
      setShowEmailModal(false);
    } catch (error) {
      console.error('Report generation error:', error);
      showAlert(error.response?.data?.error || 'Failed to generate report', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      scenario_name: '',
      initial_investment: '',
      annual_costs: '',
      annual_savings: '',
      time_period: ''
    });
    setResults(null);
    showAlert('Form reset successfully', 'info');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🚀 ROI Calculator</h1>
        <p>Calculate your automation investment returns with precision</p>
      </header>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <div className="main-container">
        <CalculatorForm
          formData={formData}
          onInputChange={handleInputChange}
          onCalculate={handleCalculate}
          onSave={handleSaveScenario}
          onReset={handleReset}
          loading={loading}
        />

        <ResultsDisplay results={results} loading={loading} />
      </div>

      <ScenariosList
        scenarios={scenarios}
        onLoad={handleLoadScenario}
        onDelete={handleDeleteScenario}
        onGenerateReport={handleGenerateReport}
        loading={loading}
      />

      {showEmailModal && (
        <EmailModal
          onSubmit={handleEmailSubmit}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
}

export default App;