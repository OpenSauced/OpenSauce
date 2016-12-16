import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppWidgetsRSearch from './AppWidgetsRSearch';
import AppWidgetsRAddRecipe from './AppWidgetsRSearch';

class AppWidgetsR extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>AppWidgetsR</h1>
        <AppWidgetsRSearch/>
      </div>
    )
  }
}

export default AppWidgetsR;
