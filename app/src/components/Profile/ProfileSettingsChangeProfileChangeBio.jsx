import React, {Component} from 'react';

class ChangeBio extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p>Current bio: {this.props.data}</p>
                <form 
                    action="/api/users/updateInfo/bio" 
                    method="post" 
                    encType="multipart/form-data" 
                    target="_top">
                    <label className="col-2 col-form-label" htmlFor="newBio">Bio:</label>
                    <textarea className="form-control" name="newBio" rows="4" cols="50"></textarea>
                    <div>
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeBio;
