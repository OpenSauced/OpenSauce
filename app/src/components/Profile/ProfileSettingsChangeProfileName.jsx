import React, { Component } from 'react';

class ChangeName extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/name" method="post" encType="multipart/form-data" target="_top">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            required/>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="lastName"
            required/>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            name="password"/>
        </div>
        <div>
          <input type="submit" value="Save"/>
        </div>
      </form>
    );
  }
}

export default ChangeName;
