import React, {Component} from 'react';

class ChangeUsername extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form action="/api/users/updateInfo/username" method="post" enctype="multipart/form-data" target="_top" className='basicProfileSettingsForm'>
                <label className="col-xs-2 col-form-label" forHtml="newUsername">Username:</label>
                <input className="form-control" type="text" name="newUsername"/>
                <label className="col-xs-2 col-form-label" forHtml="password">Password:</label>
                <input className="form-control" type="text" name="password"/>
                <div>
                    <input type="submit" value="Save"/>
                </div>
            </form>
        );
    }
}

export default ChangeUsername;
