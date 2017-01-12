import React from 'react'
import { Link } from 'react-router';
import ForkButton from './ForkButtonSolo';

const SaveAndForkButtons = ({recipeId, userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
  let heart = recipeId in savedRecipes
    ? <div className ="col-6 icon" onClick={() => removeRecipe(recipeId, userId)}>
        <i className="fa fa-heart fa-3x">
          <br></br>
          <p>Remove</p>
        </i>
      </div>
    : <div className ="col-6 icon" onClick={() => saveRecipe(recipeId, userId)}>
        <i className="fa fa-heart fa-3x">
          <br></br>
          <p>Save</p>
        </i>
      </div>

  return (
    <div className="row justify-content-center mx-auto">
      {heart}
      {/* to change fork icon color, insert the following where 'false' is
        * {iconColor: 'YOUR_COLOR'} ----THEN -> add a css class titled .icon + your_color
      */}
      <Link className="col-6 icon" to={`/addrecipe?recipe=${recipeId}`}>
        <i className="fa fa-cutlery fa-3x">
          <br></br>
          <p className="">Fork</p>
        </i>
      </Link>
    </div>
  );
};

module.exports = SaveAndForkButtons;
