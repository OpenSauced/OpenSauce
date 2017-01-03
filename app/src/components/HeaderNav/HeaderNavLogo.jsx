import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavLogo = () => {
  return (
    <a className="navbar-brand" href="/">
      <img className="navLogo" src='/assets/icons/cookbook.svg' alt="Main Logo Icon" height="50" width="50" />
      <div className="navName">OpenSauce!</div>
    </a>
  );
}

export default HeaderNavLogo;
