import React, {Component} from 'react';

class ChangeEmail extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form action="/api/users/updateInfo/email" method="post" enctype="multipart/form-data" target="_top">
                    <label className="col-xs-2 col-form-label" forHtml="newEmail">Email:</label>
                    <input className="form-control" type="text" name="newEmail"/>
                    <label className="col-xs-2 col-form-label" forHtml="password">Password:</label>
                    <input className="form-control" type="text" name="password"/>
                <div>
                    <input type="submit" value="Save"/>
                </div>
            </form>
        );
    }
}

export default ChangeEmail;
