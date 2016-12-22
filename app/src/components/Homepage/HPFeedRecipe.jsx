import React from 'react';

const HPFeedRecipe = ({recipe}) => {
  return (
    <li className="col-xs-12 col-sm-4 recipe_card-cont">
      <div className="recipe_card-box">
        <img src="" alt="" title="" className="recipe_card-image"/>
        <h2 className="recipe_card-title">{recipe.title}</h2>
        <p className="recipe_card-desc">{recipe.description}</p>
        <div className="row recipe_card-fork_like-cont">
          <a className="recipe_card-fork_button col-xs-4">Fork Recipe</a>
          <a className="recipe_card-like_button col-xs-4">Like Recipe</a>
        </div>
      </div>
    </li>
  );
}

export default HPFeedRecipe;
