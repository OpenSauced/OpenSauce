import React, { Component } from 'react';

class ChangeProfilePicture extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/profilePicture" method="post" enctype="multipart/form-data" target="_top">
            <label className="col-xs-2 col-form-label" for="ProfilePicture">Profile Picture:</label>
            <input className="form-control" type="file" name="ProfilePicture" accept="image/*"/>
            <div>
                <input type="submit" value="save"/>
            </div>
        </form>

    );
  }
}

export default ChangeProfilePicture;
