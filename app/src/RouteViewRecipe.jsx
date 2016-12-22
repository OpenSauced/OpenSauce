import React, { Component } from 'react';

// These are going to be on pretty much every route component page. Its the nav, header, and footer for the page
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import ViewRecipe from './components/ViewRecipe/ViewRecipe.jsx'
//buttons for saving and forking
//container for recipe stuff

//recipe id will be passed down in props

//do i need to pass props down to sub-components?

class RouteViewRecipe extends Component {
  constructor() {
    super();

    this.state = {
      recipe: {}
    };
  }

  //will mount 
  componentDidMount() {
    this.getRecipeFromDB(this.props.params.recipe);
  }

getRecipeFromDB(recipeId) {
	console.log("HERE?? in view route")
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

  render() {
if(this.state.recipe.title){
    return (
      <div className="container-fluid">
       <HeaderNav/>
        <AppHeader title={this.state.recipe.title}>
          
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


