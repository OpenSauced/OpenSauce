import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavLogo = () => {
  return (
    <div className="col-xs-4">
      <Link to={'/'}>
        <img 
          src='/assets/icons/cookbook.svg' 
          alt="Fork a recipe icon" 
          height="120" 
          width="120" 
        />
      </Link>  
    </div>
  );
}

export default HeaderNavLogo;
