import React from 'react';

const AddRecipeTypeOfInsert = ({renderClick}) => {
  return (
    <div className="row justify-content-center">
      <div className="col-2"><button className="btn btn-primary" name="manual" onClick={renderClick}>Add Your Own Recipe</button></div>
      <div className="col-2"><button className="btn btn-primary" name="link" onClick={renderClick}>Get A Recipe From A Link</button></div>
    </div>
  );
}

export default AddRecipeTypeOfInsert;
