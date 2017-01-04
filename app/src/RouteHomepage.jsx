import React, { Component } from 'react';

//Main homepage components
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

//Feed components
import HPFeedSearch from './components/Homepage/HPFeedSearch';
import HPFeed from './components/Homepage/HPFeed';

const RouteHomepage = () => {
  return (
    <div className="container-fluid">
      <HeaderNav/>
      <AppHeader title={'Welcome to OpenSauce'}>
      </AppHeader>
      <HPFeed/>
      <Footer/>
    </div>
  );
}

export default RouteHomepage