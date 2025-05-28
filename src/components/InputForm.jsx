import React, { useState } from 'react';

function InputForm({
  purchasePrice,
  setPurchasePrice,
  rentMethod,
  setRentMethod,
  yearlyRent,
  setYearlyRent,
  livingArea,
  setLivingArea,
  rentPerSqm,
  setRentPerSqm,
  interestRate,
  setInterestRate,
  amortizationRate,
  setAmortizationRate,
  equityPercentage,
  setEquityPercentage
}) {
  const handleRentMethodChange = (e) => {
    setRentMethod(e.target.value);
  };

  return (
    <div className="card">
      <h2>Eingabedaten</h2>
      
      <div className="form-group">
        <label htmlFor="purchasePrice">Kaufpreis (€)</label>
        <div className="input-group">
          <input
            type="number"
            id="purchasePrice"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            min="0"
          />
          <span className="input-group-append">€</span>
        </div>
      </div>
      
      <div className="form-group">
        <label>Mietberechnung</label>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              name="rentMethod"
              value="total"
              checked={rentMethod === 'total'}
              onChange={handleRentMethodChange}
              style={{ width: 'auto', marginRight: '0.5rem' }}
            />
            Jahresnettokaltmiete direkt eingeben
          </label>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              name="rentMethod"
              value="perSqm"
              checked={rentMethod === 'perSqm'}
              onChange={handleRentMethodChange}
              style={{ width: 'auto', marginRight: '0.5rem' }}
            />
            Nach Wohnfläche berechnen
          </label>
        </div>
        
        {rentMethod === 'total' ? (
          <div className="form-group">
            <label htmlFor="yearlyRent">Jahresnettokaltmiete (€)</label>
            <div className="input-group">
              <input
                type="number"
                id="yearlyRent"
                value={yearlyRent}
                onChange={(e) => setYearlyRent(Number(e.target.value))}
                min="0"
              />
              <span className="input-group-append">€/Jahr</span>
            </div>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="livingArea">Wohnfläche (m²)</label>
              <div className="input-group">
                <input
                  type="number"
                  id="livingArea"
                  value={livingArea}
                  onChange={(e) => setLivingArea(Number(e.target.value))}
                  min="0"
                />
                <span className="input-group-append">m²</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="rentPerSqm">Miete pro m² (€)</label>
              <div className="input-group">
                <input
                  type="number"
                  id="rentPerSqm"
                  value={rentPerSqm}
                  onChange={(e) => setRentPerSqm(Number(e.target.value))}
                  min="0"
                  step="0.1"
                />
                <span className="input-group-append">€/m²</span>
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="interestRate">
          Zinssatz (%)
          <span className="info-icon">
            i
            <span className="tooltip">Der aktuelle Zinssatz für Ihre Immobilienfinanzierung.</span>
          </span>
        </label>
        <div className="input-group">
          <input
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min="0"
            step="0.1"
          />
          <span className="input-group-append">%</span>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="amortizationRate">
          Tilgung (%)
          <span className="info-icon">
            i
            <span className="tooltip">Die jährliche Tilgungsrate für Ihre Immobilienfinanzierung.</span>
          </span>
        </label>
        <div className="input-group">
          <input
            type="number"
            id="amortizationRate"
            value={amortizationRate}
            onChange={(e) => setAmortizationRate(Number(e.target.value))}
            min="0"
            step="0.1"
          />
          <span className="input-group-append">%</span>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="equityPercentage">
          Eigenkapital (%)
          <span className="info-icon">
            i
            <span className="tooltip">Der Anteil des Eigenkapitals am Kaufpreis.</span>
          </span>
        </label>
        <div className="input-group">
          <input
            type="number"
            id="equityPercentage"
            value={equityPercentage}
            onChange={(e) => setEquityPercentage(Number(e.target.value))}
            min="0"
            max="100"
            step="0.1"
          />
          <span className="input-group-append">%</span>
        </div>
      </div>
    </div>
  );
}

export default InputForm;
