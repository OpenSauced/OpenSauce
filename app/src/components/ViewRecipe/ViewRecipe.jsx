import React, { Component } from 'react';
import { Link } from 'react-router'

import RecipeDescription from './RecipeDescription'
import RecipeIngredientsList from './RecipeIngredientsList'
import RecipeCreator from './RecipeCreator'
import RecipeDirections from './RecipeDirections'
import ForkButton from './ForkButton'

const ViewRecipe = ({recipe, user}) => {
  var description = recipe.description || <RecipeDescription recipeDescription={recipe.description} />
  var credit = recipe.credit ? <div>This fantastic recipe comes from: {recipe.credit}</div> : ''
  var image = recipe.recipe_images.public_url ? <div><img src={recipe.recipe_images.public_url} /></div> : '' 

  if (recipe){
    return (
      <div className="container">
        <div className="row view-recipe-container">
          <div className="col d-flex flex-wrap">
            <div className="row">
              <div className="col-12 recipe-title">
                <h2 className="">{recipe.title}</h2>
              </div>
              <div className="col-12 recipe-description">
                {description}
              </div>
              <div className="align-self-end">
                <RecipeCreator recipeCreator={recipe.creator}/>
              </div>
             </div>
          </div>
          <div className="col">
            {image}
          </div>
        </div>
        <div className="row justify-content-between view-recipe-container">
          <div className="col-8"> 
          <h3>Ingredients:</h3>
            <RecipeIngredientsList recipeIngredients={recipe.ingredients}/>
          </div>
          <div className="col-4">
            { 
              user._id === recipe.creator._id
                ? <Link to={`/editrecipe?recipeId=${recipe._id}`}><button className="btn btn-primary"> Edit this recipizzle</button></Link> 
                : ( 
                    <div className="row">
                      <div className="col-6">
                        <h5> Want to put your own spin on this recipe? Try forking it! </h5>
                      </div>
                      <ForkButton recipeId={recipe._id} cssStyles={{iconColor: 'green'}}/>
                    </div>
                  )
            }
          </div>  
        </div> 
        <div className="row view-recipe-container"> 
          <h3>Directions:</h3>
          <RecipeDirections recipeDirections={recipe.directions}/>
          <div>
            <br></br>
            {credit}
          </div>  
        </div>  
      </div>
    );
  }
  return ''
}

export default ViewRecipe
