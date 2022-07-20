import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to='/todos/'>
      <h1>Todo Manager</h1>
    </Link>
  </header>
);

export default Header;
