import React, { Component } from 'react';
import {browserHistory} from 'react-router';


const AddRecipeFromLink = (props) => {
	console.log("getting current user?", props)
	var username = props.userData.username
	var formSubmit = function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/recipes/scraperecipe',
      type: 'POST',
      data: {
        username: username,
        url: $('input[name=url]').val()
      },
      success: function (recipe) {
        console.log("recipe was saved to the DB", recipe);

 		const path = `/viewrecipe/${recipe._id}`
 		console.log("getting current path?", path)
      browserHistory.push(path);      },
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }

  })
}

  return (
  	<div>
    	<form id='commentPostForm' onSubmit={formSubmit}>
      Paste a link to a recipe:
      <input type='text' name='url' />
      <input type='submit' value='Get Recipe' />
    </form>

    </div>
  );
};

export default AddRecipeFromLink


