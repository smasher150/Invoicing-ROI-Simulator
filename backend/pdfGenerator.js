const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
  /**
   * Generate PDF report for ROI calculation
   * @param {Object} scenario - Scenario data with calculations
   * @param {String} email - User email
   * @returns {String} - Path to generated PDF
   */
  async generateReport(scenario, email) {
    return new Promise((resolve, reject) => {
      try {
        // Create reports directory if it doesn't exist
        const reportsDir = path.join(__dirname, 'reports');
        if (!fs.existsSync(reportsDir)) {
          fs.mkdirSync(reportsDir);
        }

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `roi_report_${scenario.scenario_name.replace(/\s+/g, '_')}_${timestamp}.pdf`;
        const filepath = path.join(reportsDir, filename);

        // Create PDF document
        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(filepath);

        doc.pipe(stream);

        // Add content to PDF
        this.addHeader(doc);
        this.addScenarioInfo(doc, scenario, email);
        this.addExecutiveSummary(doc, scenario);
        this.addDetailedCalculations(doc, scenario);
        this.addYearlyBreakdown(doc, scenario);
        this.addHiddenBenefits(doc, scenario);
        this.addRecommendations(doc, scenario);
        this.addFooter(doc);

        // Finalize PDF
        doc.end();

        stream.on('finish', () => {
          resolve(filepath);
        });

        stream.on('error', (error) => {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  addHeader(doc) {
    doc
      .fontSize(24)
      .fillColor('#2c3e50')
      .text('ROI CALCULATOR REPORT', { align: 'center' })
      .moveDown(0.5);

    doc
      .fontSize(12)
      .fillColor('#7f8c8d')
      .text('Automation Investment Analysis', { align: 'center' })
      .moveDown(2);

    // Add horizontal line
    doc
      .strokeColor('#3498db')
      .lineWidth(2)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke()
      .moveDown(1);
  }

  addScenarioInfo(doc, scenario, email) {
    doc
      .fontSize(16)
      .fillColor('#2c3e50')
      .text('Scenario Information', { underline: true })
      .moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor('#34495e')
      .text(`Scenario Name: ${scenario.scenario_name}`, { continued: false })
      .text(`Generated For: ${email}`)
      .text(`Date: ${new Date().toLocaleDateString()}`)
      .moveDown(1.5);
  }

  addExecutiveSummary(doc, scenario) {
    doc
      .fontSize(16)
      .fillColor('#2c3e50')
      .text('Executive Summary', { underline: true })
      .moveDown(0.5);

    // ROI Box
    const boxY = doc.y;
    doc
      .rect(50, boxY, 495, 100)
      .fillAndStroke('#e8f5e9', '#27ae60')
      .fillColor('#27ae60')
      .fontSize(14)
      .text('Return on Investment (ROI)', 60, boxY + 15)
      .fontSize(32)
      .fillColor('#27ae60')
      .text(`${scenario.roi_percentage}%`, 60, boxY + 40, { width: 475, align: 'center' });

    doc.y = boxY + 110;
    doc.moveDown(0.5);

    // Key metrics in two columns
    const col1X = 50;
    const col2X = 300;
    const startY = doc.y;

    doc
      .fontSize(11)
      .fillColor('#34495e')
      .text('Payback Period:', col1X, startY, { continued: true })
      .fillColor('#2c3e50')
      .text(` ${scenario.payback_period} years`, { continued: false })
      .fillColor('#34495e')
      .text('Net Benefit:', col1X, doc.y + 5, { continued: true })
      .fillColor('#2c3e50')
      .text(` $${this.formatNumber(scenario.net_benefit)}`, { continued: false });

    doc
      .fontSize(11)
      .fillColor('#34495e')
      .text('Total Savings:', col2X, startY, { continued: true })
      .fillColor('#2c3e50')
      .text(` $${this.formatNumber(scenario.total_savings)}`, { continued: false })
      .fillColor('#34495e')
      .text('Total Costs:', col2X, startY + 20, { continued: true })
      .fillColor('#2c3e50')
      .text(` $${this.formatNumber(scenario.total_costs)}`, { continued: false });

    doc.moveDown(2);
  }

  addDetailedCalculations(doc, scenario) {
    doc
      .fontSize(16)
      .fillColor('#2c3e50')
      .text('Detailed Calculations', { underline: true })
      .moveDown(0.5);

    const tableData = [
      ['Initial Investment', `$${this.formatNumber(scenario.initial_investment)}`],
      ['Annual Operating Costs', `$${this.formatNumber(scenario.annual_costs)}`],
      ['Annual Savings (Base)', `$${this.formatNumber(scenario.annual_savings)}`],
      ['Annual Savings (Adjusted)', `$${this.formatNumber(scenario.adjusted_annual_savings || scenario.annual_savings)}`],
      ['Time Period', `${scenario.time_period} years`],
      ['Total Costs', `$${this.formatNumber(scenario.total_costs)}`],
      ['Total Savings', `$${this.formatNumber(scenario.total_savings)}`],
      ['Net Benefit', `$${this.formatNumber(scenario.net_benefit)}`]
    ];

    this.drawTable(doc, tableData);
    doc.moveDown(1.5);
  }

  addYearlyBreakdown(doc, scenario) {
    // Check if we need a new page
    if (doc.y > 600) {
      doc.addPage();
    }

    doc
      .fontSize(16)
      .fillColor('#2c3e50')
      .text('Year-by-Year Projection', { underline: true })
      .moveDown(0.5);

    if (scenario.yearly_breakdown && scenario.yearly_breakdown.length > 0) {
      const headers = ['Year', 'Annual Costs', 'Annual Savings', 'Net Position'];
      const rows = scenario.yearly_breakdown.map(year => [
        year.year.toString(),
        `$${this.formatNumber(year.annual_costs)}`,
        `$${this.formatNumber(year.annual_savings)}`,
        `$${this.formatNumber(year.net_position)}`
      ]);

      this.drawTable(doc, [headers, ...rows], true);
    }

    doc.moveDown(1.5);
  }

  addHiddenBenefits(doc, scenario) {
    // Check if we need a new page
    if (doc.y > 650) {
      doc.addPage();
    }

    doc
      .fontSize(16)
      .fillColor('#2c3e50')
      .text('Hidden Benefits Included', { underline: true })
      .moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor('#34495e')
      .text('Our analysis includes additional benefits from automation:', { continued: false })
      .moveDown(0.5);

    if (scenario.hidden_benefits) {
      doc
        .text(`• Quality Improvement: ${scenario.hidden_benefits.quality_improvement}`, { continued: false })
        .text(`• Error Reduction: ${scenario.hidden_benefits.error_reduction}`, { continued: false })
        .text(`• Productivity Boost: ${scenario.hidden_benefits.productivity_boost}`, { continued: false })
        .moveDown(0.5)
        .fillColor('#27ae60')
        .text(`Total Benefit Multiplier: ${scenario.hidden_benefits.total_multiplier}`, { continued: false });
    }

    doc.moveDown(1.5);
  }

  addRecommendations(doc, scenario) {
    // Check if we need a new page
    if (doc.y > 650) {
      doc.addPage();
    }

    doc
      .fontSize(16)
      .fillColor('#2c3e50')
      .text('Recommendations', { underline: true })
      .moveDown(0.5);

    doc.fontSize(11).fillColor('#34495e');

    if (scenario.roi_percentage > 100) {
      doc.text('✓ Excellent Investment: This automation project shows exceptional returns.', { continued: false });
      doc.text('✓ Recommendation: Proceed with implementation immediately.', { continued: false });
    } else if (scenario.roi_percentage > 50) {
      doc.text('✓ Strong Investment: This project demonstrates solid financial benefits.', { continued: false });
      doc.text('✓ Recommendation: Strongly consider moving forward with this initiative.', { continued: false });
    } else if (scenario.roi_percentage > 0) {
      doc.text('✓ Positive ROI: This investment will generate positive returns.', { continued: false });
      doc.text('✓ Recommendation: Evaluate against other priorities and consider implementation.', { continued: false });
    } else {
      doc.text('⚠ Negative ROI: Current projections show losses.', { continued: false });
      doc.text('⚠ Recommendation: Review assumptions and explore cost reduction opportunities.', { continued: false });
    }

    doc.moveDown(0.5);

    if (scenario.payback_period < 2) {
      doc.text('✓ Quick Payback: Investment recovers in less than 2 years.', { continued: false });
    } else if (scenario.payback_period < 5) {
      doc.text('✓ Reasonable Payback: Investment recovers within acceptable timeframe.', { continued: false });
    }

    doc.moveDown(1);
  }

  addFooter(doc) {
    const range = doc.bufferedPageRange();
    const pageCount = range.count;
    
    for (let i = 0; i < pageCount; i++) {
      const pageIndex = range.start + i;
      doc.switchToPage(pageIndex);
      
      doc
        .fontSize(8)
        .fillColor('#95a5a6')
        .text(
          `Page ${i + 1} of ${pageCount} | Generated by ROI Calculator | ${new Date().toLocaleDateString()}`,
          50,
          doc.page.height - 50,
          { align: 'center' }
        );
    }
  }

  drawTable(doc, data, hasHeader = false) {
    const startX = 50;
    const startY = doc.y;
    const colWidth = 495 / data[0].length;
    const rowHeight = 25;

    data.forEach((row, rowIndex) => {
      const y = startY + (rowIndex * rowHeight);

      // Draw row background
      if (hasHeader && rowIndex === 0) {
        doc.rect(startX, y, 495, rowHeight).fill('#3498db');
      } else if (rowIndex % 2 === 0) {
        doc.rect(startX, y, 495, rowHeight).fill('#ecf0f1');
      }

      // Draw cell borders
      doc.rect(startX, y, 495, rowHeight).stroke('#bdc3c7');

      // Draw cell content
      row.forEach((cell, colIndex) => {
        const x = startX + (colIndex * colWidth);
        
        doc
          .fontSize(10)
          .fillColor(hasHeader && rowIndex === 0 ? '#ffffff' : '#2c3e50')
          .text(
            cell,
            x + 5,
            y + 7,
            { width: colWidth - 10, align: colIndex === 0 ? 'left' : 'right' }
          );
      });
    });

    doc.y = startY + (data.length * rowHeight) + 10;
  }

  formatNumber(num) {
    return parseFloat(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

module.exports = new PDFGenerator();