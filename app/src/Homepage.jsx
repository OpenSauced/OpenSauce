import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppProfileL from './Components/App/AppProfileL';
import HPFeedM from './Components/Homepage/HPFeedM';
import AppWidgetsR from './Components/App/AppWidgetsR';


class Homepage extends Component {
  constructor() {
    super();
  }

  componentDidMount(){
    this.getProjects()
  }

  getProjects() {
    $.ajax({
      method: 'POST',
      url: '/api/recipes/save',
      contentType:'application/json',
      dataType: 'json',
      data: JSON.stringify({recipe:{{_id: 58584e7d758633cb226f86f2}}, user: {{_id: 585864496f1d6320b3f2d5ea}}}),
      success: function(user) {
         console.log(user)
      },
      error: function(xhr, status, err) {
          console.error( status, err.toString());
      }
    });
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
