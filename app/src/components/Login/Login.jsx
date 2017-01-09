import React from 'react';

const Login = () => {
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <form action="/auth/login" method="post">
            <div>
              <label htmlFor="username">Username:</label>
              <input id="username" type="text" name="username"/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" name="password"/>
            </div>
            <div>
              <input type="submit" value="Login"/>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <a href="/signup">Create an Account </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
