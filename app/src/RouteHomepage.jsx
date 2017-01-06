import React, { Component } from 'react';

//Main homepage components
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

//Feed components
import HPFeed from './components/Homepage/HPFeed';

const RouteHomepage = () => {
  return (
    <div className="container-flex wholeContainer">
      <HeaderNav/>
      <AppHeader title={'Welcome to OpenSauce'} />
      <div className="container-fluid homePageContainer">
        <HPFeed/>
        <Footer/>
      </div>
  </div>
  );
}

export default RouteHomepage
