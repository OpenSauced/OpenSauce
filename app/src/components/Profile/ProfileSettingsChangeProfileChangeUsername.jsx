import React, { Component } from 'react';

class ChangeUsername extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/username" method="post" encType="multipart/form-data" target="_top">
        <div>
          <label htmlFor="newUsername">Username:</label>
          <input
            type="text"
            name="newUsername"
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

export default ChangeUsername;
