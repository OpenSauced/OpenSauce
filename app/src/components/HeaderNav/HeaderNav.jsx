import React, { Component } from 'react';
import { Link } from 'react-router';

import HeaderNavLogo from './HeaderNavLogo';
import HeaderNavButtons from './HeaderNavButtons';
import HeaderNavProfile from './HeaderNavProfile';

class HeaderNav extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className="row header_nav">
        <HeaderNavLogo/>
        <HeaderNavButtons/>
        <HeaderNavProfile/>
      </nav>

     
    );
  }
}

export default HeaderNav;
