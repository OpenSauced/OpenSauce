import React, { Component } from 'react';

const RecipeNotes = ({recipeNotes}) => {
  // console.log(recipeNotes)
  return (
    <div className="col-12 recipe-notes">
      {recipeNotes}
    </div>
  )
};

export default RecipeNotes;