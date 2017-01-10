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
    <div className="row">
      <div className="col-12">
        <form id='commentPostForm' onSubmit={formSubmit}>
        <div className="row">
          <label htmlFor="add_recipe_link">
            <h2>Paste a link to a recipe:</h2>
            <input id="add_recipe_link" type='text' name='url' />
          </label>
        </div>
          <div className="row">
            <button type='submit' className="btn btn-secondary">Get Recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeFromLink
