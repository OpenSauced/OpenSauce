import React from 'react';

const HPFeedRecipe = ({recipe}) => {
  return (
    <div className="card-group col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <li className="card recipe">
      <img className="card-img-top" src="/assets/tempRecipe.svg" alt="Card image cap"/>
      <div className="card-block">
        <div className="row flex-items-xs-center recipe_card-fork_like-cont" style={{'margin-top':'1.25rem'}}>
          <a href={`/addrecipe?recipe=${recipe._id}`} className="btn btn-primary recipeCardBtn">Fork Recipe</a>
          <a className="btn btn-secondary recipe_card-like_button recipeCardBtn">Like Recipe</a>
        </div>
        <h2 className="card-title"><a href={`/viewrecipe/${recipe._id}`}>{recipe.title}</a></h2>
        <p className="card-text">{recipe.description}</p>
      </div>
    </li>
  </div>
  );
}

export default HPFeedRecipe;
