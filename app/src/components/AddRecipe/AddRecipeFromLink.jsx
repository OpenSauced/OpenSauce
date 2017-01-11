import React, { Component } from 'react';
import {browserHistory} from 'react-router';


const AddRecipeFromLink = (props) => {
  var userId = props.userData._id
  var formSubmit = function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/recipes/scraperecipe',
      type: 'POST',
      data: {
        userId: userId,
        url: $('input[name=url]').val()
      },
      success: function (statusObj) {
      console.log("recipe was saved to the DB", statusObj);
      if (statusObj.saved) {
        var path = `/viewrecipe?recipeId=${statusObj.recipeId}&savedAlready=true`
      } else {
        var path = `/viewrecipe?recipeId=${statusObj}`
      }
      browserHistory.push(path);
    },
      error: function(xhr, status, err) {
        var responseMessage = xhr.responseText
          props.openModal(xhr.responseText)
          console.error("did not post to DB from link ", status, xhr.responseText);
      }
    })
  }

  return (
    <div className="row view-recipe-container">
    <div className="col-6">
      <form id='commentPostForm' onSubmit={formSubmit}>
      <div>
        <label htmlFor="add_recipe_link">
        <input className="form-control" id="add_recipe_link" type='text' name='url' placeholder="Copy and paste a link here..."/>
        </label>
      </div>
      <button type='submit' className="btn btn-primary">Get Recipe</button>
      </form>
      </div>

      <div className="col-6">
      <h3>We support these sites:</h3>
      <div className="d-flex justify-content-around">
        <img 
          src='/assets/Epicurious_Logo_2014.png'
          alt="Epicurious"
          height="75"
          width="100"
          />
         <img
        src='/assets/fn-logo.png'
        alt="Epicurious"
        height="75"
        width="75"
        />
         <img
        src='/assets/allrecipeslogo.svg'
        alt="Epicurious"
        height="75"
        width="75"
        />
      </div>
      </div>


    </div>
  );
};

export default AddRecipeFromLink
