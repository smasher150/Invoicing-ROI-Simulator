const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('🧪 Testing ROI Calculator API...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Simulate ROI
    console.log('2️⃣ Testing ROI Simulation...');
    const simulateData = {
      initial_investment: 50000,
      annual_costs: 10000,
      annual_savings: 75000,
      time_period: 5
    };
    const simulateResponse = await axios.post(`${API_BASE_URL}/simulate`, simulateData);
    console.log('✅ Simulation Results:');
    console.log('   ROI:', simulateResponse.data.results.roi_percentage + '%');
    console.log('   Payback Period:', simulateResponse.data.results.payback_period, 'years');
    console.log('   Net Benefit: $' + simulateResponse.data.results.net_benefit.toLocaleString());
    console.log('');

    // Test 3: Save Scenario
    console.log('3️⃣ Testing Save Scenario...');
    const scenarioData = {
      scenario_name: 'Test Scenario ' + Date.now(),
      initial_investment: 50000,
      annual_costs: 10000,
      annual_savings: 75000,
      time_period: 5
    };
    const saveResponse = await axios.post(`${API_BASE_URL}/scenarios`, scenarioData);
    console.log('✅ Scenario Saved:', saveResponse.data.message);
    const savedScenarioId = saveResponse.data.scenario_id;
    console.log('   Scenario ID:', savedScenarioId);
    console.log('');

    // Test 4: List Scenarios
    console.log('4️⃣ Testing List Scenarios...');
    const listResponse = await axios.get(`${API_BASE_URL}/scenarios`);
    console.log('✅ Total Scenarios:', listResponse.data.count);
    console.log('');

    // Test 5: Get Specific Scenario
    console.log('5️⃣ Testing Get Scenario Details...');
    const getResponse = await axios.get(`${API_BASE_URL}/scenarios/${savedScenarioId}`);
    console.log('✅ Scenario Details:', getResponse.data.scenario.scenario_name);
    console.log('');

    // Test 6: Generate Report
    console.log('6️⃣ Testing Report Generation...');
    const reportData = {
      scenario_id: savedScenarioId,
      email: 'test@example.com'
    };
    const reportResponse = await axios.post(`${API_BASE_URL}/report/generate`, reportData);
    console.log('✅ Report Generated:', reportResponse.data.filename);
    console.log('   Download URL:', API_BASE_URL + reportResponse.data.download_url);
    console.log('');

    // Test 7: Delete Scenario
    console.log('7️⃣ Testing Delete Scenario...');
    const deleteResponse = await axios.delete(`${API_BASE_URL}/scenarios/${savedScenarioId}`);
    console.log('✅ Scenario Deleted:', deleteResponse.data.message);
    console.log('');

    console.log('🎉 All API tests passed successfully!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

testAPI();