import React from 'react'
import { Link } from 'react-router';
import ForkButton from './ForkButton';

const SaveAndForkButtons = ({recipeId, userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
  let star = recipeId in savedRecipes 
    ? <div className ="col-2 icon" onClick={() => removeRecipe(recipeId, userId)}>
      <i className="fa fa-star fa-3x"></i><br></br><div className="icon">Remove this Recipe from My Cookbook</div></div>
    : <div className ="col-2 icon" onClick={() => saveRecipe(recipeId, userId)}>
      <i className="fa fa-star fa-3x"></i><br></br><div className="icon">Add this Recipe to My Cookbook</div></div>  
    
  return (
    <div className="row justify-content-center"> 
      {star}
      <ForkButton recipeId={recipeId}/>
    </div>
  );
};

module.exports = SaveAndForkButtons;