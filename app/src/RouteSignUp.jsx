import React, { Component } from 'react';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

class RouteSignup extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <Footer/>
      </div>
    );
  }
}

export default RouteSignup;
