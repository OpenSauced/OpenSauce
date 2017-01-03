import React from 'react';
import { Router, Link } from 'react-router';

// Receives name and link from props in HeaderNavButtons
const HeaderNavButton = ({name, link}) => {
  return (
    <div className="col-xs-3"><Link to={link}>{name}</Link></div>
  );
}

export default HeaderNavButton;
