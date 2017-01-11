import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavLogo = () => {
  return (
    <div className="navbar-brand col-4">
      <Link to={'/'}>
        <img
          src='/assets/opensaucelogo.png'
          alt="Main Logo Icon"
          height="75"
          width="75"
        />
        <h2 className="nav-name">OpenSauce</h2>
      </Link>
    </div>
  );
}

export default HeaderNavLogo;
