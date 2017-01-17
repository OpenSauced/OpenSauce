import React ,{ Component } from 'react';
import {Router, Link} from 'react-router';
import Recaptcha from 'react-recaptcha';
import {browserHistory} from 'react-router';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


class SignUp extends Component {
  constructor () {
    super ()

    this.state = {
      isOpen: false,
      errorMessage: '',
      verificationCode: ''
    };

    // variable to store the recaptcha instance information
    this.recaptchaInstance = null
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  verifyCallback(response){
    console.log('Recaptcha checked, ready to send!')
  }

  componentDidMount () {
    // create a recaptcha instance on the page contains the site key, the secret you need is in config.js
    this.recaptchaInstance = grecaptcha.render('recaptchaSignUp', {
        sitekey : '6LdWOBEUAAAAACTUSdYkHEjqeJIVtR7zM-yK0dbX',
        callback: this.verifyCallback.bind(this),
        theme : 'dark',
        render: 'explicit',
        type: 'image',
        size: 'small',
        tabindex: '0'
    });
  }

  //opens error modal
  openModal = (message) => {
    this.setState({
      isOpen: true,
      errorMessage: message
    });
  };

  // closes error modal
  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  onFormSubmit(e) {
    // this function does a variety of things:
    //    1) it creates a nice set of form data 
    //    2) sends the userdata PLUS recaptcha to the server
    //        -- recaptcha will be authenticated via middleware

    e.preventDefault();
    let user = new FormData();
    let signUpData = document.getElementById('signUpData')
    user = new FormData(signUpData)
    let that = this;

    $.ajax({
      method: 'POST',
      url: '/auth/signup',
      data: user,
      cache: false,
      contentType: false,
      processData: false,
      success: function(){
        // login path will be pushed through the react router, which will make the view refresh
        //   - Note: since it is through react router, the html page won't be refreshed
        const path = '/login'
        browserHistory.push(path);
      },
      error: function(xhr, status, err){
        // user friendly error response, opens the modal below
        that.openModal(xhr.responseText)
        // if this errors out, reset the recaptcha
        grecaptcha.reset(that.recaptchaInstance)
      }
    })
  }

  render () {
    return (
      <div className="authPageContainer">
        {/* User friendly error response handling 
          * If there is an error, the state of this component will be set,
          * which will then open the modal with the error message sent from the server
        */}
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Oops! We have a problem.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {this.state.errorMessage}
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default btn-primary' onClick={this.hideModal}>
              Close
            </button>
          </ModalFooter>
        </Modal>

       {/* Sign up form */}
        <div className="authForm">
            <h1>Sign Up</h1>
            <form method="post" id="signUpData" onSubmit={this.onFormSubmit}>
                <input type="text" id="firstName" type="firstName" placeholder="First Name" name="firstName" required="required"/>
                <input type="text" id="lastName" type="lastName" name="lastName" placeholder="Last Name" required="required"/>
                <input type="text" id="email" type="email" name="email" placeholder="Email" required="required"/>
                <input type="text" name="username" placeholder="Username" required="required" />
                <input type="password" name="password" placeholder="Password" required="required" autocomplete="off" />
                {/* load recaptcha here
                  * PLEASE NOTE: the div below is supposed to be empty, an html doc will be injected with the 
                  * recaptcha. It's very hands off for the most part.
                */}
                <div id="recaptchaSignUp"></div>
                <button type="submit" className="btn btn-primary btn-block btn-large"> Sign Up </button>
            </form>
            <h6>
              <Link to='/login'>Login to your Account</Link>
            </h6>
          </div>
        </div>
    );
  }
}

export default SignUp;
