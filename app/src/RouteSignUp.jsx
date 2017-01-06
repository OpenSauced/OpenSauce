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
      <div className="container-flex wholeContainer">
          <AppHeader title={'Sign Up'}/>
          <div className="container-fluid authPageContainer row">
              <div className="authPageContent col-centered col-xs-12 col-sm-12 col-md-5 col-lg-5">
                  <SignUp/>
              </div>
          </div>
        <Footer/>
      </div>
    );
  }
}

export default RouteSignUp;
