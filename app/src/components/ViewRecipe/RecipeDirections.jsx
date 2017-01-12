import React, { Component } from 'react';

const RecipeDirections = ({recipeDirections}) => {
	return (
    <div className="col-12 recipe-directions">
      {recipeDirections}
    </div>
  )
};

export default RecipeDirections;