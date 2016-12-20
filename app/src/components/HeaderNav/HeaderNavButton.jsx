import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavButton = ({name, link}) => {
  return (
    <div><Link to={link}>{name}</Link></div>
  );
}

export default HeaderNavButton;
