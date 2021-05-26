import React from 'react';

function BasicNavbar() {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top navbar-light bg-light"
      style={{ width: '100%', zIndex: '99', backgroundColor: 'white', position: 'fixed' }}
    >
      <a className="navbar-brand" href="/">
        Gibme Crypto
      </a>
    </nav>
  );
}

export default BasicNavbar;
