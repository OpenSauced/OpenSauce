import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppProfileL from './Components/App/AppProfileL.jsx';
import HPFeedM from './Components/Homepage/HPFeedM.jsx';
import AppWidgetsR from './Components/App/AppWidgetsR.jsx';


class Homepage extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div>
        
      </div>
      <div>
       <h1>Welcome to OpenSauce!</h1>

       <p>TEST ENDPOINTS: (dummy data)</p>
       <a href="users/rub_duckey/profile">users/rub_duckey/profile</a>
       <br />
       <a href="recipes/rub_duckey">recipes/rub_duckey</a>
      </div>
      
    )
  }
};

export default Homepage;
