import React, {Component} from 'react';
import {Link} from 'react-router';

import HeaderNavLogo from './HeaderNavLogo';
import HeaderNavButtons from './HeaderNavButtons';

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
          <nav className="navbar navbar-dark bg-inverse navbar-static-top">
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
                  <ul id="navButtonContainer" className="navbar-collapse collapse">
                    <HeaderNavButtons />
                  </ul>
              </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return state.userData
}

export default connect(mapStateToProps)(HeaderNav);
