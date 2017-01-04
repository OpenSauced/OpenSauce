import React, {Component} from 'react';

class ChangeBio extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form action="/api/users/updateInfo/bio" method="post" enctype="multipart/form-data" target="_top">
                <label className="col-xs-2 col-form-label" forHtml="newBio">Bio:</label>
                <input className="form-control" type="text" name="newBio"/>
                <div>
                    <input type="submit" value="Save"/>
                </div>
            </form>
        );
    }
}

export default ChangeBio;
