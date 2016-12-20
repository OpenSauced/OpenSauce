import React, { Component } from 'react';

import AddRecipe from './components/AddRecipe/AddRecipe';

class RouteAddRecipe extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <AddRecipe/>
      </div>
    );
  }
};

export default RouteAddRecipe;
