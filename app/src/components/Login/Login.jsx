import React from 'react';

const Login = () => {
  return (
    <div id="login">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h2>Login</h2>
        <div>
          <form action="/auth/login" method="post">
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <label for="username">Username:</label>
              <input id="username" type="text" name="username"/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <label for="password">Password:</label>
              <input id="password" type="password" name="password"/>
            </div>
            <div>
              <input type="submit" value="Login"/>
            </div>
          </form>
        </div>
      </div>
      <p>
        <a href="/signup">Create an Account </a>
      </p>
    </div>
  );
}

export default Login;
