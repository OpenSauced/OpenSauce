import React, {Component} from 'react';
import {Link} from 'react-router';

import HeaderNavLogo from './HeaderNavLogo';
import HeaderNavButtons from './HeaderNavButtons';
import HeaderNavProfile from './HeaderNavProfile';

//Redux and async functions
import {getUserData} from '../../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//Axios
import axios from 'axios'

class HeaderNav extends Component {
    constructor() {
        super();
    }
    render() {
      return (
        <div className="row">
          <nav className="navbar fixed-top navbar-toggleable-md">
            <div className="col-2">
              <HeaderNavLogo/>
            </div>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <HeaderNavButtons/>
            </div>
          </nav>
        </div>
      );
    }
}

function mapStateToProps(state) {
    return state.userData
}

export default connect(mapStateToProps)(HeaderNav);
