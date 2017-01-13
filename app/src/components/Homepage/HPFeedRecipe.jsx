import React from 'react';
import {Router, Link} from 'react-router';

const HPFeedRecipe = ({recipe, savedRecipes, myRecipes, addRecipe, removeRecipe, userId, recipeId}) => {

var imageOr = recipe.recipe_images.public_url ? recipe.recipe_images.public_url : '/assets/cat.gif'

function getScore(score = 0) {
 var result = new Array(Math.floor(score * 5)).fill(' ')

 return result.map(x => {
  return <i className="fa fa-star"></i>
 })
}

  return (
    <div className="cardRecipeCol col-12 col-sm-12 col-md-6 col-lg-4">
        <div className="card recipeCard">
          <div className="card-image-container" style={{'backgroundImage':  'url(' + imageOr + ')'}}>
            {/* <img className="card-img-top" src={imageOr} alt="Card image cap"/> */}
          </div>
          <div className="card-block d-flex flex-wrap">
            <h2 className="col-12 card-title">
              <Link to={`/viewrecipe?recipeId=${recipe._id}`}>{recipe.title}</Link>
            </h2>
            {/*literally all i did was change the <p> tag into a div and turned the <div> into a <p> tag*/}
            <div className="col-12 card-title">
              <p>Author: {recipe.creator.username}</p>
            </div>
            <p className="col-12 card-text">{recipe.description}</p>
            <p className="col-12"> {'score' in recipe ? getScore(recipe.score) : ''}</p>
            <div className="d-flex flex-row w-100 align-self-end flex-wrap">
              <div className="col-12 col-sm-6">

                <Link to={`/addrecipe?recipe=${recipe._id}`} className="btn btn-primary recipeCardBtn w-100">Fork Recipe</Link>
              </div>
                {
                  recipe._id in myRecipes ?
                    <div className="col-12 col-sm-6 mt-2 mt-sm-0"><div className="w-100 btn btn-primary recipe_card-like_button recipeCardBtn">My Recipe</div></div> : recipe._id in savedRecipes ?
                    <div className="col-12 col-sm-6 mt-2 mt-sm-0"><div className="w-100 btn btn-primary recipe_card-like_button recipeCardBtn" onClick={() => {removeRecipe(recipeId, userId)}}>Unlike Recipe</div></div> :
                    <div className="col-12 col-sm-6 mt-2 mt-sm-0"><div className="w-100 btn btn-primary recipe_card-like_button recipeCardBtn" onClick={() => {addRecipe(recipeId, userId)}}>Like Recipe</div></div>
                }
            </div>
          </div>
        </div>
      </div>
    );
}

export default HPFeedRecipe;
