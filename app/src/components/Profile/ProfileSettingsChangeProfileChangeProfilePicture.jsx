import React, { Component } from 'react';

class ChangeProfilePicture extends Component {
  constructor() {
    super();
  }

  render() {
    return (

      <form action="/api/users/uploadImage/" method="post" enctype="multipart/form-data" target="_top">
            <label for="ProfilePicture">Profile Picture:</label>
            <input type="file" name="ProfilePicture" accept="image/*"/>
            <div>
                <input type="submit" value="save"/>
            </div>
        </form>

    );
  }
}

export default ChangeProfilePicture;
