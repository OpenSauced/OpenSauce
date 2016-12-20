import React, { Component } from 'react';


// These are going to be on pretty much every route component page. Its the nav, header, and footer for the page
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import ProfileSettings from './components/Profile/ProfileSettings'
import Footer from './components/Footer/Footer';

class RouteProfile extends Component {
  constructor() {
    super();
    this.state = {
      username: 'Will'
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader title={`Welcome ${this.state.username}!`}></AppHeader>
        <ProfileSettings/>
        <Footer/>
      </div>
    );
  }
}

export default RouteProfile;
