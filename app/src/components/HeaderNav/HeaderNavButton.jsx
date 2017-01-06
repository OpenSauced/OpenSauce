import React from 'react';
import { Router, Link } from 'react-router';

// Receives name and link from props in HeaderNavButtons
const HeaderNavButton = ({name, link}) => {
  return (
    <li className="nav-item"><Link to={link}>{name}</Link></li>
  );
}

export default HeaderNavButton;
