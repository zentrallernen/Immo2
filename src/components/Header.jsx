import React from 'react';

function Header() {
  return (
    <header>
      <h1>Immobilien-Abschreibungsrechner</h1>
      <p className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Berechnen Sie die steuerliche Abschreibung, Cashflow und Rendite Ihrer Immobilieninvestition
      </p>
    </header>
  );
}

export default Header;
