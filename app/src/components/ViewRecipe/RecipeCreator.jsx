import React, { Component } from 'react';

function getRanodm() {
	var stuff = ['Chef', 'Gastronomist', 'SauceBoss', 'Professional Chef', 'The Kitchen Wizard AKA ']
		if(Math.floor(Math.random() * 3) > 1 ) {
			return stuff[Math.floor(Math.random() * stuff.length)]
		} else {
			return 'User'
		}
}


const RecipeCreator = ({recipeCreator}) => {
	return (
  <div className="col-12 creator" >{getRanodm()} <strong>{recipeCreator.username}</strong> cooked up this recipe</div>
  )
};

export default RecipeCreator;
