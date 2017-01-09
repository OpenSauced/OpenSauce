import React from 'react';
import {Router, Link} from 'react-router';

const HPFeedRecipe = ({recipe, savedRecipes, myRecipes, addRecipe, removeRecipe, userId, recipeId}) => {
  return (
    <div className="cardRecipeCol col-xs-12 col-sm-6 col-md-4 col-lg-3">
      {/* see LazyLoad docs for more offset options (that is really all you can change)*/}
        <div className="card recipeCard">
          <img className="card-img-top" src="/assets/tempRecipe.svg" alt="Card image cap"/>
          <div className="card-block">
            <div className=" col-xs-6">
              <Link href={`/addrecipe?recipe=${recipe._id}`} className="btn btn-primary recipeCardBtn">Fork Recipe</Link>
            </div>
              {
                recipe._id in myRecipes ?
                  <div className=" col-xs-6"><div className="btn btn-secondary recipe_card-like_button recipeCardBtn">OWNED RECIPE</div></div> : recipe._id in savedRecipes ?
                    <div className=" col-xs-6"><div className="btn btn-secondary recipe_card-like_button recipeCardBtn" onClick={() => {removeRecipe(recipeId, userId)}}>Unlike Recipe</div></div> :
                    <div className=" col-xs-6"><div className="btn btn-secondary recipe_card-like_button recipeCardBtn" onClick={() => {addRecipe(recipeId, userId)}}>Like Recipe</div></div>
              }
            <h2 className="card-title">
              <Link to={`/viewrecipe?recipeId=${recipe._id}`}>{recipe.title}</Link>
            </h2>
            <h3 className="card-title">
              <Link to={`/recipesbyuser?userId=${recipe.creator.username}`}>Author: {recipe.creator.username}</Link>
            </h3>
            <p className="card-text">{recipe.description}</p>
            <p> {'score' in recipe ? "Search Score: " + recipe.score : ''}</p>
          </div>
        </div>
      </div>
    );
}

export default HPFeedRecipe;
