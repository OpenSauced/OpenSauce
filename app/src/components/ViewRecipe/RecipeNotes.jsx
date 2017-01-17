import React, { Component } from 'react';

 {/* Notes component - shows up in View Recipe */}
const RecipeNotes = ({recipeNotes}) => {
{/* If there are no recipe notes, show user friendly text rather than 'undefined' */}
  let notes = ( recipeNotes ) ? recipeNotes : 'There are no notes for this recipe yet.'
  return (
    <div className="col-12 recipe-notes">
      { notes }
    </div>
  )
};

export default RecipeNotes;
