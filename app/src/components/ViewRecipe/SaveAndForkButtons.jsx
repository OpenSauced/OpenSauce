import React from 'react'
import { Link } from 'react-router';
import ForkButton from './ForkButtonSolo';

const SaveAndForkButtons = ({recipeId, userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
  let star = recipeId in savedRecipes
    ? <div className ="col-6 icon" onClick={() => removeRecipe(recipeId, userId)}>
        <i className="fa fa-star fa-3x">
          <br></br>
          <p>Remove this Recipe</p>
        </i>
      </div>
    : <div className ="col-6 icon" onClick={() => saveRecipe(recipeId, userId)}>
        <i className="fa fa-star fa-3x">
          <br></br>
          <p>Save this Recipe</p>
        </i>
      </div>

  return (
    <div className="row justify-content-center ml-auto mr-auto">
      {star}
      {/* to change fork icon color, insert the following where 'false' is
        * {iconColor: 'YOUR_COLOR'} ----THEN -> add a css class titled .icon + your_color
      */}
      <Link className="col-6 icon" to={`/addrecipe?recipe=${recipeId}`}>
        <i className="fa fa-cutlery fa-3x">
          <br></br>
          <p className="">Fork this Recipe</p>
        </i>
      </Link> 
    </div>
  );
};

module.exports = SaveAndForkButtons;
