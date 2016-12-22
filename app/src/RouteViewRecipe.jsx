import React, { Component } from 'react';

// These are going to be on pretty much every route component page. Its the nav, header, and footer for the page
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import SaveAndForkButtons from './components/ViewRecipe/SaveAndForkButtons.jsx'
import ViewRecipe from './components/ViewRecipe/ViewRecipe.jsx'
//buttons for saving and forking


class RouteViewRecipe extends Component {
  constructor() {
    super();

    this.state = {
      recipe: {}
    };
  }

  componentWillMount() {
    this.getRecipeFromDB(this.props.params.recipe);
  }

getRecipeFromDB(recipeId) {
    $.ajax({
      url: '/api/recipes/' + recipeId,
      success: function(recipe) {
      	console.log("RECIPE ", recipe)
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
      	recipeId: recipeId,
      	//userId:
      },
      success: function(recipe) {
      	console.log('Saved the recipe to the user!')
      }.bind(this),
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

    forkRecipe() {
	var title = this.state.recipe.title
	var description = this.state.recipe.description
	var ingredients =this.state.recipe.ingredients
	var directions = this.state.recipe.directions
	var parentId = this.state.recipe._id
  }

  render() {
if(this.state.recipe.title){
    return (
      <div className="container-fluid">
       <HeaderNav/>
        <AppHeader title={this.state.recipe.title}>
        <div>
        	<SaveAndForkButtons recipeId={this.state.recipe._id} saveRecipe={this.saveRecipe} forkRecipe={this.forkRecipe}/>
        </div>
        </AppHeader>

        <ViewRecipe recipe={this.state.recipe} />
        <Footer/>
      </div>
    );
  }
  return <div></div>
}
};

export default RouteViewRecipe;


