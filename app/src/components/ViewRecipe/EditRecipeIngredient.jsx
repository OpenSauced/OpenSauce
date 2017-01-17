
import React from 'react';

// Component handles each individual ingredient on the Edit view in RouteEditRecipe
const EditRecipeIngredient = ({ingredient, index, handleIngredientOnChange, handleRemoveIngredient}) => {
  return (
    <div key={index} className="form-group">
      <input
        className="form-control col-8 d-inline mr-2"      
        key={index}
        id={`ingredients-${index}`}
        onChange={handleIngredientOnChange}
        value={ingredient}
        placeholder="Please enter a single ingredient."
      />
      <button
        type="button"
        key={`remove_ingredient-${index}`}
        id={`remove_ingredient-${index}`} 
        className="btn btn-secondary col-1"
        onClick={handleRemoveIngredient}
      >
        X
      </button>
    </div>
  );
}

export default EditRecipeIngredient;