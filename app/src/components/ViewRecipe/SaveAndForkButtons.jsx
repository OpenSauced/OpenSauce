import React from 'react'
import { Link } from 'react-router';
import ForkButton from './ForkButtonSolo';

const SaveAndForkButtons = ({recipe,userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
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
      { 
        userId === recipe.creator._id 
          ? <h3>Try Forking!</h3>
          : heart
      }
      <Link className="col-6 icon" to={`/addrecipe?recipe=${recipe._id}`}>
        <i className="fa fa-cutlery fa-3x">
          <br></br>
          <p className="">Fork</p>
        </i>
      </Link>
    </div>
  );
};

module.exports = SaveAndForkButtons;
