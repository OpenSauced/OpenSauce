import React from 'react';

const Login = (props) => {
  return (
    <div className="authForm">
      <div className="content">
        <h1>Login</h1>
        <form method="post" action='/auth/login'>
        	<input type="text" name="username" placeholder="Username" required="required" />
            <input type="password" name="password" placeholder="Password" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large"> Log In </button>
        </form>
        <div className="authFormBg" style={props.style}></div>
      </div>
    </div>
  );
}

export default Login;
