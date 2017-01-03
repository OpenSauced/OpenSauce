import React, { Component } from 'react';

class ChangePassword extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/password" method="post" encType="multipart/form-data" target="_top">
        <div>
          <label htmlFor="password">Old Password:</label>
            <input
              type="text"
              name="password"
            />
          <label htmlFor="newPassword">New Password:</label>
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
