import React, {Component} from 'react';

class ChangePassword extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1> Current password: {this.props.data} </h1>
                <form action="/api/users/updateInfo/password" method="post" enctype="multipart/form-data" target="_top">
                    <label className="col-xs-2 col-form-label" forHtml="password">Old Password:</label>
                    <input className="form-control" type="text" name="password"/>
                    <label className="col-xs-2 col-form-label" forHtml="newPassword">New Password:</label>
                    <input className="form-control" type="text" name="newPassword"/>
                    <div>
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangePassword;
