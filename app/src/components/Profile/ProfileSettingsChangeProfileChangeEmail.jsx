import React, { Component } from 'react';

class ChangeEmail extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/email" method="post" enctype="multipart/form-data" target="_top">
        <div>
          <label forHtml="newEmail">Email:</label>
          <input
            type="text"
            name="newEmail"
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

export default ChangeEmail;
