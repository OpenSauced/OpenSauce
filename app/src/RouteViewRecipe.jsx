import React, { Component } from 'react';

// These are going to be on pretty much every route component page. Its the nav, header, and footer for the page
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import SaveAndForkButtons from './components/ViewRecipe/SaveAndForkButtons.jsx'
import ViewRecipe from './components/ViewRecipe/ViewRecipe.jsx'

//Redux and async functions
import { getUserData, addUserSavedRecipe, removeUserSavedRecipe } from './actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class RouteViewRecipe extends Component {
  constructor() {
    super();

    this.state = {
      recipe: {},
      isSaved: false
    };
  }

  forkRecipe() {
  	var title = this.props.currentRecipe.title
  	var description = this.props.currentRecipe.description
  	var ingredients =this.props.currentRecipe.ingredients
  	var directions = this.props.currentRecipe.directions
  	var parentId = this.props.currentRecipe._id
  }

  render() {
    console.log(this.props.userData.userData)
    if(this.props.currentRecipe.title){
      return (
        <div className="container-fluid">
         <HeaderNav/>
          <AppHeader title={this.props.currentRecipe.title}>
          <div>
            <SaveAndForkButtons 
              isSaved={this.state.isSaved} 
              recipeId={this.props.currentRecipe._id}
              userId={this.props.userData.userData._id}
              saveRecipe={this.props.addUserSavedRecipe.bind(this)}
              forkRecipe={this.forkRecipe} 
              removeRecipe={this.props.removeUserSavedRecipe.bind(this)}
          />
          </div>
          </AppHeader>

          <ViewRecipe recipe={this.props.currentRecipe} />
          <Footer/>
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


