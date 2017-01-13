import React, {Component} from 'react';

class ChangeName extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <h2 className="col-12"> Current name: {this.props.data.first_name + ' ' + this.props.data.last_name} </h2>
                <form className="col-12 row" action="/api/users/updateInfo/name" method="post" encType="multipart/form-data" target="_top">
                    <label className="col-12 col-form-label" htmlFor="firstName">First Name:</label>
                    <div className="col-12 col-md-5"><input className="form-control" type="text" name="firstName" required/></div>
                    <label className="col-12 col-form-label" htmlFor="lastName">Last Name:</label>
                    <div className="col-12 col-md-5"><input className="form-control" type="text" name="lastName" required/></div>
                    <label className="col-12 col-form-label" htmlFor="password">Password:</label>
                    <div className="col-12 col-md-5"><input className="form-control" type="text" name="password"/></div>
                    <div className="col-12">
                        <input className="btn btn-secondary" type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChangeName;
