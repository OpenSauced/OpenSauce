import React, { Component } from 'react';

// These are going to be on pretty much every route component page. Its the nav, header, and footer for the page
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import ProfileSettings from './components/Profile/ProfileSettings';
import { connect } from 'react-redux';

class RouteProfile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader title={`Welcome ${this.props.userData.username}!`}/>
        <ProfileSettings/>
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  console.log('RouteProfile.js - STATE: ', state.userData)
  return { userData: state.userData }
}

export default connect(mapStateToProps)(RouteProfile) 
