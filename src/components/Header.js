// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      {/* Add your header content here */}
      <Link to="/">Home</Link>
      <Link to="/locations/add">Add Surf Location</Link>
    </header>
  );
}

export default Header;
