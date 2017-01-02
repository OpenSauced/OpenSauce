import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavLogo = () => {
  return (
    <div className="col-sm-4">
      <Link to="/"><img src='/assets/icons/mustache-chef.svg' alt="Fork a recipe icon" height="150" width="150" /></Link>
    </div>
  );
}

export default HeaderNavLogo;
