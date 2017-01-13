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
        <div className="row">
          <h2 className="col-12">Change Your Profile Picture</h2>
          <form className="col-12 row" action="/api/users/updateInfo/profilePicture" method="post" encType="multipart/form-data" target="_top">
            <label className="col-12 col-md-5 col-form-label" htmlFor="ProfilePicture">Profile Picture:</label>
            <Dropzone name="ProfilePicture" multiple={false} onDrop={this.onDrop}>
                {
                  this.state.image.length > 0
                    ? <div
                        className="imageUploadBlock"
                        style={{'backgroundImage': 'url(' + this.state.image[0].preview + ')' }}
                      ></div>
                    : <div>`Click or drag an image inside of the box to upload.`</div>
                }
            </Dropzone>
            <div className="col-12">
              <input className="btn btn-secondary" type="submit" value="save"/>
            </div>
          </form>
        </div>
      );
    }
}

export default ChangeProfilePicture;
