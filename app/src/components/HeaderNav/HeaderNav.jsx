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
          <nav className="navbar navbar-default navbar-static-top">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navButtonContainer">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <HeaderNavLogo/>
                </div>
                <div id="navButtonContainer" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="active"><a href="/">Home</a></li>
                    <HeaderNavButtons/>
                    <HeaderNavProfile/>
                  </ul>
                </div>
              </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return state.userData
}

export default connect(mapStateToProps)(HeaderNav);
