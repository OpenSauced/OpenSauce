import React from 'react';

const SignUp = () => {
  return (
    <div className="row">
      <form style={{display: 'table-caption'}} action="/auth/signup" method="post">
        <label htmlFor="firstName">First Name:</label>
        <input id="firstName" type="firstName" name="firstName"/>
        <label htmlFor="lastName">Last Name:</label>
        <input id="lastName" type="lastName" name="lastName"/>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email"/>
        <label htmlFor="username">Username:</label>
        <input id="username" type="text" name="username"/>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password"/>
        <div>
            <input type="submit" value="Sign up"/>
        </div>
      </form>
      <p>
          <a href="/login">Login to your account</a>
      </p>
    </div>
  );
}

export default SignUp;