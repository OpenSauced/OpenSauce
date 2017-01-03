import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import axios from 'axios';

class ChangeProfilePicture extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };

    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onDrop(files) {
    console.log(files);
    this.setState({
      files: files
    });
  }

  onOpenClick() {
    this.handleImageUpload();
  }

  handleImageUpload() {
    axios({
      method: 'POST',
      url: '/api/users/updateInfo/profilePicture',
      data: { file: this.state.files[0].preview },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <form action="/api/users/updateInfo/profilePicture" method="post" encType="multipart/form-data" target="_top">
          <label htmlFor="ProfilePicture">Profile Picture:</label>
          <input type="file" name="ProfilePicture" accept="image/*" /><br/>
          <div>
              <input type="submit" value="Sign up"/>
          </div>
        </form>
      </div>
    );
  }
}

export default ChangeProfilePicture;
