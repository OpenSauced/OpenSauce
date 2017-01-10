import React from 'react';
import {Router, Link} from 'react-router';

const HPFeedRecipe = ({recipe, savedRecipes, myRecipes, addRecipe, removeRecipe, userId, recipeId}) => {

var imageOr = recipe.recipe_images.public_url ? recipe.recipe_images.public_url : recipe.recipe_images.placeholder

  return (
    <div className="cardRecipeCol col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card recipeCard">
          <div className="card-image-container">
            <img className="card-img-top" src={imageOr} alt="Card image cap"/>
          </div>
          <div className="card-block d-flex flex-wrap">
            <h2 className="col-12 card-title">
              <Link to={`/viewrecipe?recipeId=${recipe._id}`}>{recipe.title}</Link>
            </h2>
            <p className="col-12 card-title">
              <Link to={`/recipesbyuser?userId=${recipe.creator.username}`}>Author: {recipe.creator.username}</Link>
            </p>
            <p className="col-12 card-text">{recipe.description}</p>
            <p className="col-12"> {'score' in recipe ? "Search Score: " + recipe.score : ''}</p>
            <div className="row align-self-end mx-auto">
              <div className="col-6">
                <Link href={`/addrecipe?recipe=${recipe._id}`} className="btn btn-primary recipeCardBtn w-100">Fork Recipe</Link>
              </div>
                {
                  recipe._id in myRecipes ?
                    <div className="col-6"><div className="w-100 btn btn-secondary recipe_card-like_button recipeCardBtn">OWNED RECIPE</div></div> : recipe._id in savedRecipes ?
                    <div className="col-6"><div className="w-100 btn btn-secondary recipe_card-like_button recipeCardBtn" onClick={() => {removeRecipe(recipeId, userId)}}>Unlike Recipe</div></div> :
                    <div className="col-6"><div className="w-100 btn btn-secondary recipe_card-like_button recipeCardBtn" onClick={() => {addRecipe(recipeId, userId)}}>Like Recipe</div></div>
                }
            </div>
          </div>
        </div>
      </div>
    );
}

export default HPFeedRecipe;
