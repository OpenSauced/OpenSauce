import React from 'react'
import { Link } from 'react-router';
import ForkButton from './ForkButtonSolo';

const SaveAndForkButtons = ({recipe,userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
  
  {/* set the value of text below the heart if the user has liked a recipe */}
  let heart = recipe._id in savedRecipes
    ? <div className ="col-6 icon" onClick={() => removeRecipe(recipe._id, userId)}>
        <i className="fa fa-heart fa-3x">
          <br></br>
          <p>Remove</p>
        </i>
      </div>
    : <div className ="col-6 icon" onClick={() => saveRecipe(recipe._id, userId)}>
        <i className="fa fa-heart fa-3x">
          <br></br>
          <p>Save</p>
        </i>
      </div>

  return (
    <div className="row justify-content-center mx-auto">
      {/* if the recipe being viewed is owned by the user, don't show the heart  */}
      { 
        userId === recipe.creator._id 
          ? ''
          : heart
      }
      <Link className="col-6 icon" to={`/addrecipe?recipe=${recipe._id}`}>
        <i className="fa fa-cutlery fa-3x">
          <br></br>
        {/* The fork button always gets shown to the user, they might want to make another 
          * version of a recipe they own
         */}
          <p className="">Fork</p>
        </i>
      </Link>
    </div>
  );
};

module.exports = SaveAndForkButtons;
