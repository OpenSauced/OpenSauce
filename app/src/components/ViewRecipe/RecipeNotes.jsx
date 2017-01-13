import React, { Component } from 'react';

const RecipeNotes = ({recipeNotes}) => {
  let notes = ( recipeNotes ) ? recipeNotes : 'There are no notes for this recipe yet.'
  return (
    <div className="col-12 recipe-notes">
      { notes }
    </div>
  )
};

export default RecipeNotes;
