import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

import axios from 'axios';

class ChangeProfilePicture extends Component {
    constructor() {
        super();
        this.state = {
            files: []
        };

        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(files) {
        this.setState( { files: files } );
    }

    render() {
        return (
            <form action="/api/users/updateInfo/profilePicture" method="post" encType="multipart/form-data" target="_top">
                <label className="col-xs-2 col-form-label" htmlFor="ProfilePicture">Profile Picture:</label>
                {/*<input className="form-control" type="file" name="ProfilePicture" accept="image/*"/>*/}
                <Dropzone className="form-control" name="ProfilePicture" ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <div>
                    <input type="submit" value="save"/>
                </div>
            </form>
        );
    }
}

export default ChangeProfilePicture;
