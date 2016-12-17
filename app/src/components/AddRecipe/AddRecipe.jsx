import React, { Component } from 'react';

import AddRecipeUploadImage from './AddRecipeUploadImage';
import AddRecipeManualEntry from './AddRecipeManualEntry';
import AddRecipeSearchAPI from './AddRecipeSearchAPI';

import AddRecipeConfirm from './AddRecipeConfirm';

class AddRecipe extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>AddRecipe</h1>
        <AddRecipeUploadImage/>
        <AddRecipeManualEntry/>
        <AddRecipeSearchAPI/>
        <h1>AddRecipeConfirm</h1>

      </div>
    );
  }
}

export default AddRecipe;
