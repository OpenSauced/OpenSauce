import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppProfileL from './Components/App/AppProfileL';
import HPFeedM from './Components/Homepage/HPFeedM';
import AppWidgetsR from './Components/App/AppWidgetsR';


class Homepage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div>
          <AppProfileL/>
          <HPFeedM/>
          <AppWidgetsR/>
        </div>
        <div>
          <h1>Welcome to OpenSauce!</h1>

          <p>TEST ENDPOINTS: (dummy data)</p>
          <a href="users/rub_duckey/profile">users/rub_duckey/profile</a>
          <br />
          <a href="recipes/rub_duckey">recipes/rub_duckey</a>
        </div>
      </div>
    )
  }
};

export default Homepage;
