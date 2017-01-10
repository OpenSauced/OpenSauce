import React, {Component} from 'react';

class ChangeBio extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <p className="col-12">Current bio: {this.props.data}</p>
                <form
                    className="col-12 row" 
                    action="/api/users/updateInfo/bio" 
                    method="post" 
                    encType="multipart/form-data" 
                    target="_top">
                    <label className="col-12 col-form-label" htmlFor="newBio">Bio:</label>
                    <div className="col-5"><textarea className="form-control" name="newBio" rows="4" cols="50"></textarea></div>
                    <div className="col-12">
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeBio;
