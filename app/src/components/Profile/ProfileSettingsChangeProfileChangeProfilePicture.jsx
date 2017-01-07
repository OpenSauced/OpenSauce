import React, {Component} from 'react';
import Dropzone from 'react-dropzone';


class ChangeProfilePicture extends Component {
    constructor() {
      super();
      this.state = {
        image: []
      };

      this.onDrop = this.onDrop.bind(this);
    }

    // Puts the image into the component state
    onDrop(image) {
      this.setState( { image: image } );
    }

    // Handles the input for the submit button
    // ****CURRENTLY NOT IMPLEMENTED****
    handleImageUpload(e) {
      e.preventDefault();

      let image = new FormData();
      image.append('ProfilePicture', this.state.image[0]);

      $.ajax({
        method: 'POST',
        url: `/api/users/updateInfo/profilePicture`,
        data: 'image',
        cache: false,
        contentType: false,
        processData: false,
      })
      .catch((err) => {
        console.error('Image did not upload: ', err);
      })
      .then((res) => {
        console.log('Getting current data? ', recipe);
        const path = '/profile';
        //browserHistory.push(path);
      })
    }

    render() {
      return (
        <form action="/api/users/updateInfo/profilePicture" method="post" encType="multipart/form-data" target="_top">
          <label className="col-xs-2 col-form-label" htmlFor="ProfilePicture">Profile Picture:</label>
          <Dropzone name="ProfilePicture" multiple={false} onDrop={this.onDrop}>
            <div>Click or drag an image inside of the box to upload.</div>
          </Dropzone>
          {this.state.image.length > 0 ? <div>
          <h2>Your image:</h2>
          <div>{<img src={this.state.image[0].preview} />}</div>
          </div> : null}
          <div>
            <input type="submit" value="save"/>
          </div>
        </form>
      );
    }
}

export default ChangeProfilePicture;
