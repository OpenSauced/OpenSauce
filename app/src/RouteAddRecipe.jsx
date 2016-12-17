import React, { Component } from 'react';

import AppProfile from './components/App/AppProfile';
import AddRecipe from './components/AddRecipe/AddRecipe';

class RouteAddRecipe extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <AppProfile/>
        <AddRecipe/>
      </div>
    );
  }
};

export default RouteAddRecipe;
