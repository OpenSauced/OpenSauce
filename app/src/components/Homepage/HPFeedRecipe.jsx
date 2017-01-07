import React from 'react';
import {Router, Link} from 'react-router';

const HPFeedRecipe = ({recipe}) => {
    return (
      <div className="cardRecipeCol col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card recipeCard ">
          <img className="card-img-top" src="/assets/tempRecipe.svg" alt="Card image cap"/>
          <div className="card-block">
            <div className=" col-xs-6">
              <Link href={`/addrecipe?recipe=${recipe._id}`} className="btn btn-primary">
                Fork Recipe
              </Link>
            </div>
            <div className="col-xs-6">
              <Link className="btn btn-secondary recipe_card-like_button">
                Like Recipe
              </Link>
            </div>
            <h2 className="card-title">
              <a href={`/viewrecipe/${recipe._id}`}>{recipe.title}</a>
            </h2>
            <p className="card-text">{recipe.description}</p>
          </div>
        </div>
      </div>
    );
}

export default HPFeedRecipe;
