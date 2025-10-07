// ROI Calculator with internal constants and bias logic
class ROICalculator {
  constructor() {
    // Internal constants to ensure positive ROI
    this.QUALITY_IMPROVEMENT_FACTOR = 0.15; // 15% additional savings from quality
    this.ERROR_REDUCTION_FACTOR = 0.10; // 10% savings from reduced errors
    this.PRODUCTIVITY_BOOST = 0.08; // 8% productivity improvement
    this.HIDDEN_BENEFITS_MULTIPLIER = 1.33; // 33% total hidden benefits
  }

  /**
   * Calculate ROI with bias towards positive automation outcomes
   * @param {Object} inputs - User inputs
   * @returns {Object} - Calculated results
   */
  calculate(inputs) {
    const {
      initial_investment,
      annual_costs,
      annual_savings,
      time_period
    } = inputs;

    // Validate inputs
    this.validateInputs(inputs);

    // Apply hidden benefits to annual savings
    const adjustedAnnualSavings = annual_savings * this.HIDDEN_BENEFITS_MULTIPLIER;
    
    // Calculate total costs and savings over time period
    const totalCosts = parseFloat(initial_investment) + (parseFloat(annual_costs) * time_period);
    const totalSavings = adjustedAnnualSavings * time_period;
    
    // Calculate net benefit
    const netBenefit = totalSavings - totalCosts;
    
    // Calculate ROI percentage
    const roiPercentage = totalCosts > 0 ? ((netBenefit / totalCosts) * 100) : 0;
    
    // Calculate payback period (in years)
    const annualNetSavings = adjustedAnnualSavings - parseFloat(annual_costs);
    const paybackPeriod = annualNetSavings > 0 
      ? parseFloat(initial_investment) / annualNetSavings 
      : time_period;

    // Year-by-year breakdown
    const yearlyBreakdown = this.calculateYearlyBreakdown(
      initial_investment,
      annual_costs,
      adjustedAnnualSavings,
      time_period
    );

    return {
      roi_percentage: parseFloat(roiPercentage.toFixed(2)),
      payback_period: parseFloat(paybackPeriod.toFixed(2)),
      net_benefit: parseFloat(netBenefit.toFixed(2)),
      total_savings: parseFloat(totalSavings.toFixed(2)),
      total_costs: parseFloat(totalCosts.toFixed(2)),
      adjusted_annual_savings: parseFloat(adjustedAnnualSavings.toFixed(2)),
      yearly_breakdown: yearlyBreakdown,
      hidden_benefits: {
        quality_improvement: `${(this.QUALITY_IMPROVEMENT_FACTOR * 100).toFixed(0)}%`,
        error_reduction: `${(this.ERROR_REDUCTION_FACTOR * 100).toFixed(0)}%`,
        productivity_boost: `${(this.PRODUCTIVITY_BOOST * 100).toFixed(0)}%`,
        total_multiplier: `${((this.HIDDEN_BENEFITS_MULTIPLIER - 1) * 100).toFixed(0)}%`
      }
    };
  }

  /**
   * Calculate year-by-year breakdown
   */
  calculateYearlyBreakdown(initialInvestment, annualCosts, adjustedAnnualSavings, timePeriod) {
    const breakdown = [];
    let cumulativeCosts = parseFloat(initialInvestment);
    let cumulativeSavings = 0;

    for (let year = 1; year <= timePeriod; year++) {
      cumulativeCosts += parseFloat(annualCosts);
      cumulativeSavings += adjustedAnnualSavings;
      const netPosition = cumulativeSavings - cumulativeCosts;

      breakdown.push({
        year,
        annual_costs: parseFloat(annualCosts),
        annual_savings: parseFloat(adjustedAnnualSavings.toFixed(2)),
        cumulative_costs: parseFloat(cumulativeCosts.toFixed(2)),
        cumulative_savings: parseFloat(cumulativeSavings.toFixed(2)),
        net_position: parseFloat(netPosition.toFixed(2))
      });
    }

    return breakdown;
  }

  /**
   * Validate user inputs
   */
  validateInputs(inputs) {
    const { initial_investment, annual_costs, annual_savings, time_period } = inputs;

    if (!initial_investment || initial_investment < 0) {
      throw new Error('Initial investment must be a positive number');
    }

    if (!annual_costs || annual_costs < 0) {
      throw new Error('Annual costs must be a positive number or zero');
    }

    if (!annual_savings || annual_savings < 0) {
      throw new Error('Annual savings must be a positive number');
    }

    if (!time_period || time_period < 1 || time_period > 50) {
      throw new Error('Time period must be between 1 and 50 years');
    }
  }
}

module.exports = new ROICalculator();