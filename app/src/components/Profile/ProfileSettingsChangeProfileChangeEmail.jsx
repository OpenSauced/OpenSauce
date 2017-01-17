import React, {Component} from 'react';

// Change email component
class ChangeEmail extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <h2 className="col-12">Current email: {this.props.data}</h2>
                <form className="col-12 row" action="/api/users/updateInfo/email" method="post" encType="multipart/form-data" target="_top">
                    <label className="col-12 col-form-label" htmlFor="newEmail">Email:</label>
                    <div className="col-12 col-md-5">
                        <input className="form-control" type="text" name="newEmail"/>
                    </div>
                    {/* Added password verification because email is a vulnerability to the user*/}
                    <label className="col-12 col-form-label" htmlFor="password">Password:</label>
                    <div className="col-12 col-md-5">
                        <input className="form-control" type="text" name="password"/>
                    </div>
                    <div className="col-12">
                        <input className="btn btn-secondary" type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeEmail;
