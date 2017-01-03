import React, { Component } from 'react';

class ChangeEmail extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/email" method="post" encType="multipart/form-data" target="_top">
        <div>
          <label htmlFor="newEmail">Email:</label>
          <input
            type="text"
            name="newEmail"
          />
          <label htmlFor="password">Password:</label>
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

export default ChangeEmail;
