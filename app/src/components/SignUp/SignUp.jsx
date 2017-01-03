import React from 'react';

const SignUp = () => {
  return (
    <div className="container">
      <div className="row">
        <form action="/auth/signup" method="post">
          <div className="row">
            <label htmlFor="firstName">First Name:</label>
            <input id="firstName" type="firstName" name="firstName"/>
          </div>
          <div className="row">
            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName" type="lastName" name="lastName"/>
          </div>
          <div className="row">
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" name="email"/>
          </div>
          <div className="row">
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" name="username"/>
          </div>
          <div className="row">
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password"/>
          </div>
          <div className="row">
              <input type="submit" value="Sign up"/>
          </div>
        </form>
      </div>
      <div className="row">
          <a href="/login">Login to your account</a>
      </div>
    </div>
  );
}

export default SignUp;