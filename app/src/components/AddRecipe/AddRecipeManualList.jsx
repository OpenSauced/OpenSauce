import React from 'react';

const AddRecipeManualList = ({ingredient, index, handleIngredientOnChange, handleRemoveIngredient}) => {
  return (
    <div>
      <input
        key={index}
        id={`ingredients-${index}`}
        onChange={handleIngredientOnChange}
        value={ingredient}
        placeholder="Ingredient"
      />
      <button
        type="button"
        key={`remove_ingredient-${index}`}
        id={`remove_ingredient-${index}`} 
        className=""
        onClick={handleRemoveIngredient}
      >
        Remove
      </button>
    </div>
  );
}

export default AddRecipeManualList;
