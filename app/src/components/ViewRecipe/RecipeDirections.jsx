import React, { Component } from 'react';

 {/* Directions component - shows up in ViewRecipe  */}
const RecipeDirections = ({recipeDirections}) => {
	return (
    <div className="col-12 recipe-directions">
      {recipeDirections}
    </div>
  )
};

export default RecipeDirections;