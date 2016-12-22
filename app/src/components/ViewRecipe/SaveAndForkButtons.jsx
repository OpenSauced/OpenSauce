var React = require('react');

const SaveAndForkButtons = ({saveRecipe, forkRecipe}) => {
  return (
  	<div>
    <div onClick={() => saveRecipe()}>
      <img src='/assets/icons/star.svg' alt="Favorite Recipe Star" height="75" width="75" />
    </div>
    <div onClick={() => forkRecipe()}>
      <img src='/assets/icons/fork.svg' alt="Favorite Recipe Star" height="75" width="75" />

    </div>
    </div>
  );
};

module.exports = SaveAndForkButtons;