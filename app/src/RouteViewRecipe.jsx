import React, { Component } from 'react';

// These are going to be on pretty much every route component page. Its the nav, header, and footer for the page
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import SaveAndForkButtons from './components/ViewRecipe/SaveAndForkButtons.jsx'
import ViewRecipe from './components/ViewRecipe/ViewRecipe.jsx'

//Redux and async functions
import { getUserData } from './actions/index';
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

  componentWillMount() {
    this.getRecipeFromDB(this.props.params.recipe);
  }

  getRecipeFromDB(recipeId) {
    $.ajax({
      url: '/api/recipes/' + recipeId,
      success: function(recipe) {
          this.setState({ recipe: recipe });
      }.bind(this),
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  saveRecipe() {
  	 $.ajax({
        url: '/api/users/save',
        type: 'POST',
        data: {
        	recipeId: this.props.currentRecipe._id,
        	userId: this.props.userData._id
        },
        success: function(bool) {
          this.setState({isSaved: bool})
        	console.log('is saved?????? ', bool)
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }.bind(this),
    });
  }

    removeRecipe() {
     $.ajax({
        url: '/api/users/remove',
        type: 'POST',
        data: {
          recipeId: this.props.currentRecipe._id,
          userId: this.props.userData._id
        },
        success: function(bool) {
          this.setState({isSaved: bool})
          console.log('is saved?????? ', bool)
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }.bind(this),
    });
  }

  forkRecipe() {
  	var title = this.props.currentRecipe.title
  	var description = this.props.currentRecipe.description
  	var ingredients =this.props.currentRecipe.ingredients
  	var directions = this.props.currentRecipe.directions
  	var parentId = this.props.currentRecipe._id
  }

  render() {
    console.log(this.props.currentRecipe)
    if(this.props.currentRecipe.title){
      return (
        <div className="container-flex wholeContainer">
         <HeaderNav/>
          <AppHeader title={this.state.currentRecipe.title}/>
          <div className="row container-fluid recipePageContainer">
            <SaveAndForkButtons isSaved={this.state.isSaved} recipeId={this.props.currentRecipe._id} saveRecipe={this.saveRecipe.bind(this)} forkRecipe={this.forkRecipe}/></div>
            <ViewRecipe recipe={this.state.currentRecipe} />
            <Footer/>
          </div>
      );
    }
  }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData }, dispatch)
}

function mapStateToProps (state) {
  return {
    userData: state.userData,
    currentRecipe: state.currentRecipe
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteViewRecipe)
