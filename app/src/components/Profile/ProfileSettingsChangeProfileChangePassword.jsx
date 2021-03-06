import React, {Component} from 'react';

class ChangePassword extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <h2 className="col-12">Change your Password</h2>
                <form className="col-12 row" action="/api/users/updateInfo/password" method="post" encType="multipart/form-data" target="_top">
                    {/* Added password verification because email is a vulnerability to the user*/}
                    <label className="col-12 col-form-label" htmlFor="password">Old Password:</label>
                    <div className="col-12 col-md-5"><input className="form-control" type="text" name="password"/></div>
                    <label className="col-12 col-form-label" htmlFor="newPassword">New Password:</label>
                    <div className="col-12 col-md-5"><input className="form-control" type="text" name="newPassword"/></div>
                    <div className="col-12">
                        <input className="btn btn-secondary" type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangePassword;
