import React, {Component} from 'react';

class ChangeBio extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <h2 className="col-12">Current bio: {this.props.data}</h2>
                <form
                    className="col-12 row" 
                    action="/api/users/updateInfo/bio" 
                    method="post" 
                    encType="multipart/form-data" 
                    target="_top"
                >
                    <label className="col-12 col-form-label" htmlFor="newBio">Bio:</label>
                    <div className="col-12 col-md-5">
                        <textarea className="form-control" name="newBio" rows="4" cols="70"></textarea>
                    </div>
                    <div className="col-12">
                        <input className="btn btn-secondary" type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeBio;
