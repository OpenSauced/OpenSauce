import React from 'react';

const HPFeedRecipe = ({recipe}) => {
  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <li className="card recipe">
      <img className="card-img-top" src="/assets/tempRecipe.svg" alt="Card image cap"/>
      <div className="card-block">
        <img src="" alt="" title="" className="recipe_card-image"/>
        <h2 className="card-title"><a href={`/viewrecipe/${recipe._id}`}>{recipe.title}</a></h2>
        <p className="card-text">{recipe.description}</p>
        <div className="row flex-items-xs-center recipe_card-fork_like-cont">
          <a href={`/addrecipe?recipe=${recipe._id}`} className="btn btn-primary">Fork Recipe</a>
          <a className="recipe_card-like_button col-xs-4">Like Recipe</a>
        </div>
      </div>
    </li>
  </div>
  );
}

export default HPFeedRecipe;
