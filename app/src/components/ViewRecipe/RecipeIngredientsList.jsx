import React, { Component } from 'react';
import RecipeIngredient from './RecipeIngredient'

 {/* Lists ingredients for the user in View Recipe*/}
const RecipeIngredientsList = ({recipeIngredients}) => {
	return (
    <div>
      <ul>
        {
            recipeIngredients.map(
              (ingredient, index) => <RecipeIngredient ingredient={ingredient} key={index} />
            )
        }
      </ul>
    </div>
  )
};

export default RecipeIngredientsList;