import React, {Component} from 'react';

class ChangeUsername extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <form action="/api/users/updateInfo/name" method="post" enctype="multipart/form-data" target="_top">
                <label className="col-xs-2 col-form-label" forHtml="firstName">First Name:</label>
                <input className="form-control" type="text" name="firstName" required/>
                <label className="col-xs-2 col-form-label" forHtml="lastName">Last Name:</label>
                <input className="form-control" type="text" name="lastName" required/>
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
