import React from 'react';
// LazyLoad allows the component to be loaded as  the user scrolls instead of all at once
import LazyLoad from 'react-lazy-load';

const HPFeedRecipe = ({recipe, savedRecipes, addRecipe, removeRecipe, userId, recipeId}) => {
  console.log(recipe._id)
  return (
    <LazyLoad offset={100} className="card-group col-xs-12 col-sm-6 col-md-4 col-lg-3">
      {/* see LazyLoad docs for more offset options (that is really all you can change)*/}
        <div className="card recipe">
          <img 
            className="card-img-top" 
            src="/assets/tempRecipe.svg" 
            alt="Card image cap"/>
          <div className="card-block">
            <div 
              className="row flex-items-xs-center recipe_card-fork_like-cont" 
              style={{'margin-bottom':'1.25rem'}}>
              <a 
                href={`/addrecipe?recipe=${recipe._id}`} 
                className="btn btn-primary recipeCardBtn">Fork Recipe</a>
              {
                recipe._id in savedRecipes ?
                  <div 
                    className="btn btn-secondary recipe_card-like_button recipeCardBtn"
                    onClick={() => {removeRecipe(recipeId, userId)}}
                  >Unlike Recipe</div>
                : <div 
                    className="btn btn-secondary recipe_card-like_button recipeCardBtn"
                    onClick={() => {addRecipe(recipeId, userId)}}
                  >Like Recipe</div>
              }

              
            </div>
            <h2 className="card-title"><a href={`/viewrecipe?recipeId=${recipe._id}`}>{recipe.title}</a></h2>
            <p className="card-text">{recipe.description}</p>
            <p> {'score' in recipe ? "Search Score: " + recipe.score : ''}</p>
          </div>
        </div>
    </LazyLoad>
  );
}

export default HPFeedRecipe;
