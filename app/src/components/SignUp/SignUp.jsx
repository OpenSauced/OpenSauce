import React from 'react';
import {Router, Link} from 'react-router';

const SignUp = () => {
  return (
    <div className="authForm">
        <h1>Sign Up</h1>
        <form method="post" action='/auth/SignUp'>
            <input type="text" id="firstName" type="firstName" placeholder="First Name" name="firstName" required="required"/>
            <input type="text" id="lastName" type="lastName" name="lastName" placeholder="Last Name" required="required"/>
            <input type="text" id="email" type="email" name="email" placeholder="Email" required="required"/>
            <input type="text" name="username" placeholder="Username" required="required" />
            <input type="text" name="password" placeholder="Password" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large"> Log In </button>
        </form>
        <h6>
          <Link to='/login'>Login to your Account</Link>
        </h6>
      </div>
  );
}

export default SignUp;
