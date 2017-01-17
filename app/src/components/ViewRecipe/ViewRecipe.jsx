import React, { Component } from 'react';
import { Link } from 'react-router';

import RecipeTree from './RecipeTree';
import RecipeDescription from './RecipeDescription';
import RecipeIngredientsList from './RecipeIngredientsList';
import RecipeDirections from './RecipeDirections';
import RecipeCreator from './RecipeCreator';
import RecipeNotes from './RecipeNotes';
import ForkButton from './ForkButtonSolo';

const ViewRecipe = ({recipe, user}) => {
  var description = recipe.description || <RecipeDescription recipeDescription={recipe.description} />
  
  var credit = recipe.credit 
                ? <div>This fantastic recipe comes from: {recipe.credit}</div> 
                : ''
  
  var image = recipe.recipe_images.public_url 
                ? <div 
                    className="imageBlockRecipeView w-100" 
                    style={{'backgroundImage': 'url(' + recipe.recipe_images.public_url + ')' }}
                  ></div> 
                : ''
  {/* there must be a recipe passed into this component for it to work */}
  if (recipe){
    return (
      <div className="container">
        <div className="row view-recipe-container">
          <div className="col-12 col-lg-6">
            {image}
          </div>
          <div className="col-12 col-lg-6 d-flex flex-wrap">
            <div className="row">
              <div className="col-12 recipe-title">
                <h2 className="">{recipe.title}</h2>
              </div>
              <div className="col-12 recipe-description">
                {description}
              </div>
              <div className="align-self-end">
                {/* shows a the creator of the recipe*/}
                <RecipeCreator recipeCreator={recipe.creator}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-between view-recipe-container">
          <div className="col-8">
          {/* shows a list of ingredients*/}
          <h3>Ingredients:</h3>
            <RecipeIngredientsList recipeIngredients={ recipe.ingredients }/>
          </div>
             <div className="col-4">
              {/* If the recipe is NOT the user's, show a 'fork this' button, in the ingredients box.
                * If the recipe IS the user's, shows an edit button.
                * This is geared toward user experience and to remind/encourage users to use the features of 
                * our app.
              */}
            {
              user._id === recipe.creator._id
                ? <Link to={`/editrecipe?recipeId=${recipe._id}`}><button className="btn btn-primary offset-6"> Edit this recipe</button></Link>
                : (
                    <div className="row ingredient-container-fork">
                      <ForkButton recipeId={ recipe._id } />
                    </div>
                  )
            }
          </div>
        </div>
        <div className="row view-recipe-container">
          {/* Shows the directions of the recipe */}
          <h3>Directions:</h3>
          <RecipeDirections recipeDirections={recipe.directions}/>
          
          {/*<div>
            <br></br>
            credit
          </div>*/}
        </div>
        <div className="row view-recipe-container">
          {/* Shows the recipe family tree feature 
            * - each recipe has parents/siblings/children that are shown here
          */}
          <h3>Recipe Family Tree:</h3>
          <div className="col-12 col-md-6">
          <RecipeTree />
          </div>
        </div>
        <div className="row view-recipe-container">
          <div className="col d-flex flex-wrap">
            <h3>
              {/* This introduces recipe notes to the user in a nice way  */}
              {
                user.username !== recipe.creator.username
                  ? recipe.creator.username + "'s Recipe Notes: "
                  : user.username === recipe.creator.username
                    ? 'Your Recipe Notes:'
                    : 'Recipe Notes:'
                }
              }
            </h3>
            <RecipeNotes recipeNotes={ recipe.notes }/>
          </div>
            {/* If this recipe is not the user's, show the fork button to encourage feature use */}
            {
              user._id === recipe.creator._id
                ? null
                : (
                    <div className="col-4">
                      <div className="row ingredient-container-fork">
                        <ForkButton recipeId={recipe._id} />
                      </div>
                    </div>
                  )
            }
        </div>
      </div>
    );
  }
  return 'No recipe...'
}

export default ViewRecipe
