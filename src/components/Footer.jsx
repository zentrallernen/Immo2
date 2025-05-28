import React from 'react';

function Footer() {
  return (
    <footer style={{ textAlign: 'center', marginTop: '3rem', padding: '1rem', borderTop: '1px solid var(--medium-gray)' }}>
      <p>© {new Date().getFullYear()} Immobilien-Abschreibungsrechner für <a href="https://interessante-dinge.de" target="_blank" rel="noopener noreferrer">interessante-dinge.de</a> | Copyright 2025</p>
      <p style={{ fontSize: '0.875rem', color: 'var(--dark-gray)', marginTop: '0.5rem' }}>
        Hinweis: Dieser Rechner dient nur zu Informationszwecken. Für eine professionelle Steuerberatung wenden Sie sich bitte an einen Steuerberater.
      </p>
    </footer>
  );
}

export default Footer;
