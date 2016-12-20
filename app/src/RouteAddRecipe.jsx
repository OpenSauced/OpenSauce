import React, { Component } from 'react';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import AddRecipe from './components/AddRecipe/AddRecipe';

class RouteAddRecipe extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader title={'Catchy Phrase'}/>
        <AddRecipe/>
        <Footer/>
      </div>
    );
  }
};

export default RouteAddRecipe;
