import React from 'react';

function ResultsDisplay({ results }) {
  if (!results) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatPercent = (value) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  };

  // Generate 15-year analysis data
  const generateYearlyAnalysis = () => {
    const years = 15;
    const analysis = [];
    
    let remainingDebt = results.loanAmount;
    let cumulativeProfit = 0;
    
    for (let year = 1; year <= years; year++) {
      // Calculate remaining debt (annuity loan)
      const yearlyPayment = results.yearlyInterest + results.yearlyAmortization;
      const interestThisYear = remainingDebt * (results.yearlyInterest / results.loanAmount);
      const amortizationThisYear = yearlyPayment - interestThisYear;
      remainingDebt -= amortizationThisYear;
      
      // Ensure debt doesn't go below zero
      if (remainingDebt < 0) remainingDebt = 0;
      
      // Calculate taxable profit (using 2% depreciation by default)
      const taxableProfit = results.calculatedYearlyRent - interestThisYear - results.depreciation2Percent;
      
      // Calculate tax burden at different rates
      const taxBurden42 = taxableProfit > 0 ? taxableProfit * 0.42 : 0;
      const taxBurden30 = taxableProfit > 0 ? taxableProfit * 0.30 : 0;
      const taxBurden15 = taxableProfit > 0 ? taxableProfit * 0.15 : 0;
      
      // Calculate annual net profit (using cashflow minus taxes)
      // We'll calculate for all three tax rates
      const netProfit42 = results.cashFlow - taxBurden42;
      const netProfit30 = results.cashFlow - taxBurden30;
      const netProfit15 = results.cashFlow - taxBurden15;
      
      // Calculate cumulative profit plus repayment
      cumulativeProfit += netProfit30; // Using 30% as default for cumulative
      const cumulativeProfitPlusRepayment = cumulativeProfit + (results.loanAmount - remainingDebt);
      
      analysis.push({
        year,
        remainingDebt,
        taxableProfit,
        taxBurden42,
        taxBurden30,
        taxBurden15,
        netProfit42,
        netProfit30,
        netProfit15,
        cumulativeProfitPlusRepayment
      });
    }
    
    return analysis;
  };

  const yearlyAnalysis = generateYearlyAnalysis();

  return (
    <div className="card results">
      <h2>Ergebnisse</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Abschreibung</h3>
        <div className="result-item">
          <span className="result-label">Abschreibungsbasis (80% des Kaufpreises):</span>
          <span className="result-value">{formatCurrency(results.depreciationBase)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Jährliche Abschreibung (2%):</span>
          <span className="result-value">{formatCurrency(results.depreciation2Percent)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Jährliche Abschreibung (4%, verkürzte Nutzungsdauer 25 Jahre):</span>
          <span className="result-value">{formatCurrency(results.depreciation4Percent)}</span>
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Miete</h3>
        <div className="result-item">
          <span className="result-label">Jahresnettokaltmiete:</span>
          <span className="result-value">{formatCurrency(results.calculatedYearlyRent)}</span>
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Finanzierung</h3>
        <div className="result-item">
          <span className="result-label">Eigenkapital:</span>
          <span className="result-value">{formatCurrency(results.equityAmount)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Fremdkapital (Darlehen):</span>
          <span className="result-value">{formatCurrency(results.loanAmount)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Jährliche Zinszahlung:</span>
          <span className="result-value">{formatCurrency(results.yearlyInterest)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Jährliche Tilgung:</span>
          <span className="result-value">{formatCurrency(results.yearlyAmortization)}</span>
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Cashflow</h3>
        <div className="result-item">
          <span className="result-label">Jährlicher Cashflow (Miete - Zinsen - Tilgung):</span>
          <span className={`result-value ${results.cashFlow >= 0 ? 'success' : 'error'}`}>
            {formatCurrency(results.cashFlow)}
          </span>
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Steuerliche Betrachtung</h3>
        <div className="result-item">
          <span className="result-label">Steuerliche Betrachtung mit 2% AfA:</span>
          <span className={`result-value ${results.taxConsideration2Percent >= 0 ? '' : 'success'}`}>
            {formatCurrency(results.taxConsideration2Percent)}
          </span>
        </div>
        <div className="result-item">
          <span className="result-label">Steuerliche Betrachtung mit 4% AfA:</span>
          <span className={`result-value ${results.taxConsideration4Percent >= 0 ? '' : 'success'}`}>
            {formatCurrency(results.taxConsideration4Percent)}
          </span>
        </div>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          Negative Werte bedeuten steuerliche Verluste, die mit anderen Einkünften verrechnet werden können.
        </p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Rendite</h3>
        <div className="result-item">
          <span className="result-label">Gesamtrendite pro Jahr (auf Kaufpreis):</span>
          <span className={`result-value ${results.totalReturn >= 0 ? 'success' : 'error'}`}>
            {formatPercent(results.totalReturn)}
          </span>
        </div>
        <div className="result-item">
          <span className="result-label">Eigenkapitalrendite pro Jahr:</span>
          <span className={`result-value ${results.equityReturn >= 0 ? 'success' : 'error'}`}>
            {formatPercent(results.equityReturn)}
          </span>
        </div>
      </div>
      
      <div>
        <h3>15-Jahres Analyse</h3>
        <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
          Diese Tabelle zeigt die Entwicklung über 15 Jahre mit einem Annuitätendarlehen, 
          die Steuerlast bei verschiedenen Steuersätzen und den kumulierten Gewinn inklusive Tilgung.
        </p>
        
        <div className="table-container" style={{ overflowX: 'auto' }}>
          <table className="analysis-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Jahr</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Restschuld</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Steuerl. Gewinn</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Steuer (42%)</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Steuer (30%)</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Steuer (15%)</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Reingewinn (42%)</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Reingewinn (30%)</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Reingewinn (15%)</th>
                <th style={{ padding: '0.5rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Kum. Gewinn + Tilgung</th>
              </tr>
            </thead>
            <tbody>
              {yearlyAnalysis.map((year) => (
                <tr key={year.year} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem' }}>{year.year}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatCurrency(year.remainingDebt)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatCurrency(year.taxableProfit)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatCurrency(year.taxBurden42)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatCurrency(year.taxBurden30)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatCurrency(year.taxBurden15)}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', color: year.netProfit42 >= 0 ? 'green' : 'red' }}>
                    {formatCurrency(year.netProfit42)}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', color: year.netProfit30 >= 0 ? 'green' : 'red' }}>
                    {formatCurrency(year.netProfit30)}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', color: year.netProfit15 >= 0 ? 'green' : 'red' }}>
                    {formatCurrency(year.netProfit15)}
                  </td>
                  <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 'bold' }}>
                    {formatCurrency(year.cumulativeProfitPlusRepayment)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p style={{ fontSize: '0.875rem', marginTop: '1rem' }}>
          Hinweis: Die Berechnung basiert auf einem Annuitätendarlehen mit konstanter Jahresrate. 
          Die Steuerlast wird auf Basis der 2% AfA berechnet. Der kumulierte Gewinn verwendet den 
          Steuersatz von 30% als Beispiel.
        </p>
      </div>
    </div>
  );
}

export default ResultsDisplay;
