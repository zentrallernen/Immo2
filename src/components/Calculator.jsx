import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import ResultsDisplay from './ResultsDisplay';

function Calculator() {
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [rentMethod, setRentMethod] = useState('total');
  const [yearlyRent, setYearlyRent] = useState(12000);
  const [livingArea, setLivingArea] = useState(75);
  const [rentPerSqm, setRentPerSqm] = useState(12);
  const [interestRate, setInterestRate] = useState(4);
  const [amortizationRate, setAmortizationRate] = useState(3);
  const [equityPercentage, setEquityPercentage] = useState(18);
  
  const [results, setResults] = useState(null);

  // Calculate results whenever inputs change
  useEffect(() => {
    calculateResults();
  }, [
    purchasePrice, 
    rentMethod, 
    yearlyRent, 
    livingArea, 
    rentPerSqm, 
    interestRate, 
    amortizationRate, 
    equityPercentage
  ]);

  const calculateResults = () => {
    // Calculate depreciation base (80% of purchase price)
    const depreciationBase = purchasePrice * 0.8;
    
    // Calculate yearly depreciation amounts
    const depreciation2Percent = depreciationBase * 0.02;
    const depreciation4Percent = depreciationBase * 0.04;
    
    // Calculate yearly rent based on method
    const calculatedYearlyRent = rentMethod === 'total' 
      ? yearlyRent 
      : livingArea * rentPerSqm * 12;
    
    // Calculate loan amount and equity
    const equityAmount = purchasePrice * (equityPercentage / 100);
    const loanAmount = purchasePrice - equityAmount;
    
    // Calculate yearly interest and amortization
    const yearlyInterest = loanAmount * (interestRate / 100);
    const yearlyAmortization = loanAmount * (amortizationRate / 100);
    
    // Calculate cash flow
    const cashFlow = calculatedYearlyRent - yearlyInterest - yearlyAmortization;
    
    // Calculate tax considerations
    const taxConsideration2Percent = calculatedYearlyRent - yearlyInterest - depreciation2Percent;
    const taxConsideration4Percent = calculatedYearlyRent - yearlyInterest - depreciation4Percent;
    
    // Calculate total return and equity return
    const totalReturn = (cashFlow / purchasePrice) * 100;
    const equityReturn = (cashFlow / equityAmount) * 100;
    
    setResults({
      depreciationBase,
      depreciation2Percent,
      depreciation4Percent,
      calculatedYearlyRent,
      equityAmount,
      loanAmount,
      yearlyInterest,
      yearlyAmortization,
      cashFlow,
      taxConsideration2Percent,
      taxConsideration4Percent,
      totalReturn,
      equityReturn
    });
  };

  return (
    <div className="calculator">
      <div className="grid">
        <InputForm
          purchasePrice={purchasePrice}
          setPurchasePrice={setPurchasePrice}
          rentMethod={rentMethod}
          setRentMethod={setRentMethod}
          yearlyRent={yearlyRent}
          setYearlyRent={setYearlyRent}
          livingArea={livingArea}
          setLivingArea={setLivingArea}
          rentPerSqm={rentPerSqm}
          setRentPerSqm={setRentPerSqm}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          amortizationRate={amortizationRate}
          setAmortizationRate={setAmortizationRate}
          equityPercentage={equityPercentage}
          setEquityPercentage={setEquityPercentage}
        />
        
        <ResultsDisplay results={results} />
      </div>
    </div>
  );
}

export default Calculator;
