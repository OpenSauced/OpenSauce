import React, { Component } from 'react';

const RecipeCreator = ({recipeCreator}) => {
	return (
    <div className="col-12 creator" >{recipeCreator.username + ' cooked up this recipe.'}</div>
  )
};

export default RecipeCreator;
