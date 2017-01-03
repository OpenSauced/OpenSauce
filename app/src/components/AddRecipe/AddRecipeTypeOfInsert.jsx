import React from 'react';

const AddRecipeTypeOfInsert = ({renderClick}) => {
  return (
    <div className="row flex-items-xs-center">
      <div className="col-xs-3"><button name="manual" onClick={renderClick}>Type New Recipe</button></div>
      <div className="col-xs-3"><button name="link" onClick={renderClick}>Get Recipe from Other Site</button></div>
    </div>
  );
}

export default AddRecipeTypeOfInsert;
