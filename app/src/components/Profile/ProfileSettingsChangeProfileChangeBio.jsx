import React, {Component} from 'react';

class ChangeBio extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div>
                <h1> Current bio: {this.props.data} </h1>
                <form 
                    action="/api/users/updateInfo/bio" 
                    method="post" 
                    enctype="multipart/form-data" 
                    target="_top">
                    <label className="col-xs-2 col-form-label" htmlFor="newBio">Bio:</label>
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
