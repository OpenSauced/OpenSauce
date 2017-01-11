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
            <h2>We support these sites:</h2>
            <div className="row">
            <div className="col-4">
              <img 
                src='/assets/Epicurious_Logo_2014.png'
                alt="Epicurious"
                height="75"
                width="100"
                />
                </div>
                <div className="col-4">
                 <img
                src='/assets/fn-logo.png'
                alt="Epicurious"
                height="75"
                width="75"
                />
                </div>
                <div className="col-4">
                 <img
                src='/assets/allrecipeslogo.svg'
                alt="Epicurious"
                height="75"
                width="75"
                />
                </div>
                </div>

            <input className="form-control" id="add_recipe_link" type='text' name='url' placeholder="Copy and paste a link here..."/>
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
