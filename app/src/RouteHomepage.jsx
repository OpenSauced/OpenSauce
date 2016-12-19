import React, { Component } from 'react';

import Nav from './components/Nav/Nav'
import AppProfile from './components/App/AppProfile';
import HPFeed from './components/Homepage/HPFeed';
import AppWidgets from './components/App/AppWidgets';


class RouteHomepage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <Nav/>
        <div>
          <AppProfile/>
          <HPFeed/>
          <AppWidgets/>
        </div>
        <div>
          <h1>Welcome to OpenSauce!</h1>

          <p>TEST ENDPOINTS: (dummy data)</p>
          
          <br />
          <a href="recipes/rub_duckey">recipes/rub_duckey</a>
        </div>
      </div>
    );
  }
};

export default RouteHomepage;
