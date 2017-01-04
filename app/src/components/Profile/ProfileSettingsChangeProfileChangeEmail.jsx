import React, {Component} from 'react';

class ChangeEmail extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1> Current email: {this.props.data} </h1>
                <form action="/api/users/updateInfo/email" method="post" enctype="multipart/form-data" target="_top">
                    <label className="col-xs-2 col-form-label" forHtml="newEmail">Email:</label>
                    <input className="form-control" type="text" name="newEmail"/>
                    <label className="col-xs-2 col-form-label" forHtml="password">Password:</label>
                    <input className="form-control" type="text" name="password"/>
                    <div>
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeEmail;
