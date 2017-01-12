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
      errorMessage: ''
    };

    this.loadedRecaptcha = this.loadedRecaptcha.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    // recaptchaInstance needs to store the recatcha event instance so it can be accessed in resetcaptcha
    this.recaptchaInstance = null
  }

  openModal = (message) => {
    this.setState({
      isOpen: true,
      errorMessage: message
    });
  };
   
  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };
  
  //verifies recaptcha was loaded in console
  loadedRecaptcha () {
    console.log('Recaptcha loaded!')
  }
  
  // handle recaptcha reset
  resetRecaptcha () {
    console.log(this.recaptchaInstance)
    this.recaptchaInstance.reset();
  };

  onFormSubmit(e) {
    e.preventDefault();
    var user = new FormData();
    let signUpData = document.getElementById('signUpData')
    user = new FormData(signUpData)
    var that = this;
    
    $.ajax({
      method: 'POST',
      url: '/auth/signup',
      data: user,
      cache: false,
      contentType: false,
      processData: false,
      success: function(){
        const path = '/login'
        browserHistory.push(path);
      },
      error: function(xhr, status, err){
        // if this errors out, reset the recaptcha
        that.recaptchaInstance.reset()
        // user friendly error response
        that.openModal(xhr.responseText)
      }
    })
  }

  render () {
    return (
    <div className="authPageContainer">
    <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Oops! We have a problem.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {this.state.errorMessage}
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      <div className="authForm">
          <h1>Sign Up</h1>
          <form method="post" id="signUpData" onSubmit={this.onFormSubmit}>
              <input type="text" id="firstName" type="firstName" placeholder="First Name" name="firstName" required="required"/>
              <input type="text" id="lastName" type="lastName" name="lastName" placeholder="Last Name" required="required"/>
              <input type="text" id="email" type="email" name="email" placeholder="Email" required="required"/>
              <input type="text" name="username" placeholder="Username" required="required" />
              <input type="text" name="password" placeholder="Password" required="required" />
              <Recaptcha
                ref={e => this.recaptchaInstance = e}
                theme="dark"
                sitekey="6LdWOBEUAAAAACTUSdYkHEjqeJIVtR7zM-yK0dbX"
                render="explicit"
                onloadCallback={this.loadedRecaptcha}
              />
              {/* load recaptcha async */}
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
