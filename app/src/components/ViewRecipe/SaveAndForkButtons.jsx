var React = require('react');
import { Link } from 'react-router';

const SaveAndForkButtons = ({recipeId, saveRecipe, forkRecipe, savedRecipes}) => {
  // savedRecipes.forEach((savedRecipeId) => {
  //   (savedRecipeId === recipeId) ? renderbluestar : renderblackstar
  // })
  return (
    <div>
    <div onClick={() => saveRecipe()}>
    <i className="fa fa-star fa-3x"></i>
    <br></br>
    Add this Recipe to My Cookbook
    </div>
    <div>
    <Link to={`/addrecipe?recipe=${recipeId}`}>
    <i className="fa fa-cutlery fa-3x"></i>
    <br></br>
    Fork this Recipe</Link>
     
    </div>
    </div>
  );
};

module.exports = SaveAndForkButtons;