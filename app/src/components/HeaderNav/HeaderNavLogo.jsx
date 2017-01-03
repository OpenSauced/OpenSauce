import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavLogo = () => {
  return (
    <div className="col-xs-4">
      <a href='/'>
        <img src='/assets/icons/cookbook.svg' alt="Fork a recipe icon" height="120" width="120" />
      </a>
    </div>
  );
}

export default HeaderNavLogo;
