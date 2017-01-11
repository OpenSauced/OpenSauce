import React from 'react'
import { Link } from 'react-router';
import ForkButton from './ForkButton';

const SaveAndForkButtons = ({recipeId, userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
  let star = recipeId in savedRecipes 
    ? <div className ="col-6 icon" onClick={() => removeRecipe(recipeId, userId)}>
      <i className="fa fa-star fa-3x"></i><br></br><div className="icon">Remove this Recipe from My Cookbook</div></div>
    : <div className ="col-6 icon" onClick={() => saveRecipe(recipeId, userId)}>
      <i className="fa fa-star fa-3x"></i><br></br><div className="icon">Add this Recipe to My Cookbook</div></div>  
    
  return (
    <div className="row justify-content-center ml-auto mr-auto"> 
      {star} 
      {/* to change fork icon color, insert the following where 'false' is
        * {iconColor: 'YOUR_COLOR'} ----THEN -> add a css class titled .icon + your_color 
      */}
      <ForkButton recipeId={recipeId} cssStyles={null}/>
    </div>
  );
};

module.exports = SaveAndForkButtons;