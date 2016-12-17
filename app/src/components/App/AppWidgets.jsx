import React, { Component } from 'react';

import AppWidgetsSearch from './AppWidgetsSearch';
import AppWidgetsAddRecipe from './AppWidgetsAddRecipe';

class AppWidgets extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>AppWidgets</h1>
        <AppWidgetsSearch/>
        <AppWidgetsAddRecipe/>
      </div>
    )
  }
}

export default AppWidgets;
