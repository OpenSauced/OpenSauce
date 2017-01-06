import React from 'react';

const SignUp = () => {
  return (
    <form id="auth-form" action="/auth/signUp" method="post" className="text-left">
        <div className="auth-form-main-message"></div>
        <div className="main-auth-form">
            <div className="auth-group">
              <div className='form-group'>
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName" className="form-control" type="firstName" name="firstName"/>
              </div>
              <div className='form-group'>
                <label htmlFor="lastName">Last Name:</label>
                <input id="lastName" className="form-control" type="lastName" name="lastName"/>
              </div>
              <div className='form-group'>
                <label htmlFor="email">Email:</label>
                <input id="email" className="form-control" type="email" name="email"/>
              </div>
              <div className='form-group'>
                <label htmlFor="username">Username:</label>
                <input autoComplete="off" className="form-control" id="username" type="text" name="username"/>
              </div>
              <div className='form-group'>
                <label htmlFor="password">Password:</label>
                <input autoComplete="off" className="form-control" id="password" type="password" name="password"/>
              </div>
            </div>
            <button type="submit" className="auth-button">
                <i className="fa fa-chevron-right"></i> Sign Up
            </button>
        </div>
        <div className="etc-auth-form">
            <p>forgot your password? <a href="#">click here</a> </p>
            <p>Already Have an Account? <a href="/login">click here</a> </p>
        </div>
    </form>
  );
}

export default SignUp;
