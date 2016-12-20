import React from 'react';
import { Router, Link } from 'react-router';

const HeaderNavProfile = () => {
  return (
    <div className="col-xs-4"><Link to="/profile">View Profile</Link></div>
  );
}

export default HeaderNavProfile;
