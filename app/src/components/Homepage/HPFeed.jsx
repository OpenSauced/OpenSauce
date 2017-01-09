import React, { Component } from 'react';
import HPFeedOnVisible from '../../components/Homepage/HPFeedOnVisible'

import RecipeList from '../../containers/AddRecipe/RecipeList';

class HPFeed extends Component {
  constructor() {
    super();

  }
  run
  render() {
    return (
      <div className="row homePageContainer">
        <RecipeList/>
      </div>
    )
  }
}

export default HPFeed;
