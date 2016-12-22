import React, { Component } from 'react';

const AddRecipeFromLink = (props) => {

	var formSubmit = function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/recipes/scraperecipe' + ,
      type: 'POST',
      data: {
        username: this.props.username,
        url: $('input[name=url]').val()
      },
      success: function (recipe) {
        console.log("recipe was saved to the DB", recipe);
        //route to recipe page with recipe._id!!!!!!!!!
      },
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }

  })

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

export default AddRecipeFromLink;
