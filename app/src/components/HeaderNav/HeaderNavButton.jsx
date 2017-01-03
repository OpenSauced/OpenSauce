import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavButton = ({name, link}) => {
  return (
    <li><Link to={link}>{name}</Link></li>
  );
}

export default HeaderNavButton;
