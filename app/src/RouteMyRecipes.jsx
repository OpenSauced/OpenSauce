import React, { Component } from 'react'

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

const RouteMyRecipes = ({}) => {
  return (
    <div className="container-fluid">
      <HeaderNav/>
      <AppHeader title={'Catchy Phrase'}>
      </AppHeader>
      <div>
        INSERT MY COMPONENT HERE
      </div>
      <Footer/>
    </div>
  );
}

export default RouteMyRecipes;