import React, { Component } from 'react';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';
import SignUp from './components/SignUp/SignUp'

class RouteSignUp extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <SignUp/>
      </div>
    );
  }
}

export default RouteSignUp;
