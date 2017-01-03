import React, { Component } from 'react';

const RecipeCreator = ({recipeCreator}) => {
	return (
  <div>{recipeCreator.first_name + ' ' + recipeCreator.last_name + ' cooked up this recipe.'}</div>
  )
};

export default RecipeCreator;