var React = require('react');
import { Link } from 'react-router';

const SaveAndForkButtons = ({recipeId, userId, saveRecipe, forkRecipe, isSaved, removeRecipe}) => {
  var star = (isSaved) ? <div><i className="fa fa-star fa-3x blue"></i><br></br><div>Remove this Recipe from My Cookbook</div></div>
  : <div><i className="fa fa-star fa-3x black"></i><br></br><div>Add this Recipe to My Cookbook</div></div>  
  return (
    <div>
    <div onClick={() => saveRecipe(recipeId, userId)}>
    {star}
    </div>
    <div>
    <a onClick={() => removeRecipe(recipeId, userId)}> REMOVE </a>
    <Link to={`/addrecipe?recipe=${recipeId}`}>
    <i className="fa fa-cutlery fa-3x"></i>
    <br></br>
    Fork this Recipe</Link>
     
    </div>
    </div>
  );
};

module.exports = SaveAndForkButtons;