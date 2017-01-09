import React, {Component} from 'react';

class ChangeUsername extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1> Current username: {this.props.data} </h1>
                <form action="/api/users/updateInfo/username" method="post" enctype="multipart/form-data" target="_top" className='basicProfileSettingsForm'>
                    <label className="col-2 col-form-label" forHtml="newUsername">Username:</label>
                    <input className="form-control" type="text" name="newUsername"/>
                    <label className="col-2 col-form-label" forHtml="password">Password:</label>
                    <input className="form-control" type="text" name="password"/>
                    <div>
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeUsername;
