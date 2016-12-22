var React = require('react');

const SaveAndForkButtons = ({recipeId, saveRecipe, forkRecipe}) => {
  return (
  	<div>
    <div onClick={() => saveRecipe()}>
      <img src='/assets/icons/star.svg' alt="Favorite Recipe Star" height="75" width="75" />
    </div>
    <div>
    <a href={`/addrecipe?recipe=${recipeId}`} >
      <img src='/assets/icons/fork.svg' alt="Fork a recipe icon" height="75" width="75" />
     </a>
    </div>
    </div>
  );
};

module.exports = SaveAndForkButtons;