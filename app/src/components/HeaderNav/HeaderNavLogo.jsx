import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavLogo = () => {
  return (
    <div className="navbar-brand col-4">
      <Link to={'/'}>
        <img
          src='/assets/icons/cookbook.svg'
          alt="Main Logo Icon"
          height="50"
          width="50"
        />
        <div className="navName">OpenSauce!</div>
      </Link>
    </div>
  );
}

export default HeaderNavLogo;
