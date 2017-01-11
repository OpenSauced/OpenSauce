import React, { Component } from 'react';

//Redux and async functions
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddRecipeFromLink from './AddRecipeFromLink';
import AddRecipeManual from './AddRecipeManual';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';



class AddRecipe extends Component {
  constructor () {
    super ()

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

  componentWillMount() {
    this.props.getUserData();
  }

  render() {
    return(
      <div className="container">
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Oops! We have a problem.</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {this.state.errorMessage}
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>Close</button>
          </ModalFooter>
        </Modal>
        {
          this.props.renderInputs === 'manual' 
            ? <AddRecipeManual recipeId={this.props.recipeId} openModal={this.openModal.bind(this)}/> 
            : <AddRecipeFromLink userData={this.props.userData} openModal={this.openModal.bind(this)}/>
        }
      </div>
    )
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData }, dispatch)
}

function mapStateToProps (state) {
  return state.userData
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe)
