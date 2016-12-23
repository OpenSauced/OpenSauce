import React, { Component } from 'react';

class ChangeUsername extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/name" method="post" enctype="multipart/form-data" target="_top">
        <div>
          <label forHtml="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            required/>
          <label forHtml="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            required/>
          <label forHtml="password">Password:</label>
          <input
            type="text"
            name="password"
          />
        </div>
        <div>
          <input type="submit" value="Save"/>
        </div>
      </form>
    );
  }
}

export default ChangeUsername;
