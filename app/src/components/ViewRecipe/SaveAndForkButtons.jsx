var React = require('react');
import { Link } from 'react-router';

const SaveAndForkButtons = ({recipeId, userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
  var star = recipeId in savedRecipes ? 
    <div className ="col" onClick={() => removeRecipe(recipeId, userId)}>
    <i className="fa fa-star fa-3x icon"></i><br></br><div className="icon">Remove this Recipe from My Cookbook</div></div>
  : <div className ="col" onClick={() => saveRecipe(recipeId, userId)}>
    <i className="fa fa-star fa-3x icon"></i><br></br><div className="icon">Add this Recipe to My Cookbook</div></div>  
  
  return (
    <div className="container">
    <div className="row"> 
    {star}
    <Link className="col" to={`/addrecipe?recipe=${recipeId}`}>
    <i className="fa fa-cutlery fa-3x icon"></i>
    <br></br>
    <p className="icon">Fork this Recipe</p></Link> 
    </div>
    </div>
  );
};

module.exports = SaveAndForkButtons;