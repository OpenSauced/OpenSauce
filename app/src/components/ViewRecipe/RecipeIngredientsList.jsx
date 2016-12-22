import React, { Component } from 'react';
import RecipeIngredient from './RecipeIngredient'

const RecipeIngredientsList = ({recipeIngredients}) => {
	return (
  <div>
    <ul>
      {recipeIngredients.map((ingredient, index) => <RecipeIngredient ingredient={ingredient} key={index} />)}
    </ul>
  </div>
  )
};

export default RecipeIngredientsList;