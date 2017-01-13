import React, { Component } from 'react';

// These are going to be on pretty much every route component page. Its the nav, header, and footer for the page
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';

import SaveAndForkButtons from './components/ViewRecipe/SaveAndForkButtons.jsx'
import RecipeLikeCount from './components/ViewRecipe/RecipeLikeCount.jsx'
import ViewRecipe from './components/ViewRecipe/ViewRecipe.jsx'

//Redux and async functions
import { getUserData, addUserSavedRecipe, removeUserSavedRecipe } from './actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class RouteViewRecipe extends Component {
  constructor() {
    super();

    this.state = {
      recipe: {},
      isSaved: false,
      isOpen: false,
      
    };
  }
  updateTree(treeData) {
    this.setState({treeData: treeData})
  }

  componentDidMount(){
    console.log('this.props --- route view recipe---', this.props)
    this.alreadyExistsModal()
    
  }

  alreadyExistsModal() {
    var path = this.props.location.query.savedAlready;
     if(path){
      this.setState({isOpen: true})
     }
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

  forkRecipe() {
  	var title = this.props.currentRecipe.title
  	var description = this.props.currentRecipe.description
  	var ingredients =this.props.currentRecipe.ingredients
  	var directions = this.props.currentRecipe.directions
  	var parentId = this.props.currentRecipe._id
  }

  render() {
    if(this.props.currentRecipe.title){
      return (
        <div className="container-fluid">
          <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Good News!</ModalTitle>
            </ModalHeader>
            <ModalBody>
              Someone else already added that recipe. But you can save this to your cookbook or fork it from here.
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.hideModal}>
                Close
              </button>
            </ModalFooter>
          </Modal>
         <HeaderNav/>
          <AppHeader title={this.props.currentRecipe.title}>
          <div className="row">
            <SaveAndForkButtons
              recipeId={this.props.currentRecipe._id}
              userId={this.props.userData.userData._id}
              saveRecipe={this.props.addUserSavedRecipe.bind(this)}
              forkRecipe={this.forkRecipe}
              removeRecipe={this.props.removeUserSavedRecipe.bind(this)}
              savedRecipes={this.props.userData.userData.saved_recipes}
            />
          </div>
          <div className="row">
            <RecipeLikeCount likes={this.props.currentRecipe.likes} />
          </div>
          </AppHeader>

          {/* pass down current recipe information and current user to a recipe the user clicks on*/}
          <ViewRecipe 
            recipe={this.props.currentRecipe} 
            user={this.props.userData.userData} 

          />
        </div>
      );
    }
    return <div></div>
  }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData, addUserSavedRecipe, removeUserSavedRecipe }, dispatch)
}

function mapStateToProps (state) {
  return {
    userData: state.userData,
    currentRecipe: state.currentRecipe
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteViewRecipe)
