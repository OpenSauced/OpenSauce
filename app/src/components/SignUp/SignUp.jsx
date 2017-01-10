import React ,{ Component } from 'react';
import {Router, Link} from 'react-router';
import Recaptcha from 'react-recaptcha'

class SignUp extends Component {
  constructor () {
    super ()
    this.loadedRecaptcha = this.loadedRecaptcha.bind(this)
  }

  loadedRecaptcha () {
    console.log('Recaptcha loaded!')
  }

  render () {
    return (
    <div className="authPageContainer">
      <div className="authForm">
          <h1>Sign Up</h1>
          <form method="post" action='/auth/SignUp'>
              <input type="text" id="firstName" type="firstName" placeholder="First Name" name="firstName" required="required"/>
              <input type="text" id="lastName" type="lastName" name="lastName" placeholder="Last Name" required="required"/>
              <input type="text" id="email" type="email" name="email" placeholder="Email" required="required"/>
              <input type="text" name="username" placeholder="Username" required="required" />
              <input type="text" name="password" placeholder="Password" required="required" />
              {/* load recaptcha async */}
              <button type="submit" className="btn btn-primary btn-block btn-large"> Sign Up </button>
          </form>
          <h6>
            <Link to='/login'>Login to your Account</Link>
          </h6>
        </div>
        <Recaptcha
          sitekey="6LdWOBEUAAAAACTUSdYkHEjqeJIVtR7zM-yK0dbX"
          render="explicit"
          onloadCallback={this.loadedRecaptcha}
        />
        </div>
    );
  }
}

export default SignUp;
