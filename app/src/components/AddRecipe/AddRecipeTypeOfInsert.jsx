import React from 'react';

const AddRecipeTypeOfInsert = ({renderClick}) => {
  return (
    <div className="row justify-content-center">
      <div className="col-2"><button className="btn btn-secondary" name="manual" onClick={renderClick}>Type New Recipe</button></div>
      <div className="col-2"><button className="btn btn-secondary" name="link" onClick={renderClick}>Get Recipe from Other Site</button></div>
    </div>
  );
}

export default AddRecipeTypeOfInsert;
