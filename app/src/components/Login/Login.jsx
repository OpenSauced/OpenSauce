import React, {Component} from 'react';
import {Link} from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends Component {
    constructor() {
        super();
    }
    componentDidMount() {}
    render() {
        return (
            <form id="auth-form" action="/auth/login" method="post" className="text-left">
                <div className="auth-form-main-message"></div>
                <div className="main-auth-form">
                    <div className="auth-group">
                        <div className="form-group">
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="password"/>
                        </div>
                        <div className="form-group auth-group-checkbox">
                            <input type="checkbox" id="remember" name="remember"/>
                            <label htmlFor="remember"/> remember me
                        </div>
                    </div>
                    <button type="submit" className="auth-button">
                        <i className="fa fa-chevron-right"></i> Login
                    </button>
                </div>
                <div className="etc-auth-form">
                    <p>forgot your password? <a href="#">click here</a> </p>
                    <p>new user? <a href="/signup">create new account</a> </p>
                </div>
            </form>
        )
    }
}

export default Login;
