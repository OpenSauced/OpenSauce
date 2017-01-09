import React, {Component} from 'react';

class ChangePassword extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form action="/api/users/updateInfo/password" method="post" encType="multipart/form-data" target="_top">
                <label className="col-2 col-form-label" htmlFor="password">Old Password:</label>
                <input className="form-control" type="text" name="password"/>
                <label className="col-2 col-form-label" htmlFor="newPassword">New Password:</label>
                <input className="form-control" type="text" name="newPassword"/>
                <div>
                    <input type="submit" value="Save"/>
                </div>
            </form>
        );
    }
}

export default ChangePassword;
