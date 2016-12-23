import React, { Component } from 'react';

class ChangeProfilePicture extends Component {
  constructor() {
    super();
    this.state = {
      newPhoto: ''
    }
  }

  handleOptionInputOnChange = (e) => {
    this.setState({newPassword: e.target.value})
  }

  render() {
    return (
      <form action="/api/updateInfo/profilePicture" method="post">
        <div>
          <label for="profilePicture">Profile Picture:</label>
          <input type="file" name="profilePicture" accept="image/*"/>
        </div>
      </form>
    );
  }
}

export default ChangeProfilePicture;