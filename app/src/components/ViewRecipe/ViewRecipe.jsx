import React, { Component } from 'react';
import { Link } from 'react-router'

import RecipeDescription from './RecipeDescription'
import RecipeIngredientsList from './RecipeIngredientsList'
import RecipeCreator from './RecipeCreator'
import RecipeDirections from './RecipeDirections'

const ViewRecipe = ({recipe, user}) => {
  console.log('ViewRecipe - me', user)
	if (recipe){
    return (
      <div>
        <RecipeDescription recipeDescription={recipe.description} />
        <RecipeCreator recipeCreator={recipe.creator}/>
        <RecipeIngredientsList recipeIngredients={recipe.ingredients}/>
        <RecipeDirections recipeDirections={recipe.directions}/>
        {/* If you own a recipe, this button takes you to edit a recipe*/}
        { 
          user._id === recipe.creator._id &&
          <button> <Link to={`/editrecipe?recipeId=${recipe._id}`}>Edit this recipizzle</Link> </button>
        }
      </div>
    );
  }
  return ''
}

export default ViewRecipe 
