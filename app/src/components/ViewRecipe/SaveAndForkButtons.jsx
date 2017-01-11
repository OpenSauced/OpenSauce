var React = require('react');
import { Link } from 'react-router';

const SaveAndForkButtons = ({recipeId, userId, saveRecipe, forkRecipe, removeRecipe, savedRecipes}) => {
  var star = recipeId in savedRecipes ? 
    <div className ="col-2 icon" onClick={() => removeRecipe(recipeId, userId)}>
    <i className="fa fa-star fa-3x"><br></br><p>Remove this Recipe</p></i></div>
  : <div className ="col-2 icon" onClick={() => saveRecipe(recipeId, userId)}>
    <i className="fa fa-star fa-3x"><br></br><p>Save this Recipe</p></i></div>  
  
  return (
    <div className="row justify-content-center"> 
    {star}
    <Link className="col-2 icon" to={`/addrecipe?recipe=${recipeId}`}>
    <i className="fa fa-cutlery fa-3x icon"><br></br><p>Fork this Recipe</p></i>
    </Link> 
    </div>
  );
};

module.exports = SaveAndForkButtons;