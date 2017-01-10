import React, { Component } from 'react';
import { Link } from 'react-router'

import RecipeDescription from './RecipeDescription'
import RecipeIngredientsList from './RecipeIngredientsList'
import RecipeCreator from './RecipeCreator'
import RecipeDirections from './RecipeDirections'

const ViewRecipe = ({recipe, user}) => {
  var description = recipe.description || <RecipeDescription recipeDescription={recipe.description} />
  var credit = recipe.credit ? <div>This fantastic recipe comes from: {recipe.credit}</div> : ''
  var image = recipe.recipe_images.public_url ? <div><img src={recipe.recipe_images.public_url} /></div> : '' 

	if (recipe){
    return (
      <div>
      {image}
        {description}
        <RecipeCreator recipeCreator={recipe.creator}/>
        <RecipeIngredientsList recipeIngredients={recipe.ingredients}/>
        <RecipeDirections recipeDirections={recipe.directions}/>
        {credit}
        {/* If you own a recipe, this button takes you to edit a recipe*/}
        { 
          user._id === recipe.creator._id
          ? <button> <Link to={`/editrecipe?recipeId=${recipe._id}`}>Edit this recipizzle</Link> </button>
          : ( <div>
                <h5> Want to put your own spin on this recipe? Try forking it! </h5>
              </div>
            )
        }
      </div>
    );
  }
  return ''
}

export default ViewRecipe
