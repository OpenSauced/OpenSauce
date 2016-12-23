import React, { Component } from 'react';

class ChangeProfilePicture extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/auth/updateInfo/photo" method="post">
        <div>
          <label for="profilePicture">Profile Picture:</label>
          <input type="file" name="profilePicture" accept="image/*"/>
        </div>
      </form>
    );
  }
}

export default ChangeProfilePicture;