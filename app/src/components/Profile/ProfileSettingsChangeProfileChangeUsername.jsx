import React, { Component } from 'react';

class ChangeUsername extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/username" method="post" enctype="multipart/form-data" target="_top">
        <div>
          <label forHtml="newUsername">Username:</label>
          <input
            type="text"
            name="newUsername"
          />
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
