import React, { Component } from 'react';

class ChangePassword extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/password" method="post" enctype="multipart/form-data" target="_top">
        <div>
          <label forHtml="password">Old Password:</label>
            <input
              type="text"
              name="password"
            />
          <label forHtml="newPassword">New Password:</label>
          <input
            type="text"
            name="newPassword"
          />
        </div>
        <div>
          <input type="submit" value="Save"/>
        </div>
      </form>
    );
  }
}

export default ChangePassword;
