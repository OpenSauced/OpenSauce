import React from 'react';

const AddRecipeTypeOfInsert = ({renderClick}) => {
  return (
    <div className="row">
      <button name="manual" className="col-xs-6" onClick={renderClick}>Type New Recipe</button>
      <button name="link" className="col-xs-6" onClick={renderClick}>Get Recipe from Other Site</button>
    </div>
  );
}

export default AddRecipeTypeOfInsert;
