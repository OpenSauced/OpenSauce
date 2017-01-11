var React = require('react');
import { Link } from 'react-router';

const SaveAndForkButtons = ({recipeId, userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
  var star = recipeId in savedRecipes ? 
    <div className ="col-2 icon" onClick={() => removeRecipe(recipeId, userId)}>
    <i className="fa fa-star fa-3x"></i><br></br><div className="icon">Remove this Recipe from My Cookbook</div></div>
  : <div className ="col-2 icon" onClick={() => saveRecipe(recipeId, userId)}>
    <i className="fa fa-star fa-3x"></i><br></br><div className="icon">Add this Recipe to My Cookbook</div></div>  
  
  return (
    <div className="row justify-content-center"> 
    {star}
    <Link className="col-2 icon" to={`/addrecipe?recipe=${recipeId}`}>
    <i className="fa fa-cutlery fa-3x icon"></i>
    <br></br>
    <p className="icon">Fork this Recipe</p></Link> 
    </div>
  );
};

module.exports = SaveAndForkButtons;