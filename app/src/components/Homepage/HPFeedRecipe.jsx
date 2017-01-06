import React from 'react';
import {Router, Link} from 'react-router';
// LazyLoad allows the component to be loaded as  the user scrolls instead of all at once
import LazyLoad from 'react-lazy-load';

const HPFeedRecipe = ({recipe}) => {
  return (
    <LazyLoad offset={100} className="cardRecipeCol col-xs-12 col-sm-6 col-md-4 col-lg-3">
      {/* see LazyLoad docs for more offset options (that is really all you can change)*/}
      <div className="card recipeCard">
          <img className="card-img-top" src="/assets/tempRecipe.svg" alt="Card image cap"/>
          <div className="card-block">
              <div className="row card-buttons recipe_card-fork_like-cont">
                  <Link href={`/addrecipe?recipe=${recipe._id}`} className="btn btn-primary col-xs-6">
                    <div>Fork Recipe</div>
                  </Link>
                  <Link className="btn btn-secondary recipe_card-like_button col-xs-6">
                    <div>Like Recipe</div>
                  </Link>
              </div>
              <h2 className="card-title">
                  <a href={`/viewrecipe/${recipe._id}`}>{recipe.title}</a>
              </h2>
              <p className="card-text">{recipe.description}</p>
          </div>
      </div>
    </LazyLoad>
  );
}

export default HPFeedRecipe;
