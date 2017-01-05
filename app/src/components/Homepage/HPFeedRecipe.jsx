import React from 'react';
// LazyLoad allows the component to be loaded as  the user scrolls instead of all at once
import LazyLoad from 'react-lazy-load';

const HPFeedRecipe = ({recipe}) => {
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
              <a className="btn btn-secondary recipe_card-like_button recipeCardBtn">Like Recipe</a>
            </div>
            <h2 className="card-title"><a href={`/viewrecipe/${recipe._id}`}>{recipe.title}</a></h2>
            <p className="card-text">{recipe.description}</p>
            <p> {'score' in recipe ? "Search Score: " + recipe.score : ''}</p>
          </div>
        </div>
    </LazyLoad>
  );
}

export default HPFeedRecipe;
