import React, { Component } from 'react';
import { Link } from 'react-router'

import RecipeDescription from './RecipeDescription'
import RecipeIngredientsList from './RecipeIngredientsList'
import RecipeDirections from './RecipeDirections'
import RecipeCreator from './RecipeCreator'
import RecipeNotes from './RecipeNotes'
import ForkButton from './ForkButtonSolo'

const ViewRecipe = ({recipe, user}) => {
  var description = recipe.description || <RecipeDescription recipeDescription={recipe.description} />
  var image = recipe.recipe_images.public_url ? <div className="imageBlockRecipeView" style={{'backgroundImage': 'url(' + recipe.recipe_images.public_url + ')' }}></div> : ''

  if (recipe){
    return (
      <div className="container">
        <div className="row view-recipe-container">
          <div className="col-12 flex-wrap">
            {image}
          </div>
          <div className="col d-flex flex-wrap">
            <div className="row">
              <div className="col-12 recipe-title">
                <h2>{ recipe.title }</h2>
              </div>
              <div className="col-12 recipe-description">
                { description }
              </div>
              <div className="align-self-end">
                <RecipeCreator recipeCreator={ recipe.creator }/>
              </div>
             </div>
          </div>
        </div>
        <div className="row justify-content-between view-recipe-container">
          <div className="col-8">
          <h3>Ingredients:</h3>
            <RecipeIngredientsList recipeIngredients={ recipe.ingredients }/>
          </div>
          <div className="col-4">
            {
              user._id === recipe.creator._id
                ? <Link to={`/editrecipe?recipeId=${recipe._id}`}><button className="btn btn-primary offset-6"> Edit this recipizzle</button></Link>
                : (
                    <div className="row ingredient-container-fork">
                      <div className="col-6">
                        <p> Want to change this recipe? Try forking it! </p>
                      </div>
                      <ForkButton recipeId={ recipe._id } />
                    </div>
                  )
            }
          </div>
        </div>
        <div className="row view-recipe-container">
          <h3>Directions:</h3>
          <RecipeDirections recipeDirections={recipe.directions}/>
        </div>
        <div className="row view-recipe-container">
          <div className="col d-flex flex-wrap">
            <h3>
              {
                user.username !== recipe.creator.username
                  ? recipe.creator.username + "'s Recipe Notes: "
                  : user.username === recipe.creator.username
                    ? 'Your Recipe Notes:'
                    : 'Recipe Notes:'
              }
            </h3>
            <RecipeNotes recipeNotes={ recipe.notes }/>
          </div>
            {
              user._id === recipe.creator._id
                ? null
                : (
                    <div className="col-4">
                      <div className="row ingredient-container-fork">
                        <div className="col-6">
                          <p> Want to add your own notes? Try forking it! </p>
                        </div>
                        <ForkButton recipeId={recipe._id} />
                      </div>
                    </div>
                  )
            }
        </div>
      </div>
    );
  }
  return ''
}

export default ViewRecipe
