import React, { Component } from 'react';

 {/* A single recipe ingredient, shows up in RecipeIngredientsList */}
const RecipeIngredient = ({ingredient}) => {
	return (
    <li>{ingredient}</li>
  )
};

export default RecipeIngredient;