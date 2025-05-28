import React from 'react';
import Calculator from './components/Calculator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <h1>Immobilien-Abschreibungsrechner</h1>
      <Calculator />
      <Footer />
    </div>
  );
}

export default App;
