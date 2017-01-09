import React, {Component} from 'react';

class ChangeName extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p> Current name: {this.props.data.first_name + ' ' + this.props.data.last_name} </p>
                <form action="/api/users/updateInfo/name" method="post" encType="multipart/form-data" target="_top">
                    <label className="col-4 col-form-label" htmlFor="firstName">First Name:</label>
                    <input className="form-control" type="text" name="firstName" required/>
                    <label className="col-2 col-form-label" htmlFor="lastName">Last Name:</label>
                    <input className="form-control" type="text" name="lastName" required/>
                    <label className="col-2 col-form-label" htmlFor="password">Password:</label>
                    <input className="form-control" type="text" name="password"/>
                    <div>
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeName;
