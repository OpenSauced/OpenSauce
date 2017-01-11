import {Router, Link} from 'react-router';
import React ,{ Component } from 'react';
import {browserHistory} from 'react-router';



import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


class Login extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      errorMessage: ''
    };
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

  onFormSubmit(e) {
    console.log("in the on form submit")
    e.preventDefault();
    var user = new FormData();
    let loginData = document.getElementById('loginData')
    user = new FormData(loginData)
    var that = this;
    
    $.ajax({
      method: 'POST',
      url: '/auth/login',
      data: user,
      cache: false,
      contentType: false,
      processData: false,
      success: function(){
        const path = '/'
        browserHistory.push(path);
      },
      error: function(xhr, status, err){

        var responseMessage = xhr.responseText
        console.log(responseMessage)
        that.openModal(xhr.responseText)
      }
    })
  }

render(){
  return (
    <div>
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
        <h1>Login</h1>
        <form method="post" id="loginData" onSubmit={this.onFormSubmit.bind(this)}>
        	<input type="text" name="username" placeholder="Username" required="required" />
            <input type="password" name="password" placeholder="Password" required="required" />
            <button type="submit" className="btn btn-primary btn-block btn-large"> Log In </button>
        </form>
        <h6>
          <Link to='/signup'>Create an account</Link>
        </h6>
      </div>
      </div>
  );
}
}

export default Login;
