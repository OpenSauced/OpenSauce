import React, { Component } from 'react';
import { Link } from 'react-router';

import HeaderNavLogo from './HeaderNavLogo';
import HeaderNavButtons from './HeaderNavButtons';
import HeaderNavProfile from './HeaderNavProfile';

//Redux and async functions
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Axios
import axios from 'axios'

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

function mapStateToProps (state) {
  return state.userData
}

export default connect(mapStateToProps)(HeaderNav);