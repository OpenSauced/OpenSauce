import React from 'react';
import {Router, Link} from 'react-router';

const Login = (props) => {
  return (
    <div className="authForm">
        <h1>Login</h1>
        <form method="post" action='/auth/login'>
        	<input type="text" name="username" placeholder="Username" required="required" />
            <input type="password" name="password" placeholder="Password" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large"> Log In </button>
        </form>
        <h6>
          <Link to='/signup'>Create an account</Link>
        </h6>
      </div>
  );
}

export default Login;
