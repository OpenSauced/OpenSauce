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
        this.onOpenClick = this.onOpenClick.bind(this);
    }

    onDrop(files) {
        this.setState( { files: files } );
    }

    onOpenClick() {
        this.handleImageUpload();
    }

    handleImageUpload() {
        axios({
            method: 'POST',
            url: '/api/users/updateInfo/profilePicture',
            data: {
                file: this.state.files[0].preview
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
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
