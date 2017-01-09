import React, { Component } from 'react';

const RecipeCreator = ({recipeCreator}) => {
	return (
  <div>{recipeCreator.username + ' cooked up this recipe.'}</div>
  )
};

export default RecipeCreator;
