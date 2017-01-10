import React, {Component} from 'react';

class ChangeUsername extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <p className="col-12"> Current username: {this.props.data} </p>
                <form className="col-12 row basicProfileSettingsForm" action="/api/users/updateInfo/username" method="post" encType="multipart/form-data" target="_top">
                    <label className="col-12 col-form-label" htmlFor="newUsername">Username:</label>
                    <div className="col-5"><input className="form-control" type="text" name="newUsername"/></div>
                    <label className="col-12  col-form-label" htmlFor="password">Password:</label>
                    <div className="col-5"><input className="form-control" type="text" name="password"/></div>
                    <div className="col-12">
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeUsername;
